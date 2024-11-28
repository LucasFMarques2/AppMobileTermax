import { 
    SafeAreaView, 
    View, 
    Text, 
    Image, 
    TextInput, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    Keyboard, 
    TouchableWithoutFeedback, 
    ScrollView,
    Platform,
    ActivityIndicator
  } from "react-native";
  import { themas } from "../../global/themes";
  import logo from '../../assets/logo.jpeg';
  import { style } from "./style";
  import { useState } from "react";
  import { useAuth } from '../../hooks/auth'
  import {Input} from '../../components/Input/'
  import { MaterialIcons, Octicons } from '@expo/vector-icons';

  export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword]  = useState("")
    const [loading, setLoading] = useState(false)
    const { signIn } = useAuth();

    const handleLogin = async () => {
      if (!email || !password) {
        alert("Por favor, preencha todos os campos!");
        return;
      }
    
      try {
        setLoading(true)
        await signIn({ email, password });
        setTimeout(()=>{
          setLoading(false)
        },1000)
      } catch (error) {
        console.error(error); 
      }
    };

 
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={style.container}>
            <ScrollView 
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              <View style={style.boxTop}>
                <Image source={logo} style={style.logo} resizeMethod="contain" />
                <Text style={style.text}>Bem-vindo! Faça o login</Text>
              </View>
  
              <View style={style.boxMid}>
                  <Input
                    value={email}
                    onChangeText={setEmail}
                    title="E-mail"
                    IconRight={Materiaicons}
                    iconRightName="email"
                  />
                  <Input
                    value={password}
                    onChangeText={setPassword}
                    title="Senha"
                    IconRight={Octicons}
                    iconRightName="eye-coled"
                  />
              </View>
  
              <View style={style.boxBottom}>
                <TouchableOpacity style={style.button} onPress={handleLogin}>
                 {loading? <ActivityIndicator color={'#fff'} size={'small'}/> : <Text style={style.textButton}>Entrar</Text>}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
  