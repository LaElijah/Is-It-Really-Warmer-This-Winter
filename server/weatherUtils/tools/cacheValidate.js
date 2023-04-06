
const Redis = require('ioredis');


/**
 * 
 * @param {*} key  The key to use for the cache
 * @param {*} callback  The function to call if the cache is empty
 * @returns  Returns the data from the cache or the callback function
 */


async function cacheValidate(key, callback) {

  const client = new Redis();

  try {


    const data = await client.get(key);


    if (data !== null) {
      await client.quit();
      return JSON.parse(data)
    }
    
    const result = await callback();
    await client.setex(key, 3600, JSON.stringify(result));
    await client.quit();
    return result;
  } catch (err) {
    console.error('Error in cacheValidate:', err);
    await client.quit();
    throw err;
  }
}

module.exports = { cacheValidate: cacheValidate };
