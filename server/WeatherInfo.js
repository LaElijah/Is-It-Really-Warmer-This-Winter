
const { getNWSData } = require("./NWSApi");
const { getWeathersWatchData } = require("./WeathersWatchApi");
const { getOpenWeatherData } = require("./OpenWeatherApi");





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
        const { datetime, temperature, requestState, requestType, fullApiResponse } = weather;
        this.date = datetime
        this.temperature = temperature
        this.requestState - requestState
        this.requestType = requestType
        this.fullApiResponse = fullApiResponse
    }



    /**
     * 
     * @param {*} state Specifies the state to get the weather for.
     * @returns Returns a new instance of the WeatherInfo class
     * @description This function returns the weather data from the weathers-watch API, needs to be awaited
     */
    static async WeathersWatchApi(state) { // This class is the child class for the weathers-watch API

        // const { forecastSummary } = weatherResult; // has min max temp
        const response = await getWeathersWatchData(state)
        const { forecastDetails } = response
        const { results } = forecastDetails[0];
        const isoDate = convertOrdinalDate(forecastDetails[0].date)
        // , serverRequestState: state, requestType: 'weathersWatchApi'
        const weather =
        {
            datetime: isoDate,
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
    static async NWSApi(state) { // This class is the child class for the NWS API
        const data = await getNWSData(state)
        const { updateTime, periods } = data
        const weather =
        {
            datetime: new Date(updateTime),
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


    static async OpenWeatherApi(state) { // This class is the child class for the OpenWeather API   
        const data = await getOpenWeatherData(state)
        const { days } = data
        const weather =
        {
            datetime: new Date(days[0].datetimeEpoch),
            temperature: days[0].temp,
            requestState: state,
            requestType: 'OpenWeatherApi',
            fullApiResponse: data
        }
        return new WeatherInfo(weather)
    }
}





module.exports = { WeatherInfo: WeatherInfo }
