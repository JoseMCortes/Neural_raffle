const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
// use your BIP39 mnemonic, mine is too personal :)
'https://rinkeby.infura.io/...' // Use Infure to get the first node to enter Rinkeby
);

const web3 = new Web3(provider);


const deploy =  async() => {
    accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({gas: '1000000', from: accounts[0]});

    console.log(interface); // we will need it to use the ABI as a interface in the react project
    console.log('Contract deployed to: ', result.options.address);

};

deploy();
