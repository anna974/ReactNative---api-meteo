import React from 'react'
import Connexion from './Components/Connexion'
import Meteo from './Components/Meteo'

import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style= {styles.container}>
      <Connexion/>
      <Meteo/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
