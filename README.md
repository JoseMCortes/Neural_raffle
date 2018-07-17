# Neural_raffle
Solidity project to perform a Raffle using Ether between the participants.
 
## Technology stack:

* Javascript: language to create some base UI and test tasks
* React: used with Javascript to create the UI to interact with Ethereum through Web3
* Web3: used to perform communication actions from/to javascript from/to Ethereum
* Solidity: Ethereum contracts language
* Metamask: Chrome plugin to manage the accounts
* Infura: used to access the first nodes of the Rinkeby network.
* Ganache: local network to launch the Unit/Integration tests of the Solidity contracts
* Mocha: framework to execute the Unit/Integration test cases
* Node: environment used to launch the Javascript tasks
* Truffle: basic usage for testing purposes

## Usage and deployment:

## Raffle notes:

* install metamask Chrome plugin to manage accounts 
* sudo npm install -g truffle (installs truffle)
* npm install --save solc  (installs solidity compiler)
* node compile.js (executes the js file)
* npm install --save mocha ganache-cli web3@1.0.0-beta.26 (installs mocha to test)
* npm run test (executs the mocha tests in the test folder)
* npm install --save truffle-hdwallet-provider (installs provider to acces first node in Network)
* node deploy.js (executes deploy)

## React:

* npm run start
* npm install --save web3@1.0.0-beta.26 (installs web3 in React)
* Note: we will use the Provider of injected web3 but we will create a new instance of Web3!
