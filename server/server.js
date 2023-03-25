
const path = require('path')
const express = require('express')
const app = express()
const port = 3000
const weather = require('weather-js');



app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', "index.html"));
});





// States array
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

// State array
const state = [];

// Function to get weather information for a state
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

// Function to populate the state array with weather information
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

// Call assignData() to populate the state array
assignData();

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


// Endpoint to get the state array
app.get('/states', (req, res) => {
  console.log({results: state})
  res.json({results: state});
});
