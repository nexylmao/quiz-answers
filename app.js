const http = require('http');
const express = require('express');
const ws = require('./ws');
const Chance = require('chance');
const chance = new Chance(Date.now());

const application = express();
const server = http.createServer(application);

const admin = chance.word();
console.log('admin console is on http://localhost:8080/' + admin);

application.use(express.static(process.cwd() + '/views'));

application.get('/' + admin, async (req, res) => {
    res.sendFile(process.cwd() + '/views/admin.html');
});

application.get('*', async (req, res) => {
    res.sendFile(process.cwd() + '/views/client.html');
});

ws(server, admin);

server.listen(8080, () => {
    console.log('Game is up!');
});

