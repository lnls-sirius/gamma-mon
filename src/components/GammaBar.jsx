
import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Button } from '@material-ui/core';

import { color } from '../utils/Colors';
import Epics from '../utils/Epics';
import SettingsDialog from './SettingsDialog';
import "./GammaBar.css";


defaults.global.defaultFontColor = "#FFF";
defaults.global.defaultFontSize = 16;

class GammaBar extends React.Component {
  static defaultProps = { title: "A graph" };

  constructor(props) {
    super(props);

    this.state = {
      tooltipText: "",
      tooltipVisible: false,
      minorVal: props.high ? props.high : 2000,
      minorArray: props.pvs.map(() => props.high ? props.high : 1e-8),
      majorVal: props.hihi ? props.hihi : 100,
      majorArray: props.pvs.map(() => props.hihi ? props.hihi : 1e-7),
      maxVal: null,
    };

    this.timer = null;
    this.refreshInterval = 100;
    this.epics = new Epics(this.props.pvs);
    this.epicscurrent = new Epics(['SI-13C4:DI-DCCT:Current-Mon']);

    this.values = [];
    this.alarms = { bg: [], border: [] };
    this.max = this.state.majorVal;

  }

  componentDidUpdate(prevProps, prevState, snapshot) { /** Check if there's a new PV list */ }

  updatePVValues = () => {
    /** Refresh PV val array */
    const { minorVal, majorVal } = this.state;
    const { pvs } = this.props;

    this.values = pvs.map(pv => { return this.epics.pvData[pv].value.toExponential(2); });
    this.currentvalue = this.epicscurrent.pvData['SI-13C4:DI-DCCT:Current-Mon'].value.toExponential(2);
    this.valuesMax = Math.max(...this.values);

    this.alarms.bg = this.values.map(value => {
      if (value && !isNaN(value)) {
        if (value < minorVal) {
          return color.OK_GAMMA_BG;
        } else if (value >= minorVal && value < majorVal) {
          return color.MINOR_BG;
        } else {
          return color.MAJOR_BG;
        }
      } else {
        /** I'm returning OK here so because invalid numbers will not be plotted
         * so this will only mess up the legend in case the first PV is invalid */
        return color.OK_BG;
      }
    });

    this.alarms.border = this.values.map(value => {
      if (value && !isNaN(value)) {
        if (value < minorVal) {
          return color.OK_GAMMA_LINE;
        } else if (value >= minorVal && value < majorVal)
          return color.MINOR_LINE;
      } else {
        /** Same as the alarm.bg*/
        return color.OK_GAMMA_LINE;
      }
    });
  }

  updateContent = () => {
    this.updatePVValues();

    this.setState((state, props) => {
      const { minorVal, majorVal, minorArray, majorArray } = state;
      const { pvs } = props;

      const maxVal = (this.valuesMax > majorVal) ? this.valuesMax : majorVal;

      let data = {
        labels: pvs,
        datasets: [
          {
            label: 'Gamma',
            backgroundColor: this.alarms.bg,
            borderColor: this.alarms.border,
            borderWidth: 1,
            hoverBackgroundColor: color.OK_GAMMA_BG,
            hoverBorderColor: color.HOVER_LINE,
            data: this.values,
          },
          {
            label: 'Minor Alarm',
            type: 'line',
            fill: false,
            backgroundColor: color.MINOR_BG,
            borderColor: color.MINOR_LINE,
            borderWidth: 1,
            data: minorArray,
            pointRadius: 0,
            datalabels: { display: false }
          },
          {
            label: 'Major Alarm',
            type: 'line',
            fill: false,
            backgroundColor: color.MAJOR_BG,
            borderColor: color.MAJOR_LINE,
            borderWidth: 1,
            data: majorArray,
            pointRadius: 0,
            datalabels: { display: false }
          }
        ]
      };
      return { chartData: data, maxVal: maxVal};
    });
  }

  componentDidMount() { this.timer = setInterval(this.updateContent, this.refreshInterval); }

  componentWillUnmount() { clearInterval(this.timer); this.epics.disconnect(); this.epicscurrent.disconnect();}

  renderBar() {
    const { majorVal, minorVal, maxVal } = this.state;
    const { customTooltipCallback } = this.props;
    const { labely } = this.props;
    return (
      <Bar
        data={this.state.chartData}
        plugins={[ChartDataLabels]}
        options={{
          plugins: {
            datalabels: { rotation: 270, font: { weight: "bold"},  color: 'rgba(184,184,184)' },
          },
          tooltips: { mode: 'index', enabled: false, custom: customTooltipCallback },
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            position: 'bottom', align: 'center',
            display: false, labels: {}
          },
          scales: {
            xAxes: [{
              ticks: {
                  fontColor: 'rgba(184,184,184)',
                  fontSize: 14
              },
              gridLines: {
                display: true,
                color: 'rgba(184,184,184,0.2)',
                zeroLineColor: 'rgba(184,184,184,0.8)'
              },
            }],
            yAxes: [{
              id: 'pulse',
              scaleLabel: { display: true, labelString: labely, fontColor: 'rgba(184,184,184)' },
              gridLines: {
                display: true,
                color: 'rgba(184,184,184,0.2)',
                zeroLineColor: 'rgba(184,184,184,0.8)'
              },
              ticks: {
                fontColor: 'rgba(184,184,184)',
                fontSize: 14,
                min: 1e-12,
                max: maxVal,
                fontSize: 14,
              },
              display: true,
              type: 'logarithmic',
            }]
          }
        }}
      />)
  }

  handleConfig = (hihi, high) => {
    high = parseFloat(high);
    hihi = parseFloat(hihi);
    if ((hihi != this.state.majorVal || high != this.state.minorVal) && (high < hihi)) {
      this.setState((state, props) => {
        const { pvs } = props;
        return { minorVal: high, majorVal: hihi, minorArray: pvs.map(() => high), majorArray: pvs.map(() => hihi) };
      });
    }
  }

  render() {
    const { minorVal, majorVal } = this.state;
    const { title, backHandler } = this.props;

    return (
        <div className='GammaBar'>
      <div className='GammaBar1'>
        <div className='Title'>{title}</div>
        <SettingsDialog
          title={title + " settings"}
          high={minorVal}
          hihi={majorVal}
          handleConfig={this.handleConfig} />

        {this.state.chartData ? <article className='GraphContainer'> {this.renderBar()} </article> : 'loading...'}
      </div>
      {'\nSI-13C4:DI-DCCT:Current-Mon:           ' + this.currentvalue + " mA"}
      </div>
    );
  }
}
export default GammaBar;
