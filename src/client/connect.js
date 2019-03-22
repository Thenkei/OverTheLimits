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
    api.gotoChannel(inLobby.channels[0].id);
  } else {
    console.log("Bot cannot find any channel..");
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
  api.createPlayer(`DUMMY_${makeid(5)}`, (player) => { bot = player; console.log('Connected as', bot.name); })
}

exports.connectBot = function(args) {
  api.updateLobby((lobby) => updateBotLobby(lobby, args))
}
