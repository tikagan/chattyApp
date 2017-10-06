import React, {Component} from 'react';

class UserLeftNotification extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    console.log('Rendering <UserLeftNotification />')
    return (
        <div className="message system">
          <span className='notification content'>**{this.props.username}** has left the chat.</span>
        </div>
      )
  }
}

export default UserLeftNotification;
