
const { states } = require('./server/weatherUtils/states')



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






async function stateObject(response, data, forecastDay) { // This function returns an object with all the data for the state
  const stateData = {
    context: {
      contextValue: response[`@context`].value,
      forecastOffice: response[`@context`].forecastOffice,
      publicZone: response[`@context`].publicZone,
      county: response[`@context`].county,
    },
    location: {
      city: response.relativeLocation.city,
      state: response.relativeLocation.state,
      distance: response.relativeLocation.distance,
      bearing: response.relativeLocation.bearing,
    },

    forecast: {
      day: data.periods[forecastDay].name,
      startTime: data.periods[forecastDay].startTime,
      endTime: data.periods[forecastDay].endTime,
      temperature: data.periods[forecastDay].temperature,
      temperatureUnit: data.periods[forecastDay].temperatureUnit,


    }
  }
  return stateData


}







async function getCurrentWeather(forecastDay = 0, forecastType = 'baseline') { // forecastDay = 0 is today, 1 is tomorrow, etc. forecastType = 'hourly' or 'baseline'

  const currentResponse = []
  for (const state of states) {
    try {
      const response = await locationUrlBuilder(state)
      const data = await getForecastResponse(response.forecast)
      const stateData = await stateObject(response, data, forecastDay) // stateData is an object with all the data for the state
      console.log({response: response, data: data, stateData: stateData})
      currentResponse.push(stateData)
    } catch (error) {
      console.log(error)
    }

   

  }
  return currentResponse
}








  async function testt() {
    const data = await getCurrentWeather()


  }

  testt()