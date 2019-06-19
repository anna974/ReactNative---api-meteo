import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {getLocationWeather} from '../API/WeatherAPIKey'

class Location extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            latitude: 0,
            longitude: 0,
            forecast: [],
            error:''
        }
    }

    getLocation(){

        // Get the current position of the user
        navigator.geolocation.getCurrentPosition(
        (position) => {
            this.setState({
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude
                }), 
                () => { this.getLocationWeather(this.latitude, this.longitude); }
            },
            (error) => this.setState({ forecast: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    componentDidMount() {
        this.getLocation()
    }

    render() {
        return(
            <View style= {styles.main}>
                <Text>latitude : {this.state.latitude} °C</Text>  
                <Text>longitude : {this.state.longitude} °C</Text>  
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emoticon: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 50
    }


})

export default Location