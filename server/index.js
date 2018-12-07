const server = require('./server');
const defaultPort = 8000;
const PORT = process.env.PORT || defaultPort;

server.listen(PORT);
console.log('Server listening on port: ', PORT);
