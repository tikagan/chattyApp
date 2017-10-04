import React, {Component} from 'react';
import ChatBar from './Chatbar.jsx'
import MessageList from './MessageList.jsx'

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
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
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

  onMessageSend = (content) => {
    const newMessage = {
      id: Date.now(),
      username: this.state.currentUser.name,
      content: content
    }
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }

  onUsernameSend = (name) => {
    const currentUser = {
      name: name
    }
    this.setState({currentUser: currentUser})
  }

}

export default App;
