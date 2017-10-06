import React, {Component} from 'react';

class Notification extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    console.log('Rendering <Notification />')
    return (
        <div className="message system">
          <span className='notification content'>{this.props.content}</span>
        </div>
      )
  }
}

export default Notification;
