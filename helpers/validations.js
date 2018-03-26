var validator = require('validator');


exports.validateName = function(name){
    if (validator.isLength(name, {min:3, max: 20})){
        return name;
    } else {
        throw new Error('incorrect name')
    }
}


exports.validateRadius = function(radius){
   if(!isNaN(radius))
    return radius<1  ? 1000 : radius * 1000
    else {
        throw new Error ('incorrect radius')
    }

}


exports.validatePoint = function(point){
    if(Number(point)) {
		coordinate = Number(point).toFixed(6)
	}
	if (new RegExp(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/).exec(point))
		return point
	else
		throw new Error('point X is incorrect')
}

