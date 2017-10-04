import React, {Component} from 'react';

class ChatBar extends Component {


  constructor(props) {
    super(props)
    this.state = {
      username: this.props.currentUser.name,
      content: ''
    }
  }

  render() {
    console.log('Rendering <ChatBar />')
    return (
      <footer className="chatbar">
        <input value={this.state.username} onChange={this.handleUsernameChange} onKeyPress={this.handleUsernameSend} className="chatbar-username" placeholder="Type your name and hit ENTER (Optional) "/>
        <input value={this.state.content} onChange={this.handleMessageChange} onKeyPress={this.handleMessageSend} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }

  handleMessageChange = (e) => {
    this.setState({content: e.target.value})
  }

  handleMessageSend = (e) => {
    if (e.key === "Enter") {
      this.props.onMessageSend(this.state.content)
      this.setState({content: ''})
    }
  }

  handleUsernameChange = (e) => {
    this.setState({username: e.target.value})
  }

  handleUsernameSend = (e) => {
    if (e.key === "Enter") {
      this.props.onUsernameSend(this.state.username)
    }
  }

}
export default ChatBar;
