const {Server}  = require('socket.io');
const express = require('express');
const app = express();
const {createServer} = require('node:http');

const server = createServer(app);
const io = new Server(server);


io.on('connection',(socket)=>{
    console.log('A user connected ');
});

