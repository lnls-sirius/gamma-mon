import React from 'react';
import GammaBar from './components/GammaBar';

import { Button, ButtonGroup } from '@material-ui/core';

import gamma from './static/gamma.json';
import gamma_norm from './static/gamma_norm.json';

import { GAMMA } from './utils/consts';

import './App.css';

const STATE = {
  INITIAL: 0,
  GAMMA_NORM: 1,
  GAMMA: 3
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: STATE.INITIAL, tooltipVisible: false, tooltipX: '', tooltipY: '' };
  }

  customTooltipCallback = (tooltipModel) => {

    if (tooltipModel.opacity === 0) {
      this.setState({ tooltipVisible: false, tooltipX: '', tooltipY: '' });
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
        <Button variant="contained" color="default" onClick={() => this.setState({ content: STATE.INITIAL })}>Back</Button>
      </div>
    } else {
      return <div className='Menu'>
        <div className='MainTitle'>Sirius - Gamma Detectors</div>
        <div style={{ 'margin-bottom': '15px' }} className='SubTitle'>Gamma Detector Counting Readings</div>
        <ButtonGroup orientation="vertical" color="primary">
          <Button variant="contained" color="primary" onClick={() => this.setState({ content: STATE.GAMMA })}>Gamma</Button><br />
          <Button variant="contained" color="primary" onClick={() => this.setState({ content: STATE.GAMMA_NORM })}>Gamma - Normalized Countings (SI current)</Button><br />
        </ButtonGroup>
      </div>

    }
  }

  renderCustomTooltip = () => {
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

  backHandler = () => this.setState({ content: STATE.INITIAL })

  renderGraph = () => {
    switch (this.state.content) {
      case STATE.GAMMA:
        return <GammaBar customTooltipCallback={this.customTooltipCallback} pvs={gamma} labely='Pulses/second' title='Gamma Detector - Countings' {...GAMMA} />
      case STATE.GAMMA_NORM:
        return <GammaBar customTooltipCallback={this.customTooltipCallback} pvs={gamma_norm} labely='Pulses/second.mA' title='Gamma Detector - Normalized Countings (SI Current)' {...GAMMA} />
      default:
        if (this.state.tooltipVisible) { this.setState({ tooltipVisible: false }); }
        return <div></div>;
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
