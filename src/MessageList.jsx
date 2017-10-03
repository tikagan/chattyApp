import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {

  render() {
    return(
    <div>
      <main className="messages">
        <Message />
      </main>
    </div>)
  }
}

export default MessageList;
