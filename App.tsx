import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

import HomeScreen from './src/screens/HomeScreen';
import ForescastScreen from './src/screens/ForescastScreen';

type RootStackParamList = {
  Home: undefined;
  Forecast: undefined;
};

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type ForecastProps = NativeStackScreenProps<RootStackParamList, 'Forecast'>;

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fc0',
    accent: '#fc0',
  },
};

function Home ({ navigation }: HomeProps) {
  return (
    <View>
      <HomeScreen/>
    </View>
  );
}

function Forecast ({ navigation }: ForecastProps) {
  return (
    <View>
      <ForescastScreen/>
    </View>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Forecast" component={Forecast} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;