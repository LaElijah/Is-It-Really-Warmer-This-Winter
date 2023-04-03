const express = require('express');
const router = express.Router();
const { WeatherInfo, WeatherTrends } = require("../weatherUtils/WeatherInfo");
const { states } = require("../weatherUtils/states");


// Endpoint to get the state array
router.get('/current', async (req, res) => { // returns an array of objects
    try {
        const response = await WeatherInfo.getAllInfo()
        res.json({ results: response });
    } catch (error) {
        res.json({ results: error });
    }

});

router.get('/current/:state', async (req, res) => { // returns an array of objects
    const state = states.find(state => state.name === req.params.state);
    try {
        const response = await WeatherInfo.getInfo(state)
        res.json({ results: response });
    } catch (error) {
        res.json({ results: error });
    }

});




router.get('/history/:date', async (req, res) => { // returns specific array

    try {
        const { date } = req.params; // gets date from url

        const response = await WeatherInfo.getAllHistoricalInfo(date)
        res.json({ results: response });
    } catch (error) {
        res.json({ results: error });
    }
});




router.get('/history/:state/:date', async (req, res) => { // returns specific array

    try {
        const { date } = req.params; // gets date from url
        const state = states.find(state => state.name === req.params.state);

        const response = await WeatherInfo.openWeatherAPI(state, date)
        res.json({ results: response });
    } catch (error) {
        res.json({ results: error });
    }
});






router.get('/trends/:date', async (req, res) => {
    const { date } = req.params; // gets date from url

    try {
        const response = await WeatherTrends.getAllTrends(date)
        res.json({ results: response });
    } catch (error) {
        res.json({ results: error });
    }
});

router.get('/trends/:state/:date', async (req, res) => {
    const { date } = req.params; // gets date from url
    const state = states.find(state => state.name === req.params.state);

    try {
        const response = await WeatherTrends.getTrends(state, date)
        res.json({ results: response });
    } catch (error) {
        res.json({ results: error });
    }
});





// Export the router
module.exports = router;
