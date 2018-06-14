
    var socket=io();
    socket.on('connect',function(){
        console.log("connected to server");
socket.emit('createMessage',{
    from:"pallavi",
    text:'hello how are you'
})
    });
    socket.on('disconnect',function(){
console.log("disconnected from server");

    });
    socket.on('newMessage',function(message){
        console.log('newmessage',message);

    })