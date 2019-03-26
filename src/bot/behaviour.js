/******************
 * OverTheLimit - 2019
 * File : behaviour.js
*/

api = require('../client/api')

// Channel states definitions
const CHANNEL_STATUS = {
  IDLE: 'IDLE',
  WAITING_GAME: 'WAITING_GAME',
  PLAYING_CARD: 'PLAYING_CARD',
  JUDGING_CARD: 'JUDGING_CARD',
};

function updateBot(inChannel) {
  if (inChannel.players) {
    party = inChannel;
    bot = inChannel.players.find(p => p.id === bot.id);
    isAdmin = bot.name === inChannel.admin.name;
  } else {
    return;
  }

  switch(party.currentStatus)
  {
    case CHANNEL_STATUS.IDLE:
    if(isAdmin) {
      api.startGame(); // StartGame
    } else {
      api.sendMessage("Salut les mecs ! On commence la partie ?");
    }
    break;

    case CHANNEL_STATUS.WAITING_GAME:
    if(isAdmin) {
      api.startGame(); // NextRound
    } else {
      if(Math.floor((Math.random() * 5)) === 0) {
        api.sendMessage("Prochaine question s.v.p !");
      }
    }
    break;

    case CHANNEL_STATUS.PLAYING_CARD:
    if (!bot.isGameMaster) {
      if (bot.answers.length === 0) {
        const answer = [];
        const answers = [0,1,2,3,4,5,6,7,8,9];
        const occurences = (party.deckQuestion.text.match(/______/g) || []);
        occurences.forEach(() => {
          selectedAnswer = answers.splice(Math.floor((Math.random() * answers.length)), 1);
          answer.push(selectedAnswer[0])
        })

        api.selectedAnswers(answer);
        api.sendMessage("Ok pour moi. :D");
      }
    }
    break;

    case CHANNEL_STATUS.JUDGING_CARD:
    if (bot.isGameMaster) {
      if (bot.answers.length === 0) {
        // Remove himsealf from the players list
        party.players.splice( party.players.indexOf(bot), 1 );

        const selectedWinner = party.players[ Math.floor((Math.random() * party.players.length)) ];
        api.selectedJudgment(selectedWinner.id);
        api.sendMessage(`Sympa cette réponse ${selectedWinner.name} ;)`);
      }
    }
    break;
  }
}

exports.startBotBehaviour = function() {
  api.updateChannel((channel) => updateBot(channel));
}
