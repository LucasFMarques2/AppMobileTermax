import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
    },
    header:{
        width: '100%',
        height: Dimensions.get('window').height/5,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: themas.Colors.primary,
    },
    headerText: {
        fontSize: 20,
        color: '#002366', 
        fontWeight: 'bold',
        marginTop: 30,
 
    },
    boxList:{
        flex: 1,
        width: '100%',
        backgroundColor: '#ededed',
    },
    card: {
        width: '102%',
        backgroundColor: '#fff',
        marginTop: 6,
        borderRadius: 10,
        justifyContent: 'center',
        padding: 10,
        shadowColor: "#000000",
        borderWidth: 1,
        borderColor: themas.Colors.lightGray,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 3,
    },
    rowCardTop: {  
        flexDirection: 'row',
        width: '50%',
    },
    rowCardBottom: {  
        flexDirection: 'row',
        width: '50%', 
    },
    tituloCard: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'black',
        paddingBottom: 6,
        paddingRight: 6
    },
    subTituloCard: {
        color: 'green',
        fontWeight: 'normal',
    },
    titleList:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 60,
        marginBottom: -50
    }
})