
/**
 * 
 * @returns This function returns the date of the last year of the current date.
 * @example getLastYear()  Current Date: 2023-04-01 returns 2022-04-01
 * 
 */

function getLastYear() {

    // Get past date function here {
    let workingDate = new Date()

    // Subtract 1 year from the current date
    workingDate.setFullYear(workingDate.getFullYear() - 1);

    // Format the date as YYYY-MM-DD
    let year = workingDate.getFullYear();
    let month = String(workingDate.getMonth() + 1).padStart(2, '0');
    let day = String(workingDate.getDate()).padStart(2, '0');
    let formattedDate = `${year}-${month}-${day}`;

    return formattedDate; // make a return
}




/**
 * @param {*} state Gets the weather data for the state provided.
 * @param {*} date Gets the weather data for the date provided, if no date is provided, it will get the weather data for the last year of the current date.
 * @returns This function returns the weather data for the state, for the date provided.
 * @async This function is async, and will return a promise.
 */

async function getOpenWeatherData(state, date = getLastYear()) {
    try{

    const apikey = '4RUJQ824B7UYMW44GQCAQYE9J';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${state.latitude},${state.longitude}/${date}?unitGroup=us&include=days&key=${apikey}&contentType=json`;
    const response = await fetch(url)
    const weather = await response.json()
    
    return weather
    } catch (error) {
        console.log(error)
    }
}


module.exports = { getOpenWeatherData: getOpenWeatherData }

/*
function setWeather(stateInfo) {
  return new Promise((resolve, reject) => {
    weather.find({ search: stateInfo.name + ', ' + stateInfo.abbreviation, degreeType: 'F' }, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve({ name: stateInfo.name, abbreviation: stateInfo.abbreviation, capital: stateInfo.capital, temperature: result[0].current.temperature, date: result[0].current.date });
      }
    });
  });
}
*/




/*
 
 
 
 
 
async function assignMissingData(state) {
  const apikey = '4RUJQ824B7UYMW44GQCAQYE9J';
  const datetime = new Date();
  const date = datetime.getFullYear() + '-' + (datetime.getMonth() + 1) + '-' + datetime.getDate();
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${state.latitude}/${date}?unitGroup=us&include=days&key=${apikey}&contentType=json`;
  const response = await fetch(url)
  const data = await response.json()
  const requestedData = {
    queryType: "METERED",
    temperature: data.days[0].temp
  }
  const missingData = {
    name: state.name,
    abbreviation: state.abbreviation,
    capital: state.capital,
    data: requestedData
  }
  return missingData
 
}
 
 
async function assignCurrentData() {
  const currentData = []
 
  for (const state of states) {
    var weatherResult = await setWeather(state.capital + ", " + state.abbreviation);
    if (!weatherResult.currentWeather) {
      currentData.push(await assignMissingData(state))
 
    } else {
      currentData.push({
        name: state.name,
        abbreviation: state.abbreviation,
        capital: state.capital,
        data: {
          queryType: "FREE",
          temperature: weatherResult.currentWeather.temperature
        }
      });
    }
  }
  return currentData
}
 
 
*/



