'use strict';
const request = require('request');
const helpers = require('./helpers/helperFunctions');
const validations = require('./helpers/validations');
const Json2csvParser = require('json2csv').Parser;
const config = require('./config/foursquare');


module.exports.getVenues = (event, context, callback) => {

try{
 const inputs = inputsData(JSON.parse(event.body));


foursquareApiData(inputs).then(function(data){

const columnNames = ["Name", "City", "Street", "Latitude", "Longitude"];


const json2csvParser = new Json2csvParser({ columnNames,quote: ' ' });
const csv = json2csvParser.parse(data);

  const response = {
    statusCode: 200,
    headers: {'Content-Type' : 'text/csv; charset=utf-8'},
    body: JSON.stringify({
    message: csv
    }),
  };
  
  callback(null, response);

})
}catch(err) {
  const response = {
    statusCode: err.code || 500,
    headers: { "Content-Type": "text/plain" },
    body: String(err)
  };
  callback(null, response);
}




};


// get inputs data

const inputsData =  function (data) {
  try {
    return {
			venueType:  validations.validateName(data.query),
			radius:     validations.validateRadius(data.radius),
			latitude:   validations.validatePoint(data.latitude),
			longitude:  validations.validatePoint(data.longitude)
    }
    
 
  }
  catch (err) {
		const expectedInput = 'please input correct data';
		throw new Error('Incorrect input parameter: '+ err.message +'\nExpected:\n' + expectedInput);
	}
}

//get data from Foursquare API


 const foursquareApiData =  function(data) {

  return new Promise (function(res,rej){
      request({
      url: 'https://api.foursquare.com/v2/venues/explore',
      method: 'GET',
      qs: {
          client_id: config.CLIENT_ID,
          client_secret: config.CLIENT_SECRET,
          ll: data.latitude + ',' + data.longitude,
         radius: data.radius,
          query: data.venueType,
          v: helpers.currentDate()
      }
      }, (err, r, body) => {
        err ? rej(err) : res(helpers.getFieldsFormApi(body));
      });
  
  })
  
    
  }
