import { createBareServer } from '@tomphttp/bare-server-node';
import http from 'node:http';

// Initialize the Bare engine
const bare = createBareServer('/');
const server = http.createServer();

server.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res);
    } else {
        res.writeHead(400);
        res.end('Not found.');
    }
});

server.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req)) {
        bare.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

const port = process.env.PORT || 10000;
server.listen({ port }, () => {
    console.log(`Modern Bare Server Online on port ${port}`);
});
