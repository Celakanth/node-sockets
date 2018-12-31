/*
  message.js
  message data structure file
*/

var generateMessage = (fromid, text) => {
  var TheSender = 'Christian';
  return {
    messageImage: 'New User Image',
    messageText: text,
    fromChaterId: fromid,
    messageFrom: TheSender,
    messageCreatedAt: new Date().getTime()
  };
}

module.exports = {generateMessage};
