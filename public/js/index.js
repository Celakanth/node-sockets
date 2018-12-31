var socket = io();

socket.on('connect', function(){
  console.log('connect to server');
});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

socket.on('newChatMessage', function(message){
  console.log('New chat message has arrived', message);
});

function sendMessage(){
  var SendToId = $('#chatterId').val()
  var TheMessage = $('#message').val();
  if (SendToId != '') {
    socket.emit('createMessage',{
        messageText: TheMessage,
        SendChaterId: SendToId
      }, function(messageData){
          console.log('Got the message');
          $('#serverMessage').html(messageData);
      });
    $('#message').val('');
      $('#serverMessage').html('');
  }
  else{
    $('#serverMessage').html('No recipient selected');
  };
}

function SetTalker(chaterId){
  var oldClassId = $('#chatterId').val();
  if (oldClassId != '') {
    $('#' + oldClassId).removeClass('active');
    $('#' + chaterId).addClass('active');
  }
  else{
    $('#' + chaterId).addClass('active');
  }
  $('#chatterId').val(chaterId);
};

$(document).ready(function(){
    $('#action_menu_btn').click(function(){
    $('.action_menu').toggle();
  });
});
