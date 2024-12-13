import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { Alert, Dimensions, Text, TouchableOpacity, View, ScrollView } from "react-native";
import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Modalize } from "react-native-modalize";
import { Input } from "../components/Input";
import { style } from "./style";
import { api } from "../services/api"; 

export const AuthContextList = createContext({});

export const AuthProviderList = (props) => {
    const [selected, setSelected] = useState("");
    const [carro, setCarro] = useState("");
    const [obraDestino, setObraDestino] = useState("");
    const [qtdLitros, setQtdLitros] = useState("");
    const [valor, setValor] = useState("");
    const [supplyList, setSupplyList] = useState([]);
    const [isConnected, setIsConnected] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const data = [
        { key: "0", value: "Gasolina comum" },
        { key: "1", value: "Gasolina aditivada" },
        { key: "2", value: "Gasolina premium" },
        { key: "3", value: "Gasolina formulada" },
        { key: "4", value: "Etanol" },
        { key: "5", value: "Etanol aditivado" },
        { key: "6", value: "GNV (Gás Natural Veicular)" },
        { key: "7", value: "Diesel" },
        { key: "8", value: "Diesel S-10" },
        { key: "9", value: "Biodiesel" },
    ];

    const modalizeRef = useRef(null); 

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected);
            if (state.isConnected) {
                syncOfflineData();
            }
        });
        return () => unsubscribe();
    }, []);

    const onOpen = () => {
        if (modalizeRef.current) {
            modalizeRef.current.open();
        } else {
            Alert.alert("Erro", "Modal não está disponível.");
        }
    };

    const onClose = () => {
        if (modalizeRef.current) {
            modalizeRef.current.close();
        }
    };

    const handleSubmit = async () => {
        if (isSubmitting) return; // Evita múltiplos envios

        if (!carro || !obraDestino || !selected || !qtdLitros || !valor) {
            Alert.alert("Erro", "Todos os campos são obrigatórios!");
            return;
        }

        const combustivelSelecionado = data.find((item) => item.key === selected)?.value;

        if (!combustivelSelecionado) {
            Alert.alert("Erro", "Combustível inválido.");
            return;
        }

        const abastecimentoData = {
            carro,
            obra_destino: obraDestino,
            combustivel: combustivelSelecionado,
            qtd_litros: qtdLitros,
            valor,
        };

        if (isConnected) {
            try {
                setIsSubmitting(true);

                // Verifica duplicidade na lista atual
                if (supplyList.some(item => JSON.stringify(item) === JSON.stringify(abastecimentoData))) {
                    Alert.alert("Aviso", "Este abastecimento já foi registrado.");
                    return;
                }

                const response = await api.post("/abastecimento", abastecimentoData);
                setSupplyList((prev) => [...prev, response.data]);

                Alert.alert("Sucesso", "Abastecimento registrado com sucesso!");
                resetFields();
                onClose();
            } catch (error) {
                Alert.alert("Erro", "Ocorreu um erro ao registrar o abastecimento.");
            } finally {
                setIsSubmitting(false);
            }
        } else {
            try {
                const offlineData = JSON.parse(await AsyncStorage.getItem("offlineData")) || [];

                // Verifica duplicidade nos dados offline
                if (offlineData.some(item => JSON.stringify(item) === JSON.stringify(abastecimentoData))) {
                    Alert.alert("Aviso", "Este abastecimento já está salvo localmente.");
                    return;
                }

                offlineData.push(abastecimentoData);
                await AsyncStorage.setItem("offlineData", JSON.stringify(offlineData));

                Alert.alert("Offline", "Abastecimento salvo localmente. Será enviado quando houver conexão.");
                resetFields();
                onClose();
            } catch (error) {
                Alert.alert("Erro", "Não foi possível salvar os dados offline.");
            }
        }
    };

    const syncOfflineData = async () => {
        if (isSyncing) return;
    
        setIsSyncing(true);
    
        try {
            const offlineData = JSON.parse(await AsyncStorage.getItem("offlineData")) || [];
            if (offlineData.length > 0) {
                const remainingData = [];
    
                for (const data of offlineData) {
                    try {
                        const response = await api.post("/abastecimento", data);
                        setSupplyList((prev) => [...prev, response.data]);
                    } catch (error) {
                        remainingData.push(data); // Se não conseguir enviar, mantém no offline
                    }
                }
    
                // Atualiza o armazenamento local com os dados que não foram sincronizados
                await AsyncStorage.setItem("offlineData", JSON.stringify(remainingData));
    
                if (remainingData.length === 0) {
                    Alert.alert("Sucesso", "Todos os dados offline foram sincronizados com o servidor!");
                } else {
                    Alert.alert("Aviso", "Alguns dados não puderam ser sincronizados. Tente novamente mais tarde.");
                }
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível sincronizar os dados offline.");
        } finally {
            setIsSyncing(false);
        }
    };
    
    

    const resetFields = () => {
        setCarro("");
        setObraDestino("");
        setQtdLitros("");
        setValor("");
        setSelected("");
    };

    const _container = () => {
        return (
            <View style={style.container}>
                <View style={style.header}>
                    <TouchableOpacity onPress={onClose}>
                        <MaterialIcons name="close" size={30} />
                    </TouchableOpacity>
                    <Text style={style.title}>Novo abastecimento</Text>
                    <TouchableOpacity onPress={handleSubmit} disabled={isSubmitting}>
                        <AntDesign name="check" size={30} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={style.contant}>
                    <View style={style.inputArea}>
                        <Input placeholder="Carro" value={carro} onChangeText={setCarro} />
                        <Input placeholder="Obra destino" value={obraDestino} onChangeText={setObraDestino} />
                        <Input placeholder="Litros" value={qtdLitros} onChangeText={setQtdLitros} keyboardType="numeric" />
                        <Input placeholder="Valor" value={valor} onChangeText={setValor} keyboardType="numeric" />
                    </View>
                    <View style={style.select}>
                        <SelectList
                            data={data}
                            setSelected={setSelected}
                            boxStyles={{ paddingRight: 10, borderRadius: 20 }}
                            placeholder="Combustível"
                            maxHeight={200}
                            searchPlaceholder="Buscar combustível"
                        />
                    </View>
                </ScrollView>
            </View>
        );
    };

    return (
        <AuthContextList.Provider value={{ onOpen, supplyList }}>
            {props.children}
            <Modalize ref={modalizeRef} childrenStyle={{ height: Dimensions.get("window").height / 1.3 }} adjustToContentHeight={true}>
                {_container()}
            </Modalize>
        </AuthContextList.Provider>
    );
};

export const useAuth = () => useContext(AuthContextList)