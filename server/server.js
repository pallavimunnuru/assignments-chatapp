const path=require("path");
const http=require("http");
const express=require("express");
const socketIO=require("socket.io");

const {generateMessage}=require('./utils/message');

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

socket.on('createMessage',(message)=>{
    console.log('createMessage',message);
    io.emit('newMessage',generateMessage(message.from,message.text));

// socket.broadcast.emit('newMessage',{
//     from:message.from,
//     text:message.text,
//     createdAt:new Date().getTime()
// });

    
});

socket.on('disconnect',()=>{
console.log("user disconnected");

    })
})


server.listen(port,()=>{
    console.log(`server is up on ${port}`);
})

console.log(publicPath)