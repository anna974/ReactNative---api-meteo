import React from 'react'
import {StyleSheet, Alert, View, Text, Button, ToolbarAndroid} from 'react-native';
 

class MyToolbarAndroid extends React.Component {
  
    onActionSelected(position) {
      if (position == 0) { // index of 'Settings'
        // showSettings();
        // alert('Bravo !!!')
        Alert.alert(
          'Météo Réunion',
          'Is good ?',
          [
            {text: 'Bof..', onPress: () => console.log('Ask me later pressed')},
            {
              text: 'Nul',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Super good !', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      }
    };

    render() {
        return (
          <ToolbarAndroid
            style={styles.main}
            // logo={require('../assets/icon.png')}
            title="Menu"
            actions={[{title: 'Settings', icon: require('../assets/icon.png'), show: 'always'}]}
            onActionSelected={this.onActionSelected} />
        )
      }
}

const styles = StyleSheet.create({
  main: {
      height: 60,
      alignItems: 'center',
  }
})
export default MyToolbarAndroid