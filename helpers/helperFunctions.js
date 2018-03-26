
const request = require("request");
const validations = require("./validations");
const config = require("../config/foursquare");

const Json2csvParser = require("json2csv").Parser;

const getCurrentDate = function(){
    let date = new Date();

    let dd = date.getDate();
    if (dd < 10) dd = "0" + dd;
  
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;
  
    var yy = date.getFullYear();
    if (yy < 10) yy = "0" + yy;
  
    return yy  + mm +  dd;
}

const getFieldsFormApi = function (bodyStr) {
    const responseObj = JSON.parse(bodyStr);
    return responseObj.response.groups[0].items.map(item => ({
        Name: item.venue.name,
        City: item.venue.location.city,
        Street: item.venue.location.address,
        Latitude: item.venue.location.lat,
        Longitude: item.venue.location.lng
    }))
}

// get inputs data

exports.processInputsData =  function (data) {
    try {
        return {
            venueType:  validations.validateName(data.query),
            radius:     validations.validateRadius(data.radius),
            latitude:   validations.validatePoint(data.latitude),
            longitude:  validations.validatePoint(data.longitude)
        }
      
   
    }
    catch (err) {
        const expectedInput = "please input correct data";
        throw new Error("Incorrect input parameter: "+ err.message +"\nExpected:\n" + expectedInput);
    }
}
  

//get data from Foursquare API


exports.getFoursquareApiData =  function(data) {

    return new Promise (function(res,rej){
        request({
            url: "https://api.foursquare.com/v2/venues/explore",
            method: "GET",
            qs: {
                client_id: config.CLIENT_ID,
                client_secret: config.CLIENT_SECRET,
                ll: data.latitude + "," + data.longitude,
                radius: data.radius,
                query: data.venueType,
                v: getCurrentDate()
            }
        }, (err, r, body) => {
            err ? rej(err) : res(getFieldsFormApi(body));
        });
    
    })
    
      
}
    
exports.getResponseCSVVenue = function ( data ) {

    const columnNames = ["Name", "City", "Street", "Latitude", "Longitude"];


    const json2csvParser = new Json2csvParser({ columnNames,quote: " " });
    const csv = json2csvParser.parse(data);
        
    const responseCsv = {
        statusCode: 200,
        headers: {"Content-Type" : "text/csv; charset=utf-8"},
        body:csv
    };
          
    return responseCsv;

}