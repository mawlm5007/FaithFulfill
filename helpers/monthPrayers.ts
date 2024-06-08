import { getObjectFor, storeObject } from "./asyncStorage";

export const addPrayer = async () => {
    const today = new Date().toLocaleDateString();
    console.log('today: ', today);
    const newPrayer = {
        date: [today]
    }

    let existingPrayers = await getObjectFor('prayers');
    let jsonPrayers = existingPrayers ? JSON.parse(existingPrayers) : [];
    jsonPrayers.push(newPrayer);
    await storeObject('prayers', JSON.stringify(jsonPrayers));
}

export const getAllPrayers = async () => {
    const existingPrayers = await getObjectFor('prayers');
    if (existingPrayers) {
        console.log('existingPrayers: ', JSON.parse(existingPrayers));
        const parsedPrayers = JSON.parse(existingPrayers);
        console.log('parsedPrayers: ', parsedPrayers);
        let obj = parsedPrayers.reduce((ac: {},a: any) => ({...ac,[a.date]:{color: 'green'}}),{});
        console.log(obj);

        console.log('parsedPrayers: ', parsedPrayers);

        return obj;
    }
    return [];
}
const arr = [  
    {
      "date": "2024-06-04"
    }
  ]  

export const calculateStreaks = async (): Promise<number> => {
    const allPrayers = await getObjectFor('prayers');
    const prayerObj = JSON.parse(allPrayers)

    console.log(typeof prayerObj);
    console.log('allPrayers: ', prayerObj);
    console.log(typeof arr);
    console.log('arr: ', arr);
    

    if (!prayerObj) return 0

    let count = 0;
    prayerObj.reverse().forEach((el: any, i: any) => {
        if ((new Date().setHours(0,0,0,0) - new Date(el.date).setHours(0,0,0,0)) === i * 86400000) count++
    })
    console.log('count: ', count);
    return count
}
