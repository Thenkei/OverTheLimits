/******************
 * OverTheLimit - 2019
 * File : index.js
*/


connect = require('./connect');
behaviour = require('../bot/behaviour');

// Variables
let bot;
let party;
const args = process.argv.slice(2);

connect.newBot();
behaviour.startBotBehaviour();
connect.connectBot(args);
console.log('Bot initialized');
