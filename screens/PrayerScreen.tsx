import React from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import proximity from 'rn-proximity-sensor';
import type { SubscriptionRef } from 'rn-proximity-sensor';

export function PrayScreen({ navigation, route }: { navigation: any, route: any }): React.JSX.Element {
  const [isProximityEnabled, setProximityEnabled] = React.useState<boolean>(false);
  const [proximityCount, setProximityCount] = React.useState<number>(0);
  const [inPrayer, setInPrayer] = React.useState<boolean>(false);
  const [rakatCount, setRakatCount] = React.useState<number>(0);
  const rakat = route.params?.rakat || 2;

  const sensorSubscriptionRef = React.useRef<SubscriptionRef | null>(null);

  React.useEffect(() => {
    if (!inPrayer) return;

    sensorSubscriptionRef.current = proximity.subscribe((values) => {
      if (values.is_double_toggle) {
        setProximityEnabled(true);
        setProximityCount((prevCount) => {
          const updatedCount = prevCount + 1;
          if (updatedCount % 2 === 0 && updatedCount !== 0) {
            console.log('One rakaat done!'); 
            setRakatCount((prevCount) => {
                prevCount = prevCount + 1;
                if (prevCount === rakat) {
                    console.log('Prayer done!');
                    setInPrayer(!inPrayer);
                }
                return prevCount;
            });
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
  }, [inPrayer]);

  return (
        <View style={styles.container} onTouchStart={() => {
            if (rakatCount === rakat) {
                navigation.navigate('Home');
            }
        }}>
          {!inPrayer && rakatCount < rakat && <Text style = {styles.text}>{rakat} Rakats</Text>}
          {!inPrayer && rakatCount < rakat &&  <Button title="Start Prayer" onPress={() => setInPrayer(!inPrayer)}></Button>}
          {!inPrayer && rakatCount < rakat &&  <Button title="Return Home" onPress={() => navigation.navigate('Home')}></Button>}
          {(inPrayer || rakatCount === rakat) && <Text style = {styles.text}>Rakat's completed: {rakatCount}</Text>}
        </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 16,
    },
});