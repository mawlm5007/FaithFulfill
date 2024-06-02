import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Pressable,
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default function JourneyScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const [nextButtonPressed, setNextButtonPressed] = React.useState<boolean>(false);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>YOUR JOURNEY</Text>
            <View style={{height: '40%'}}>
                <CalendarList 
                    scrollEnabled={true}
                    style={{height: '100%'}}
                    showScrollIndicator={true}
                    futureScrollRange={1}
                    pastScrollRange={1000}
                    theme={{
                        backgroundColor: 'rgba(28,28,30,1)',
                        calendarBackground: 'rgba(28,28,30,1)',
                        textSectionTitleColor: 'rgba(255, 204, 0, 1)',
                        textSectionTitleDisabledColor: 'rgba(255, 204, 0, 1)',
                        selectedDayBackgroundColor: 'rgba(255, 204, 0, 1)',
                        selectedDayTextColor: 'rgba(255, 204, 0, 1)',
                        todayTextColor: 'rgba(255, 204, 0, 1)',
                        dayTextColor: 'rgba(255, 204, 0, 1)',
                        textDisabledColor: '#d9e1e8',
                        dotColor: 'rgba(255, 204, 0, 1)',
                        selectedDotColor: 'rgba(255, 204, 0, 1)',
                        arrowColor: 'orange',
                        disabledArrowColor: '#d9e1e8',
                        monthTextColor: 'rgba(255, 204, 0, 1)',
                        indicatorColor: 'rgba(255, 204, 0, 1)',
                        textDayFontFamily: 'monospace',
                        textMonthFontFamily: 'monospace',
                        textDayHeaderFontFamily: 'monospace',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                    }}
                >
                </CalendarList>
            </View>
            <Text style={styles.text}>🔥 1 Day Streak</Text>
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
        marginTop: 16,
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