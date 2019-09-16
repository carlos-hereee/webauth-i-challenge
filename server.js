const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

//routes
const usersRouter =require('./routes/users-router.js');
server.use('/api/users', usersRouter);

//server testing
server.get('/', (req, res)=>{
    res.send(`testing webauth-i-project`);
})  

module.exports = server;