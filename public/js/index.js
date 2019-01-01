var socket = io();

socket.on('connect', function(){
  console.log('connect to server');
  $('#serverMessage').html('Your messanger is connected');
});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
  $('#serverMessage').html('Your messanger is disconnect');
});

socket.on('newChatMessage', function(message){
  //console.log('New chat message has arrived', message);
  var li = $(`<li class="d-flex justify-content-end mb-4"><div class="msg_cotainer_send">${message.messageText}<span class="msg_time_send">${message.messageCreatedAt}</span></div><div class="img_cont_msg"><img src='${message.messageImage}' /></div></li>`);
  $('#messageList').append(li);
});

socket.on('newLocationMessage', function(message){
  var li = $(`<li class="d-flex justify-content-end mb-4"><div class="msg_cotainer_send"><a id='theTarget' href='/' data-toggle="modal" data-target="#myModal">I am here </a><span class="msg_time_send">${message.messageCreatedAt}</span></div><div class="img_cont_msg"><img src='${message.messageImage}' /></div></li>`);
  $('#messageList').append(li);

  $('#theTarget').on('click', function () {
    alert('Hello');
    var map = new google.maps.Map(document.getElementById("map_div"), {
      center: new google.maps.LatLng(message.latitude,message.longitude),
      zoom:18
    });
      google.maps.event.trigger(map, "resize");
  });

});


function sendMessage(){
  var SendToId = $('#chatterId').val()
  var TheMessage = $('#message').val();
  if (SendToId != '') {
    socket.emit('createMessage',{
        messageText: TheMessage,
        SendChaterId: SendToId
      }, function(messageData){
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

$('#message-form').on('submit', function(e){
  e.preventDefault();

  sendMessage();
});

var locationButton = $('#send-location');

locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alet('Geolocation not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition(function (position){
    socket.emit('sendMyLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function(){
    return alert('Unable to featch your location');
  })
});
