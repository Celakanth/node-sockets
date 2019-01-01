/*
  time.js
  time formating
  time is an int 0 = 1st Jan 1970 00:00.00 every 1000 is 1 second.
*/
const moment = require('moment');
var theDate = moment().format('Do of MMM YYYY, h:mm a');

var theTime = moment().format('h:mm:ss a');
var prityDate = moment(new Date(), "YYYYMMDD").fromNow();
var startOfDay = moment().startOf('year').fromNow();

console.log(theDate, prityDate, startOfDay, theTime);
