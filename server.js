const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();

const projectRoutes = require('./projects/projectRoutes');




server.use(express.json());

server.use(cors());
server.use(helmet());
server.use('/api/projects', projectRoutes);



server.listen(4000, console.log('Running Server on Port 4000'));