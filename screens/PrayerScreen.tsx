import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Animated,
  Image,
} from 'react-native';
import proximity from 'rn-proximity-sensor';
import type { SubscriptionRef } from 'rn-proximity-sensor';
import FastImage from 'react-native-fast-image'

import { CommonActions } from '@react-navigation/native';
import { setDailyPrayerStatus } from '../helpers/dailyPrayer';

export function PrayScreen({ navigation, route }: { navigation: any, route: any }): React.JSX.Element {
  const [isProximityEnabled, setProximityEnabled] = React.useState<boolean>(false);
  const [proximityCount, setProximityCount] = React.useState<number>(0);
  const [inPrayer, setInPrayer] = React.useState<boolean>(false);
  const [rakatCount, setRakatCount] = React.useState<number>(0);
  const rakat = route.params?.rakat || 2;
  const fardhPrayer = route.params?.fardhPrayer;
  // if (fardhPrayer) {
  //   console.log('FardhPrayer', fardhPrayer);
  // }
  const [startButtonPressed, setStartButtonPressed] = React.useState<boolean>(false);
  const [homeButtonPressed, setHomeButtonPressed] = React.useState<boolean>(false);

  const handlePressIn = () => {
    setStartButtonPressed(true);
  };

  const handlePressOut = () => {
    setStartButtonPressed(false);
  };

  const homePressIn = () => {
    setHomeButtonPressed(true);
  }

  const homePressOut = () => {
    setHomeButtonPressed(false);
  }

  const sensorSubscriptionRef = React.useRef<SubscriptionRef | null>(null);
  const circleSize = React.useRef(new Animated.Value(100)).current;
  const [finishedPrayer, setFinishedPrayer] = React.useState<boolean>(false);

  const shrinkCircles = () => {
    if (rakatCount === rakat) {
      setFinishedPrayer(true);
      Animated.sequence([
        Animated.timing(circleSize, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: false,
        }
        )
      ]).start(() => navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Main'},
          ],
        })
      ));
    }
  }

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
        <Animated.View style={styles.container} onTouchStart={async () => {
            if (rakatCount === rakat) {
              if (fardhPrayer) await setDailyPrayerStatus(fardhPrayer);
              // add animation here: all circles grow to fill the whole screen 
              shrinkCircles();
              // navigate to next page
              //navigation.navigate('FaithFulfill');
            }
        }}>
          {finishedPrayer && <Text style = {styles.completeText}> Prayer Completed! </Text>}
          {rakatCount !== rakat && !inPrayer && rakat === 1 && <Text style = {styles.text}>Place the phone on the Prayer Mat </Text>}
          {rakatCount !== rakat && !inPrayer && rakat === 1 && <Text style = {styles.text}>Tap the button to start! </Text>}
          {!finishedPrayer && rakat === 1 && rakatCount === rakat && <Text style = {styles.text}>You have completed a Rak'a!</Text>}
          {!finishedPrayer && rakat === 1 && rakatCount === rakat && <Text style = {styles.text}>Tap Anywhere to Return Home</Text>}
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
          {!inPrayer && rakatCount < rakat &&  
            <Pressable 
              style={[
                styles.returnHomeButton,
                homeButtonPressed && styles.pressedButton,
              ]}
              onPress={() => navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'Main'},
                  ],
                })
              )}
              onPressIn={homePressIn}
              onPressOut={homePressOut}
            >
              <Text style={styles.returnHomeButtonText}>Return Home</Text>
            </Pressable>}
          {rakatCount !== rakat && rakat === 1 && inPrayer && <Text style={styles.text}>Complete Two Sujud Over the Phone</Text>}
          {rakatCount !== rakat && rakat === 1 && inPrayer && 
            <FastImage
            source={require('../images/prayerTryOut.png')}
            style={{
              width: 350,
              height: 350,
              marginBottom: 0,
              borderTopLeftRadius: 175, // Adjust the radius value for desired roundness
              borderTopRightRadius: 175,
              borderBottomLeftRadius: 175,
              borderBottomRightRadius: 175
            }}
            resizeMode={FastImage.resizeMode.contain}
            />
          }
          {/* {!finishedPrayer && rakat === 1 && (inPrayer || rakatCount === rakat) && <Text style = {styles.text}>Rakat's completed: {rakatCount}</Text>} */}
          <View style = {[styles.circleContainer]}>
            {(inPrayer || rakatCount === rakat) && rakat >= 1 && <Animated.View style={[styles.circle, {backgroundColor: rakatCount < 1 ? 'grey' : 'green'}, {width: circleSize}, {height: circleSize}]}></Animated.View>}
            {(inPrayer || rakatCount === rakat) && rakat >= 2 && <Animated.View style={[styles.circle, {backgroundColor: rakatCount < 2 ? 'grey' : 'green'}, {width: circleSize}, {height: circleSize}]}></Animated.View>}
            {(inPrayer || rakatCount === rakat) && rakat >= 3 && <Animated.View style={[styles.circle, {backgroundColor: rakatCount < 3 ? 'grey' : 'green'}, {width: circleSize}, {height: circleSize}]}></Animated.View>}
            {(inPrayer || rakatCount === rakat) && rakat >= 4 && <Animated.View style={[styles.circle, {backgroundColor: rakatCount < 4 ? 'grey' : 'green'}, {width: circleSize}, {height: circleSize}]}></Animated.View>}
          </View>
          {rakat === 1 && (inPrayer || rakatCount === rakat) && <View style={[styles.circle, {backgroundColor: rakatCount < 1 ? 'grey' : 'green'}]}></View>}
        </Animated.View>
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
  circleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      flexWrap: 'wrap',
      gap: 30,
      marginHorizontal: 50,
      textAlign: 'center'
  },
  circle: {
      // width: 100,
      // height: 100,
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
  returnHomeButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'rgba(28,28,30,1)', // hex value for a darker shade of yellow
    textAlign: 'center',
  },
  returnHomeButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'rgba(255, 204, 0, 1)', // hex value for a darker shade of yellow
    marginBottom: 10,
    width: 150,
  },
  completeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'green', // hex value for a darker shade of yellow
    textAlign: 'center',
  },
});
