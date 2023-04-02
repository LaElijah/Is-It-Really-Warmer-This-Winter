const express = require('express');
const router = express.Router();
const { currentData } = require('./weatherUtils/distributedApiAttemp')



// Endpoint to get the state array
router.get('/temperature/current', async (req, res) => {
    const response = await assignCurrentData()
    res.json({ results: response });
});

router.get('/temperature/:date', async (req, res) => {

    const { date } = req.params;

    // create a Date object from the date parameter
    const searchDate = date;
    const response = await assignHistoryData(searchDate)
    res.json({ results: response });
});

router.get('/temperature/difference/', async (req, res) => {



    // create a Date object from the date parameter;
    const currentData = await assignCurrentData()
    const pastData = await assignHistoryData()
    currentData.sort((a, b) => a.name.localeCompare(b.name));
    pastData.sort((a, b) => a.name.localeCompare(b.name));


    const response = currentData.map((data, i) => pastData[i].temperature - data.temperature);
    res.json({ results: response });
});
// Export the router
module.exports = router;
