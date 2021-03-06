const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
server = express();

const projectRoutes = require('./projects/projectRoutes');
const actionRoutes = require('./projectActions/actionsRoutes');



server.use(bodyParser.json());

server.use(cors());
server.use(helmet());
server.use('/api/projects', projectRoutes);
server.use('/api/actions', actionRoutes);



server.listen(4000, console.log('Running Server on Port 4000'));