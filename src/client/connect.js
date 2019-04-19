/******************
 * OverTheLimit - 2019
 * File : connect.js
 * Author : thendeo
*/

api = require('./api')

canConnect = true;
connected = false;
lobby = {};

function updateBotLobby(inLobby) {
  lobby = inLobby;

  if(canConnect && lobby.channels) {
    connectBotToChannel();
  }
}

function connectBotToChannel() {
  if( connected ) { return; }

  canConnect = false;

  var observerInterval = setInterval(() => {
      if(connected) {
        clearInterval(observerInterval);
        console.log("-> ", bot.name, " join channel ", channel.name);
        return;
      } else if(lobby.channels.length === 0) {
        clearInterval(observerInterval);

        api.createChannel({
          opts: {
            gameType: 'utlgame',
            channelName: `Test Channel_${makeid(3)}`,
            minPlayersCount: 2,
            maxPlayersCount: 3,
            maxPoints: 3,
            isPrivate: false,
          },
        });
        connected = true;
        console.log("-> ", bot.name, " has created his own test channel");
        return;
      }

      connected = true;
      channel = lobby.channels.pop();
      api.gotoChannel(channel.id);
  }, 500);
}


function makeid(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

exports.newBot = function() {
  api.createPlayer(`DUMMY_${makeid(5)}`, (player) => { bot = player; console.log('Connected as', bot.name); });
}

exports.connectBot = function() {
  api.error((e) => connected = false); // WORST THING EVER
  api.updateLobby((lobby) => updateBotLobby(lobby));

  //if(process.argv.slice(2).length > 0) {
  //  api.gotoChannel(process.argv.slice(2)[0]);
  //  connected = true;
  //}
}
