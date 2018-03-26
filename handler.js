"use strict";

const helpers = require("./helpers/helperFunctions");

module.exports.getVenues = (event, context, callback) => {

    try {
        const inputs = helpers.processInputsData(JSON.parse(event.body));
        helpers.getFoursquareApiData(inputs).then(function(data){
            const response = helpers.getResponseCSVVenue(data);

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



