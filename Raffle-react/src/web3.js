import Web3 from 'web3';

// For this project, we can assume Metamask is installed in the browser but
// we will recreate the instance of Web3 using the Provider existing in
// Metamask
const web3 = new Web3(window.web3.currentProvider);

export default web3;
