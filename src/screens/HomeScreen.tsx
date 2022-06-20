import React, {useState, useEffect} from 'react';
import { PermissionsAndroid, Platform, ScrollView } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import MapCard from '../components/MapCard';
import WeatherCard from '../components/WeatherCard';
 
const HomeScreen = () => {
  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState(0);
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState(0);
  const [
    desc,
    setDesc
  ] = useState("Loading Description");
  const [
    temp,
    setTemp
  ] = useState(0);
  const [
    name,
    setName
  ] = useState("Unknown");
 
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
 
  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
 
        const currentLongitude = 
          position.coords.longitude;
 
        const currentLatitude = 
          position.coords.latitude;
 
        setCurrentLongitude(currentLongitude);
        
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300
      },
    );
  };

  const getWeatherData = async (latitude: number, longitude: number) => {
    try{
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=0d562a71b6892a34b199b8fc71e1660f`,
      )
      let data = await response.json()
      setDesc(data.weather[0].description)
      setTemp(data.main.temp)
      setName(data.name)
      console.log(data)
      return data;
    }
    catch(err) {
      console.log(err)
   }
  }

  useEffect(() => {
    requestLocationPermission();
    getWeatherData(currentLatitude, currentLongitude)
  }, [currentLatitude]);
 
  return (
    <ScrollView>
      <MapCard lat={currentLatitude} lon={currentLongitude} refresh={() => getOneTimeLocation()}/>
      <WeatherCard lat={currentLatitude} lon={currentLongitude} temp={temp} desc={desc} name={name}/>
    </ScrollView>
  );
};
 
export default HomeScreen;