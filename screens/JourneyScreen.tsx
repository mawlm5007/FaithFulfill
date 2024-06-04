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
import { calculateStreaks, getAllPrayers } from '../helpers/monthPrayers';
import { MarkedDates } from 'react-native-calendars/src/types';

export default function JourneyScreen({ navigation }: { navigation: any }): React.JSX.Element {
    // const [markedDates, setMarkedDates] = React.useState({
    //     '2024-06-20': {textColor: 'green'},
    //     '2024-06-22': {startingDay: true, color: 'green'},
    //     '2024-06-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
    //     '2024-06-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
    //   });

    const [markedDates, setMarkedDates] = React.useState<MarkedDates>({});

    const [streaks, setStreaks] = React.useState(0);

    const calculateMarkedDates = async () => {
        const newMarkedDates = await getAllPrayers();
        console.log('newMarkedDates', newMarkedDates);
        console.log('markedDates', markedDates);
        if (JSON.stringify(newMarkedDates) !== JSON.stringify(markedDates)) {
            console.log('setting marked dates')
            setMarkedDates(newMarkedDates);
        }
    }

    const streaksCalculation = async () => {
        const newStreaks = await calculateStreaks();
        console.log('newStreaks', newStreaks);
        console.log('streaks', streaks);
        if (newStreaks !== streaks) {
            console.log('setting streaks')
            setStreaks(newStreaks);
        }
    }


    React.useEffect(() => {
        calculateMarkedDates();
        streaksCalculation();
    }, [streaks, markedDates])
    return (
        <View style={styles.container}>
            <Text style={styles.text}>YOUR JOURNEY</Text>
            <View style={{height: '40%'}}>
                <CalendarList 
                    scrollEnabled={true}
                    style={{height: '100%'}}
                    showScrollIndicator={true}
                    futureScrollRange={0}
                    pastScrollRange={1000}
                    markedDates={markedDates as MarkedDates}
                    markingType={'period'}
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
                        textDayHeaderFontSize: 16,
                    }}
                >
                </CalendarList>
            </View>
            { streaks > 0 && <Text style={styles.text}>🔥 {streaks} Day Streak</Text>}
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