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
import * as Progress from 'react-native-progress';
import { calulateCompletedPrayers, getDailyPrayerStatus } from '../helpers/dailyPrayer';

export default function DailyPrayerScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const [pressedButtonOne, setPressedButtonOne] = React.useState<boolean>(false);
    const [pressedButtonTwo, setPressedButtonTwo] = React.useState<boolean>(false);
    const [pressedButtonThree, setPressedButtonThree] = React.useState<boolean>(false);
    const [pressedButtonFour, setPressedButtonFour] = React.useState<boolean>(false);
    const [pressedButtonFive, setPressedButtonFive] = React.useState<boolean>(false);

    const [completedFajr, setCompletedFajr] = React.useState<boolean>(false);
    const [completedZuhr, setCompletedZuhr] = React.useState<boolean>(false);
    const [completedAsr, setCompletedAsr] = React.useState<boolean>(false);
    const [completedMaghreb, setCompletedMaghreb] = React.useState<boolean>(false);
    const [completedIsha, setCompletedIsha] = React.useState<boolean>(false);

    const [progress, setProgress] = React.useState<number>(0);

    React.useEffect(() => {
        // calculate progress bar from prayers completed 
        const calculatedProgress = async () => {
            const completedPrayers = await calulateCompletedPrayers();
            setProgress(completedPrayers/5);
            const dailyPrayerStatus = await getDailyPrayerStatus();
            setCompletedFajr(dailyPrayerStatus['prayers']['fajr']);
            setCompletedZuhr(dailyPrayerStatus['prayers']['zuhr']);
            setCompletedAsr(dailyPrayerStatus['prayers']['asr']);
            setCompletedMaghreb(dailyPrayerStatus['prayers']['maghreb']);
            setCompletedIsha(dailyPrayerStatus['prayers']['isha']);
        };
        calculatedProgress();
    }, [progress]);

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

    const handlePress = (rakat: number, fardhPrayer: string) => {
        navigation.navigate('Pray', { rakat: rakat, fardhPrayer: fardhPrayer });
    };

    return (
        <View style={styles.container}>
            <FastImage
                source={require('../images/bismillah.png')}
                style={{width: 150, height: 150, marginBottom: 50}}
                resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={styles.text}>Select Fardh Prayers</Text>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={[
                        styles.button,
                        pressedButtonOne && styles.pressedButton,
                    ]}
                    onPressIn={handlePressIn.bind(null, 'fajr')}
                    onPressOut={handlePressOut.bind(null, 'fajr')}
                    onPress={handlePress.bind(null, 2, 'fajr')}
                >
                    {completedFajr ? <Text style={styles.buttonText}>Fajr✅</Text> : <Text style={styles.buttonText}>Fajr</Text>}
                </Pressable>
                <Pressable
                    style={[
                        styles.button,
                        pressedButtonTwo && styles.pressedButton,
                    ]}
                    onPressIn={handlePressIn.bind(null, 'zuhr')}
                    onPressOut={handlePressOut.bind(null, 'zuhr')}
                    onPress={handlePress.bind(null, 4, 'zuhr')}
                >
                    {completedZuhr ? <Text style={styles.buttonText}>Zuhr✅</Text> : <Text style={styles.buttonText}>Zuhr</Text>}
                </Pressable>
                <Pressable
                    style={[
                        styles.button,
                        pressedButtonThree && styles.pressedButton,
                    ]}
                    onPressIn={handlePressIn.bind(null, 'asr')}
                    onPressOut={handlePressOut.bind(null, 'asr')}
                    onPress={handlePress.bind(null, 4, 'asr')}
                >
                    {completedAsr ? <Text style={styles.buttonText}>Asr✅</Text> : <Text style={styles.buttonText}>Asr</Text>}
                </Pressable>
                <Pressable
                    style={[
                        styles.button,
                        pressedButtonFour && styles.pressedButton,
                    ]}
                    onPressIn={handlePressIn.bind(null, 'maghreb')}
                    onPressOut={handlePressOut.bind(null, 'maghreb')}
                    onPress={handlePress.bind(null, 3, 'maghreb')}
                >
                    {completedMaghreb ? <Text style={styles.buttonText}>Maghreb✅</Text> : <Text style={styles.buttonText}>Maghreb</Text>}
                </Pressable>
                <Pressable
                    style={[
                        styles.button,
                        pressedButtonFive && styles.pressedButton,
                    ]}
                    onPressIn={handlePressIn.bind(null, 'isha')}
                    onPressOut={handlePressOut.bind(null, 'isha')}
                    onPress={handlePress.bind(null, 4, 'isha')}
                >
                    {completedIsha ? <Text style={styles.buttonText}>Isha✅</Text> : <Text style={styles.buttonText}>Isha</Text>}
                </Pressable>
            </View>
            <Progress.Bar progress={progress} width={200} color={progress === 1 ? 'rgba(255, 204, 0, 1)' : 'rgba(255, 204, 0, 1)'}  />
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
        width: 138,
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        flexWrap: 'wrap',
        gap: 15,
        marginHorizontal: 50,
        textAlign: 'center'
    }
});