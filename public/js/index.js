
function scrollToBottom() {
    // Selector
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight > scrollHeight) {
        messages.scrollTop(scrollHeight);
    }

}

    var socket = io();
    socket.on('connect', function() {
        console.log('Connected to server');
    })
    socket.on('disconnect', function() {
        console.log('Disconnected from server');
    })

    socket.on('newMessage', function (message) {
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var template = $("#message_template").html();
        var html = Mustache.render(template, {
            from: message.from,
            text: message.text,
            createdAt: formattedTime
        });

        $("#messages").append(html);
        scrollToBottom();
    });

    socket.on('newLocationMessage', function(message) {
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var template = $("#location_message_template").html();
        var html = Mustache.render(template, {
            from: message.from,
            url: message.url,
            createdAt: formattedTime
        });

        $("#messages").append(html);
        scrollToBottom();
    });

    var messageTextbox = $('[name=message]');
    $('#message-form').on('submit', function(e) {
        e.preventDefault();
        socket.emit('createMessage', {
            from: 'User',
            text: messageTextbox.val()
        }, function() {
            messageTextbox.val('');
        });
    });

    var locationButton = $("#send-location");

    locationButton.on('click', function() {
        if(!navigator.geolocation)
        {
            return alert('Your browser does not support geolocation');
        }
        locationButton.attr('disabled', 'disabled').text('Sending location...');
        navigator.geolocation.getCurrentPosition(function(position) {
            locationButton.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function() {
            locationButton.removeAttr('disabled').text('Send location');
            alert('Unable to fetch location');
        });
    });