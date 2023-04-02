
const { getNWSData } = require("../NWSApi");
const { getWeathersWatchData } = require("../WeathersWatchApi");
const { getOpenWeatherData } = require("../OpenWeatherApi");





async function currentData(state, n = 0) {
    try {
    if (n > 2) {
        throw new Error({ message: 'ERROR', response: 'Too many failed requests', state: state });
    } else {
        const objectFunctions = [ WeatherInfo.nwsAPI, WeatherInfo.weathersWatchAPI, WeatherInfo.openWeatherAPI ];
        const data = await objectFunctions[n](state);
        if (data !== undefined) {
            return data;
        } else {
            return await currentData(state, n + 1);
        }
    }
} catch (error) {
    console.log(error)
}
}



/**
 * 
 * @param {*} date 
 * @returns {Date}
 * @description This function converts the date from the weathers-watch API to a date object
 */

function convertOrdinalDate(date) {
    const dateString = date;
    const cleanedDateString = dateString.replace(/(\d)(?:st|nd|rd|th)/, '$1');
    const dateObject = new Date(cleanedDateString);
    return dateObject; // Output: 2023-04-01T00:00:00.000Z (the exact output format may vary depending on the environment)
}



/**
 * 
 * @param {*} weather
 * @description This class is the parent class for the other classes
 */

class WeatherInfo { // This class is the parent class for the other classes


    constructor(weather) {
        const { date, temperature, requestState, requestType, fullApiResponse } = weather;
        
        this.date = date
        this.temperature = temperature
        this.requestState = requestState
        this.requestType = requestType
        this.fullApiResponse = fullApiResponse
    }



    /**
     * 
     * @param {*} state Specifies the state to get the weather for.
     * @returns Returns a new instance of the WeatherInfo class
     * @description This function returns the weather data from the weathers-watch API, needs to be awaited
     */
    static async weathersWatchAPI(state) { // This class is the child class for the weathers-watch API

        // const { forecastSummary } = weatherResult; // has min max temp
        const response = await getWeathersWatchData(state)
        const { forecastDetails } = response
        const { results } = forecastDetails[0];
        const isoDate = convertOrdinalDate(forecastDetails[0].date)
        // , serverRequestState: state, requestType: 'weathersWatchApi'
        const weather =
        {
            date: new Date(isoDate),
            temperature: results[0].temperature, // Temp need to be changed to integer
            requestState: state,
            requestType: 'weathersWatchApi',
            fullApiResponse: response
        }
        return new WeatherInfo(weather)
    }

    /**
     * 
     * @param {*} state Specifies the state to get the weather for.
     * @returns Returns a new instance of the WeatherInfo class
     * @description This function returns the weather data from the NWS API, needs to be awaited
     */
    static async nwsAPI(state) { // This class is the child class for the NWS API
        
        const data = await getNWSData(state)
        const { updateTime, periods } = data
        const date = new Date(`${updateTime}`)

        const weather =
        {
            date: date,
            temperature: periods[0].temperature,
            requestState: state,
            requestType: 'NWSApi',
            fullApiResponse: data
        }

        

        
        return new WeatherInfo(weather)
    }

    /**
     *  
     * @param {*} state Specifies the state to get the weather for.
     * @returns Returns a new instance of the WeatherInfo class
     * @description This function returns the weather data from the OpenWeather API, needs to be awaited
     */


    static async openWeatherAPI(state, date) { // This class is the child class for the OpenWeather API   
        const data = await getOpenWeatherData(state, date)
        const { days } = data
        const weather =
        {
            date: new Date(days[0].datetime),
            temperature: days[0].temp,
            requestState: state,
            requestType: 'OpenWeatherApi',
            fullApiResponse: data
        }
        return new WeatherInfo(weather)
    }

    /**
     * 
     * @param {*} state Specifies the state to get the weather for.
     * @returns Returns a new instance of the WeatherInfo class
     * @description This function returns the weather data and has 2 failsafes for missing data from an api, needs to be awaited.
     */

    static async getInfo(state) { // This function attempts to get the weather data from the 3 APIs, if one fails it will try the next one
        const weather = await currentData(state)
        return weather



    }



}




class WeatherTrends extends WeatherInfo { // This class is the child class for the weathers-watch API   
    constructor(weather, trends) { // Setting Object Destructuring
        super(weather)
        
        this.trends = trends // will be difference of current temp and temp from past
    }

    static async GeneralWeatherTrends(state, date) { // This class is the child class for the weathers-watch API
        const data = await WeatherInfo.getInfo(state)
        const pastData = await WeatherInfo.openWeatherAPI(state, date)
        const temperature  = data.temperature
        const pastTemperature = pastData.temperature
        const temperatureTrend = temperature - pastTemperature
        const trends = // Contains the trends
        {
            temperatureTrend: temperatureTrend,
        }
        return new WeatherTrends(data, trends)
    }

}


module.exports = { WeatherInfo: WeatherInfo, WeatherTrends: WeatherTrends }
