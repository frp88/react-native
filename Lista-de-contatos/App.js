import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

// Importar as telas do APP
import Lista from './src/Lista';
import Formulario from './src/Formulario';

// Definir a estrutura de navegação do APP
const Rotas = createStackNavigator({ 
   Lista: {
      screen: Lista, 
      navigationOptions: {
      header: null,
    }
  },  
  Formulario: { screen: Formulario,
    navigationOptions: { title: 'Formulário' }, }, 
  }, 
  {  defaultNavigationOptions: {
      headerStyle: { backgroundColor: '#057bd9' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
      headerBackTitle: 'voltar' }
   } 
);

export default createAppContainer(Rotas);
