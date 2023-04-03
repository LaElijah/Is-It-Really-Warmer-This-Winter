
const express = require('express');
const router = express.Router();
const { WeatherTrends } = require("../weatherUtils/WeatherInfo");
const { states } = require("../weatherUtils/states");




router.get('/:date', async (req, res) => {
    const { date } = req.params; // gets date from url

    try {
        const response = await WeatherTrends.getAllTrends(date)
        res.json({ results: response });
    } catch (error) {
        res.json({ results: error });
    }
});

router.get('/:state/:date', async (req, res) => {
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