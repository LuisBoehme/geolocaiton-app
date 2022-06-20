import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Divider, Text, Button } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
 
type Props = {
  day: number,
  maxTemp: number,
  minTemp: number,
  humidity: number,
} 

const ForecastCard = ({
    day,
    maxTemp,
    minTemp,
    humidity,
} : Props ) => {

  return (
    <Card testID={'forecast-card'} style={styles.card}>
      <Card.Content>
        <View style={styles.dataContainer}>
          <Icon name="clock-outline" size={35}  />
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>time</Text>
            <Text style={styles.dataInfo}>{day}</Text>
          </View>
        </View>
        <Divider />
        <View style={styles.dataContainer}>
          <Icon name="thermometer" size={35}  />
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>min</Text>
            <Text style={styles.dataInfo}>{minTemp} ℃</Text>
          </View>
        </View>
        <Divider />
        <View style={styles.dataContainer}>
          <Icon name="weather-cloudy" size={35}  />
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>max</Text>
            <Text style={styles.dataInfo}>{maxTemp} ℃</Text>
          </View>
        </View>
        <Divider />
        <View style={styles.dataContainer}>
          <Icon name="water-opacity" size={35}  />
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>humidity</Text>
            <Text style={styles.dataInfo}>{humidity}%</Text>
          </View>
        </View>
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
  dataContainer: {
    flexDirection: 'row',
  },
  dataRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dataLabel: {
    fontSize: 18,
    marginLeft: 10,
    opacity: 0.3,
  },
  dataInfo: {
    fontSize: 18,
    marginLeft: 10,
  },
  button: {
    marginTop: 10,
  },
});
 
export default ForecastCard;