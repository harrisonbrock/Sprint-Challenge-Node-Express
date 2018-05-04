const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
server = express();

const projectRoutes = require('./projects/projectRoutes');




server.use(bodyParser.json());

server.use(cors());
server.use(helmet());
server.use('/api/projects', projectRoutes);



server.listen(4000, console.log('Running Server on Port 4000'));