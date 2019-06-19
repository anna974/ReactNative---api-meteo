import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {getLocationWeather} from '../API/WeatherAPIKey'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

class Meteo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            location: null,
            tempMin: null,
            tempMax: null, 
            weather: null,
            data: [],
            errorMessage: null,
        }
    }

    componentDidMount() {
        // this._getLocation();
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
        this._getTemperature();
      };

    // _getLocation(){
    //     navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //         getLocationWeather(position.coords.latitude, position.coords.longitude).then(data => {
    //             this.setState({
    //                 latitude: data.coord.lat,
    //                 longitude: data.coord.lon,
    //                 tempMin: data.main.temp_min,
    //                 tempMax: data.main.temp_max,
    //                 weather: data.weather[0].main,
    //                 data: data
    //             })
    //             // console.log(data)
    //         })
    //     });
    // }

    _getTemperature() {
        getLocationWeather(this.state.location.coords.latitude, this.state.location.coords.longitude).then(data => {
            this.setState({
                latitude: data.coord.lat,
                longitude: data.coord.long,
                tempMin: data.main.temp_min,
                tempMax: data.main.temp_max,
                weather: data.weather[0].main,
                data: data
            })
            console.log(data)
        })
    }

    _getWeatherEmoticon() {
        if (this.state.weather == "Clouds") {
            return "☁️"
        } else if (this.state.weather == "Rain") {
            return "🌧️"
        } else if (this.state.weather == "Clear") {
            return "☀️"
        } else {
            return "🌡️"
        }
    }

    render() {
        let text = 'Waiting..';
        if (this.state.errorMessage) {
        text = this.state.errorMessage;
        } else {
        text = ''
        }
        return(
            <View style= {styles.main}>
                <Text style={styles.emoticon}>{this._getWeatherEmoticon()}</Text>  
                <Text>{text}</Text>
                <Text>{this.state.data.name}</Text>
                <Text>Min : {this.state.tempMin} °C</Text>  
                <Text>Max : {this.state.tempMax} °C</Text>  
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

export default Meteo