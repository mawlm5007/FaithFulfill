import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Pressable,
} from 'react-native';

export default function WelcomeCalendarScreen({ navigation }: { navigation: any }): React.JSX.Element {

    return (
        <View style={styles.container}>
            <Image
                source={require('../images/bismillah.png')}
                style={{width: 150, height: 150, resizeMode: 'contain', marginBottom: 50}}
            />
            <Text style={styles.text}>CALENDAR</Text>
            <Button
                title="Next"
                color="white"
                onPress={() => navigation.navigate('FaithFulfill')}
            >
            </Button>
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