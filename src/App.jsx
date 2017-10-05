import React, {Component} from 'react'
import ChatBar from './Chatbar.jsx'
import MessageList from './MessageList.jsx'
import UserCount from './UserCount.jsx'

class App extends Component {
  constructor(props) {
    //pass the props to the react.component (the parent class of this component)
    super(props);
    //set up the default state for the application
    this.state = {
      currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [ ],
      users: {}
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
      let data = JSON.parse(e.data)
      switch(data.type) {
        case 'incomingMessage':
          console.log('receiving message from server')
          break
        case 'incomingNotification':
          console.log('receiving notification from server')
          break
        case 'userJoinedNotification':
          debugger
          console.log('receiving user notification from server')
          break
        default:
          throw new Error("Unknown event type: " + data.type)
      }
      this.dataFromServer(data)
    }
  }

  render() {
    console.log('Rendering <App />')
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <UserCount users={this.state.}></UserCount>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} onMessageSend={this.onMessageSend} onUsernameSend={this.onUsernameSend}/>
      </div>
    );
  }

  dataFromServer = (data) => {
    const messages = this.state.messages.concat(data)
      this.setState({messages: messages})
  }

  onMessageSend = (content) => {
    const newMessage = {
      id: Date.now(),
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: content
    }
    this.socket.send(JSON.stringify(newMessage))
  }

  onUsernameSend = (name) => {
    const currentUser = {
      name: name
    }
    const forServer = {
      type: 'postNotification',
      content: `**${this.state.currentUser.name}** has changed their name to **${currentUser.name}**`
    }
    this.socket.send(JSON.stringify(forServer))
    this.setState({currentUser: currentUser})
  }
}

export default App;
