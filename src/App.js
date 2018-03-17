import React, { Component } from "react";
// import { subscribeToTimers } from "./Main";
import logo from "./logo.svg";
import "./App.css";
import "./AppChat.css";
import openSocket from "socket.io-client";
import { DataManager as DM } from "./Utilities/DataManager";
import * as Scroll from 'react-scroll';


const socket = openSocket("https://firstmw.herokuapp.com");
// const socket = openSocket("http://localhost:8000");

function isEmptyObj(obj){
  return Object.keys(obj).length === 0;
}
const ChatBubble = props => {
  let selfStyle = props.self?{background: 'rgba(255, 255, 255, 0.03)'}:{};
  console.log('props chat : ', props, selfStyle);
  return (
    <div className="chat-bubble" style={selfStyle}>
      <div className='chat-user'>
        <div className="user-icon"> {props.user[0].toUpperCase()} </div>
        <div className='user-name'> {props.user[0].toUpperCase() + props.user.slice(1)} </div>
      </div>
      <div className="chat-message"> {props.message} </div>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      omale: "",
      err: "",
      receivedMsg: "",
      animate: false,
      username: '',
      chatList: [],
    };
    this.id = "";
    socket.on("chat message", this.update);
    // socket.on("timer", (timestamp, two) => this.setState({ omale: timestamp, err: two }));
    // socket.emit("subscribeToTimer", 1000);
  }

  componentDidMount() {
    let userid = DM.UserID;
    if (!userid || Object.keys(userid).length === 0) {
      let id = this.getUserID(true);
      console.log('username: ', id);
      this.setState({username: id});
      DM.UserID = id;
    }
  }

  getUserID(firstTime) {
    let id = prompt(firstTime ? "Please type your user ID" : "Fuck...! I said you to type USER ID..!");
    if (!id) return this.getUserID(false);
    else return id;
  }

  update = (id, receivedMsg) => { 
    var obj = {};
    let user = this.state.username?this.state.username:isEmptyObj(DM.UserID) ? '' : DM.UserID;
    if (id === user) obj = { user: id, self: true, message: receivedMsg };
    else obj = { user: id, self: false, message: receivedMsg };
    this.setState(prevState => ({
      chatList: [...prevState.chatList, obj],
    }));
  };

  send = () => {
    Scroll.animateScroll.scrollToBottom();
    socket.emit("chat message", DM.UserID, this.state.sendMsg);
    this.setState({sendMsg: ''});
  }
  render() {
    return (
      <div className="chat-app">
        <div className={(this.state.animate && "header-anim") + " header"}>
          <label> Welcome, {this.state.username?this.state.username : isEmptyObj(DM.UserID) ? '' : DM.UserID} </label>
        </div>

        <div className="body">
          {!this.state.animate && (
            <div className="start" onClick={() => this.setState({ animate: true })}>
              Start Chatting
            </div>
          )}
          {this.state.animate && this.state.chatList.map((item, i) => <ChatBubble key={i} self={item.self} user={item.user} message={item.message} />)}
        </div>

        <div className={(this.state.animate && "footer-anim") + " footer"}>
          <input
            className="txt-msg"
            type="text"
            value={this.state.sendMsg}
            onChange={e => {
              this.setState({ sendMsg: e.target.value });
            }}
            onKeyPress={(e)=>e.key === 'Enter'?this.send():''}
          />
          <button
            className="btn-send"
            type="submit"
            onClick={this.send}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default App;
