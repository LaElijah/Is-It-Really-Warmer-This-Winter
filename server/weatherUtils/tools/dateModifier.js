
const dayjs = require('dayjs');


/**
 * 
 * @param {*} date  The date to get weather data for
 * @returns  Returns an object with the year, month, day, hour, and formatted date
 */
function dateModifier(date) {
    const dateObject = dayjs(date);
    const year = dateObject.year();
    const month = dateObject.format('MM');
    const day = dateObject.format('DD');
    const hour = dateObject.hour();
    const formattedDate = `${year}-${month}-${day}`;
  
    return { year, month, day, hour, formattedDate };
  }

  module.exports = { dateModifier: dateModifier };