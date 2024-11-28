import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import do AsyncStorage
import { api } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post("session", { email, password });
      const { user, token } = response.data;
  
      // Armazenar os dados localmente com AsyncStorage
      await AsyncStorage.setItem("@termax:user", JSON.stringify(user));
      await AsyncStorage.setItem("@termax:token", token);
  
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({ user, token });
      alert("Login realizado com sucesso!");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Não foi possível logar");
      }
    }
  }
  

  async function signOut() {
    // Remover os dados armazenados localmente
    await AsyncStorage.removeItem("@termax:token");
    await AsyncStorage.removeItem("@termax:user");

    setData({});
  }

  async function updateProfile({ user, avatarFile }) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);
  
        const response = await api.patch("users/avatar", fileUploadForm);
        const updatedAvatar = response.data.avatar;
  
        user.avatar = updatedAvatar;

        // Atualizar o AsyncStorage
        await AsyncStorage.setItem("@termax:user", JSON.stringify(user));
        setData({ user, token: data.token });

        alert("Avatar atualizado");
      } else {
        await api.put("/users", user);

        // Atualizar o AsyncStorage
        await AsyncStorage.setItem("@termax:user", JSON.stringify(user));
        setData({ user, token: data.token });

        alert("Perfil atualizado");
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Não foi possível alterar informações");
      }
    }
  }

  useEffect(() => {
    async function loadStorageData() {
      const token = await AsyncStorage.getItem("@termax:token");
      const user = await AsyncStorage.getItem("@termax:user");

      if (token && user) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setData({
          token,
          user: JSON.parse(user),
        });
      }
    }

    loadStorageData();
  }, []);

  // Função para verificar se o usuário é admin
  const isAdmin = data.user?.isAdmin === 1; // Aqui ajustamos a lógica

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        updateProfile,
        user: data.user,
        isAdmin, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
