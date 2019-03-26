/******************
 * OverTheLimit - 2019
 * File : api.js
*/

const openSocket = require('socket.io-client');
const socket = openSocket(`http://localhost:3000`, { path: '/api/socket.io' });

if (!global.socket) {
  global.socket = socket;
}

function addListener(name, cb) {
    if (!socket.hasListeners(name)) {
      socket.on(name, cb);
    }
  }

module.exports = {
  createPlayer(playerName, cb) {
    socket.emit('createPlayer', playerName);
    addListener('playerCreated', lobbyResponse => cb(lobbyResponse.player));
  },

  updateChannel(cb) {
    addListener('updateChannel', channelResponse => cb(channelResponse.channel));
  },

  updateLobby(cb) {
    addListener('updateLobby', (lobbyResponse) => {
      cb(lobbyResponse.lobby);
    });
  },

  createChannel(channelName) {
    socket.emit('createChannel', channelName);
  },

  gotoChannel(channelId) {
    socket.emit('gotoChannel', channelId);
  },

  startGame() {
    socket.emit('nextRound');
  },

  selectedAnswers(answers) {
    socket.emit('selectedAnswers', answers);
  },

  selectedJudgment(winnerId) {
    socket.emit('selectedJudgment', winnerId);
  },

  error(cb) {
    addListener('err', errMsg => cb(errMsg));
  },

  success(cb) {
    addListener('success', successMsg => cb(successMsg));
  },

  sendMessage(msg) {
    socket.emit('chat/message', msg);
  }
}
