const openSocket = require('socket.io-client');
const socket = openSocket(`http://localhost:3000`, { path: '/api/socket.io' });

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


// CODE HERE

let bot;
let party;
const args = process.argv.slice(2);

if(args.length === 0) {
  console.log('[Dummy] Give me the room id please');
  return;
}

function updateBot(inChannel) {
  party = inChannel;
  bot = inChannel.players.find(p => bot.id === bot.id);
  console.log('[Dummy] Updated channel');

  //HERE BOT CODE check party.currentStatus for UTLGame to know what to do
}

createPlayer('DUMMY_BOT', (player) => { bot = player });
updateChannel((channel) => updateBot(channel));

setTimeout(function(){
    gotoChannel(parseInt(args[0]));
}, 500);
