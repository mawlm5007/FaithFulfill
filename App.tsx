import React from 'react';
import {
  StatusBar,
  Text,
  useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import { PrayScreen } from './screens/PrayerScreen';
import WelcomeCalendarScreen from './screens/WelcomeCalendarScreen';
import WelcomeRakatScreen from './screens/WelcomeRakatScreen';
import { storeData, getItemFor } from './helpers/asyncStorage';

const Stack = createNativeStackNavigator();
const FIRST_TIME = 'FIRST_TIME';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isFirstTime, setIsFirstTime] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log('HELLO');
    const getData = async () => {
      console.log('Inside getData');
      const firstTime = await getItemFor(FIRST_TIME);
      console.log('firstTime: ', firstTime);
      console.log('isFirstTime: ', isFirstTime);
      if (firstTime) {
        setIsFirstTime(true);
        console.log('isFirstTime: ', isFirstTime);
      } else {
        await storeData(FIRST_TIME, "false");
      }
    };

    getData();
  }, [])

  return (
    <NavigationContainer>
      {isFirstTime && <Stack.Navigator initialRouteName='FaithFulfill' screenOptions={{
        headerStyle: {
          backgroundColor: 'black', // Yellow
        },
        headerTintColor: '#000000', // Black
      }}>
        {/* <Stack.Screen name="WelcomeRakaat" options={{ headerShown: false }}>
          {({ navigation }) => <WelcomeRakatScreen navigation={navigation} />}
        </Stack.Screen> */}
        <Stack.Screen name="FaithFulfill" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Pray" component={PrayScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>}
      {!isFirstTime && <Stack.Navigator initialRouteName='WelcomeRakaat' screenOptions={{
        headerStyle: {
          backgroundColor: 'black', // Yellow
        },
        headerTintColor: '#000000', // Black
      }}>
        {/* <Stack.Screen name="WelcomeRakaat" options={{ headerShown: false }}>
          {({ navigation }) => <WelcomeRakatScreen navigation={navigation} />}
        </Stack.Screen> */}
        <Stack.Screen name="WelcomeRakaat" component={WelcomeRakatScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="WelcomeCalendar" component={WelcomeCalendarScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="FaithFulfill" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Pray" component={PrayScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>}
    </NavigationContainer>
  );
}

export default App;
