import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, TouchableOpacity, TextInput,Image } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function Home() {

    const navigation = useNavigation();

    const navegaPesquisaCliente = () => {
        navigation.navigate('DetalhesCliente');
    }
    const inserirNovoCliente = () => {
        navigation.navigate('NovoCliente');
    }
    const listarTodosCiientes = () => {
        navigation.navigate('TodosClientes');
    }

    return (

        <SafeAreaView style={{
            flex: 2,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        }}>

            <StatusBar style="auto" />

            <View style={{ paddingTop: 100, paddingBottom: 50 }}>
                <Text style={styles.textTitle}>Opções dos Clientes</Text>
            </View>

            <View style={[styles.container]}>
                <TouchableOpacity style={styles.buttonTouchable} onPress={navegaPesquisaCliente}>
                    <View></View>

                    <FontAwesome5 name='search' color='orange' size={23}></FontAwesome5>
                    <Text style={styles.textButton}>Pesquisar cliente</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonTouchable} onPress={inserirNovoCliente} >
                    <View></View>
                    <FontAwesome5 name='user-plus' color='orange' size={23}></FontAwesome5>
                    <Text style={styles.textButton}>Cadastrar cliente </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonTouchable} onPress={listarTodosCiientes} >
                    <View></View>
                    <FontAwesome5 name='list-ul' color='orange' size={23}></FontAwesome5>
                    <Text style={styles.textButton}>Listar clientes</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        width: '100%',
        gap: 10
    },
    alignVH: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTouchable: {
        height: '15%',
        width: '80%',
        backgroundColor: 'grey',
        borderRadius: 5,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        elevation: 10,
        gap: 2,
        margin: '6%',
    },
    textButton: {
        color: 'orange',
        fontSize: 16,
        fontWeight: 'bold',
        left: '30%',
        top: '-30%'
    },
    textTitle: {
        color: 'orange',
        fontSize: 22,
        fontWeight: 'bold',
        top: '-100%'
    }
});