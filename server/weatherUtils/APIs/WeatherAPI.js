const fetch = require('node-fetch');
const { cacheValidate } = require("../tools/cacheValidate");
const { dateModifier } = require("../tools/dateModifier");
const { requestPeriod } = require("../tools/requestPeriod");


/**
 * 
 * @param {*} state  The state to get weather data for
 * @param {*} date  The date to get weather data for
 * @param {*} type  The type of weather data to return (hourly, daily)
 * @returns  Returns an url to make a request to the OpenMeteo API based on the state, date, and type of data requested
 */

function urlBuilder(state, date, type) {
  const AGE_LIMIT = 0;

  const { formattedDate, hour } = dateModifier(date);

  const period = requestPeriod(date, AGE_LIMIT);

  const apikey = process.env.WEATHER_API_KEY ;
  let requestType

  if (period < AGE_LIMIT) {
    requestType = `forecast.json?`
  } else {

    if (period > 7) {
      throw new Error('Weather API does not support historical data past 7 days')
    }
    requestType = `history.json?dt=${formattedDate}&`
  }
  let baseUrl = `http://api.weatherapi.com/v1/${requestType}key=${apikey}&q=${state.latitude},${state.longitude}`;
  if (type === 'hourly') {
    baseUrl += `&hour=${hour}`
  }
  return baseUrl
}













/**
 * 
 * @param {*} state  state to get weather data for
 * @param {*} date  date to get weather data for
 * @param {*} type  type of weather data to return (hourly, daily)
 * @returns  weather data for a state at a given date
 * @note  the weather api does not support historical data past 3 days until $65 per month payment
 * 
 */


async function getWeatherData(state, date, type) {


  
  const { hour, formattedDate } = dateModifier(date);
  const url = urlBuilder(state, formattedDate, type)





  const weatherResult = await cacheValidate(
    `WeatherAPI/${type}/${state.name}/${formattedDate}/${hour}`,
    async () => {
      const data = await fetch(url);
      return data.json()
    }
  );
  return weatherResult;

}







module.exports = { getWeatherData: getWeatherData }