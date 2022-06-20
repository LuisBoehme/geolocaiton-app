import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Divider, Paragraph, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  lat: number,
  lon: number,
  desc: string,
  name: string,
  temp: number,
} 

const WeatherCard = ({
    lat,
    lon,
    desc,
    name,
    temp,
} : Props ) => {

  const navigation = useNavigation();

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.dataRow}>
          <Icon name="map-marker" size={35}  />
          <Paragraph style={styles.dataInfo}>{name}</Paragraph>
        </View>
        <Divider />
        <View style={styles.dataRow}>
          <Icon name="thermometer" size={35}  />
          <Paragraph style={styles.dataInfo}>{temp.toFixed(1)} ℃</Paragraph>
        </View>
        <Divider />
        <View style={styles.dataRow}>
          <Icon name="weather-cloudy" size={35}  />
          <Paragraph style={styles.dataInfo}>{desc}</Paragraph>
        </View>
        <Divider />
        <View style={styles.dataRow}>
          <Icon name="latitude" size={35}  />
          <Paragraph style={styles.dataInfo}>{lat}</Paragraph>
        </View>
        <Divider />
        <View style={styles.dataRow}>
          <Icon name="longitude" size={35}  />
          <Paragraph style={styles.dataInfo}>{lon}</Paragraph>
        </View>
        <Divider />
        <Button style={styles.button} onPress={() => navigation.navigate('Forecast')}>See Forecast</Button>
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
  button: {
    marginTop: 10,
  },
});
 
export default WeatherCard;