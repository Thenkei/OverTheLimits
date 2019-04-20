const { fork } = require('child_process');

const botNumbers = Number.parseInt( process.argv.slice(2)[0] ) || 8;

let i = 0;
const observerInterval = setInterval(() => {

    if(i === botNumbers) {
      clearInterval(observerInterval);
      return;
    }

    const child = fork('src/client/index.js');

    i++;
}, 1000);
