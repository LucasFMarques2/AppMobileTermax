import React, { useState, useEffect } from "react";
import { Text,  View, TouchableOpacity, Alert  } from "react-native"
import { style } from "./style"
import { Input } from "../../components/Input"
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from "react-native-gesture-handler";
import { api } from "../../services/api";


function formatDate(dateString) {
    const date = new Date(dateString);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = String(date.getFullYear()).slice(-2);
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  }

export default function Home(){

    const [data, setData] = useState([])

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await api.get('/abastecimento')
                setData(response.data)
            } catch (error){
                Alert.error("Erro ao buscar dados", error)
            }
        }
        fetchData();
    }, [])

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
                    <Text >Data:<Text>{formatDate(item.created_at)}</Text></Text>
            </TouchableOpacity>
        );
    };
    

    return(
        <View style={style.container}>
            <View style={style.header} >
                <Text style={style.headerText}>Olá Lucas</Text>
                <View style={style.inputArea}>
                  <Input
                    placeholder="Buscar..."
                    IconRigth={MaterialIcons}
                    iconRightName="search"
                    iconSize={30}
                    placeholderTextColor={'gray'}
                  />
                </View>
            </View>
            <View style={style.boxList}>
                <Text style={style.titleList}>LISTA DE ABASTECIMENTO</Text>
            <FlatList
                data={data}
                style={{ marginTop: 40, padding: 30 }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => ((_renderCard(item))
                )}
            />
            </View>
        </View>
    )
}