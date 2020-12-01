const axios = require("axios");

const getGeoCodeWithAxios = (address, callBack) => {
    const geoLocationData = {};
    //encode address
    address = encodeURIComponent(address)
    //get url
    //add address to url
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWxvbGFuaXRhZyIsImEiOiJja2g1dHZyZHowMGt5MnFveDhyMG02NzJzIn0.6mODUSmKmup1Ic2ucFI7Ug&limit=1`  
    //check if address exist
    if(address){
        axios.get(url)
        .then((res) => {
            if(res && res.data.features.length < 1){
                return "There are no matches for your search location"
            }else{
                geoLocationData.longitude = res.data.features[0].center[0];
                geoLocationData.latitude = res.data.features[0].center[1];
                geoLocationData.location = res.data.features[0].place_name;
                 callBack(undefined, geoLocationData)
            }
        })
        .catch(err => callBack("No internet connection error"))
    }else{
        callBack( "Enter a valid address!")
    }
    //if true, make axios call, else tell user to type valid address
}
module.exports = getGeoCodeWithAxios;