/*
  message.js
  message data structure file
*/

var generateMessage = (fromid, text) => {
  var TheSender = 'Christian';
  return {
    messageImage: 'New_User_Image',
    messageText: text,
    fromChaterId: fromid,
    messageFrom: TheSender,
    messageCreatedAt: new Date().getTime()
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
    messageCreatedAt: new Date().getTime()
  };
};

module.exports = {generateMessage, generateLocationMessage};
