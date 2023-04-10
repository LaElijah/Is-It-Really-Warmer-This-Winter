const dayjs = require('dayjs');

/**
 * 
 * @param {*} date  The date to get weather data for
 * @param {*} days  The number of days to compare the date to
 * @returns  Returns the number of days between the date and the current date minus the number of days specified
 */
function requestPeriod(date, days) {
  const requestDate = dayjs(date);
  const currentDate = dayjs();
  const daysAgo = currentDate.subtract(days, 'day');
  const periodInMilliseconds = daysAgo.diff(requestDate);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysOfPeriod = periodInMilliseconds / millisecondsPerDay;
  return daysOfPeriod;
}


module.exports = { requestPeriod: requestPeriod };