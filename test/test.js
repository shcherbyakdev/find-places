const validations = require('../helpers/validations');
const helpersFunctions = require('../helpers/helperFunctions');


describe('Validation inputs',()=> {
    describe('name',()=>{
        test('is type of name-field equals string', ()=> {
            expect(validations.validateName('museum')).toBe('museum');
         })
    })
    describe('radius',()=>{
        test('is radius comvert to meters', ()=>{
            expect(validations.validateRadius(100)).toBe(100000);
        })
        test('is radius number', () =>{
            expect(validations.validateRadius('100')).not.toBe(10000);
        })
  
   })

   describe('coordinates',()=>{
       test('is coordinates fixed', () => {
           expect(validations.validatePoint(40.7)).toBe(40.700000);
       })

       test('is coordinate number', ()=> {
           expect(validations.validatePoint('40.7')).not.toBe(40.700000);
       } )
   })

   
})

    describe('Get inputs from user', ()=> {
        test('if function return validate object', ()=> {
            expect(helpersFunctions.processInputsData({"query": "museum",
            "radius": 100,
            "latitude": 40.7,
            "longitude": -74.01})).toEqual({"venueType": "museum",
            "radius": 100000,
            "latitude": 40.700000,
            "longitude": -74.010000})
        })

    })





