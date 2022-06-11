import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Divider, Paragraph, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { kToC } from '../utils/tempConv';
 
type Props = {
  lat: number,
  lon: number,
} 

const WeatherCard = ({
    lat,
    lon,
} : Props ) => {

  const [
    desc,
    setDesc
  ] = useState("Loading Description");

  const [
    temp,
    setTemp
  ] = useState(0);

  const [
    feelsLike,
    setFeelsLike
  ] = useState(0);

  const [
    name,
    setName
  ] = useState("Unknown");

  const navigation = useNavigation();

  useEffect(() => {
    getWeatherData(lat, lon)
  }, []);

  const getWeatherData = async (latitude: number, longitude: number) => {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=76f965ab0083b099e8af8b6eda0d2b89`,
    )
    let data = await response.json()
    console.log(data)
    setDesc(data.weather[0].description)
    setTemp(data.main.temp)
    setFeelsLike(data.main.feels_like)
    setName(data.name)
    return data;
  }

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.dataRow}>
          <Icon name="map-marker" size={40}  />
          <Paragraph style={styles.dataInfo}>{name}</Paragraph>
        </View>
        <Divider />
        <View style={styles.dataRow}>
          <Icon name="weather-cloudy" size={40}  />
          <Paragraph style={styles.dataInfo}>{kToC(temp).toFixed(1)} ℃</Paragraph>
        </View>
        <Divider />
        <View style={styles.dataRow}>
          <Icon name="weather-cloudy" size={40}  />
          <Paragraph style={styles.dataInfo}>{desc}</Paragraph>
        </View>
        <Divider />
        <View style={styles.dataRow}>
          <Icon name="latitude" size={40}  />
          <Paragraph style={styles.dataInfo}>{lat}</Paragraph>
        </View>
        <Divider />
        <View style={styles.dataRow}>
          <Icon name="longitude" size={40}  />
          <Paragraph style={styles.dataInfo}>{lon}</Paragraph>
        </View>
        <Divider />
        <Button onPress={() => navigation.navigate('Details')}> More Details</Button>
      </Card.Content>
    </Card>
  );
};
 
const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 20,
    position: 'relative'
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dataInfo: {
    fontSize: 18,
    marginLeft: 10,
  },
});
 
export default WeatherCard;