let socket = new WebSocket('ws://localhost:8080');

let content;
let status;
let connect, startgame, startquestion, endgame;
let index;

function send() {
    socket.send(window.location.pathname);
    connect.disabled = true;
    startgame.disabled = false;
}

function startGame() {
    socket.send('start');
    startgame.disabled = true;
    startquestion.disabled = false;
}

function startQuestion() {
    socket.send('start!question');
    startquestion.disabled = true;
    endgame.disabled = true;
}

function createHtml(questionInfo) {
    let html = '<div class="card">';
    html += '<h3>On question ' + (index + 1) + ' people answered : </h3>';
    index++;
    Object.keys(questionInfo).forEach(key => {
        html += '<p>' + key + ' answered : ' + questionInfo[key] + '</p>';
    });
    html += '</div>';
    return html;
}

function receiveQuestion(questioninfo) {
    content.innerHTML += createHtml(questioninfo);
    startquestion.disabled = false;
    endgame.disabled = false;
}

function endGame() {
    socket.send('end!game');
    connect.disabled = true;
    startgame.disabled = true;
    startquestion.disabled = true;
    endgame.disabled = true;
}

window.onload = () => {
    content = document.getElementById('content');
    status = document.getElementById('status');
    connect = document.getElementById('connect');
    startgame = document.getElementById('start_game');
    startquestion = document.getElementById('start_question');
    endgame = document.getElementById('end_game');
    startgame.disabled = true;
    startquestion.disabled = true;
    endgame.disabled = true;
    index = 0;

    socket.onmessage = message => {
        try {
            let json = JSON.parse(message.data);
            receiveQuestion(json);
        } catch (e) {
            if (message.data === 'game ended, no players') {
                connect.disabled = true;
                startgame.disabled = true;
                startquestion.disabled = true;
                endgame.disabled = true;
            }
            status.innerHTML = message.data;
        }
    };
};