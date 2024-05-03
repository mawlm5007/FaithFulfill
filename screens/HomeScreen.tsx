import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

export default function HomeScreen({ navigation }: { navigation: any }): React.JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={ styles.text }>Faithfulfill</Text>
            <Button title="2 Rakat" onPress={() => navigation.navigate('Pray', { rakat: 2 })}></Button>
            <Button title="3 Rakat" onPress={() => navigation.navigate('Pray', { rakat: 3 })}></Button>
            <Button title="4 Rakat" onPress={() => navigation.navigate('Pray', { rakat: 4 })}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,10)',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#e3c500', // hex value for a darker shade of yellow
        marginBottom: 16,
    },
});