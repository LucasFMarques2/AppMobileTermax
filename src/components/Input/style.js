import {StyleSheet} from 'react-native'
import {themas} from '../../global/themes'

export const style = StyleSheet.create({
    inputArea: {
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        borderRadius: 40,
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: themas.Colors.lightGray,
        borderColor: themas.Colors.lightGray,
        height: 50, 
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.16,
        shadowRadius: 1.51,
        elevation: 2,
    },    
    input:{
        height: '100%',
        width: '90%',
        borderRadius: 40,
        padding:15,
        paddingHorizontal: 20,
    },
    titleInput:{
        marginLeft: 5,
        color: themas.Colors.gray,
        marginTop: 20,
    },
    Icon:{
        width: '100%'
    }
})