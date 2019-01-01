/*
  message.js
  message data structure file
*/
const moment = require('moment');

var generateMessage = (fromid, text) => {
  var TheSender = 'Christian';
  return {
    messageImage: 'New_User_Image',
    messageText: text,
    fromChaterId: fromid,
    messageFrom: TheSender,
    messageCreatedAt: moment().valueOf()
  };
};

var generateLocationMessage = (fromId, latitude, longitude) => {
  var TheSender = 'Christian';
  return {
    messageImage: 'New_user_image',
    latitude,
    longitude,
    fromChaterId: fromId,
    messageFrom: TheSender,
    messageCreatedAt: moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocationMessage};
