const { getWeather } = require('weathers-watch');
const { states } = require('../states');




async function locationUrlBuilder(state) { // This function returns the url for the forecast for the state
    const url = `https://api.weather.gov/points/${state.latitude},${state.longitude}`

    const data = await fetch(url, {
        headers: {
            'User-Agent': 'your_email@example.com', // Replace with your email or application name
            'Accept': 'application/ld+json'
        }
    });
    const response = await data.json();

    return response
}





async function getForecastResponse(url) { // This function returns the forecast data for the state
    const forecastResponse = await fetch(`${url}`, {
        headers: {
            'User-Agent': 'your_email@example.com', // Replace with your email or application name
            'Accept': 'application/ld+json'
        }
    });
    const data = await forecastResponse.json();
    return data
}

async function getNWSData(state) {
    try {
        const response = await locationUrlBuilder(state)
        const data = await getForecastResponse(response.forecast)
        return data
    } catch (error) {
        console.log(error)
    }
}

/*
async function testt() {
    const {updateTime, periods} = await getNWSdata(states)
    console.log({date: new Date(updateTime), temperature: periods[0].temperature})
}
*/

module.exports = { getNWSData: getNWSData }


