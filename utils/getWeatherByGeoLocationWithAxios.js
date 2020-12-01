const axios = require('axios')
const apiKey = "210a56654019e4f42b67b2a316a4d3bd"


const axiosGetWeatherByGeolocation = ({longitude, latitude, location}, callBack) => {
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${longitude}&lon=${latitude}&appid=${apiKey}`
//check if geolocation was provided
if(!(longitude && latitude)){
    return callBack("No geolocation details provided!")
}
axios.get(url)
.then(res => callBack(undefined, res))
.catch(err => callBack(err))
}

module.exports = axiosGetWeatherByGeolocation;