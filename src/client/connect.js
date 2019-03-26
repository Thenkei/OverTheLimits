/******************
 * OverTheLimit - 2019
 * File : connect.js
 * Author : thendeo
*/

api = require('./api')


function updateBotLobby(inLobby, inArgs) {
  if(inArgs.length > 0) {
    api.gotoChannel(parseInt(inArgs[0]));
  } else if(inLobby.channels.length > 0) {
    // TODO: try to connect channels until you can join one of them
    api.gotoChannel(inLobby.channels[0].id);
  }else {
    api.createChannel({
      name: 'Test Channel',
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
  api.updateLobby((lobby) => updateBotLobby(lobby, process.argv.slice(2)));
}
