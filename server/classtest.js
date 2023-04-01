const { states } = require("./weatherUtils");
const { WeatherInfo } = require("./WeatherInfo");

async function testt() {
  const WW = await WeatherInfo.WeathersWatchApi(states[0]);
  const NWS = await WeatherInfo.NWSApi(states[0]);
  const OW = await WeatherInfo.OpenWeatherApi(states[0]);
  const data = { WW, NWS, OW };
  console.log(data);
}

testt();