// index.js
const { fetchMyIP } = require('./iss');

fetchMyIP((errMsg, ip) => {
  
  if (errMsg) {
    console.log("It didn't work!" , errMsg);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});
