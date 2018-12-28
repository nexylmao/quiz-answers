const WebSocket = require('ws');
const game = require('./game');

function ws (http, admin) {

    admin = '/' + admin;
    const wss = new WebSocket.Server({server: http});
    let instance = null;

    wss.on('connection', client => {
        client.on('message', message => {
            if (instance) {
                if (client.name === admin) {
                    instance.adminSays(message);
                } else {
                    instance.playerSays(client, message);
                }
            } else {
                if (!client.name) {
                    if (message === admin) {
                        console.log('admin connected!');
                        client.name = admin;
                        client.send('welcome admin, when you are ready, start the game');
                    } else {
                        console.log(message + ' connected');
                        client.name = message;
                        client.send('welcome ' + message + '. we need to wait for admin to start the game');
                    }
                } else {
                    if (client.name === admin && message === 'start') {
                        instance = new game(client, Array.from(wss.clients).filter(ws => ws !== client));
                    } else {
                        if (client.name === admin) {
                            client.send('we\'re waiting for you to start the game');
                        } else {
                            client.send('we\'re waiting for admin to start the game');
                        }
                    }
                }
            }
        });
    });

}

module.exports = ws;