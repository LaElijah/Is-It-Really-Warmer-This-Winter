const { getWeather } = require('weathers-watch');


async function getWeathersWatchData(state) {
    try {
        const weatherResult = await getWeather(`${state.capital}`, 'united states');
        // const { forecastSummary } = weatherResult; // has min max temp
        return weatherResult

    } catch (error) {
        console.log(error);
    }
}


module.exports = { getWeathersWatchData: getWeathersWatchData }