import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Home from './src/pages/home';
import DetalhesCliente from './src/pages/DetalhesCliente';
import TodosCliente from './src/pages/TodosCliente';
import NovoCliente from './src/pages/NovoCliente';
import EditarCliente from './src/pages/EditarCliente';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              title: 'Home',
            }}
          />

          <Stack.Screen
            name='DetalhesCliente'
            component={DetalhesCliente}
            options={{
              title: 'Detalhes do Cliente',
            }}
          />

          <Stack.Screen
            name="TodosClientes"
            component={TodosCliente}
            options={{
              title: 'Lista de Clientes',
            }}
          />

          <Stack.Screen
            name='NovoCliente'
            component={NovoCliente}
            options={{
              title: 'Novo Cliente',
            }}
          />

          <Stack.Screen
            name="EditarCliente"
            component={EditarCliente}
            options={{
              title: 'Editar Cliente',
            }}
          /> 

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  alignVH: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
