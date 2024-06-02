import { getObjectFor, storeObject } from "./asyncStorage";

export const setDailyPrayerStatus = async (prayer: string) => {
    let dailyPrayerStatus = await getObjectFor('dailyPrayerStatus');
    dailyPrayerStatus[prayer] = true;
    await storeObject('dailyPrayerStatus', dailyPrayerStatus);
}

export const initDailyPrayerStatus = async () => {
    await storeObject('dailyPrayerStatus', {
        fajr: false,
        zuhr: false,
        asr: false,
        maghreb: false,
        isha: false
    });
}

export const resetDailyPrayerStatus = async () => {
    await storeObject('dailyPrayerStatus', {
        fajr: false,
        zuhr: false,
        asr: false,
        maghreb: false,
        isha: false
    });
}