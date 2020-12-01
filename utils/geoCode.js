const request = require('request');

const geoCode = (address, callBack) => {
     address = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWxvbGFuaXRhZyIsImEiOiJja2g1dHZyZHowMGt5MnFveDhyMG02NzJzIn0.6mODUSmKmup1Ic2ucFI7Ug&limit=1`
    request({url, json:true}, (error, response) => {
        if(error){
            callBack("Network Service is Unavailable")
        }else{
            if(response && response.body.features.length === 0){
                callBack(undefined, "No matching location. Kindly try another search")
            }else{
                callBack(undefined, {
                     longitude : response.body.features[0].center[0],
                     latitude  : response.body.features[0].center[1],
                     location: response.body.features[0].place_name
                })
            }
        }
    })
  }

  module.exports = geoCode;