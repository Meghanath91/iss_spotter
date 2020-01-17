/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API

  const request = require('request');
  request('https://api.ipify.org/?format=json', (error, response, body) => {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received


    if (response.statusCode !== 200) {
      callback(`statusCode is ${response.statusCode} error is ${error}`,null);
    }  else {
      const dataIP = JSON.parse(body).ip;

      const fetchCoordsByIP = (IpAddress) => {
        request(`https://ipvigilante.com/${IpAddress}`,(error,response,body) => {
          //console.log('error:',error);
          //console.log('statusCode :', response&& response.statusCode);
          if(response.statusCode !== 200){
            callback(`statusCode is ${response.statusCode} error is ${error}`,null)
          } else {
            const coordinateOfIp = JSON.parse(body)
            const latitude = (coordinateOfIp.data.latitude);
            const longitude = (coordinateOfIp.data.longitude);
            console.log(`latitude: ${latitude} & longitude : ${longitude} `)
          }
        })
        };
        fetchCoordsByIP(dataIP);

      callback(null,dataIP);
    }
  });
  

};


module.exports = { fetchMyIP };
