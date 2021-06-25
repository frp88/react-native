import React from 'react';
import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: { flex: 10 , padding: 10, },
  topo: { backgroundColor: "#057bd9", padding: 25, }, 
  titleTopo: { color: "#ffffff",  fontSize: 20, 
  fontWeight: "bold", textAlign: "center" },
  safearea: { flex: 7, },
  botao: { backgroundColor: "#057bd9", padding: 10, borderRadius: 10,  marginBottom: 10, }, 
  textoBotao: {color: "#ffffff",  fontSize: 18, 
  fontWeight: "bold", textAlign: "center"}, 
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
  texto: { fontSize: 16, fontWeight: "bold", padding: 5, },
  input: { height: 40, fontSize: 16, fontWeight: "bold", borderWidth: 1, padding: 5, backgroundColor: '#ffffff', borderColor: '#cccccc', }, 
  ultimoInput: { height: 40, fontSize: 16, fontWeight: "bold", borderWidth: 1, padding: 5, marginBottom: 10, backgroundColor: '#ffffff', borderColor: '#cccccc', }, 
  separator: { marginVertical: 8, }, 
  item : { height: 60, borderWidth: 1, padding: 5, borderColor: '#eeeeee', borderBottomColor: '#888888', },
});

export default Styles;