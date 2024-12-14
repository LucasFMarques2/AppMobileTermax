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
        width: '50%',
    },
    rowCardBottom: {  
        flexDirection: 'row',
        width: '80%', 
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
        marginBottom: -10
    },
    emptyMessage: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginTop: 200,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    saveButton: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    closeButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    
    
})