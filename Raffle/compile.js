// Node.js

const path = require('path'); // Path module, Existing modules
const fs = require('fs');     // File system module
const solc = require('solc'); // Solidity compiler

const rafflePath = path.resolve(__dirname, 'contracts', 'Raffle.sol');
const source = fs.readFileSync(rafflePath, 'utf8');

//console.log(solc.compile(source, 1));
module.exports = solc.compile(source, 1).contracts[':Raffle']; // la salida es un JSON
