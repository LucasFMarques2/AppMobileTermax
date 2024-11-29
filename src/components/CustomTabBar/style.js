import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    tabArea:{
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-around',
        paddingBottom: 10,
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity:  0.17,
        shadowRadius: 3.05,
        elevation: 4
    },
    tabItem:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabItemButtom:{
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        zIndex: 999,
        top: -30,
        backgroundColor: themas.Colors.primary
    }
})