exports.currentDate = function(){
    let date = new Date();

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    var yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;
  
    return yy  + mm +  dd;
}

exports.getFieldsFormApi = function (bodyStr) {
    const responseObj = JSON.parse(bodyStr);
	return responseObj.response.groups[0].items.map(item => ({
		Name: item.venue.name,
		City: item.venue.location.city,
		Street: item.venue.location.address,
		Latitude: item.venue.location.lat,
		Longitude: item.venue.location.lng
	}))
}