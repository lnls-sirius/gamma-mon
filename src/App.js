import React from 'react';
import PressureBar from './components/PressureBar';

import bo from './static/BO-CCG.json';
import si from './static/SI-CCG.json';
import tb from './static/TB-CCG.json';
import ts from './static/TS-CCG.json';

import './App.css';

const STATE = {
  INITIAL: 0,
  BO: 1,
  SI: 2,
  TB: 3,
  TS: 4
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { content: STATE.INITIAL }
  }

  renderNav = () => {
    if (this.state.content != STATE.INITIAL) {
      return <div className='Menu'>
        <button type="button" class="btn btn-secondary" onClick={() => this.setState({ content: STATE.INITIAL })}>Back</button>
      </div>
    } else {
      return <div className='Menu'>
        <div className='MainTitle'>Sirius - Pressure Readings</div>
        <div className='SubTitle'>Cold Cathode Gauge</div>
        <button type="button" onClick={() => this.setState({ content: STATE.BO})}>BO</button><br/>
        <button type="button" onClick={() => this.setState({ content: STATE.SI})}>SI</button><br/>
        <button type="button" onClick={() => this.setState({ content: STATE.TS})}>TS</button><br/>
        <button type="button" onClick={() => this.setState({ content: STATE.TB})}>TB</button><br/>
      </div>

    }


    // return <div class="btn-group" role="group" aria-label="Basic example">
    //   {
    //     if(this.state.content == STATE.INITIAL){
    //       <button type="button" class="btn btn-secondary">Left</button>
    //       <button type="button" class="btn btn-secondary">Middle</button>
    //       <button type="button" class="btn btn-secondary">Right</button>

    //   }
    // </div>

  }

  renderGraph = () => {
    switch (this.state.content) {
      case STATE.BO:
        return <PressureBar pvs={bo} title='BO - Pressure (mBar)' />
      case STATE.SI:
        return <PressureBar pvs={si} title='SI - Pressure (mBar)' />
      case STATE.TB:
        return <PressureBar pvs={tb} title='TB - Pressure (mBar)' />
      case STATE.TS:
        return <PressureBar pvs={ts} title='TS - Pressure (mBar)' />

      default:
        return <div></div>
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderGraph()}
        {this.renderNav()}
      </div>
    );
  }

}
export default App;
