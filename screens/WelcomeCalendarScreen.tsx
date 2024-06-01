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

import { CommonActions } from '@react-navigation/native';

export default function WelcomeCalendarScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const [backButtonPressed, setBackButtonPressed] = React.useState<boolean>(false);
    const [nextButtonPressed, setNextButtonPressed] = React.useState<boolean>(false);

    return (
        <View style={styles.container}>
            <Text style={styles.comingSoonText}>COMING SOON</Text>
            <FastImage
                source={require('../images/calendar.png')}
                style={{width: 150, height: 150, marginBottom: 50}}
                resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={styles.text}>CALENDAR PRAYER TRACKING</Text>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={[
                        styles.button,
                        backButtonPressed && styles.pressedButton,
                    ]}
                    onPress={() => navigation.navigate('WelcomeRakaat')}
                    onPressIn={() => setBackButtonPressed(true)}
                    onPressOut={() => setBackButtonPressed(false)}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.button,
                        nextButtonPressed && styles.pressedButton,
                    ]}
                    onPress={() => navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [
                            { name: 'Pray', params: { rakat: 1 } },
                          ],
                        })
                      )}
                    onPressIn={() => setNextButtonPressed(true)}
                    onPressOut={() => setNextButtonPressed(false)}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
            </View>
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
    comingSoonText: {
        fontSize: 45,
        fontWeight: 'bold',
        color: 'rgba(255, 204, 0, 1)', // hex value for a darker shade of yellow
        marginBottom: 16,
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
        width: 100,
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
        marginBottom: 16,
        flexWrap: 'wrap',
        gap: 30,
        marginHorizontal: 50,
        textAlign: 'center'
    }
});