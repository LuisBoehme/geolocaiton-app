import React  from 'react';
import { StyleSheet } from 'react-native';
import { Card, FAB } from 'react-native-paper';

import MapView, { Marker } from 'react-native-maps';

type Props = {
  lat: number,
  lon: number,
  refresh: () => void,
} 
 
  const MapCard = ({
    lat,
    lon,
    refresh,
} : Props ) => {
  return (
          <Card style={styles.card}>
            <Card.Content>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: lat,
                  longitude: lon,
                  latitudeDelta: 0.09,
                  longitudeDelta: 0.09,
                }}
                region={{
                  latitude: lat,
                  longitude: lon,
                  latitudeDelta: 0.09,
                  longitudeDelta: 0.09,
                }}
              >
                <Marker
                    key={0}
                    coordinate={{
                    latitude: lat,
                    longitude: lon,
                    }}
                  />
              </MapView>
              <FAB
                style={styles.fab}
                icon="autorenew"
                onPress={() => refresh()}
              />
            </Card.Content>
          </Card>
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
 
export default MapCard;