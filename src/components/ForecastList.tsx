import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ForecastCard from './ForecastCard';

type Props = {
  lat: number,
  lon: number,
} 

const ForecastList = ({
    lat,
    lon,
} : Props ) => {

  const [
    forecastList,
    setForecastList
  ] = useState([]);

  const getForecast = async (latitude: number, longitude: number) => {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=15&units=metric&appid=0d562a71b6892a34b199b8fc71e1660f`,
    )
    let data = await response.json()
    setForecastList(data.list)
    return data;
  }

  useEffect(() => {
    getForecast(lat, lon)

    return () => {
    };
  }, [lat, lon]);

  return (
    <ScrollView>
      {forecastList.map(day => {
        console.log(day)
        return(
        <ForecastCard key={day.dt} maxTemp={day.main.temp_max.toFixed(1)} minTemp={day.main.temp_min.toFixed(1)} humidity={day.main.humidity} day={day.dt_txt}></ForecastCard>
      )})}
    </ScrollView>
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
 
export default ForecastList;