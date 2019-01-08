/*
  message.js
  message data structure file
*/
const moment = require('moment');

var generateMessage = (theSender, fromid, text) => {
  return {
    messageImage: 'New_User_Image',
    messageText: text,
    fromChaterId: fromid,
    messageFrom: theSender,
    messageCreatedAt: moment().valueOf()
  };
};

var generateLocationMessage = (theSender, fromId, latitude, longitude) => {
  return {
    messageImage: 'New_user_image',
    latitude,
    longitude,
    fromChaterId: fromId,
    messageFrom: theSender,
    messageCreatedAt: moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocationMessage};
