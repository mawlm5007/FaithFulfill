import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
} from 'react-native';
import proximity from 'rn-proximity-sensor';
import type { SubscriptionRef } from 'rn-proximity-sensor';

export function PrayScreen({ navigation, route }: { navigation: any, route: any }): React.JSX.Element {
  const [isProximityEnabled, setProximityEnabled] = React.useState<boolean>(false);
  const [proximityCount, setProximityCount] = React.useState<number>(0);
  const [inPrayer, setInPrayer] = React.useState<boolean>(false);
  const [rakatCount, setRakatCount] = React.useState<number>(0);
  const rakat = route.params?.rakat || 2;
  const [startButtonPressed, setStartButtonPressed] = React.useState<boolean>(false);

  const handlePressIn = () => {
    setStartButtonPressed(true);
  };

  const handlePressOut = () => {
    setStartButtonPressed(false);
  };

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
                navigation.navigate('FaithFulfill');
            }
        }}>
          {rakatCount !== rakat && !inPrayer && rakat === 1 && <Text style = {styles.text}>Place the phone on the Prayer Mat </Text>}
          {rakatCount !== rakat && !inPrayer && rakat === 1 && <Text style = {styles.text}>Tap the button to start! </Text>}
          {rakat === 1 && rakatCount === rakat && <Text style = {styles.text}>You have completed a Rak'a!</Text>}
          {rakat === 1 && rakatCount === rakat && <Text style = {styles.text}>Tap Anywhere to Return Home</Text>}
          {rakat !== 1 && !inPrayer && rakatCount < rakat && <Text style = {styles.text}>{rakat} Rakats</Text>}
          {!inPrayer && rakatCount < rakat &&  
            <Pressable 
              style={[
                styles.button,
                startButtonPressed && styles.pressedButton,
              ]}
              onPress={() => setInPrayer(!inPrayer)}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            > 
              <Text style={styles.buttonText}>Start Prayer</Text>
            </Pressable>}
          {!inPrayer && rakatCount < rakat &&  <Button title="Return Home" onPress={() => navigation.navigate('FaithFulfill')}></Button>}
          {rakatCount !== rakat && rakat === 1 && inPrayer && <Text style={styles.text}>Complete Two Sujud Over the Phone</Text>}
          {rakat === 1 && (inPrayer || rakatCount === rakat) && <Text style = {styles.text}>Rakat's completed: {rakatCount}</Text>}
          {(inPrayer || rakatCount === rakat) && rakat >= 2 && <View style={[styles.circle, {backgroundColor: rakatCount < 1 ? 'grey' : 'green'}]}></View>}
          {(inPrayer || rakatCount === rakat) && rakat >= 2 && <View style={[styles.circle, {backgroundColor: rakatCount < 2 ? 'grey' : 'green'}]}></View>}
          {(inPrayer || rakatCount === rakat) && rakat >= 3 && <View style={[styles.circle, {backgroundColor: rakatCount < 3 ? 'grey' : 'green'}]}></View>}
          {(inPrayer || rakatCount === rakat) && rakat >= 4 && <View style={[styles.circle, {backgroundColor: rakatCount < 4 ? 'grey' : 'green'}]}></View>}
          {rakat === 1 && (inPrayer || rakatCount === rakat) && <View style={[styles.circle, {backgroundColor: rakatCount < 1 ? 'grey' : 'green'}]}></View>}
        </View>
  );
};


const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(28,28,30,1)',
  },
  text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'rgba(255, 204, 0, 1)', // hex value for a darker shade of yellow
      marginBottom: 16,
      flexWrap: 'wrap',
      marginHorizontal: 50,
      textAlign: 'center'
  },
  circle: {
      width: 100,
      height: 100,
      borderRadius: 50,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'rgba(255, 204, 0, 1)', // hex value for a darker shade of yellow
    marginBottom: 10,
    width: 300,
  },
  pressedButton: {
      backgroundColor: 'rgba(255, 204, 0, 1)', // hex value for a darker shade of yellow
      borderColor: 'white',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(28,28,30,1)', // hex value for a darker shade of yellow
    textAlign: 'center',
},
});