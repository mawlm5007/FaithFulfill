import { getObjectFor, storeObject } from "./asyncStorage";

export const setDailyPrayerStatus = async (prayer: string) => {
    let dailyPrayerStatus = await getObjectFor('dailyPrayerStatus');
    dailyPrayerStatus['prayers'][prayer] = true;
    dailyPrayerStatus['date'] = new Date();
    await storeObject('dailyPrayerStatus', dailyPrayerStatus);
}

export const initDailyPrayerStatus = async () => {
    await storeObject('dailyPrayerStatus', {
        date: new Date(),
        prayers: {
            fajr: false,
            zuhr: false,
            asr: false,
            maghreb: false,
            isha: false
        }
    });
}

export const getDailyPrayerStatus = async () => {
    const today = new Date;

    let dailyPrayerStatus = await getObjectFor('dailyPrayerStatus');
    if (dailyPrayerStatus) {
        dailyPrayerStatus['date'] = new Date(dailyPrayerStatus['date']);
        if (dailyPrayerStatus['date'].getDate() !== today.getDate()) {
            await resetDailyPrayerStatus();
            dailyPrayerStatus = await getObjectFor('dailyPrayerStatus');
            return dailyPrayerStatus;
        } else {
            return dailyPrayerStatus;
        }
    } else {
        await initDailyPrayerStatus();
        dailyPrayerStatus = await getObjectFor('dailyPrayerStatus');
        return dailyPrayerStatus;
    }
}

export const resetDailyPrayerStatus = async () => {
    await storeObject('dailyPrayerStatus', {
        date: new Date(),
        prayers: {
            fajr: false,
            zuhr: false,
            asr: false,
            maghreb: false,
            isha: false
        }
    });
}

export const calulateCompletedPrayers = async () => {
    const dailyPrayerStatus = await getDailyPrayerStatus();
    let completedPrayers = 0;
    for (const prayer in dailyPrayerStatus['prayers']) {
        if (dailyPrayerStatus['prayers'][prayer]) {
            completedPrayers++;
        }
    }
    return completedPrayers;
}