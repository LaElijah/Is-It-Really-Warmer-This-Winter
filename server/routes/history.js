const express = require('express');
const router = express.Router();
const { WeatherInfo, WeatherTrends } = require("../weatherUtils/WeatherInfo");
const { states } = require("../weatherUtils/states");




router.get('/:date', async (req, res) => { // returns specific array
        
    try {
        const { date } = req.params; // gets date from url

        const response = await WeatherInfo.getAllHistoricalInfo(date)
        res.json({ results: response });
    } catch (error) {
        res.json({ results: error });
    }
});




router.get('/:state/:date', async (req, res) => { // returns specific array

    try {
        const { date } = req.params; // gets date from url
        const state = states.find(state => state.name === req.params.state);

        const response = await WeatherInfo.openWeatherAPI(state, date)
        res.json({ results: response });
    } catch (error) {
        res.json({ results: error });
    }
});



// Export the router
module.exports = router;