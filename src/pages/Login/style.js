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
        height: Dimensions.get('window').height/4,
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
        fontSize: 20,
        textAlign: 'center'
    },
    button:{
        width: 200,
        height: 50,
        marginTop: 35,
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
        
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: 'center',
      },
})