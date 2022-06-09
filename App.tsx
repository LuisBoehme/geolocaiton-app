// React Native Geolocation
// https://aboutreact.com/react-native-geolocation/
 
// import React in our code
import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, PermissionsAndroid,
  Platform, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import Geolocation from '@react-native-community/geolocation';
import { Provider as PaperProvider, Avatar, Card, Paragraph, Title, Button } from 'react-native-paper';

import MapView, { Marker } from 'react-native-maps';
 
//import all the components we are going to use.
 
const App = () => {
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
            //To Check, If Permission is granted
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
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');
 
        //getting the Longitude from the location json
        const currentLongitude = 
          position.coords.longitude;
 
        //getting the Latitude from the location json
        const currentLatitude = 
          position.coords.latitude;
 
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        
        //Setting Longitude state
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
        //Will give you the location on location change
        
        setLocationStatus('You are Here');
        console.log(position);
 
        //getting the Longitude from the location json        
        const currentLongitude =
          (position.coords.longitude);
 
        //getting the Latitude from the location json
        const currentLatitude = 
          (position.coords.latitude);
 
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
 
        //Setting Latitude state
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
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: currentLatitude,
                  longitude: currentLongitude,
                  latitudeDelta: 0.09,
                  longitudeDelta: 0.09,
                }}
                region={{
                  latitude: currentLatitude,
                  longitude: currentLongitude,
                  latitudeDelta: 0.09,
                  longitudeDelta: 0.09,
                }}
              >
                <Marker
                    key={0}
                    coordinate={{
                    latitude: currentLatitude,
                    longitude: currentLongitude,
                    }}
                  />
              </MapView>
            </Card.Content>
          </Card>
          <Card>
            <Card.Title title="Card Title" subtitle="Card Subtitle" />
            <Card.Content>
              <Title>Card title</Title>
              <Paragraph>Card content</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
        </SafeAreaView>
      </PaperProvider>
  );
};
 
const styles = StyleSheet.create({
  card: {
    height: 400,
    margin: 20,
    position: 'relative'
  },
  map: {
    height: '100%',
  },
});
 
export default App;