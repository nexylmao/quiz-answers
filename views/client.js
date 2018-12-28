let socket = new WebSocket('ws://localhost:8080');

let question_input, content;
let status;
let connect, submit;
let nickname, answer;
let index;

function send() {
    socket.send(nickname.value);
    connect.disabled = true;
    nickname.disabled = true;
}

function sendAnswer() {
    socket.send(answer.value);
    question_input.style.visibility = 'hidden';
    content.innerHTML += '<h2>On question ' + (index + 1) + ' you answered ' + answer.value + ' .</h2><br/>';
    index++;
}

window.onload = () => {
    index = 0;
    question_input = document.getElementById('question_input');
    connect = document.getElementById('connect');
    content = document.getElementById('content');
    status = document.getElementById('status');
    submit = document.getElementById('submit');
    answer = document.getElementById('answer');
    nickname = document.getElementById('name');

    question_input.style.visibility = 'hidden';

    socket.onmessage = message => {
        if (message.data === 'question!prompt') {
            status.value = 'answer ' + (index + 1) + '. question please';
            question_input.style.visibility = 'visible';
        } else {
            status.innerHTML = message.data;
        }
    };
};