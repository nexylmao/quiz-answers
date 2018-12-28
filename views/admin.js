let socket = new WebSocket('ws://localhost:8080');

function send() {
    socket.send(window.location.pathname);
}

window.onload = () => {
    console.log('hello admin!');
    
};