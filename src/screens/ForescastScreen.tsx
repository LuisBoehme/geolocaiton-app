import React, {useState, useEffect} from 'react';
import { PermissionsAndroid, Platform, ScrollView } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import ForecastList from '../components/ForecastList';
 
const ForecastScreen = () => {
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
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
 
  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus('You are Here');
 
        const longitude = 
          position.coords.longitude;
 
        const latitude = 
          position.coords.latitude;
 
        setCurrentLongitude(longitude);
        
        setCurrentLatitude(latitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
      },
    );
  };

  
  useEffect(() => {
    requestLocationPermission();
  }, [currentLongitude, currentLatitude]);
 
  return (
    <ForecastList lat={currentLatitude} lon={currentLongitude}/>
  );
};
 
export default ForecastScreen;