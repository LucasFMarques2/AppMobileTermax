import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container:{
        width: '100%',
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
    },
    header:{
      width: '100%',
      height:40,
      paddingHorizontal:40,
      flexDirection: 'row',
      marginTop: 20,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    content:{
        width: '100%',
        paddingHorizontal: 20
    },
    select:{
        marginTop: 20, 
        marginRight: 160, 
        marginLeft: 10
    },
    inputArea:{
        marginRight: 30,
        marginLeft: 10
    }
})