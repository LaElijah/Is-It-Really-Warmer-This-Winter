const express = require('express');
const router = express.Router();
const { WeatherInfo } = require("../weatherUtils/WeatherInfo");
const { states } = require("../weatherUtils/states");
const { dateModifier } = require("../weatherUtils/tools/dateModifier");





// Endpoint to get the state array
router.get('/', async (req, res) => { // returns an array of objects
    
    try {
        
        const response = await WeatherInfo.getAllInfo()
        
        res.json({ results: response });
    } catch (error) {
        res.json({ results: error });
    }

});

router.get('/:date', async (req, res) => { // returns an array of objects
    console.log(req.params.date)
    try {
        
        const response = await WeatherInfo.getAllInfo(req.params.date)
        
        res.json({ results: response });
    } catch (error) {
        res.json({ results: error });
    }

});



router.get('/:state', async (req, res) => { // returns an array of objects
    
        const state = states.find(state => state.name === req.params.state);
       
        const weather = await WeatherInfo.getInfo(state)
        

    res.json({ results: weather });
});

router.get('/:state/:date', async (req, res) => { // returns an array of objects
    
    const { formattedDate } = dateModifier(req.params.date); // gets date from url
    const state = states.find(state => state.name === req.params.state);
   
    const weather = await WeatherInfo.getInfo(state, formattedDate)
    

res.json({ results: weather });
});

// TODO: Add a route to get the weather for a date range





// Export the router
module.exports = router;