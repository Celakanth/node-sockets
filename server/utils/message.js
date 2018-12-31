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
}

module.exports = {generateMessage};
