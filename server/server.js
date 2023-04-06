const path = require('path')
const express = require('express')
const app = express()
const port = 4000
const weather = require('./routes/weather.js')

// Use the imported routes

app.use('/weather', weather);


app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});




