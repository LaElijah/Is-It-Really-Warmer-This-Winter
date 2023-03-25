



const weather = require('weather-js');

// Options:
// search:     location name or zipcode
// degreeType: F or C

const states = [
  { name: 'Alabama', abbreviation: 'AL', capital: 'Montgomery' },
  { name: 'Alaska', abbreviation: 'AK', capital: 'Juneau' },
  { name: 'Arizona', abbreviation: 'AZ', capital: 'Phoenix' },
  { name: 'Arkansas', abbreviation: 'AR', capital: 'Little Rock' },
  { name: 'California', abbreviation: 'CA', capital: 'Sacramento' },
  { name: 'Colorado', abbreviation: 'CO', capital: 'Denver' },
  { name: 'Connecticut', abbreviation: 'CT', capital: 'Hartford' },
  { name: 'Delaware', abbreviation: 'DE', capital: 'Dover' },
  { name: 'Florida', abbreviation: 'FL', capital: 'Tallahassee' },
  { name: 'Georgia', abbreviation: 'GA', capital: 'Atlanta' },
  { name: 'Hawaii', abbreviation: 'HI', capital: 'Honolulu' },
  { name: 'Idaho', abbreviation: 'ID', capital: 'Boise' },
  { name: 'Illinois', abbreviation: 'IL', capital: 'Springfield' },
  { name: 'Indiana', abbreviation: 'IN', capital: 'Indianapolis' },
  { name: 'Iowa', abbreviation: 'IA', capital: 'Des Moines' },
  { name: 'Kansas', abbreviation: 'KS', capital: 'Topeka' },
  { name: 'Kentucky', abbreviation: 'KY', capital: 'Frankfort' },
  { name: 'Louisiana', abbreviation: 'LA', capital: 'Baton Rouge' },
  { name: 'Maine', abbreviation: 'ME', capital: 'Augusta' },
  { name: 'Maryland', abbreviation: 'MD', capital: 'Annapolis' },
  { name: 'Massachusetts', abbreviation: 'MA', capital: 'Boston' },
  { name: 'Michigan', abbreviation: 'MI', capital: 'Lansing' },
  { name: 'Minnesota', abbreviation: 'MN', capital: 'Saint Paul' },
  { name: 'Mississippi', abbreviation: 'MS', capital: 'Jackson' },
  { name: 'Missouri', abbreviation: 'MO', capital: 'Jefferson City' },
  { name: 'Montana', abbreviation: 'MT', capital: 'Helena' },
  { name: 'Nebraska', abbreviation: 'NE', capital: 'Lincoln' },
  { name: 'Nevada', abbreviation: 'NV', capital: 'Carson City' },
  { name: 'New Hampshire', abbreviation: 'NH', capital: 'Concord' },
  { name: 'New Jersey', abbreviation: 'NJ', capital: 'Trenton' },
  { name: 'New Mexico', abbreviation: 'NM', capital: 'Santa Fe' },
  { name: 'New York', abbreviation: 'NY', capital: 'Albany' },
  { name: 'North Carolina', abbreviation: 'NC', capital: 'Raleigh' },
  { name: 'North Dakota', abbreviation: 'ND', capital: 'Bismarck' },
  { name: 'Ohio', abbreviation: 'OH', capital: 'Columbus' },
  { name: 'Oklahoma', abbreviation: 'OK', capital: 'Oklahoma City' },
  { name: 'Oregon', abbreviation: 'OR', capital: 'Salem' },
  { name: 'Pennsylvania', abbreviation: 'PA', capital: 'Harrisburg' },
  { name: 'Rhode Island', abbreviation: 'RI', capital: 'Providence' },
  { name: 'South Carolina', abbreviation: 'SC', capital: 'Columbia' },
  { name: 'South Dakota', abbreviation: 'SD', capital: 'Pierre' },
  { name: 'Tennessee', abbreviation: 'TN', capital: 'Nashville' },
  { name: 'Texas', abbreviation: 'TX', capital: 'Austin' },
  { name: 'Utah', abbreviation: 'UT', capital: 'Salt Lake City' },
  { name: 'Vermont', abbreviation: 'VT', capital: 'Montpelier' },
  { name: 'Virginia', abbreviation: 'VA', capital: 'Richmond' },
  { name: 'Washington', abbreviation: 'WA', capital: 'Olympia' },
  { name: 'West Virginia', abbreviation: 'WV', capital: 'Charleston' },
  { name: 'Wisconsin', abbreviation: 'WI', capital: 'Madison' },
  { name: 'Wyoming', abbreviation: 'WY', capital: 'Cheyenne' }
]















