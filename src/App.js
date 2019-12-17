import React, { Component } from 'react';
import api from './apiSingleton';
import './App.css';
import LoginPage from './components/pages/LoginPage'
class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="App">
        <LoginPage/>
      </div>
    );
  }
}

export default App;
async function main() {
  await api.messages.getMessages()
}
main()
