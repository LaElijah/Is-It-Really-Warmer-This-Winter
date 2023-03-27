



var { getWeather } = require("weathers-watch");


async function getTeather(){
    const city = "Minneapolis"
var weatherResult = await getWeather(city, "United States");
console.log(weatherResult);

}
getTeather()
