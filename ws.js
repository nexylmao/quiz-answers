const WebSocket = require('ws');

function ws (http, admin) {

    const wss = new WebSocket.Server({server: http});

    wss.on('connection', (client, req) => {

        client.on('message', message => {
            console.log(message);
        });

    });

}

module.exports = ws;