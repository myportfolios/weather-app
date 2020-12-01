/**
 * express is used to create a Server which responds to http request from client 
 * it handles all routing calls to various pages and files hosted on our server
 */
const express = require('express')
const hbs = require('hbs')
const chalk = require('chalk')

const app = express()
const port = process.env.PORT || 3000


const path = require('path');

// const geoCode = require("./utils/geoCode")
const geoCode = require("../utils/getGeoCodeWithAxios");


const getWeatherByGeoLocation = require("../utils/getWeatherByGeoLocationWithAxios")

//use "path" core module to  configure an absolute route/path for a whole directory e.g public
//This directory will be served up to express and used for routing and displaying static contents
/**
 * Define paths for Express congig
 * viewsPath - used to change/configure the default view folder"views"  to "someFolderName"
 */
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

/**
 * using hbs as default view engine require this line of code 'app.set('view engine', 'hbs')
 * to dsiplay the files, we use 'res.render(name of hbs file)' instead of res.send()
 * note:ensure that the 'views' folder is created directly on the root folder - in this case "web-server" 
 */
//setup handlebars template engine and views location
app.set('view engine', 'hbs')
app.set("views", viewsPath) //needed to configure or change view folder from default (views) to "someFolderName"
hbs.registerPartials(partialsPath) // needed to direct Express to the partials folder

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


//render index page
app.get("", (req,res) => {
  res.render("index",{
      title:"Weather",
      name:"Alexander Agunbiade"
      
  })
})
//render about page
app.get("/about", (req, res) => {
    res.render("about", {
        title:"About",
        name:"Alexander Agunbiade"
    })
})

//render help page

app.get("/help", (req,res) => {
res.render("help",{
    helpText:"This is some helpful text",
    title:"Help",
    name:"Alexander Agunbiade"
})
})

// render weather page
// update weather endpoint to accept address
app.get("/weather", (req,res) => {
    //check if address string was provided, return error msg if not
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }
    //geoCode function runs if and only if address  was provided
    //pattern above is similar to an if else statement
    geoCode(req.query.address, (error, data) => {
        //check if error exist and return it if true
        if(error){
            return res.send(error)
        }
        //getWeatherByGeoLocation function runs if and only if error  is false
    //pattern above is similar to an if else statement
        getWeatherByGeoLocation(data, (error, response) => {
            const location = data.location;
            //return error from api call if it exist
            if(error){
                return res.send(error)
            }
            //manipulate the response if error doesn't exist and send the response obj
            const responseData = response.data;
            responseData.address = req.query.address;
            res.send({
                forecast:`Currently ${responseData.weather[0].description} in ${location}. It is ${responseData.main.temp} degrees out but feels like ${responseData.main.feels_like} degrees.`,
                // forecast:{
                //     weather:responseData.weather[0].description,
                //     feel:responseData.main.feels_like,
                //     humidity:responseData.main.humidity,
                //     windSpeed:responseData.wind.speed,
                //     temperature:responseData.main.temp
                // },  
                location
            })
        })
    })
})


//render 404 for help resource
app.get("/help/*", (req,res) => {
res.render("404",{
    title:"404 Help",
    name:"Alexander Agunbiade",
    error:"The help article not found."
})
})

//render generic 404 page
app.get("*", (req,res) => {
    res.render("404",{
        title:"404",
        name:"Alexander Agunbiade",
        error:"Page not found!"
    })
})

app.listen(port, () => {
    console.log(chalk.red.bold("Server started on port " + port))
})





