import React, { Component } from "react";
// import { subscribeToTimers } from "./Main";
import logo from "./logo.svg";
import "./App.css";
import openSocket from "socket.io-client";

const socket = openSocket("https://firstmw.herokuapp.com");
// const  socket = openSocket('http://localhost:8000');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      omale: "",
      err: "",
      vangu: '',
    };
    socket.on("chat message", this.update);
    // socket.on("timer", (timestamp, two) => this.setState({ omale: timestamp, err: two }));
    // socket.emit("subscribeToTimer", 1000);
  }

  update = (vangu) => {
    this.setState({vangu: vangu})
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.omale + " / otha : " + this.state.err}</p>
        <input
          type="text"
          value={this.state.sentMsg}
          onChange={e => {
            this.setState({ sentMsg: e.target.value });
          }}
        />

        <button
          type="submit"
          onClick={() => {
            socket.emit("chat message", this.state.sentMsg);

          }}
        >
          Send
        </button>
        Vangu da... {this.state.vangu}
      </div>
    );
  }
}

export default App;
