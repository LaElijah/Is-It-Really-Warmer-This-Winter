const path = require('path')
const express = require('express')
const app = express()
const port = 4000



const { assignHistoryData, assignCurrentData } = require('./weatherUtils/states')

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




