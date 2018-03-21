'use strict';
const request = require('request');
const validations = require('./helpers/validations');




module.exports.getVenues = (event, context, callback) => {


const inputs = inputsData(JSON.parse(event.body));

foursquareApiData(inputs).then(function(data){

  const response = {
    statusCode: 200,
    body: JSON.stringify({
    message: data
    }),
  };
  
  callback(null, response);

})



};


// get inputs data

function inputsData (data) {
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
          client_id: 'IHPFHD2EUYEWT0SXBBCTY45W54JT4YPU2TTDYMGV5LEPCUUW',
          client_secret: 'CUYH3G2JUNOOZOHD22MRRCH4VVYDCMCBHYEMSVGCIRVRHWDC',
          ll: data.latitude + ',' + data.longitude,
         radius: data.radius,
          query: data.venueType,
          v: currentDate()
      }
      }, (err, r, body) => {
        err ? rej(err) : res(getFieldsFormApi(body));
      });
  
  })
  
    
  }

  //get current date
function currentDate() {
  let date = new Date();

  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getFullYear();
  if (yy < 10) yy = '0' + yy;

  return yy  + mm +  dd;
}

function getFieldsFormApi(bodyStr) {
	const responseObj = JSON.parse(bodyStr);
	return responseObj.response.groups[0].items.map(item => ({
		Name: item.venue.name,
		City: item.venue.location.city,
		Street: item.venue.location.address,
		Latitude: item.venue.location.lat,
		Longitude: item.venue.location.lng
	}))
}