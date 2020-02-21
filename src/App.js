import React from 'react';
import PressureBar from './components/PressureBar';
import {booster} from './utils/consts';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PressureBar pvs={booster} />
      </header>
    </div>
  );
}

export default App;
