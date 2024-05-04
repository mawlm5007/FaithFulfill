import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Pressable,
} from 'react-native';

export default function HomeScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const [pressedButtonOne, setPressedButtonOne] = React.useState<boolean>(false);
    const [pressedButtonTwo, setPressedButtonTwo] = React.useState<boolean>(false);
    const [pressedButtonThree, setPressedButtonThree] = React.useState<boolean>(false);
    const [pressedTryButton, setTryButton] = React.useState<boolean>(false);

    const handlePressIn = (rakat: number) => {
        if (rakat === 2) setPressedButtonOne(true);
        if (rakat === 3) setPressedButtonTwo(true);
        if (rakat === 4) setPressedButtonThree(true);
        if (rakat === 1) setTryButton(true);
    };

    const handlePressOut = (rakat: number) => {
        if (rakat === 2) setPressedButtonOne(false);
        if (rakat === 3) setPressedButtonTwo(false);
        if (rakat === 4) setPressedButtonThree(false);
        if (rakat === 1) setTryButton(false);
    };

    const handlePress = (rakat: number) => {
        navigation.navigate('Pray', { rakat: rakat });
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../images/bismillah.png')}
                style={{width: 150, height: 150, resizeMode: 'contain', marginBottom: 50}}
            />
            <Text style={styles.text}>Select Rak'at</Text>
            <Pressable
                style={[
                    styles.button,
                    pressedButtonOne && styles.pressedButton,
                ]}
                onPressIn={handlePressIn.bind(null, 2)}
                onPressOut={handlePressOut.bind(null, 2)}
                onPress={handlePress.bind(null, 2)}
            >
                <Text style={styles.buttonText}>2 Rak'at</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.button,
                    pressedButtonTwo && styles.pressedButton,
                ]}
                onPressIn={handlePressIn.bind(null, 3)}
                onPressOut={handlePressOut.bind(null, 3)}
                onPress={handlePress.bind(null, 3)}
            >
                <Text style={styles.buttonText}>3 Rak'at</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.button,
                    pressedButtonThree && styles.pressedButton,
                ]}
                onPressIn={handlePressIn.bind(null, 4)}
                onPressOut={handlePressOut.bind(null, 4)}
                onPress={handlePress.bind(null, 4)}
            >
                <Text style={styles.buttonText}>4 Rak'at</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.button,
                    pressedTryButton && styles.pressedButton,
                ]}
                onPressIn={handlePressIn.bind(null, 1)}
                onPressOut={handlePressOut.bind(null, 1)}
                onPress={handlePress.bind(null, 1)}
            >
                <Text style={styles.buttonText}>Try It Out!</Text>
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