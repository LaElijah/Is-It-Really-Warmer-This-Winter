const path = require('path')
const express = require('express')
const app = express()
const port = 4000



const { assignHistoryData, getLastYear, states, assignData } = require('./weatherUtils')

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', "index.html"));
});







// State array
// Function to get weather information for a state



// Call assignData() to populate the state array

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


// Endpoint to get the state array
app.get('/temperature/current', async (req, res) => {
  const response = await assignData()
  res.json({results: response});
});

app.get('/temperature/:date', async (req, res) => {
  
  const { date } = req.params;

  // create a Date object from the date parameter
  const searchDate = date;
  const response = await assignHistoryData(searchDate)
  res.json({results: response});
});

app.get('/temperature/difference/', async (req, res) => {
  
  

  // create a Date object from the date parameter;
  const currentData = await assignData()
  const pastData = await assignHistoryData()
  currentData.sort((a, b) => a.name.localeCompare(b.name));
  pastData.sort((a, b) => a.name.localeCompare(b.name));
  
  
  const response = currentData.map((data, i) => pastData[i].temperature - data.temperature);
  res.json({results: response});
});

