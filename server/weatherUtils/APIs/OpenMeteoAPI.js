const { dateModifier  } = require('../tools/dateModifier.js');
const { cacheValidate } = require('../tools/cacheValidate.js');
const { requestPeriod } = require('../tools/requestPeriod.js');
const fetch = require('node-fetch').default;




/**
 * 
 * @param {*} state  The state to get weather data for
 * @param {*} date  The date to get weather data for
 * @param {*} type  The type of weather data to return (hourly, daily)
 * @returns  Returns an url to make a request to the OpenMeteo API based on the state, date, and type of data requested
 */

function urlBuilder(state, date, type) {
    const AGE_LIMIT = 7 // The age limit for the Open Meteo API is 7 days
    const DATE_OFFSET = 0 // relative to the current date, the Open Meteo API does not have data for the current day


    let requestType = ``

    // Determine the type of data to request from the Open Meteo API based on the type given

    if (type === 'hourly') {
        requestType = `hourly=temperature_2m`
    } else if (type === 'daily') {
        requestType = `daily=temperature_2m_mean`
    }

    if (requestPeriod(date, DATE_OFFSET) < AGE_LIMIT && type === 'daily') {
        throw new Error('Open Meteo API does not have realtime mean data for daily weather')
    }


    // If the request period is greater than the age limit, use the archive API, otherwise use the forecast API

    if (requestPeriod(date, DATE_OFFSET) > AGE_LIMIT) {

        const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${state.latitude}&longitude=${state.longitude}&temperature_unit=fahrenheit&start_date=${date}&end_date=${date}&models=best_match&timezone=auto&`
        const requestUrl = url + requestType
        return requestUrl
    } else {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${state.latitude}&longitude=${state.longitude}&temperature_unit=fahrenheit&start_date=${date}&end_date=${date}&models=best_match&timezone=auto&`
        const requestUrl = url + requestType
        return requestUrl
    }


}



/**
 * 
 * @param {*} state  The state to get weather data for
 * @param {*} date  The date to get weather data for
 * @param {*} type  The type of weather data to return (hourly, daily)
 * @returns  Returns weather data for a state at a given date from the Open Meteo API can be hourly or daily
 */

async function getOpenMeteoData(state, date, type) {
    
    // Get the date and hour from the dateModifier function
    const { hour, formattedDate } = dateModifier(date);
    const url = urlBuilder(state, formattedDate, type);


    // Make a request to the Open Meteo API and return the data, if the data is not in the cache, it will be added to the cache
    
        const weatherResult = await cacheValidate(
            `OpenMeteoAPI/${type}/${state.name}/${formattedDate}/${hour}`,
            async () => {
                const data = await fetch(url);
                return data.json()
            }
        );
        return weatherResult;
    
}






module.exports = { getOpenMeteoData: getOpenMeteoData }