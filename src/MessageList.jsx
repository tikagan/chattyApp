import React, {Component} from 'react';
import Message from './Message.jsx'
import Notification from './Notification.jsx'
import UserLeftNotification from './UserLeftNotification.jsx'

class MessageList extends Component {
  constructor(props) {
    super(props)
  }


toRender = (messages) => {
  return messages.map((data) => {
    switch(data.type) {
      case 'incomingMessage':
      console.log('msgList incoming message')
       return (
         <Message key={data.id} username={data.username} content={data.content}></Message>
       )
      case 'incomingNotification':
      console.log('msgList incoming notification')
        return (
          <Notification key={data.id} content={data.content}></Notification>
        )
      case 'userJoinedNotification':
      console.log('msgList incoming user joined')
        return (
          <Notification key={data.id} content={data.content}></Notification>
        )
      case 'userLeftNotification':
      console.log('msgList incoming user left')
      debugger
        return (
          <UserLeftNotification key={data.id} username={data.username}></UserLeftNotification>
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
