/******************
 * OverTheLimit - 2019
 * File : connect.js
 * Author : thendeo
*/

api = require('./api')

connected = false;

function updateBotLobby(inLobby, inArgs) {
  if(inArgs.length > 0) {
    api.gotoChannel(inArgs[0]);
  } else if(inLobby.channels.length > 0) {
    let i = 0;
    var observerInterval = setInterval(() => {
        if(connected || i === inLobby.channels.length) {
          clearInterval(observerInterval);
          return;
        }
        connected = true;
        api.gotoChannel(inLobby.channels[i].id);
        i++;
    }, 500);
  } else {
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
    console.log("Bot has created his own test channel..");
  }
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
  api.error((e) => connected = false);
  api.updateLobby((lobby) => updateBotLobby(lobby, process.argv.slice(2)));
}
