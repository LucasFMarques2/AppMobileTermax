import { FlatList } from "react-native-gesture-handler";
import React, { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { Input } from "../../components/Input";
import { MaterialIcons } from '@expo/vector-icons';
import { api } from "../../services/api";
import { style } from "./style";
import { AuthContextList } from "../../context/authContext_list";

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} às ${hours}:${minutes}`;
}

export default function Home() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const {supplyList} = useContext(AuthContextList)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/abastecimento');
                const sortedData = response.data.sort((a, b) => new Date(b.id) - new Date(a.id)); 
                setData(sortedData);
                setFilteredData(sortedData);
            } catch (error) {
                Alert.alert("Erro ao buscar dados", error.message);
            }
        };
        fetchData();
    }, [supplyList]);

    const handleSearch = (term) => {
        setSearchTerm(term);
        if (term === "") {
            setFilteredData(data);
        } else {
            const filtered = data.filter((item) => {
                const searchLower = term.toLowerCase();
                return (
                    (item.valor?.toString().toLowerCase() || "").includes(searchLower) ||
                    (item.carro?.toLowerCase() || "").includes(searchLower) ||
                    (item.motorista?.toLowerCase() || "").includes(searchLower) ||
                    (item.obra_destino?.toLowerCase() || "").includes(searchLower) ||
                    (formatDate(item.created_at)?.toLowerCase() || "").includes(searchLower)
                );
            });
            setFilteredData(filtered);
        }
    };

    const _renderCard = (item) => {
        return (
            <TouchableOpacity style={style.card}>
                <View style={style.rowCardTop}>
                    <Text style={style.tituloCard}>Carro:<Text style={style.subTituloCard}>{item.carro}</Text></Text>
                    <Text style={style.tituloCard}>Motorista:<Text style={style.subTituloCard}>{item.motorista}</Text></Text>
                    <Text style={style.tituloCard}>Obra destino:<Text style={style.subTituloCard}>{item.obra_destino}</Text></Text>
                </View>
                <View style={style.rowCardBottom}>
                    <Text style={style.tituloCard}>Combustível:<Text style={style.subTituloCard}>{item.combustivel}</Text></Text>
                    <Text style={style.tituloCard}>Litros:<Text style={style.subTituloCard}>{item.qtd_litros}L</Text></Text>
                    <Text style={style.tituloCard}>Valor:<Text style={style.subTituloCard}>{item.valor}R$</Text></Text>
                </View>
                <Text>Data:<Text>{formatDate(item.created_at)}</Text></Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.headerText}>Olá Lucas</Text>
                <View style={style.inputArea}>
                    <Input
                        placeholder="Buscar..."
                        IconRigth={MaterialIcons}
                        iconRightName="search"
                        iconSize={30}
                        placeholderTextColor={'gray'}
                        value={searchTerm}
                        onChangeText={handleSearch} 
                    />
                </View>
            </View>
            <View style={style.boxList}>
                <Text style={style.titleList}>LISTA DE ABASTECIMENTO</Text>
                {data.length === 0 ? ( 
                    <Text style={style.emptyMessage}>Nenhum abastecimento listado</Text>
                ) : filteredData.length === 0 ? ( 
                    <Text style={style.emptyMessage}>Abastecimento não encontrado</Text>
                ) : (
                    <FlatList
                        data={filteredData} 
                        style={{ marginTop: 40, padding: 30 }}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => _renderCard(item)}
                    />
                )}
            </View>
        </View>
    );
}
