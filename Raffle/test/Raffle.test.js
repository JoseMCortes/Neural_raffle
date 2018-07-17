const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const {interface, bytecode} = require('../compile');

let raffle;
let accounts;

// Tests for the main use cases of the Raffe, using Web3 and Ganache local
// network

// To set up the test, first deploy using the first account returned by web3
// (through the Provider of Ganache, what creates ready-to-use accounts)
beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    raffle = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({from: accounts[0], gas:'1000000'});
});

describe('Raffle Contract', () => {
    it('deploys a contract', () => {
        assert.ok(raffle.options.address);
    });

    it('Enter the raffle with one account and check the list of players', async () => {
        await raffle.methods.enter().send({
          from: accounts[0],
          value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await raffle.methods.getPlayers().call({
          from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);

    });

    it('Enter the raffle with many accounts and check the list of players', async () => {
        await raffle.methods.enter().send({
          from: accounts[0],
          value: web3.utils.toWei('0.02', 'ether')
        });

        await raffle.methods.enter().send({
          from: accounts[1],
          value: web3.utils.toWei('0.02', 'ether')
        });

        await raffle.methods.enter().send({
          from: accounts[2],
          value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await raffle.methods.getPlayers().call({
          from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);

    });

    it('Constraint check: should provide minimum ether', async () => {
      try{
        await raffle.methods.enter().send({
          from: accounts[0],
          value: 200 //wei
        });
        assert(false);
      }catch(err){
          assert(err);
      }
    });


    it('Constraint check: only the owner of the contract can pick the winner', async () => {
      try{
        await raffle.methods.raffle().send({
          from: accounts[1]
        });
        assert(false);
      }catch(err){
          assert(err);
      }
    });


    it('sends money to the winner and resets state', async () => {

      await raffle.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei('2', 'ether')
      });

      const initialBalance = await web3.eth.getBalance(accounts[0]);

      await raffle.methods.raffle().send({
        from: accounts[0]
      });

      const finalBalance = await web3.eth.getBalance(accounts[0]);
      console.log(initialBalance);
      console.log(finalBalance);
      const difference = finalBalance - initialBalance;
      console.log(difference);
      assert(difference > web3.utils.toWei('1.8', 'ether'));

    });



});
