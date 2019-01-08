var socket = io();

socket.on('connect', function(){
  var params = $.deparam(window.location.search);

  socket.emit('join', params, function(err){
    if (err) {
      $('#errorMessage').html(err);
      $('#errorDisplay').click();
     setTimeout(function(){ window.location = "/";}, 3000);
    }
    else {

      $('#serverMessage').html('Your messanger is connected');
      return;
    }
  });

});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
  $('#serverMessage').html('Your messanger is disconnect');
});

socket.on('loadUser', function(userList){
  userList.forEach(function(user){
    var template = $('#userListItem-template').html();
    var html = Mustache.render(template,{
      name: user
    });
    $('#userList').html(html);
  });
});

socket.on('newChatMessage', function(message){
  var template = $('#message-template').html();
  var html = Mustache.render(template,{
    text: message.messageText,
    time: moment(message.messageCreatedAt).calendar(),
    image: message.messageImage
  });
  $('#messageList').append(html);
  scroll();
});

socket.on('newLocationMessage', function(message){
  var formatedTime = moment(message.messageCreatedAt).calendar()
  var template = $('#locationMessage-template').html();
  var html = Mustache.render(template,{
    time: moment(message.messageCreatedAt).calendar(),
    image: message.messageImage
  });
  $('#messageList').append(html);

  $('#theTarget').on('click', function () {
    var map = new google.maps.Map(document.getElementById("map_div"), {
      center: new google.maps.LatLng(message.latitude,message.longitude),
      zoom:18
    });
      google.maps.event.trigger(map, "resize");
  });
scroll();
});


function sendMessage(){
  var SendToId = $('#chatterId').val()
  var TheMessage = $('#message').val();

  if (SendToId != '' && TheMessage !=  '') {
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
    $('#serverMessage').html('No recipient selected or no message entered');
  };
  scroll();
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

  locationButton.attr('disabled','disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position){
    locationButton.removeAttr('disabled').html('<i class="fas  fa-globe"></i>Send location');
    socket.emit('sendMyLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function(){
    locationButton.removeAttr('disabled').html('<i class="fas  fa-globe"></i>Send location');
    return alert('Unable to featch your location');
  })
});

function scroll(){
  var wtf = $('#messageList');
  var newMessage = wtf.children('li:last-child')
  var scrollHeight = wtf[0].scrollHeight;
  var clientHeight = wtf[0].clientHeight;
  var scrollTop = wtf[0].scrollTop;
  var messageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + messageHeight + lastMessageHeight >= scrollHeight) {
      wtf.scrollTop(scrollHeight);
  };
};
