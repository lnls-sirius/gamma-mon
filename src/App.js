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
  TS: 4,
  ALL: 5,
  TB_TS: 6
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { content: STATE.INITIAL, tooltipVisible: false, tooltipX: '', tooltipY: ''};
  }

  customTooltipCallback = (tooltipModel) => {

    if (tooltipModel.opacity === 0) {
      this.setState({ tooltipVisible: false });
      return;
    }

    // set values
    const x = tooltipModel.dataPoints[0].xLabel;
    const y = tooltipModel.dataPoints[0].yLabel;

    this.setState({ tooltipVisible: true, tooltipX: x, tooltipY: y });
  }

  renderNav = () => {
    if (this.state.content !== STATE.INITIAL) {
      return <div className='Menu'>
        <button type="button" onClick={() => this.setState({ content: STATE.INITIAL })}>Back</button>
      </div>
    } else {
      return <div className='Menu'>
        <div className='MainTitle'>Sirius - Pressure Readings</div>
        <div className='SubTitle'>Cold Cathode Gauge</div>
        <button type="button" onClick={() => this.setState({ content: STATE.BO })}>BO</button><br />
        <button type="button" onClick={() => this.setState({ content: STATE.SI })}>SI</button><br />
        <button type="button" onClick={() => this.setState({ content: STATE.TB_TS })}>TB & TS</button><br />
        <button type="button" onClick={() => this.setState({ content: STATE.TB})}>TB</button><br/>
        <button type="button" onClick={() => this.setState({ content: STATE.TS})}>TS</button><br/>
        <button type="button" onClick={() => this.setState({ content: STATE.ALL })}>ALL</button><br />
      </div>

    }
  }

    renderCustomTooltip = ()=>{
        return <table align='center'>
          <tbody>
            {this.state.tooltipVisible ? (
              <tr>
                <td>{this.state.tooltipX}</td>
                <td>{this.state.tooltipY}</td>
              </tr>
            ) : (<tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>)}
          </tbody>
        </table>
    }

  renderGraph = () => {
    switch (this.state.content) {
      case STATE.BO:
        return <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={bo} title='BO - Pressure' />
      case STATE.SI:
        return <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={si} title='SI - Pressure' />
      case STATE.TB:
        return <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={tb} title='TB - Pressure' />
      case STATE.TS:
        return <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={ts} title='TS - Pressure' />
      case STATE.TB_TS:
        return <div style={{'display':'flex', 'flex-direction': 'row', 'flex-wrap': 'wrap'}}>
              <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={tb} title='TB - Pressure' />
              <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={ts} title='TS - Pressure' />
          </div>
      case STATE.ALL:
        return <div style={{'display':'flex', 'flex-direction': 'row', 'flex-wrap': 'wrap'}}>
             <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={bo} title='BO - Pressure' />
             <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={tb} title='TB - Pressure' />
             <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={ts} title='TS - Pressure' />
             <PressureBar customTooltipCallback={this.customTooltipCallback} pvs={si} title='SI - Pressure' />
          </div>

      default:
        return <div></div>
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderGraph()}
        {this.renderCustomTooltip()}
        {this.renderNav()}
      </div>
    );
  }

}
export default App;
