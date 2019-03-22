const openSocket = require('socket.io-client');
const socket = openSocket(`http://localhost:3000`, { path: '/api/socket.io' });

// CODE HERE


//if(args.length === 0) {
//  console.log('[Dummy] Give me the room id please');
//  return;
//}
