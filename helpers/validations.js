var validator = require("validator");


exports.validateName = function(name){
    if   ((typeof name === "string") && validator.isLength(name, {min:3, max: 20})){
        return name;
    } else {
        const errV = new Error("incorrect name");
        errV.code = 400;
        throw  errV
    }

}


exports.validateRadius = function(radius){
    if(!isNaN(radius)){
        if(radius>0 && radius < 1000){
            radius*=1000;
            return radius;
        }
    
    }
       
    const errV = new Error("incorrect radius");
    errV.code = 400;
    throw  errV
    

}


exports.validatePoint = function(point){
    let coordinate;
    if(Number(point)) {
        coordinate = Number(point).toFixed(6);
    }
    if (new RegExp(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/).exec(coordinate))
        return point;
    else{
        const errV = new Error("incorrect coordinates");
        errV.code = 400;
        throw  errV
    }
}

