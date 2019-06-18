import React from 'react'
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

class Connexion extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            connexion: true,
            connexionText: "ok"
        }
    }
    
    // componentDidMount() {
    //     NetInfo.getConnectionInfo().then((connectionInfo) => {
    //         console.log(
    //             connectionInfo
    //         );
    //         if (connectionInfo.type == null) {
    //             this.setState({
    //                 connexion: false
    //             });
    //             console.log(this.state.connexion)
    //         }
    //     });

    // }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
      }
    
      componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
      }
    
      handleConnectivityChange = isConnected => {
        if (isConnected) {
          this.setState({ connexion: isConnected, connexionText: "ok" });
        } else {
          this.setState({ connexion: isConnected, connexionText: "off" });
        }
      };
    

    render() {
        // if (this.state.connexion == false) {
        //     return (
        //         <View style={styles.offlineContainer}>
        //             <Text style={styles.offlineText}>No Internet Connection</Text>
        //         </View>
        //     )
        // } else {
        return (

            <View style={styles.main} >
                <View style={[(this.state.connexion == true) ? styles.onlineContainer : styles.offlineContainer ]}>
                    <Text style={styles.offlineText}>Connexion {this.state.connexionText}</Text>
                </View>
                {/* <Text>Connexion ... </Text>
                <View style={[(this.state.connexion == true) ? styles.connexionOn : styles.connexionOff ]}>
                    <Text>{this.state.connexionText}</Text>
                </View> */}
            </View>
        )
        // }
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    offlineContainer: {
        backgroundColor: '#b52424',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',
        top: 30
      },
      onlineContainer: {
        backgroundColor: 'green',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',
        top: 30
      },
    offlineText: { color: '#fff' },
    connexionOff: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
        color: "white"
    },
    connexionOn: {
        width: 20,
        height: 20,
        backgroundColor: 'green',
        color: "white"
    }
})

export default Connexion