import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import raffle from "./raffle";

class App extends Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: ""
  };

  async componentDidMount() {
    // As Metamask is installed, the address used in call() is the first one
    const manager = await raffle.methods.manager().call();
    const players = await raffle.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(raffle.options.address);
    this.setState({ manager, players, balance });
  }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ message: "Retrieving list of accounts..." });

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Entering the raffle..." });

    await raffle.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether")
    });

    this.setState({ message: "Your account has been annotated." });
  };

  onClick = async () => {
    this.setState({ message: "Retrieving list of accounts..." });

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Picking a winner..." });

    await raffle.methods.raffle().send({
      from: accounts[0]
    });

    this.setState({ message: "A winner has been picked!" });
  };

  render() {
    //console.log(web3.version);
    //web3.eth.getAccounts().then(console.log);
    return (
      <div className="App">
        <h2> Raffle Contract </h2>
        <p> The owner of this raffle is: {this.state.manager}</p>
        <p>
          There are {this.state.players.length} players entered,
          and the raffle value is {web3.utils.fromWei(this.state.balance, "ether")}{" "}
          ether!
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4> Try to enter the raffle!</h4>
          <div>
            <label> Amount of ether to enter (minimum 0.01 ether)</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>

          <button> Enter </button>
        </form>

        <hr />

        <h4> Raffle execution </h4>
        <button onClick={this.onClick}> Pick a winner </button>

        <hr />

        <h1> status: {this.state.message}</h1>
      </div>
    );
  }
}

export default App;
