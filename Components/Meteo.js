import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import {getLocationWeather} from '../API/WeatherAPIKey'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

class Meteo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            location: null,
            temp: null, 
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
                temp: data.main.temp,
                weather: data.weather[0].main,
                data: data
            })
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
            <View style={styles.weatherContainer}>
                <View style= {styles.headerContainer}>
                    <Text style={styles.emoticon}>{this._getWeatherEmoticon()}</Text>  
                    <Text>{text}</Text>
                    <Text>{this.state.data.name}</Text>
                    <Text style={styles.tempText}>{this.state.temp} °C</Text>  
                </View>
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
    },
    weatherContainer: {
        flex: 1,
        backgroundColor: '#B0E0E6'
      },
      headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      tempText: {
        fontSize: 48,
        color: '#fff'
      },
      bodyContainer: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        marginBottom: 40
      },
      title: {
        fontSize: 48,
        color: '#fff'
      },
      subtitle: {
        fontSize: 24,
        color: '#fff'
    }


})

export default Meteo