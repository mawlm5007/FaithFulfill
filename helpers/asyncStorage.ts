import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log("Error storing data", error);
    }
};

export const storeObject = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
        console.log("Error storing data", error);
    }
};

export const getItemFor = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        console.log("Error retrieving data", error);
    }
};

export const getObjectFor = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? JSON.parse(value) : null;
    } catch (error) {
        console.log("Error retrieving data", error);
    }
};