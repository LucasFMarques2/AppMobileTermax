import { TouchableOpacity, View, SafeAreaView, Text  } from 'react-native'
import {style} from './style'
import {AntDesign, FontAwesome, MaterialIcons, Entypo} from '@expo/vector-icons'
import { themas } from '../../global/themes'
import { useContext } from 'react'
import { AuthContextList } from '../../context/authContext_list'

export default({state, navigation}) => {

    const {onOpen} = useContext(AuthContextList)

    const navegacao = (screenName) => {
        navigation.navigate(screenName)
    }
    
    return(
        <View style={style.tabArea}>
            <TouchableOpacity style={style.tabItem} onPress={()=>navegacao('Home')}>
                <AntDesign
                    name='bars'
                    style={{opacity:state.index===0?1:0.5,fontSize:32}}
                />
            </TouchableOpacity>
            <TouchableOpacity style={style.tabItemButtom} onPress={()=>onOpen()}>
                <View style={{width: '100%', left:10, top:4}}>
                    <Entypo 
                      name='plus' 
                      style={{color: '#002366'}}
                      size={40} 
                    />
                </View>
                <View style={{flexDirection: 'row-reverse', width:'100%', right: 10, bottom: 10}}>
                    <MaterialIcons 
                        name='edit'
                        style={{color: '#002366'}}
                        size={30}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={style.tabItem}  onPress={()=>navegacao('User')}>
               <FontAwesome 
                    name='user'
                    style={{opacity:state.index===1?1:0.2,fontSize:32}}
               />
            </TouchableOpacity>
        </View>
    )
}