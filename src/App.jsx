import React, {Component} from 'react';
import ChatBar from './Chatbar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props) {
    //pass the props to the react.component (the parent class of this component)
    super(props);
    //set up the default state for the application
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList />
        <ChatBar />
      </div>

    );
  }
}

export default App;
