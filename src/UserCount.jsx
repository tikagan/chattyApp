import React, {Component} from 'react';

class UserCount extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    console.log('Rendering <UserCount />')
    return (
      <div className='userCount'>
        <h3>{this.props.count} users online</h3>
      </div>
      )
  }
}

export default UserCount;
