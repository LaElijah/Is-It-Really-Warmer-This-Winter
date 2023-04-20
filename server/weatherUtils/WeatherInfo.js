const { getOpenMeteoData } = require('./APIs/OpenMeteoAPI');
const { getWeatherData } = require('./APIs/WeatherAPI');
const { fetch } = require('node-fetch');
const dayjs = require('dayjs');
const { states } = require("./states");


/**
 * 
 * @param {*} weather The weather data to be used to create a new instance of the WeatherInfo class
 * @description This class is the parent class for the other classes
 */

class WeatherInfo { // This class is the parent class for the other classes


    constructor(weather) {
        this.info = weather;
    }

    /**
     * 
     * @param {*} state  The state to get weather data for
     * @param {*} date  The date to get weather data for
     * @param {*} type  The type of weather data to return (hourly, daily)
     * @returns  Returns an Object with weather data from OpenMeteoAPI Must be awaited
     */
    static async openMeteoAPI(state, date, type) {

        
        console.log("openMeteoAPI")
        const response = await getOpenMeteoData(state, date, type);
        console.log(response)

        // Object Setters

        if (type === 'hourly') {

            const period = dayjs(date).hour();
            const weatherData = {
                date: new Date(response.hourly.time[period]),
                period: period,
                temperature: response.hourly.temperature_2m[period],
                requestState: state,
                requestType: type,
                api: 'OpenMeteoAPI',
                fullApiResponse: response
            }
            return new WeatherInfo(weatherData);
        } else if (type === 'daily') {
            const weatherData = {
                date: new Date(response.daily.time),
                period: null,
                temperature: response.daily.temperature_2m_mean[0],
                requestState: state,
                requestType: type,
                api: 'OpenMeteoAPI',
                fullApiResponse: response
            }
            return new WeatherInfo(weatherData);
        }
    }

    /**
     * 
     * @param {*} state  The state to get weather data for
     * @param {*} date  The date to get weather data for
     * @param {*} type  The type of weather data to return (hourly, daily)
     * @returns  Returns an Object with weather data from WeatherAPI Must be awaited
     */

    static async weatherAPI(state, date, type) { // if no hour is specified, 0 is used
        const response = await getWeatherData(state, date, type);

        

        if (type === 'hourly') {
            const period = dayjs(date).hour();
            const weatherData = {
                date: new Date(response.forecast.forecastday[0].date),
                period: null,
                temperature: response.forecast.forecastday[0].hour[period].temp_f,
                requestState: state,
                requestType: type,
                api: 'WeatherAPI',
                fullApiResponse: response
            }
            return new WeatherInfo(weatherData);
        }


        else if (type === 'daily') {
            const weatherData = {
                date: new Date(response.forecast.forecastday[0].date),
                period: null,
                temperature: response.forecast.forecastday[0].day.avgtemp_f,
                requestState: state,
                requestType: type,
                api: 'WeatherAPI',
                fullApiResponse: response
            }
            return new WeatherInfo(weatherData);
        }

    }

    /**
     * 
     * @param {*} state Specifies the state to get the weather for.
     * @param {*} date Specifies the date to get the weather for.
     * @param {*} type Specifies the type of weather data to get. (hourly, daily)
     * @returns Returns a new instance of the WeatherInfo class
     * @description This function returns the weather data and has 2 failsafes for missing data from an api, needs to be awaited.
     */

    static async getInfo(state, date =  dayjs(), type = 'hourly') { // This function attempts to get the weather data from the 3 APIs, if one fails it will try the next one
       
        try {
            const weatherData = await WeatherInfo.openMeteoAPI(state, date, type);
          
            return weatherData
        
            } catch (error) {
               // console.log(error); // Uncomment this line to see the error message
                const weatherData = await WeatherInfo.weatherAPI(state, date, type);
                return weatherData;
        }
    }


    /**
     * 
     * @param {*} date  The date to get weather data for defaults to today
     * @param {*} type  The type of weather data to get, defaults to hourly
     * @returns  Returns an array of weather data for every state in the states array
     */

    static async getAllInfo(date, type) { // This function attempts to get data for every state in the states array, needs to be awaited
        const weatherArray = []
        const apiArray = []
        for (const state of states) {
            
            apiArray.push(WeatherInfo.getInfo(state, date, type))
            
        }
        const weatherData = await Promise.allSettled(apiArray)
        for (const data of weatherData) {
            if (data.status === 'fulfilled') {
                weatherArray.push(data.value)
            }
        }
        return weatherArray
    }

    static async getComparisonData(date, type) { // This function attempts to get data for every state in the states array, needs to be awaited
       console.log(date)
       
        const primaryWeather = await WeatherInfo.getAllInfo(date[0], type)
        
        const secondaryWeather = await WeatherInfo.getAllInfo(date[1], type)
        

        const comparisonData = { primaryWeather: primaryWeather, secondaryWeather: secondaryWeather }
        return comparisonData
    }
}


module.exports = { WeatherInfo: WeatherInfo }
