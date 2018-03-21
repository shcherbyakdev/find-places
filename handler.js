'use strict';

module.exports.getVenues = (event, context, callback) => {


const inputs = inputsData(JSON.parse(event.body));


  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Success!',
      input: inputs,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};


// get inputs data

function inputsData (data) {
  try {
    return {
			venueType:  data.query,
			radius:     data.radius,
			latitude:   data.latitude,
			longitude:  data.longitude
		}
  }
  catch (err) {
		const expectedInput = 'please input correct data';
		throw new Error('Incorrect input parameter: '+ err.message +'\nExpected:\n' + expectedInput);
	}
}