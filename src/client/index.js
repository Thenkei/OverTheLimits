/******************
 * OverTheLimit - 2019
 * File : index.js
*/


connect = require('./connect');
behaviour = require('../bot/behaviour');

// Variables
let bot;
let party;

connect.newBot();
behaviour.startBotBehaviour();
connect.connectBot();
