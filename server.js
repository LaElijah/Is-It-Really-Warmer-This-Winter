const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const weather = require('./routes/weather.js')
require('dotenv').config();


// Use the imported routes

app.use('/weather', weather);


app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', "index.html"));
});

app.get("/healthy", (req, res) => {
  res.status(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});




