import React from 'react';
import { StatusBar } from 'react-native';

// Definir o componente de barra de status
const statusBar = function(){
  return (
    <StatusBar 
      barStyle = "dark-content" hidden = { false}
      backgoundColor = "#aaaaaaa" translucent = { false }
      networkActivityIndicatorVisible = { true }
    />
  );
}

export default statusBar;