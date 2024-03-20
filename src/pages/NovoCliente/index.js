import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context";


import api from '../../services/api';

export default function NovoCliente() {

    const [txtNome, setTxtNome] = useState('');
    const [txtTelCel, settxtTelCel] = useState('');
    const [txtTelFixo, setTxtTelFixo] = useState('');
    const [txtEmail, setTxtEmail] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const hideAlert = () => {
        setShowAlert(false);
    };

    useEffect(() => {
        if (showAlert) {
            Alert.alert(
                'Atenção!',
                alertMessage,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            hideAlert();
                        }
                    }
                ],
                { cancelable: false }
            );
        }
    }, [showAlert]);

    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const SalvarCliente = async (id) => {
        try {
            if (txtNome.trim() === '') {
                setAlertMessage('Preencha corretamente o campo nome!')
                handleShowAlert();
                return;
            }
            if (txtEmail.trim() === '') {
                setAlertMessage('Preencha corretamente o campo email')
                handleShowAlert();
                return;
            }
            if (!validarEmail(txtEmail)) {
                setAlertMessage('Preencha corretamente o campo email!');
                setShowAlert(true);
                return;
            }
            if (!txtEmail.includes('@')) {
                setAlertMessage('O email deve conter o caractere "@"!');
                setShowAlert(true);
                return;
            }

            const response = await api.post(`/contato`, { nome: txtNome.trim(), tel_cel: txtTelCel, tel_fixo: txtTelFixo, email: txtEmail })
            console.log(response);
            if (response && response.data && response.data[0].affectedRows === 1) {
                setAlertMessage('Registro inserido com sucesso!')
                setTxtNome('');
                setTxtEmail('');
                setTxtTelFixo('');
                settxtTelCel('');
                handleShowAlert();
            } else {
                setAlertMessage('Ocorreu um erro ao inserir o registro');
                handleShowAlert();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Preencha os campos abaixo:</Text>
                <TextInput
                    style={styles.input}
                    value={txtNome}
                    onChangeText={setTxtNome}
                    placeholder="Nome do cliente"
                />
                <TextInput
                    style={styles.input}
                    value={txtTelCel}
                    onChangeText={settxtTelCel}
                    keyboardType="numeric"
                    placeholder="Telefone Celular"
                />
                <TextInput
                    style={styles.input}
                    value={txtTelFixo}
                    onChangeText={setTxtTelFixo}
                    keyboardType="numeric"
                    placeholder="Telefone Fixo"
                />
                <TextInput
                    style={styles.input}
                    value={txtEmail}
                    onChangeText={setTxtEmail}
                    keyboardType="email-address"
                    placeholder="Email"
                />
                <TouchableOpacity
                    onPress={SalvarCliente}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        width: '80%',
        marginTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'orange'
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 6,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'gray',
        borderRadius: 4,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'orange',
        fontSize: 16,
    },
});