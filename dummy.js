const openSocket = require('socket.io-client');
const socket = openSocket(`http://localhost:3000`, { path: '/api/socket.io' });

const CHANNEL_STATUS = {
  IDLE: 'IDLE',
  WAITING_GAME: 'WAITING_GAME',
  PLAYING_CARD: 'PLAYING_CARD',
  JUDGING_CARD: 'JUDGING_CARD',
};

function addListener(name, cb) {
  if (!socket.hasListeners(name)) {
    socket.on(name, cb);
  }
}

function createPlayer(playerName, cb) {
  socket.emit('createPlayer', playerName);
  addListener('playerCreated', lobbyResponse => cb(lobbyResponse.player));
}

function updateChannel(cb) {
  addListener('updateChannel', channelResponse => cb(channelResponse.channel));
}

function updateLobby(cb) {
  addListener('updateLobby', (lobbyResponse) => {
    cb(lobbyResponse.lobby);
  });
}

function gotoChannel(channelId) {
  socket.emit('gotoChannel', channelId);
}

function startGame() {
  socket.emit('nextRound');
}

function selectedAnswers(answers) {
  socket.emit('selectedAnswers', answers);
}

function selectedJudgment(winnerId) {
  socket.emit('selectedJudgment', winnerId);
}

function error(cb) {
  addListener('err', errMsg => cb(errMsg));
}

function success(cb) {
  addListener('success', successMsg => cb(successMsg));
}

function sendMessage(msg) {
  socket.emit('chat/message', msg);
}

// CODE HERE

let bot;
let party;
const args = process.argv.slice(2);

//if(args.length === 0) {
//  console.log('[Dummy] Give me the room id please');
//  return;
//}

function updateBot(inChannel) {
  party = inChannel;
  bot = inChannel.players.find(p => p.id === bot.id);

  switch(party.currentStatus)
  {
    case CHANNEL_STATUS.IDLE:
    sendMessage("Salut les mecs ! On commence la partie ?");
    break;

    case CHANNEL_STATUS.WAITING_GAME:
    if(Math.floor((Math.random() * 5)) === 0) {
      sendMessage("Prochaine question s.v.p !");
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

        selectedAnswers(answer);
        sendMessage("Ok pour moi. :D");
      }
    }
    break;

    case CHANNEL_STATUS.JUDGING_CARD:
    if (bot.isGameMaster) {
      if (bot.answers.length === 0) {

        selectedJudgment(party.players[0].id);
        text = "Sympa cette réponse " + party.players[0].name + " ;)"
        sendMessage(text);
      }
    }
    break;
  }
}

function updateBotLobby(inLobby) {
  if(args.length > 0) {
    gotoChannel(parseInt(args[0]));
  } else if(inLobby.channels.length > 0) {
    gotoChannel(inLobby.channels[0].id);
  } else {
    console.log("Bot cannot find any channel..");
  }
}

createPlayer('DUMMY_BOT', (player) => { bot = player; console.log('Connected'); });
updateChannel((channel) => updateBot(channel));
updateLobby((lobby) => updateBotLobby(lobby));
console.log('Bot initialized');
