import React, {Component} from 'react';
import ChatBar from './Chatbar.jsx'
import MessageList from './MessageList.jsx'
import uuidv1 from

class App extends Component {
  constructor(props) {
    //pass the props to the react.component (the parent class of this component)
    super(props);
    //set up the default state for the application
    this.state = {
      currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [ ]
    }
  }

  componentDidMount() {
    console.log('componentDidMount <App />')
    this.socket = new WebSocket ('ws://localhost:3001')
    this.socket.onopen = function (event) {
      console.log("connected to WebSocket Server")
    }
    this.socket.onmessage = (e) => {
      console.log('receiving data from server')
      let fromSrvr = JSON.parse(e.data)
      switch(fromSrvr) {
        case 'incomingMessage':
          console.log('receiving message from server')
          this.messageFromServer(fromSrvr)
          break
        case 'incomingNotification':
          console.log('receiving notification from server')
          this.notificationFromServer()
          break
        default:
          throw new Error("Unknown event type: " + data.type)
      }
    }
  }



  render() {
    console.log('Rendering <App />')
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} onMessageSend={this.onMessageSend} onUsernameSend={this.onUsernameSend}/>
      </div>

    );
  }

  messageFromServer = (newmsg) => {
    if (newmsg.username === this.state.currentUser.name && newmsg.username !== 'Anonymous') {
      return
    }
    const messages = this.state.messages.concat(newmsg)
    this.setState({messages: messages})
  }

  notificationFromServer = (newnotif) => {
    debugger
    this.setState({notifications: })

  }

  onMessageSend = (content) => {
    const newMessage = {
      id: Date.now(),
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: content
    }
    if (newMessage.username !== 'Anonymous'){
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }
    this.socket.send(JSON.stringify(newMessage))
  }

  onUsernameSend = (name) => {
    const currentUser = {
      name: name
    }
    const forServer = {
      type: 'postNotification',
      content: `${this.state.currentUser.name} has changed their name to ${currentUser.name}`
    }
    this.socket.send(JSON.stringify(forServer))
    this.setState({currentUser: currentUser})
  }
}

export default App;
