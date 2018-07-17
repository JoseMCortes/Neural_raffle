pragma solidity ^0.4.17;

// Contract used by the The Blockchain Ico App for Android

contract Raffle{
    address public manager;
    address[] public players;

    function Raffle() public{
        manager = msg.sender;
    }

    // The price to enter the Raffle will be .01 ether. There is no
    // control for the amount of players or repetitions
    function enter() public payable{
        require(msg.value == .01 ether);
        players.push(msg.sender);
    }

    // We use keccak256 to create a pseudo-random approach, using some different
    // parameters to create the modulo with the seed.
    // The parameters are tightly packed (concatenated)
    function random() private view returns (uint){
        return uint(keccak256(block.number, block.difficulty, now, players));
    }

    // Use the random generator to pick a random winner. In theory the
    // statistical distribution should be well distributed for all the possible
    // indexes (0..N)
    function raffle() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }

    function getPlayers() public view returns(address[]) {
        return players;
    }

    // Simple restriction, think about other possible restrictions
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

}
