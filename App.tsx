import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import proximity from 'rn-proximity-sensor';
import type { SubscriptionRef } from 'rn-proximity-sensor';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const [isProximityEnabled, setProximityEnabled] = React.useState<boolean>(false);
  const [proximityCount, setProximityCount] = React.useState<number>(0);

  const sensorSubscriptionRef = React.useRef<SubscriptionRef | null>(null);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  React.useEffect(() => {
    sensorSubscriptionRef.current = proximity.subscribe((values) => {
      if (values.is_double_toggle) {
        setProximityEnabled(true);
        setProximityCount((prevCount) => {
          const updatedCount = prevCount + 1;
          if (updatedCount % 2 === 0 && updatedCount !== 0) {
            console.log('One rakaat done!'); 
            return 0;
          }
          return updatedCount;
        });
      } else {
        setProximityEnabled(false);
      }
    }); 

    return () => {
      if (sensorSubscriptionRef.current) {
        sensorSubscriptionRef.current.unsubscribe();
        sensorSubscriptionRef.current = null;
      }
    };
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>Open up App.tsx to start working on your app! isProximityEnabled: { isProximityEnabled ? 'on' : 'off'} proximityCount: {proximityCount}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
