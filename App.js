import React from 'react'
import Connexion from './Components/Connexion'
import Meteo from './Components/Meteo'
import MyToolbarAndroid from './Components/MyToolbarAndroid'
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style= {styles.container}>
      <MyToolbarAndroid/>
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