const state = []

function getWeather(stateInfo) {
  return new Promise((resolve, reject) => {
    weather.find({ search: stateInfo.name + ', ' + stateInfo.abbreviation, degreeType: 'F' }, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve({name: stateInfo.name, abbreviation: stateInfo.abbreviation, capital: stateInfo.capital, temperature: result[0].current.temperature});
      }
    });
  });
}

async function assignData() {
  try {
    for (const stateInfo of states) {
      const temperature = await getWeather(stateInfo);
      state.push(await temperature);
    }
    return state;
  } catch (err) {
    console.log(err);
  }
}




module.exports = assignData














/*

const colorScale = scaleSequential(interpolate(interpolateCool, interpolateWarm))
.domain([0, 100]);

const mapData = states.reduce((acc, location) => {
  acc[location.state] = colorScale(location.temperature);
  return acc;
}, {});


*/

/*

//{nearestStationId: nearestStationId, TAVG: TAVG}

var arrayTest = ''




for (i = 0; i < statesData.length; i++){
  arrayTest += statesData[i].nearestStationId + '&' + ' '
}

const splitArray = arrayTest.split(" ")

async function testAxios(){
const response = await fetch(baseUrl + '/data?datasetid=GHCND&limit=100&datatypeid=TAVG&units=standard&startdate=2002-01-01&enddate=2002-01-01&' + splitArray.map((n) => `stationid=${n}`).join('&'),{
  headers: {
    token: apiKey
  }

})

const data = await response.json()

const stateWeatherArray = []


  const deadStations = []




for (let i = 0; i < data.results.length; i++) {
  const foundStateObject = statesData.find(obj => obj.nearestStationId == data.results[i].station)
  
  if (foundStateObject) {
    stateWeatherArray.push({stateInfo: foundStateObject, weatherInfo: data.results[i]})
  }
  else {
    const noStationData = statesData.find(obj => obj.nearestStationId == data.results[i].station)
    console.log(noStationData)
  }
}




console.log(stateWeatherArray)


}

testAxios()




/*
// Function to retrieve the station ID for a given city
async function getStationId(city) {
  const response = await axios.get(`${baseUrl}/stations`, {
    params: {
      limit: 1,
      datasetid: 'GHCND',
      location: `${city.latitude},${city.longitude}`,
      radius: 10000,
    },
    headers: {
      'token': apiKey,
    },
  });
  
  if (response.data.results.length > 0) {
    return response.data.results[0].id;
  } else {
    throw new Error(`No station found for city: ${city}`);
  }
}

// Function to retrieve the station information for a given station ID
async function getStationInfo(stationId) {
  const response = await axios.get(`${baseUrl}/stations/${stationId}`, {
    headers: {
      'token': apiKey,
    },
  });
  
  return response.data;
}

// Function to map the station information to an object containing the state's name and the property "MPCS: "
async function getCityStationInfo(state, city) {
  const stationId = await getStationId(city);
  const stationInfo = await getStationInfo(stationId);
  
  return {
    name: state,
    MPCS: stationInfo.id,
  };
}



async function app () {
const cities = {
  Alabama: {
    city: "Birmingham",
    latitude: 33.5207,
    longitude: -86.8025
  },
  Alaska: {
    city: "Anchorage",
    latitude: 61.2181,
    longitude: -149.9003
  },
  Arizona: {
    city: "Phoenix",
    latitude: 33.4484,
    longitude: -112.0740
  },
  Arkansas: {
    city: "Little Rock",
    latitude: 34.7465,
    longitude: -92.2896
  },
  California: {
    city: "Los Angeles",
    latitude: 34.0522,
    longitude: -118.2437
  },
  Colorado: {
    city: "Denver",
    latitude: 39.7392,
    longitude: -104.9903
  },
  Connecticut: {
    city: "Bridgeport",
    latitude: 41.1865,
    longitude: -73.1952
  },
  Delaware: {
    city: "Wilmington",
    latitude: 39.7391,
    longitude: -75.5398
  },
  Florida: {
    city: "Jacksonville",
    latitude: 30.3322,
    longitude: -81.6557
  },
  Georgia: {
    city: "Atlanta",
    latitude: 33.7490,
    longitude: -84.3880
  },
  Hawaii: {
    city: "Honolulu",
    latitude: 21.3069,
    longitude: -157.8583
  },
  Idaho: {
    city: "Boise",
    latitude: 43.6187,
    longitude: -116.2146
  },
  Illinois: {
    city: "Chicago",
    latitude: 41.8781,
    longitude: -87.6298
  },
  Indiana: {
    city: "Indianapolis",
    latitude: 39.7684,
    longitude: -86.1581
  },
  Iowa: {
    city: "Des Moines",
    latitude: 41.5868,
    longitude: -93.6250
  },
  Kansas: {
    city: "Wichita",
    latitude: 37.6872,
    longitude: -97.3301
  },
  Kentucky: {
    city: "Louisville",
    latitude: 38.2527,
    longitude: -85.7585
  },
  Louisiana: {
    city: "New Orleans",
    latitude: 29.9511,
    longitude: -90.0715
  },
  Maine: {
    city: "Portland",
    latitude: 43.6591,
    longitude: -70.2568
  },
  Maryland: {
    city: "Baltimore",
    latitude: 39.2904,
    longitude: -76.6122
  },
  Massachusetts: {
    city: "Boston",
    latitude: 42.3601,
    longitude: -71.0589
  },
  Michigan: {
    city: "Detroit",
    latitude: 42.3314,
    longitude: -83.0458
  },
  Minnesota: {
    city: "Minneapolis",
    latitude: 44.9778,
    longitude: -93.2650
  },
  Mississippi: {
    city: "Jackson",
    latitude: 32.2988,
    longitude: -90.1848
  },
  Missouri: {
    city: "Kansas City",
    latitude: 39.0997,
    longitude: -94.5786
  },
  Montana: {
    city: "Billings",
    latitude: 45.7833,
    longitude: -108.5007
  },
  Nebraska: {
    city: "Omaha",
    latitude: 41.2565,
    longitude: -95.9345
  },
  Nevada: {
    city: "Las Vegas",
    latitude: 36.1699,
    longitude: -115.1398
  },
  "New Hampshire": {
    city: "Manchester",
    latitude: 42.9848,
    longitude: -71.4443
  },
  "New Jersey": {
    city: "Newark",
    latitude: 40.7357,
    longitude: -74.1724
  },
  "New Mexico": {
    city: "Albuquerque",
    latitude: 35.0853,
    longitude: -106.6056
  },
  "New York": {
    city: "New York",
    latitude: 40.7128,
    longitude: -74.0060
  },
  "North Carolina": {
    city: "Charlotte",
    latitude: 35.2271,
    longitude: -80.8431
  },
  "North Dakota": {
    city: "Fargo",
    latitude: 46.8772,
    longitude: -96.7898
  },
  Ohio: {
    city: "Columbus",
    latitude: 39.9612,
    longitude: -82.9988
  },
  Oklahoma: {
    city: "Oklahoma City",
    latitude: 35.4676,
    longitude: -97.5164
  },
  Oregon: {
    city: "Portland",
    latitude: 45.5231,
    longitude: -122.6765
  },
  Pennsylvania: {
    city: "Philadelphia",
    latitude: 39.9526,
    longitude: -75.1652
  },
  "Rhode Island": {
    city: "Providence",
    latitude: 41.8240,
    longitude: -71.4128
  },
  "South Carolina": {
    city: "Columbia",
    latitude: 34.0007,
    longitude: -81.0348
  },
  "South Dakota": {
    city: "Sioux Falls",
    latitude: 43.5446,
    longitude: -96.7311
  },
  Tennessee: {
    city: "Nashville",
    latitude: 36.1627,
    longitude: -86.7816
  },
  Texas: {
    city: "Houston",
    latitude: 29.7604,
    longitude: -95.3698
  },
  Utah: {
    city: "Salt Lake City",
    latitude: 40.7608,
    longitude: -111.8910
  },
  Vermont: {
    city: "Burlington",
    latitude: 44.4759,
    longitude: -73.2121
  },
  Virginia: {
    city: "Virginia Beach",
    latitude: 36.8529,
    longitude: -75.9780
  },
  Washington: {
    city: "Seattle",
    latitude: 47.6062,
    longitude: -122.3321
  },
  "West Virginia": {
    city: "Charleston",
    latitude: 38.3498,
    longitude: -81.6326
  },
  Wisconsin: {
    city: "Milwaukee",
    latitude: 43.0389,
    longitude: -87.9065
  },
  Wyoming: {
    city: "Cheyenne",
    latitude: 41.1399,
    longitude: -104.8202
  }
}








// Loop through each state and city in the cities object, and retrieve the station information for each


console.log(cityStationInfoList);
}

app();


/*



const commonLocationTypes = [
  "locationid",
  "stationid",
]
const commonRequestTypes = [
  "startdate",
  "enddate",
  "sortfield",
  "sortorder",
  "limit",
  "offset"

]
const baseUrl = "https://www.ncei.noaa.gov/cdo-web/api/v2/"

  const endpoint = 'stations?sortfield=name&offset=12500'

 


async function test() {
  const response = await fetch(baseUrl + endpoint, {
  headers: {
      token: "JkDKOkQwQOqspAQojsQDaWfnIkWxRnRz"
  }
  })

  const data = await response.json();

  console.log(data);
}

test();





const data =  [
     "Alabama","Alaska","Arizona","Arkansas","California",
     "Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii",
     "Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana",
     "Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
     "Missouri","Montana","Nebraska","Nevada","New-Hampshire","New-Jersey",
     "New-Mexico","New-York","North-Carolina","North-Dakota","Ohio",
     "Oklahoma","Oregon","Pennsylvania","Rhode-Island","South-Carolina",
     "South-Dakota","Tennessee","Texas","Utah","Vermont","Virginia",
     "Washington","West-Virginia","Wisconsin","Wyoming"
 ]

 const datasetidArray =  [
    {
      uid: 'gov.noaa.ncdc:C00861',
      mindate: '1763-01-01',
      maxdate: '2023-03-09',
      name: 'Daily Summaries',
      datacoverage: 1,
      id: 'GHCND'
    },
    {
        mindate: '1874-10-13',
        maxdate: '2023-03-09',
        name: 'Average Temperature.',
        datacoverage: 1,
        id: 'TAVG'
      },
      {
        mindate: '1763-01-01',
        maxdate: '2023-03-09',
        name: 'Maximum temperature',
        datacoverage: 1,
        id: 'TMAX'
      },
      {
        mindate: '1763-01-01',
        maxdate: '2023-03-09',
        name: 'Minimum temperature',
        datacoverage: 1,
        id: 'TMIN'
      },
      {
        mindate: '1876-11-27',
        maxdate: '2023-03-09',
        name: 'Temperature at the time of observation',
        datacoverage: 1,
        id: 'TOBS'
      },
   
  ]



 /*
Per state, find largest population
 


const shortData = "AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY"

const stateArray = shortData.split( )
const geoArray = []

for (i = 1; i <= 50; i++) {
    geoArray.push("geo-"+ i)
}

const newArray = []
const oldArray = [{
    stateAbv: "AL", state: "Alabama", ID: "geo-1"},
    {stateAbv: "AK", state: "Alaska", ID: "geo-2"},
    {stateAbv: "AZ", state: "Arizona", ID: "geo-3"},
    {stateAbv: "AR", state: "Arkansas", ID: "geo-4"},
    {stateAbv: "CA", state: "California", ID: "geo-5"},
    {stateAbv: "CO", state: "Colorado", ID: "geo-6"},
    {stateAbv: "CT", state: "Connecticut", ID: "geo-7"},
    {stateAbv: "DE", state: "Delaware", ID: "geo-8"},
    {stateAbv: "FL", state: "Florida", ID: "geo-9"},
    {stateAbv: "GA", state: "Georgia", ID: "geo-10"},
    {stateAbv: "HI", state: "Hawaii", ID: "geo-11"},
    {stateAbv: "ID", state: "Idaho", ID: "geo-12"},
    {stateAbv: "IL", state: "Illinois", ID: "geo-13"},
    {stateAbv: "IN", state: "Indiana", ID: "geo-14"},
    {stateAbv: "IA", state: "Iowa", ID: "geo-15"},
    {stateAbv: "KS", state: "Kansas", ID: "geo-16"},
    {stateAbv: "KY", state: "Kentucky", ID: "geo-17"},
    {stateAbv: "LA", state: "Louisiana", ID: "geo-18"},
    {stateAbv: "ME", state: "Maine", ID: "geo-19"},
    {stateAbv: "MD", state: "Maryland", ID: "geo-20"},
    {stateAbv: "MA", state: "Massachusetts", ID: "geo-21"},
    {stateAbv: "MI", state: "Michigan", ID: "geo-22"},
    {stateAbv: "MN", state: "Minnesota", ID: "geo-23"},
    {stateAbv: "MS", state: "Mississippi", ID: "geo-24"},
    {stateAbv: "MO", state: "Missouri", ID: "geo-25"},
    {stateAbv: "MT", state: "Montana", ID: "geo-26"},
    {stateAbv: "NE", state: "Nebraska", ID: "geo-27"},
    {stateAbv: "NV", state: "Nevada", ID: "geo-28"},
    {stateAbv: "NH", state: "New-Hampshire", ID: "geo-29"},
    {stateAbv: "NJ", state: "New-Jersey", ID: "geo-30"},
    {stateAbv: "NM", state: "New-Mexico", ID: "geo-31"},
    {stateAbv: "NY", state: "New-York", ID: "geo-32"},
    {stateAbv: "NC", state: "North-Carolina", ID: "geo-33"},
    {stateAbv: "ND", state: "North-Dakota", ID: "geo-34"},
    {stateAbv: "OH", state: "Ohio", ID: "geo-35"},
    {stateAbv: "OK", state: "Oklahoma", ID: "geo-36"},
    {stateAbv: "OR", state: "Oregon", ID: "geo-37"},
    {stateAbv: "PA", state: "Pennsylvania", ID: "geo-38"},
    {stateAbv: "RI", state: "Rhode-Island", ID: "geo-39"},
    {stateAbv: "SC", state: "South-Carolina", ID: "geo-40"},
    {stateAbv: "SD", state: "South-Dakota", ID: "geo-41"},
    {stateAbv: "TN", state: "Tennessee", ID: "geo-42"},
    {stateAbv: "TX", state: "Texas", ID: "geo-43"},
    {stateAbv: "UT", state: "Utah", ID: "geo-44"},
    {stateAbv: "VT", state: "Vermont", ID: "geo-45"},
    {stateAbv: "VA", state: "Virginia", ID: "geo-46"},
    {stateAbv: "WA", state: "Washington", ID: "geo-47"},
    {stateAbv: "WV", state: "West-Virginia", ID: "geo-48"},
    {stateAbv: "WI", state: "Wisconsin", ID: "geo-49"},
    {stateAbv: "WY", state: "Wyoming", ID: "geo-50"}]


  /*
   {
      uid: 'gov.noaa.ncdc:C00946',
      mindate: '1763-01-01',
      maxdate: '2023-02-01',
      name: 'Global Summary of the Month',
      datacoverage: 1,
      id: 'GSOM'
    },
    {
      uid: 'gov.noaa.ncdc:C00947',
      mindate: '1763-01-01',
      maxdate: '2023-01-01',
      name: 'Global Summary of the Year',
      datacoverage: 1,
      id: 'GSOY'
    },
    {
      uid: 'gov.noaa.ncdc:C00345',
      mindate: '1991-06-05',
      maxdate: '2023-03-08',
      name: 'Weather Radar (Level II)',
      datacoverage: 0.95,
      id: 'NEXRAD2'
    },
    {
      uid: 'gov.noaa.ncdc:C00708',
      mindate: '1994-05-20',
      maxdate: '2023-03-01',
      name: 'Weather Radar (Level III)',
      datacoverage: 0.95,
      id: 'NEXRAD3'
    },
    {
      uid: 'gov.noaa.ncdc:C00821',
      mindate: '2010-01-01',
      maxdate: '2010-01-01',
      name: 'Normals Annual/Seasonal',
      datacoverage: 1,
      id: 'NORMAL_ANN'
    },
    {
      uid: 'gov.noaa.ncdc:C00823',
      mindate: '2010-01-01',
      maxdate: '2010-12-31',
      name: 'Normals Daily',
      datacoverage: 1,
      id: 'NORMAL_DLY'
    },
    {
      uid: 'gov.noaa.ncdc:C00824',
      mindate: '2010-01-01',
      maxdate: '2010-12-31',
      name: 'Normals Hourly',
      datacoverage: 1,
      id: 'NORMAL_HLY'
    },
    {
      uid: 'gov.noaa.ncdc:C00822',
      mindate: '2010-01-01',
      maxdate: '2010-12-01',
      name: 'Normals Monthly',
      datacoverage: 1,
      id: 'NORMAL_MLY'
    },
    {
      uid: 'gov.noaa.ncdc:C00505',
      mindate: '1970-05-12',
      maxdate: '2014-01-01',
      name: 'Precipitation 15 Minute',
      datacoverage: 0.25,
      id: 'PRECIP_15'
    },
    {
      uid: 'gov.noaa.ncdc:C00313',
      mindate: '1900-01-01',
      maxdate: '2014-01-01',
      name: 'Precipitation Hourly',
      datacoverage: 1,
      id: 'PRECIP_HLY'
    }










    [
    {
      mindate: '1888-02-01',
      maxdate: '2023-03-10',
      name: 'Alabama',
      datacoverage: 1,
      id: 'FIPS:01'
    },
    {
      mindate: '1893-09-01',
      maxdate: '2023-03-10',
      name: 'Alaska',
      datacoverage: 1,
      id: 'FIPS:02'
    },
    {
      mindate: '1867-08-01',
      maxdate: '2023-03-10',
      name: 'Arizona',
      datacoverage: 1,
      id: 'FIPS:04'
    },
    {
      mindate: '1871-07-01',
      maxdate: '2023-03-10',
      name: 'Arkansas',
      datacoverage: 1,
      id: 'FIPS:05'
    },
    {
      mindate: '1850-10-01',
      maxdate: '2023-03-10',
      name: 'California',
      datacoverage: 1,
      id: 'FIPS:06'
    },
    {
      mindate: '1852-10-01',
      maxdate: '2023-03-10',
      name: 'Colorado',
      datacoverage: 1,
      id: 'FIPS:08'
    },
    {
      mindate: '1884-11-01',
      maxdate: '2023-03-10',
      name: 'Connecticut',
      datacoverage: 1,
      id: 'FIPS:09'
    },
    {
      mindate: '1893-01-01',
      maxdate: '2023-03-10',
      name: 'Delaware',
      datacoverage: 1,
      id: 'FIPS:10'
    },
    {
      mindate: '1870-11-01',
      maxdate: '2023-03-08',
      name: 'District of Columbia',
      datacoverage: 1,
      id: 'FIPS:11'
    },
    {
      mindate: '1871-09-12',
      maxdate: '2023-03-10',
      name: 'Florida',
      datacoverage: 1,
      id: 'FIPS:12'
    },
    {
      mindate: '1849-01-01',
      maxdate: '2023-03-10',
      name: 'Georgia',
      datacoverage: 1,
      id: 'FIPS:13'
    },
    {
      mindate: '1905-01-01',
      maxdate: '2023-03-10',
      name: 'Hawaii',
      datacoverage: 1,
      id: 'FIPS:15'
    },
    {
      mindate: '1892-06-01',
      maxdate: '2023-03-10',
      name: 'Idaho',
      datacoverage: 1,
      id: 'FIPS:16'
    },
    {
      mindate: '1870-10-15',
      maxdate: '2023-03-10',
      name: 'Illinois',
      datacoverage: 1,
      id: 'FIPS:17'
    },
    {
      mindate: '1886-02-01',
      maxdate: '2023-03-10',
      name: 'Indiana',
      datacoverage: 1,
      id: 'FIPS:18'
    },
    {
      mindate: '1888-06-01',
      maxdate: '2023-03-10',
      name: 'Iowa',
      datacoverage: 1,
      id: 'FIPS:19'
    },
    {
      mindate: '1857-04-01',
      maxdate: '2023-03-10',
      name: 'Kansas',
      datacoverage: 1,
      id: 'FIPS:20'
    },
    {
      mindate: '1872-10-01',
      maxdate: '2023-03-10',
      name: 'Kentucky',
      datacoverage: 1,
      id: 'FIPS:21'
    },
    {
      mindate: '1882-07-01',
      maxdate: '2023-03-10',
      name: 'Louisiana',
      datacoverage: 1,
      id: 'FIPS:22'
    },
    {
      mindate: '1885-06-01',
      maxdate: '2023-03-10',
      name: 'Maine',
      datacoverage: 1,
      id: 'FIPS:23'
    },
    {
      mindate: '1871-01-01',
      maxdate: '2023-03-10',
      name: 'Maryland',
      datacoverage: 1,
      id: 'FIPS:24'
    },
    {
      mindate: '1831-02-01',
      maxdate: '2023-03-10',
      name: 'Massachusetts',
      datacoverage: 1,
      id: 'FIPS:25'
    },
    {
      mindate: '1887-06-01',
      maxdate: '2023-03-10',
      name: 'Michigan',
      datacoverage: 1,
      id: 'FIPS:26'
    },
    {
      mindate: '1886-01-01',
      maxdate: '2023-03-10',
      name: 'Minnesota',
      datacoverage: 1,
      id: 'FIPS:27'
    },
    {
      mindate: '1891-01-01',
      maxdate: '2023-03-10',
      name: 'Mississippi',
      datacoverage: 1,
      id: 'FIPS:28'
    },
    {
      mindate: '1890-01-01',
      maxdate: '2023-03-10',
      name: 'Missouri',
      datacoverage: 1,
      id: 'FIPS:29'
    },
    {
      mindate: '1891-08-01',
      maxdate: '2023-03-10',
      name: 'Montana',
      datacoverage: 1,
      id: 'FIPS:30'
    },
    {
      mindate: '1878-01-01',
      maxdate: '2023-03-10',
      name: 'Nebraska',
      datacoverage: 1,
      id: 'FIPS:31'
    },
    {
      mindate: '1877-07-01',
      maxdate: '2023-03-10',
      name: 'Nevada',
      datacoverage: 1,
      id: 'FIPS:32'
    },
    {
      mindate: '1868-01-01',
      maxdate: '2023-03-10',
      name: 'New Hampshire',
      datacoverage: 1,
      id: 'FIPS:33'
    },
    {
      mindate: '1865-06-01',
      maxdate: '2023-03-10',
      name: 'New Jersey',
      datacoverage: 1,
      id: 'FIPS:34'
    },
    {
      mindate: '1870-01-01',
      maxdate: '2023-03-10',
      name: 'New Mexico',
      datacoverage: 1,
      id: 'FIPS:35'
    },
    {
      mindate: '1869-01-01',
      maxdate: '2023-03-10',
      name: 'New York',
      datacoverage: 1,
      id: 'FIPS:36'
    },
    {
      mindate: '1869-03-01',
      maxdate: '2023-03-10',
      name: 'North Carolina',
      datacoverage: 1,
      id: 'FIPS:37'
    },
    {
      mindate: '1891-07-01',
      maxdate: '2023-03-10',
      name: 'North Dakota',
      datacoverage: 1,
      id: 'FIPS:38'
    },
    {
      mindate: '1871-01-01',
      maxdate: '2023-03-10',
      name: 'Ohio',
      datacoverage: 1,
      id: 'FIPS:39'
    },
    {
      mindate: '1870-04-01',
      maxdate: '2023-03-10',
      name: 'Oklahoma',
      datacoverage: 1,
      id: 'FIPS:40'
    },
    {
      mindate: '1871-11-01',
      maxdate: '2023-03-10',
      name: 'Oregon',
      datacoverage: 1,
      id: 'FIPS:41'
    },
    {
      mindate: '1849-04-01',
      maxdate: '2023-03-10',
      name: 'Pennsylvania',
      datacoverage: 1,
      id: 'FIPS:42'
    },
    {
      mindate: '1893-01-01',
      maxdate: '2023-03-10',
      name: 'Rhode Island',
      datacoverage: 1,
      id: 'FIPS:44'
    },
    {
      mindate: '1849-05-01',
      maxdate: '2023-03-10',
      name: 'South Carolina',
      datacoverage: 1,
      id: 'FIPS:45'
    },
    {
      mindate: '1893-01-01',
      maxdate: '2023-03-10',
      name: 'South Dakota',
      datacoverage: 1,
      id: 'FIPS:46'
    },
    {
      mindate: '1879-01-01',
      maxdate: '2023-03-10',
      name: 'Tennessee',
      datacoverage: 1,
      id: 'FIPS:47'
    },
    {
      mindate: '1852-04-01',
      maxdate: '2023-03-10',
      name: 'Texas',
      datacoverage: 1,
      id: 'FIPS:48'
    },
    {
      mindate: '1887-12-01',
      maxdate: '2023-03-10',
      name: 'Utah',
      datacoverage: 1,
      id: 'FIPS:49'
    },
    {
      mindate: '1883-12-01',
      maxdate: '2023-03-10',
      name: 'Vermont',
      datacoverage: 1,
      id: 'FIPS:50'
    },
    {
      mindate: '1869-01-01',
      maxdate: '2023-03-10',
      name: 'Virginia',
      datacoverage: 1,
      id: 'FIPS:51'
    },
    {
      mindate: '1856-01-01',
      maxdate: '2023-03-10',
      name: 'Washington',
      datacoverage: 1,
      id: 'FIPS:53'
    },
    {
      mindate: '1854-01-01',
      maxdate: '2023-03-10',
      name: 'West Virginia',
      datacoverage: 1,
      id: 'FIPS:54'
    },
    {
      mindate: '1869-01-01',
      maxdate: '2023-03-10',
      name: 'Wisconsin',
      datacoverage: 1,
      id: 'FIPS:55'
    },
    {
      mindate: '1889-01-01',
      maxdate: '2023-03-10',
      name: 'Wyoming',
      datacoverage: 1,
      id: 'FIPS:56'
    }
  ]
}
    */
