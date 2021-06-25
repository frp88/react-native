import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// Componentes personalizados
import Styles from './Styles';
import StatusBar from './StatusBar';
import Separator from './Separator';

// Declara a função / componente principal da Tela
const Formulario = function({ navigation }){
  // Declara as variáveis de estado
  const [id, setId] = useState(Number(global.index) == -1 ? -1 : global.dados[global.index].id);
  const [nome, setNome] = useState((Number(global.index) == -1) ?  '' : global.dados[global.index].nome);
  const [telefone, setTelefone] = useState(Number(global.index) == -1 ? `` : global.dados[global.index].telefone);
  
  // Declara a função que salva / grava os dados localmente no Dispositivo
  const salvarDados = async () => {
    try{
      // Criar um ID aleatório
      let novoId = Math.floor(Math.random() * 9999 + 1);
      // Criar um objeto para um novo contato
      var contato = {id: novoId, nome: nome, telefone: telefone};
      // Verificar se é um novo registro ou se é uma atualização
      if (Number(global.index) == -1){
        // Adiciona o objeto (contato) criado na Variável global (lista de objetos)
        global.dados.push(contato);     
      } 
      else{ // Atualização de um contato
        global.dados[global.index] = contato;
      }
      // Armazena os dados localmente no dispositivo por meio variável globla
      await AsyncStorage.setItem('contatos', JSON.stringify(global.dados));
      //alert('Contato salvo com sucesso!');
      // Retonar para a tela anterior
      navigation.goBack();
    }
    catch(erro){
      alert('Erro: ' + erro.message);
    }
  };

  // Função que exclui um determinado contato
  const excluirContato = async() => {
    // Verificar se é possível excluir excluir
    if (Number(global.index) > -1){
      try{
        // Remover o 1º elemento encontrado na lista de Objetos (variável global) que tenha o índice passada com parâmentro
        global.dados.splice(global.index, 1);
        // Atualizar os dados no Aync Storage
        await AsyncStorage.setItem(`contatos`, JSON.stringify(global.dados));
        //alert(`Contato excluído com sucesso!`);
        // Retornar para a tela anterior
        navigation.goBack();
      }
      catch (erro){
        alert(`Erro: ${ erro.message}`);
      }

    }
  }

  // Retorna as TAGs JSX
  return(
    <View style={ Styles.container}>
      <StatusBar /> 
      <Text style={ Styles.texto}>Nome:</Text>
      <TextInput onChangeText={ setNome } value={ nome } placeholder="Digite um nome" style={ Styles.input }/>
      <Text style={ Styles.texto}>Telefone:</Text>
      <TextInput onChangeText={ setTelefone } value={ telefone } placeholder="Digite um telefone" style={ Styles.input }/>
       <Separator />
      <TouchableOpacity style={ Styles.botao} onPress={ salvarDados }>
        <Text style={Styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ Styles.botao} onPress={ () =>  navigation.goBack() }>
        <Text style={Styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={ Styles.botao} onPress={ excluirContato }>
        <Text style={Styles.textoBotao}>Excluir Contato</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Formulario;