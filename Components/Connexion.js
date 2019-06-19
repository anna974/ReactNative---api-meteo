import React from 'react'
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

class Connexion extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            connexion: true,
            connexionText: "on"
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
        this.setState({ connexion: isConnected, connexionText: "on" });
    } else {
        this.setState({ connexion: isConnected, connexionText: "off" });
    }
    };
    

    render() {
        return (
            <View style={styles.main} >
                <View style={[(this.state.connexion == true) ? styles.onlineContainer : styles.offlineContainer ]}>
                    <Text style={styles.offlineText}>Connexion {this.state.connexionText}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        // flex: 2
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
})

export default Connexion