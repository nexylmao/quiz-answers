function game (admin, players) {
    this.admin = admin;
    this.players = players;
    console.log('admin is here ');
    console.log('there are ' + players.length + ' players');
    if (players.length < 1) {
        console.log('game ended, no players');
        this.admin.send('game ended, no players');
    }
    this.admin.send('game started');
    this.players.forEach(player => {
        player.send('game started');
    });
    this.question = false;
    this.questionIndex = -1;
    this.questions = [];

    this.checkQuestions = () => {
        let all = true;
        this.players.forEach(player => {
            if (!this.questions[this.questionIndex][player.name]) {
                all = false;
            }
        });
        if (all === true) {
            this.question = false;
            this.admin.send(JSON.stringify(this.questions[this.questionIndex]));
        }
    };
}

game.prototype.adminSays = function (message) {
    if (this.question === true) {
        this.admin.send('a question is being run right now!');
    }
    switch (message) {
        case 'start!question':
            this.question = true;
            this.questionIndex++;
            this.questions.push({});
            this.players.forEach(player => {
                player.send('question!prompt');
            });
            this.admin.send('question prompt sent');
            break;
        case 'end!game':
            this.admin.send('game ended by admin');
            this.players.forEach(player => {
                player.send('game ended by admin');
            });
            break;
    }
};

game.prototype.playerSays = function (client, message) {
    let index = this.players.indexOf(client);
    if (!this.question) {
        client.send('wait for question.');
    } else {
        if (this.questions[this.questionIndex][client.name]) {
            client.send('you already submitted an answer');
        } else {
            this.questions[this.questionIndex][client.name] = message || 'PRAZAN_ODGOVOR';
            this.checkQuestions();
            client.send('thank you for your answer');
        }
    }
};

module.exports = game;