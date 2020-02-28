
import React from 'react';
import Epics from '../utils/Epics';

import { Bar, defaults } from 'react-chartjs-2';
import { color } from '../utils/Colors';
import "./PressureBar.css";

defaults.global.defaultFontColor = "#FFF";
defaults.global.defaultFontSize = 16;

class PressureBar extends React.Component {
  static defaultProps = {
    title: "A graph"

  }
  constructor(props) {
    super(props);
    this.state = {
      tooltipText: "",
      tooltipVisible: false
    };
    this.timer = null;
    this.refreshInterval = 100;
    this.epics = new Epics(this.props.pvs);

    this.minorVal = 1e-8;
    this.majorVal = 1e-6;

    this.minor = this.props.pvs.map(() => this.minorVal);
    this.major = this.props.pvs.map(() => this.majorVal);

    this.values = [];
    this.alarms = { bg: [], border: [] };

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /** Check if there's a new PV list */
  }

  updatePVValues = () => {
    this.values = this.props.pvs.map(pv => {
      return this.epics.pvData[pv].value;
    });

    this.alarms.bg = this.values.map(value => {
      if (value && !isNaN(value)) {
        if (value < this.minorVal) {
          return color.OK_BG;
        } else if (value >= this.minorVal && value < this.majorVal) {
          return color.MINOR_BG;
        } else {
          return color.MAJOR_BG;
        }
      } else {
        /** I'm returning OK here so because invalid numbers will not be plotted so this will only mess up the legend in case the first PV is invalid */
        return color.OK_BG; // return color.INVALID_BG;
      }
    });

    this.alarms.border = this.values.map(value => {
      if (value && !isNaN(value)) {
        if (value < this.minorVal) {
          return color.OK_LINE;
        } else if (value >= this.minorVal && value < this.majorVal)
          return color.MINOR_LINE;
      } else {
        /** Same as the alarm.bg*/
        return color.OK_LINE; // return color.INVALID_LINE;
      }
    });
  }

  updateContent = () => {
    this.updatePVValues();
    let data = {
      labels: this.props.pvs,
      datasets: [
        {
          label: 'MKS - Cold Cathode',
          backgroundColor: this.alarms.bg,
          borderColor: this.alarms.border,
          borderWidth: 1,
          hoverBackgroundColor: color.OK_BG,
          hoverBorderColor: color.HOVER_LINE,
          data: this.values
        },
        {
          label: 'Minor Alarm',
          type: 'line',
          fill: false,
          backgroundColor: color.MINOR_BG,
          borderColor: color.MINOR_LINE,
          borderWidth: 1,
          data: this.minor,
          pointRadius: 0
        },
        {
          label: 'Major Alarm',
          type: 'line',
          fill: false,
          backgroundColor: color.MAJOR_BG,
          borderColor: color.MAJOR_LINE,
          borderWidth: 1,
          data: this.major,
          pointRadius: 0
        }
      ]
    };

    this.setState({ chartData: data });
  }

  componentDidMount() {
    this.timer = setInterval(
      this.updateContent,
      this.refreshInterval
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.epics.disconnect();
  }

  renderBar() {
    return (
      <Bar
        data={this.state.chartData}
        options={{
          tooltips: {
            mode: 'index',
            enabled: false,
            custom: this.props.customTooltipCallback
            // custom: this.customTooltip
          },
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            position: 'bottom',
            align: 'center',
            display: false,
            labels: {}
          },
          scales: {
            xAxes: [{
              ticks: {},
              gridLines: {
                display: true,
                color: 'rgba(184,184,184,0.2)',
                zeroLineColor: 'rgba(184,184,184,0.8)'
              },
            }],
            yAxes: [{
              id: 'pressure',
              scaleLabel: { display: true, labelString: 'mBar' },
              gridLines: {
                display: true,
                color: 'rgba(184,184,184,0.2)',
                zeroLineColor: 'rgba(184,184,184,0.8)'
              },
              ticks: {
                min: 1e-12,
                max: 1e-6,
                fontSize: 14,
              },
              display: true,
              type: 'logarithmic',
            }]
          }
        }}
      />)
  }

  render() {
    return (
      <div className='PressureBar'>
        <div className='Title'>{this.props.title}</div>
        {this.state.chartData ? <article className='GraphContainer'> {this.renderBar()} </article> : 'loading...'}
      </div>
    );
  }
} export default PressureBar;
