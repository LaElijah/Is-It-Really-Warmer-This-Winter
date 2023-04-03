const express = require('express');
const router = express.Router();
const { WeatherInfo } = require("../weatherUtils/WeatherInfo");
const { states } = require("../weatherUtils/states");


// Endpoint to get the state array
router.get('/', async (req, res) => { // returns an array of objects
    try {
        const response = await WeatherInfo.getAllInfo()
        res.json({ results: response });
    } catch (error) {
        res.json({ results: error });
    }

});

router.get('/:state', async (req, res) => { // returns an array of objects
    const state = states.find(state => state.name === req.params.state);
    try {
        const response = await WeatherInfo.getInfo(state)
        res.json({ results: response });
    } catch (error) {
        res.json({ results: error });
    }

});



// Export the router
module.exports = router;