import React, {Component} from 'react';
import Message from './Message.jsx'
import Notification from './Notification.jsx'

class MessageList extends Component {
  constructor(props) {
    super(props)
  }


toRender (messages) {
  return messages.map((data) => {
    switch(data.type) {
      case 'incomingMessage':
       return (
         <Message key={data.id} username={data.username} content={data.content}></Message>
       )
      case 'incomingNotification':
        return (
          <Notification key={data.id} content={data.content}></Notification>
        )
      case 'userJoinedNotification':
      return (
          <Notification key={data.id} content={data.content}></Notification>
        )
    }
  })
}

  render() {
    console.log('Rendering <MessageList />', this.props.messages)
    return(
    <div>
      <main className="messages">
        {this.toRender(this.props.messages)}
      </main>
    </div>)
  }
}

export default MessageList;
