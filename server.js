import createRammerhead from 'rammerhead';
import http from 'node:http';

const rammerhead = createRammerhead();
const server = http.createServer();

server.on('request', (req, res) => {
    if (rammerhead.shouldRoute(req)) {
        rammerhead.routeRequest(req, res);
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Rammerhead Proxy Backend Online');
    }
}       );

server.on('upgrade', (req, socket, head) => {
    if (rammerhead.shouldRoute(req)) {
        rammerhead.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

const port = process.env.PORT || 10000;
server.listen({ port }, () => {
    console.log(`Rammerhead engine listening on port ${port}`);
});
