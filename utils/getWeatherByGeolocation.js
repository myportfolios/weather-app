const request = require('request');

/**
 * 
 * @param {Object} geoLocation 
 * @param {function} callBack 
 */
 const getWeatherByGeolocation = (geoLocation, callBack) => {
    const apiKey = "210a56654019e4f42b67b2a316a4d3bd"
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.longitude}&lon=${geoLocation.latitude}&appid=${apiKey}`
    request({url, json:true}, (error, response) => {
      if(error){
          callBack(error)
      }else{
          callBack(undefined, response.body)
      }
  })
}
module.exports = getWeatherByGeolocation