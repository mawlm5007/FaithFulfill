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
import WelcomeRakatScreen from './screens/WelcomeRakatScreen';
import DailyPrayerScreen from './screens/DailyPrayerScreen';
import JourneyScreen from './screens/JourneyScreen';
import { storeData, getItemFor } from './helpers/asyncStorage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const FIRST_TIME = 'FIRST_TIME';

function Main() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: 'rgba(28,28,30,1)'}, tabBarActiveTintColor: 'rgba(255, 204, 0, 1)', tabBarInactiveTintColor: 'white', unmountOnBlur: true}} >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Prayers" component={DailyPrayerScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Journey" component={JourneyScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isFirstTime, setIsFirstTime] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log(isFirstTime);
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
        setIsFirstTime(false);
      }
    };

    getData();
  }, [])

  return (
    <NavigationContainer>
      {isFirstTime && <Stack.Navigator initialRouteName='Main' screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: '#000000',
      }}>
        <Stack.Screen name="Pray" component={PrayScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
      </Stack.Navigator>}
      {!isFirstTime && <Stack.Navigator initialRouteName='WelcomeRakaat' screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: '#000000',
      }}>
        <Stack.Screen name="WelcomeRakaat" component={WelcomeRakatScreen} options={{ headerShown: false }}/>
        {/* <Stack.Screen name="WelcomeCalendar" component={WelcomeCalendarScreen} options={{ headerShown: false }}/> */}
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
        <Stack.Screen name="Pray" component={PrayScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>}
    </NavigationContainer>
  );
}

export default App;
