const path=require("path");
const http=require("http");
const express=require("express");
const socketIO=require("socket.io");

const {generateMessage,generateLocationMessage}=require('./utils/message');

const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000;
const app=express();
var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(publicPath));



io.on('connection',(socket)=>{
console.log('NEW USER CONNECTED');

//socket.emit from admin text welcome to the chat app 

socket.emit('newMessage',generateMessage('Admin','welcome to the chat app'));

//socket.broadcast.emit from admin text new user joined

socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

socket.on('createMessage',(message,callback)=>{
    console.log('createMessage',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback('this is from the server');

});
socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude))

});

socket.on('disconnect',()=>{
console.log("user disconnected");

    });
});


server.listen(port,()=>{
    console.log(`server is up on ${port}`);
})

console.log(publicPath)