/*
  message.js
  message data structure file
*/

var generateMessage = (fromid, text) => {
  return {
    messageImage: 'New User Image',
    messageText: text,
    fromChaterId: fromid,
    messageCreatedAt: new Date().getTime()
  };
}

module.exports = {generateMessage};
