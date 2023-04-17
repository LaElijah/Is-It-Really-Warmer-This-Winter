import StateLevelMap from "./components/maps/stateLevelMap/stateLevelMap"
import "./App.css"


function flattenObject(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '_' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
}

// {/* <StateLevelMap /> */}
export default function App() {
 


  const info = {
        "date": "2022-04-01T05:00:00.000Z",
        "period": 0,
        "temperature": 57,
        "requestState": {
            "name": "Alabama",
            "abbreviation": "AL",
            "capital": "Montgomery",
            "latitude": 32,
            "longitude": -86
        },
        "requestType": "hourly",
        "api": "OpenMeteoAPI",
        "fullApiResponse": {
            "latitude": 32,
            "longitude": -86,
            "generationtime_ms": 1.1919736862182617,
            "utc_offset_seconds": -18000,
            "timezone": "America/Chicago",
            "timezone_abbreviation": "CDT",
            "elevation": 134,
            "hourly_units": {
                "time": "iso8601",
                "temperature_2m": "°F"
            },
            "hourly": {
                "time": [
                    "2022-04-01T00:00",
                    "2022-04-01T01:00",
                    "2022-04-01T02:00",
                    "2022-04-01T03:00",
                    "2022-04-01T04:00",
                    "2022-04-01T05:00",
                    "2022-04-01T06:00",
                    "2022-04-01T07:00",
                    "2022-04-01T08:00",
                    "2022-04-01T09:00",
                    "2022-04-01T10:00",
                    "2022-04-01T11:00",
                    "2022-04-01T12:00",
                    "2022-04-01T13:00",
                    "2022-04-01T14:00",
                    "2022-04-01T15:00",
                    "2022-04-01T16:00",
                    "2022-04-01T17:00",
                    "2022-04-01T18:00",
                    "2022-04-01T19:00",
                    "2022-04-01T20:00",
                    "2022-04-01T21:00",
                    "2022-04-01T22:00",
                    "2022-04-01T23:00"
                ],
                "temperature_2m": [
                    57,
                    56,
                    54.4,
                    53.6,
                    52.8,
                    51.9,
                    51,
                    50.2,
                    52.5,
                    55.9,
                    59.1,
                    62.1,
                    64.5,
                    66.7,
                    68.7,
                    69.6,
                    69.8,
                    69,
                    66.9,
                    63.1,
                    59.8,
                    57.7,
                    56.1,
                    54.6
                ]
            }
        }
    }

    const apiInfo = {
      "Date": info.date,
      "Period": info.period,
      "Temperature": info.temperature,
      "Request Type": info.requestType,
    }

    const stateInfo = {
      "Name": info.requestState.name,
      "Abbreviation": info.requestState.abbreviation,
      "Capital": info.requestState.capital,
      "Latitude": info.requestState.latitude,
      "Longitude": info.requestState.longitude,
    }

  
  return (
    <StateLevelMap/>
   
  )
} //<StateInfo apiInfo={apiInfo} stateInfo={stateInfo}/> 