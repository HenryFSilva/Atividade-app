import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import api from '../../services/api';

export default function TodosCliente() {
    const navigation = useNavigation();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [flatListItems, setFlatListItems] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const navegaEditarCliente = (pId, pNome, pTel_Cel, pTel_Fixo, pEmail) => {
        navigation.navigate('EditarCliente', { id: pId, nome: pNome, tel_cel: pTel_Cel, tel_fixo: pTel_Fixo, email: pEmail });
    };

    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const hideAlert = () => {
        setShowAlert(false);
    };

    const buscarClientes = async () => {
        try {
            const response = await api.get(`/contato`);

            if (response.data.length > 0) {
                setFlatListItems(response.data);
            } else {
                setFlatListItems([]);
                setAlertMessage('Nenhum registro localizado');
                handleShowAlert();
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const excluirCliente = async (id) => {
        try {
            const response = await api.delete(`/contato/${id}`);

            if (response.data[0].affectedRows > 0) {
                setRefresh(prevState => !prevState);
                setAlertMessage('Registro excluído com sucesso!');
            } else {
                setAlertMessage('Registro não localizado');
            }
            handleShowAlert();
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    useFocusEffect(
        useCallback(() => {
            buscarClientes();
        }, [refresh])
    );

    let listItemView = (item) => {
        return (
            <View key={item.id} style={styles.itemContainer}>

                <Text style={styles.headerText}>ID: {item.id}</Text>

                <Text style={styles.headerText}>Nome: {item.nome}</Text>

                <Text style={styles.headerText}>Celular: {item.tel_cel}</Text>

                <Text style={styles.headerText}>Telefone Fixo: {item.tel_fixo}</Text>

                <Text style={styles.headerText}>Email: {item.email}</Text>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => excluirCliente(item.id)} style={styles.button}>
                        <FontAwesome5 name="trash-alt" color='red' size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navegaEditarCliente(item.id, item.nome, item.tel_fixo, item.tel_cel, item.email)} style={styles.button}>
                        <FontAwesome5 name="edit" color='blue' size={24} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Clientes Cadastrados</Text>
            <FlatList
                contentContainerStyle={styles.flatListContainer}
                data={flatListItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => listItemView(item)}
            />
            {showAlert &&
                Alert.alert(
                    'Atenção!',
                    alertMessage,
                    [
                        {
                            text: 'OK',
                            onPress: hideAlert
                        }
                    ],
                    { cancelable: false }
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color:'black'
    },
    itemContainer: {
        backgroundColor: "grey",
        borderRadius: 10,
        marginTop: 15,
        elevation: 6,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap:6
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10
    },
    button: {
        paddingHorizontal: 15
    },
    flatListContainer: {
        flexGrow: 1
    }
});