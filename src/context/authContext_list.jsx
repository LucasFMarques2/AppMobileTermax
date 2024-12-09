import { createContext, useContext } from "react";
import { Alert } from "react-native";

export const AuthContextList = createContext({})


export const AuthProviderList = (props) => {
    const onOpen =()=>{
        Alert.alert('atencao abriu o trem')
    }

    return(
        <AuthContextList.Provider value={{onOpen}}>
            {props.children}
        </AuthContextList.Provider>
    )
}

export const useAuth = () => useContext(AuthContextList);