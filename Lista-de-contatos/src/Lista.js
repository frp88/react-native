import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// Importa os componentes personalizados
import Styles from './Styles';
import StatusBar from './StatusBar';

// Declara a função / componente principal da Tela
const Lista = function({ navigation }){
  // Declara as variáveis de estado
  const [lista, setLista] = useState([]); // Inicia a lista como vazia

  // Equivalente ao método onload de uma página HTML
  useEffect(() => {
    lerDados();
  }, []);

  // Define uma função para um determinado evento
  navigation.addListener('didFocus', payload => {
    // Chama a função que recupera os dados armazenados localmente
    lerDados();
  });

  // Função recupera os dados armazenados localmente
  const lerDados = async () => {
    setLista([]);
    try{
      // Recupera os dados armazenados localmente
      await AsyncStorage.getItem(`contatos`).then(
        (valor) => { // Caso retornar valores 
          // Atribuir os valores armazenados localmente para uma variável global
          global.dados = (JSON.parse(valor) || []);
          setLista((JSON.parse(valor) || []));  // ADICIONAR ESSA LINHA!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
      );
    } catch(erro){
      alert('Erro: ' + erro.message);
    }
  };

  // Remove todos os dados do Async Storage
  const removerDados = async () => {
    // Comando que remove todos os dados do localStorage
    await AsyncStorage.removeItem('contatos');
    global.dados = [];  
    alert('Dados removidos.');
    // Chama a função lerDados()
    lerDados();
  }

  const novo = () => {
    // Criar uma variável global
    global.index = -1;
    // Redirecionar para a tela de formulário
    navigation.navigate('Formulario');
  }

  // Função que pega o índice do elemento da lista que será alterado e rediciona o APP para outra tela
  const alterar = (id) => {
    global.index = -1;
    for (let i in global.dados) {
        // Verifica qual foi o índice clicado
        if (global.dados[i].id == id){
          // Define o índice da lista global que deerá ser editado
          global.index = i;
          break;
        }
      }
      // Redireciona o APP para a tela de formulário
      navigation.navigate(`Formulario`);
  }

  // Função que renderiza cada item no APP de acordo com os itens da lista global
  const renderItem = ( { item } ) => (
    <View style={ Styles.item}> 
      <TouchableOpacity
        onPress={ () => alterar(item.id) }
        onLongPress={ () => excluirContato(item.id) }
      >
        <Text style={ Styles.texto}>- {item.nome}</Text>
        <Text>- Tel.: {item.telefone}</Text>
      </TouchableOpacity>      
    </View>
  );

  // Declara a função que exclui um registro armazenado localmente
  const excluirContato = async (id) => {
    let indexExcluir = -1;
    // Percorrer a lista global procurando o elemento que deverá ser excluído
    for (let i in global.dados){
      // Verificar se o elemento foi encontrado
      if (global.dados[i].id == id){
        indexExcluir = i;
        break;
      }
    }
    // Verificar se foi encontrado o elemento que será excluído
    if (indexExcluir != -1){
      try{
        // Remove o 1º elemento encontrado no objeto JavaScript
        // que tenha o índice passado como parâmetro
        global.dados.splice(indexExcluir, 1);
        // Atualizar os dados localmente
        await AsyncStorage.setItem("contatos", JSON.stringify(global.dados));
        alert('Contato excluído com sucesso!');
        // Atualizar a lista de contatos
        lerDados();
      }
      catch (erro){
        alert(`Erro: ${erro.message}`);
      }
    }
  }

  // Comando de retorno que contém as TAGs JSX
  return(
    <>
      <StatusBar />
      <View style={ Styles.topo }>
        <Text style={ Styles.titleTopo }>APP de Contatos</Text>
      </View>
      <View style={ Styles.container }>
       <TouchableOpacity style={Styles.botao} 
        onPress={ novo }>
          <Text style={Styles.textoBotao}>Novo contato</Text>
       </TouchableOpacity>
        
       <Text style={Styles.title}> Lista de Contatos</Text>
        <SafeAreaView>
          <FlatList 
            data={ global.dados }
            renderItem={ renderItem }
            keyExtractor={ (item) => item.id }
          />
        </SafeAreaView>
      </View>
    </>
  );
};

export default Lista;

