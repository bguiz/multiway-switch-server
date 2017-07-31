'use strict';

const server = require('./server.js');

const port = 52222;
server.listen(port);
console.log(`Listening on port ${port}`);
