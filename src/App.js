import React from 'react';
import Router from './Router';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="App">
        <Router />
      </div>
    );
  }
}
export default App;
