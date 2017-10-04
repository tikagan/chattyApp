import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {

   toRender (messages) {
    return (
    (messages).map((message) =>
      <Message key={message.id} username={message.username} content={message.content}></Message>
      )
    )
  }



  render() {
    return(
    <div>
      <main className="messages">
        {this.toRender(this.props.messages)}
      </main>
    </div>)
  }
}

export default MessageList;
