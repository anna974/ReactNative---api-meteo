import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {getLocationWeather} from '../API/WeatherAPIKey'

class Meteo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            weather: null
        }
    }

    componentDidMount() {
        this._getWeather()
    }

    _getWeather() {
        getLocationWeather("Reunion").then(data => {
            console.log(data.main.temp)
            this.setState({
                weather: data.main.temp
            })
        })
    }

    render() {
        return(
            <View>
                <Text>{this.state.weather}</Text>  
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

export default Meteo