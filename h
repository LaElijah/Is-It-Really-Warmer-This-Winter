/current 'gets all the  current weather data - done
/current/:state 'gets a specific states current weather - done

/history/:date 'gets all the data for s specific date - done 
/history/:state/:date ' gets all the data for a specific state -done

/trends/:date 'gets all the current weather data with historical data for a given date
/trends/:state/:date 'gets the current weather data with historical data for the given date and state

**
     * 
     * @param {*} state Specifies the state to get the weather for.
     * @returns Returns a new instance of the WeatherInfo class
     * @description This function returns the weather data from the NWS API, needs to be awaited
     */
    static async nwsAPI(state) { // This class is the child class for the NWS API
        const datetime = new Date()
        const dateStamp = `${datetime.getFullYear()}-${datetime.getMonth()}-${datetime.getDate()}`
        const period = datetime.getHours()
        const data = await cacheValidate(`current/state=${state.name}&date=${dateStamp}&period=${period}&type=CURRENT`, async () => {
        const data = await getNWSData(state)
        if (data.periods[0].temperature === undefined) {
            const backup = await getOpenWeatherData(state, dateStamp)
        return backup
        } else {
            return data
        }
    })


        console.log(data)


        const { updateTime, periods } = data
        const date = new Date(`${updateTime}`)

        const weather =
        {
            date: date,
            temperature: periods[0].temperature,
            requestState: state,
            requestType: 'NWSApi',
            fullApiResponse: data
        }

        

        
        return new WeatherInfo(weather)
    }

    /**
     *  
     * @param {*} state Specifies the state to get the weather for.
     * @returns Returns a new instance of the WeatherInfo class
     * @description This function returns the weather data from the OpenWeather API, needs to be awaited
     */


    static async openWeatherAPI(state, date) { // This class is the child class for the OpenWeather API   
        
        const data = await getOpenWeatherData(state, date)
        const { days } = data
        const weather =
        {
            date: new Date(days[0].datetime),
            temperature: days[0].temp,
            requestState: state,
            requestType: 'OpenWeatherApi',
            fullApiResponse: data
        }
        return new WeatherInfo(weather)
    }



/**
 * 
 * @param {*} date 
 * @returns {Date}
 * @description This function converts the date from the weathers-watch API to a date object
 */

function convertOrdinalDate(date) {
    const dateString = date;
    const cleanedDateString = dateString.replace(/(\d)(?:st|nd|rd|th)/, '$1');
    const dateObject = new Date(cleanedDateString);
    return dateObject; // Output: 2023-04-01T00:00:00.000Z (the exact output format may vary depending on the environment)
}

