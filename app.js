global.config = require(process.env.NODE_ENV ? './config-prod.json' : './config-dev.json');
require('./data-access-layer/dal');

const express = require('express');
const cors = require('cors');

//controllers
const authController = require('./controllers/auth-controller');

const server = express();

server.use(cors());
server.use(express.json());
server.use('/api/auth', authController);



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`listening on port : ${PORT}`));
