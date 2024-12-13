import { Alert, Dimensions, Text, TouchableOpacity, View, ScrollView } from "react-native";
import React, { createContext, useContext, useRef, useState } from "react";
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
    const data = [
        {key:'0', value:'Gasolina comum'},
        {key:'1', value:'Gasolina aditivada'},
        {key:'2', value:'Gasolina premium'},
        {key:'3', value:'Gasolina formulada'},
        {key:'4', value:'Etanol'},
        {key:'5', value:'Etanol aditivado'},
        {key:'6', value:'GNV (Gás Natural Veicular)'},
        {key:'7', value:'Diesel'},
        {key:'8', value:'Diesel S-10'},
        {key:'9', value:'Biodiesel'},
    ];

    const modalizeRef = useRef(null);

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
        if (!carro || !obraDestino || !selected || !qtdLitros || !valor) {
            Alert.alert("Erro", "Todos os campos são obrigatórios!");
            return;
        }
    
        const combustivelSelecionado = data.find(item => item.key === selected)?.value;
    
        if (!combustivelSelecionado) {
            Alert.alert("Erro", "Combustível inválido.");
            return;
        }
    
        try {
            const response = await api.post("/abastecimento", {
                carro,
                obra_destino: obraDestino,
                combustivel: combustivelSelecionado, 
                qtd_litros: qtdLitros,
                valor,
            });
    
            setSupplyList(prev => [...prev, response.data]);
    
            Alert.alert("Sucesso", "Abastecimento registrado com sucesso!");
    
            setCarro("");
            setObraDestino("");
            setQtdLitros("");
            setValor("");
            setSelected(""); 
    
            onClose();
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao registrar o abastecimento.");
        }
    };

    const _container = () => {
        return (
            <View style={style.container}>
                <View style={style.header}>
                    <TouchableOpacity onPress={onClose}>
                        <MaterialIcons name="close" size={30} />
                    </TouchableOpacity>
                    <Text style={style.title}>Novo abastecimento</Text>
                    <TouchableOpacity onPress={handleSubmit}>
                        <AntDesign name="check" size={30} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={style.contant}>
                    <View style={style.inputArea}>
                        <Input
                            placeholder="Carro"
                            value={carro}
                            onChangeText={setCarro}
                        />
                        <Input
                            placeholder="Obra destino"
                            value={obraDestino}
                            onChangeText={setObraDestino}
                        />
                        <Input
                            placeholder="Litros"
                            value={qtdLitros}
                            onChangeText={setQtdLitros}
                            keyboardType="numeric"
                        />
                        <Input
                            placeholder="Valor"
                            value={valor}
                            onChangeText={setValor}
                            keyboardType="numeric"
                        />
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
            <Modalize
                ref={modalizeRef}
                childrenStyle={{ height: Dimensions.get("window").height / 1.3 }}
                adjustToContentHeight={true}
            >
                {_container()}
            </Modalize>
        </AuthContextList.Provider>
    );
};

export const useAuth = () => useContext(AuthContextList);
