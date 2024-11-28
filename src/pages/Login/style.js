import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    boxTop:{
        height: Dimensions.get('window').height/3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxMid:{
        height: Dimensions.get('window').height/4,
        width: '100%',
        paddingHorizontal: 27
    },
    boxBottom:{
        height: Dimensions.get('window').height/7,
        width: '100%',
        alignItems: 'center',
        marginTop: 30
    },
    logo:{
        height: 110,
        width: 250
    },
    text:{
        fontWeight: 'bold',
        marginTop: 40,
        fontSize: 20
    },
    titleInput:{
        marginLeft: 5,
        color: themas.Colors.gray,
        marginTop: 20,
    },
    inputArea:{
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        borderRadius: 40,
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: themas.Colors.lightGray,
        borderColor: themas.Colors.lightGray,
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity:  0.16,
        shadowRadius: 1.51,
        elevation: 2
    },
    input:{
        height: '100%',
        width: '90%',
        borderRadius: 40,
        padding:15,
        paddingHorizontal: 20,
        
        
    },
    button:{
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themas.Colors.primary,
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity:  0.16,
        shadowRadius: 1.51,
        elevation: 2
    },
    textButton:{
        fontSize: 16,
        fontWeight: 'bold',
        
    }
})