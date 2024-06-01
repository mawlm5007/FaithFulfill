import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Pressable,
} from 'react-native';
import FastImage from 'react-native-fast-image'

export default function DailyPrayerScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const [pressedButtonOne, setPressedButtonOne] = React.useState<boolean>(false);
    const [pressedButtonTwo, setPressedButtonTwo] = React.useState<boolean>(false);
    const [pressedButtonThree, setPressedButtonThree] = React.useState<boolean>(false);
    const [pressedButtonFour, setPressedButtonFour] = React.useState<boolean>(false);
    const [pressedButtonFive, setPressedButtonFive] = React.useState<boolean>(false);

    const handlePressIn = (rakat: string) => {
        if (rakat === 'fajr') setPressedButtonOne(true);
        if (rakat === 'zuhr') setPressedButtonTwo(true);
        if (rakat === 'asr') setPressedButtonThree(true);
        if (rakat === 'maghreb') setPressedButtonFour(true);
        if (rakat === 'isha') setPressedButtonFive(true);
    };

    const handlePressOut = (rakat: string) => {
        if (rakat === 'fajr') setPressedButtonOne(false);
        if (rakat === 'zuhr') setPressedButtonTwo(false);
        if (rakat === 'asr') setPressedButtonThree(false);
        if (rakat === 'maghreb') setPressedButtonFour(false);
        if (rakat === 'isha') setPressedButtonFive(false);
    };

    const handlePress = (rakat: number) => {
        navigation.navigate('Pray', { rakat: rakat });
    };

    return (
        <View style={styles.container}>
            <FastImage
                source={require('../images/bismillah.png')}
                style={{width: 150, height: 150, marginBottom: 50}}
                resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={styles.text}>Select Fardh Prayers</Text>
            <Pressable
                style={[
                    styles.button,
                    pressedButtonOne && styles.pressedButton,
                ]}
                onPressIn={handlePressIn.bind(null, 'fajr')}
                onPressOut={handlePressOut.bind(null, 'fajr')}
                onPress={handlePress.bind(null, 2)}
            >
                <Text style={styles.buttonText}>Fajr</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.button,
                    pressedButtonTwo && styles.pressedButton,
                ]}
                onPressIn={handlePressIn.bind(null, 'zuhr')}
                onPressOut={handlePressOut.bind(null, 'zuhr')}
                onPress={handlePress.bind(null, 4)}
            >
                <Text style={styles.buttonText}>Zuhr</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.button,
                    pressedButtonThree && styles.pressedButton,
                ]}
                onPressIn={handlePressIn.bind(null, 'asr')}
                onPressOut={handlePressOut.bind(null, 'asr')}
                onPress={handlePress.bind(null, 4)}
            >
                <Text style={styles.buttonText}>Asr</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.button,
                    pressedButtonFour && styles.pressedButton,
                ]}
                onPressIn={handlePressIn.bind(null, 'maghreb')}
                onPressOut={handlePressOut.bind(null, 'maghreb')}
                onPress={handlePress.bind(null, 3)}
            >
                <Text style={styles.buttonText}>Maghreb</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.button,
                    pressedButtonFive && styles.pressedButton,
                ]}
                onPressIn={handlePressIn.bind(null, 'isha')}
                onPressOut={handlePressOut.bind(null, 'isha')}
                onPress={handlePress.bind(null, 4)}
            >
                <Text style={styles.buttonText}>Isha</Text>
            </Pressable>
        </View>
    );
}

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
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgba(28,28,30,1)', // hex value for a darker shade of yellow
        textAlign: 'center',
    },
});