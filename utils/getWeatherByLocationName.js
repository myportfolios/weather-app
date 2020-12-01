
const request = require('request')
const chalk = require('chalk')

const getWeatherByLocationName = (location, callBack) => {
    const apiKey = "210a56654019e4f42b67b2a316a4d3bd"
//Get current weather by city name
const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&apiKey=${apiKey}`
    request({url, json:true}, (error, response) => {
        if(error){
            callBack("The network service is unavailable")
        }else if(response && response.body.message){
            callBack(undefined, response.body.message)
        }else{
            const temperature = response.body.main.temp;
            const rain = response.body.clouds.all
            console.log(chalk.green.bold(`It is currently ${temperature} degrees out. There is ${rain}% chance of rain`))
        }
    })
}

module.exports = getWeatherByLocationName