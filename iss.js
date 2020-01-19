// iss.js 

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const request = require('request');
const nextISSTimesForMyLocation = function(callback) {

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (response.statusCode !== 200) {
      callback(`statusCode is ${response.statusCode} error is ${error}`,null);
    }  else {
      const dataIP = JSON.parse(body).ip;
      const fetchCoordsByIP = (IpAddress) => {
        request(`https://ipvigilante.com/${IpAddress}`,(error,response,body) => {
          if(response.statusCode !== 200){
            callback(`statusCode is ${response.statusCode} error is ${error}`,null)
          } else {
            const coordinateOfIp = JSON.parse(body)
            const latitude = (coordinateOfIp.data.latitude);
            const longitude = (coordinateOfIp.data.longitude);
            const coordinateObj = { 'latitude' : latitude, 'longitude' : longitude}
           // console.log(`latitude: ${latitude} & longitude : ${longitude} `)
            if(response.statusCode !== 200 ) {
              callback(`statusCode is ${response.statusCode} error is ${error}`,null)
            } else {
              const fetchISSFlyOverTimes = (coordinates,callback) => {
                if(response.statusCode !== 200) {
                  callback(`statusCode is ${response.statusCode} error is ${error}`,null)
                }
                request(`http://api.open-notify.org/iss-pass.json?lat=${coordinates.latitude}&lon=${coordinates.longitude}`,(error,response,body) => {
                  //console.log('error',error);
                  console.log('New JSON OBJ',JSON.parse(body))
                  return(JSON.parse(body).response);
                });
              };
              fetchISSFlyOverTimes(coordinateObj);
            }
          }
        });
        };
        fetchCoordsByIP(dataIP);  
      callback(null,dataIP);
    };
    
  });
};
fetchMyIP(callback);

  
}


module.exports = { nextISSTimesForMyLocation };