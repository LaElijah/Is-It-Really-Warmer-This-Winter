const { states } = require("./server/weatherUtils/states");
const { WeatherInfo, WeatherTrends } = require("./server/weatherUtils/WeatherInfo");



async function test() {
    const state = states[0]
    const GeneralWeatherTrends = await WeatherTrends.openWeatherAPI(state, '2022-05-01')
    console.log(GeneralWeatherTrends)
    
}

test()