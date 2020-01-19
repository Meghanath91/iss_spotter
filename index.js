// index.js

const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = ((passTimes) => {
  // success, print out the deets!
console.log("It worked here is the passTimes",passTimes);


})

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
 printPassTimes(passTimes);
  
});

