import React, { useState, useEffect } from "react";
import { 
  SafeAreaView, 
  View, 
  Text, 
  Image, 
  KeyboardAvoidingView, 
  Keyboard, 
  TouchableWithoutFeedback, 
  ScrollView,
  Platform,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import logo from '../../assets/logo.jpeg';
import { style } from "./style";
import { useAuth } from '../../hooks/auth';
import { Input } from '../../components/Input/';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCheckbox from '../../components/Checkbox';

export default function Login({ navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [hiddePassword, setHiddePassword] = useState(true);
  const [rememberEmail, setRememberEmail] = useState(false);
  const { signIn } = useAuth();

  useEffect(() => {
    const loadEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("email"); 
        if (storedEmail) {
          setEmail(storedEmail);
          setRememberEmail(true); 
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    loadEmail();
  }, []);

  const handleCheckboxToggle = async (checked) => {
    setRememberEmail(checked);
    if (checked) {
      await AsyncStorage.setItem("email", email); 
    } else {
      await AsyncStorage.removeItem("email"); 
    }
  };

  const handleHiddePassword= ()=> {
    setHiddePassword(prevState => !prevState);
  }

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      setLoading(true);
      await signIn({ email, password });
      setTimeout(() => {
        setLoading(false);
        navigation.reset({routes:[{name: "BottomRoutes"}]});
      }, 1000);
    } catch (error) {
      console.error(error);
      setLoading(false);
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
                IconRigth={MaterialIcons}
                iconRightName="email"
              />
              <CustomCheckbox 
                checked={rememberEmail} 
                onCheckboxToggle={handleCheckboxToggle} 
              />
              <Input
                value={password}
                onChangeText={setPassword}
                title="Senha"
                IconRigth={Octicons}
                iconRightName={hiddePassword ? "eye-closed" : "eye"}
                secureTextEntry={hiddePassword}
                onIconRigthPress={handleHiddePassword}
              />
            </View>

            <View style={style.boxBottom}>
              <TouchableOpacity style={style.button} onPress={handleLogin}>
                {loading 
                  ? <ActivityIndicator color={'#ffffff'} size={'small'} /> 
                  : <Text style={style.textButton}>Entrar</Text>
                }
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
