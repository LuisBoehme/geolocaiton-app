import React, {useState, useEffect} from 'react';
import { PermissionsAndroid, Platform, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import MapView, { Marker } from 'react-native-maps';

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
    locationStatus,
    setLocationStatus
  ] = useState('');
 
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
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
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);
 
  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus('You are Here');
 
        const currentLongitude = 
          position.coords.longitude;
 
        const currentLatitude = 
          position.coords.latitude;
 
        setCurrentLongitude(currentLongitude);
        
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };
 
  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        
        setLocationStatus('You are Here');
 
        const currentLongitude =
          (position.coords.longitude);
 
        const currentLatitude = 
          (position.coords.latitude);
 
        setCurrentLongitude(currentLongitude);
 
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };

  return (
    <View>
      <MapCard lat={currentLatitude} lon={currentLongitude} refresh={getOneTimeLocation}/>
      <WeatherCard lat={currentLatitude} lon={currentLongitude}/>
    </View>
  );
};
 
export default HomeScreen;