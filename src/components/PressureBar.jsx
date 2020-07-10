
import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import Epics from '../utils/Epics';
import { color } from '../utils/Colors';
import "./PressureBar.css";

import SettingsDialog from './SettingsDialog';

defaults.global.defaultFontColor = "#FFF";
defaults.global.defaultFontSize = 16;

class PressureBar extends React.Component {
  static defaultProps = { title: "A graph" };

  constructor(props) {
    super(props);

    this.state = {
      tooltipText: "",
      tooltipVisible: false,
      minorVal: props.high ? props.high : 1e-8,
      minorArray: props.pvs.map(() => props.high ? props.high : 1e-8),
      majorVal: props.hihi ? props.hihi : 1e-7,
      majorArray: props.pvs.map(() => props.hihi ? props.hihi : 1e-7),
      maxVal: null,
      botLim: props.botLim ? props.botLim : 5e-12,
      topLim: props.topLim ? props.topLim : 1e-6,
    };

    this.timer = null;
    this.refreshInterval = 100;
    this.epics = new Epics(this.props.pvs);

    this.values = [];
    this.alarms = { bg: [], border: [] };
    this.max = this.state.majorVal;

  }

  componentDidUpdate(prevProps, prevState, snapshot) { /** Check if there's a new PV list */ }

  updatePVValues = () => {
    /** Refresh PV val array */
    const { minorVal, majorVal } = this.state;
    const { pvs } = this.props;

    this.values = pvs.map(pv => {
      try {
        return this.epics.pvData[pv].value.toExponential(1);

      } catch (e) {
        return this.epics.pvData[pv].value;
      }
    });
    this.valuesMax = Math.max(...this.values);

    this.alarms.bg = this.values.map(value => {
      if (value && !isNaN(value)) {
        if (value < minorVal) {
          return color.OK_BG;
        } else if (value >= minorVal && value < majorVal) {
          return color.MINOR_BG;
        } else {
          return color.MAJOR_BG;
        }
      } else {
        /** I'm returning OK here because invalid numbers will not be plotted
         * so this will only mess up the legend in case the first PV is invalid */
        return color.OK_BG;
      }
    });

    this.alarms.border = this.values.map(value => {
      if (value && !isNaN(value)) {
        if (value < minorVal) {
          return color.OK_LINE;
        } else if (value >= minorVal && value < majorVal)
          return color.MINOR_LINE;
      } else {
        /** Same as the alarm.bg*/
        return color.OK_LINE;
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
            label: 'MKS - Cold Cathode',
            backgroundColor: this.alarms.bg,
            borderColor: this.alarms.border,
            borderWidth: 1,
            hoverBackgroundColor: color.OK_BG,
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
      return { chartData: data, maxVal: maxVal };
    });
  }

  componentDidMount() { this.timer = setInterval(this.updateContent, this.refreshInterval); }

  componentWillUnmount() { clearInterval(this.timer); this.epics.disconnect(); }

  renderBar = () => {
    const { majorVal, minorVal, maxVal, botLim, topLim } = this.state;
    const { customTooltipCallback } = this.props;
    return (
      <Bar
        data={this.state.chartData}
        plugins={[ChartDataLabels]}
        options={{
          plugins: {
            datalabels: { rotation: 270, font: { weight: "bold" } },
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
                maxTicksLimit: 100,
                min: botLim,
                max: topLim,
                fontSize: 14,
                beginAtZero: false,
                callback: function (label, index, labels) {
                  switch (label) {
                    case 1e-12:
                    case 1e-11:
                    case 1e-10:
                    case 1e-9:
                    case 1e-8:
                    case 1e-7:
                    case 1e-6:
                    case 1e-5:
                    case 1e-4:
                    case 1e-3:
                    case 1e-2:
                      return label.toExponential(1);
                    default:
                      return "";
                  }
                }
              },
              display: true,
              type: 'logarithmic',
            }]
          }
        }}
      />)
  }
  handleConfigLimits = (topLim, botLim) => {
    const topLimf = parseFloat(topLim);
    const botLimf = parseFloat(botLim);
    this.setState((state, props) => {
      return { botLim: botLimf, topLim: topLimf };
    });
  }
  handleConfig = (hihi, high) => {
    high = parseFloat(high);
    hihi = parseFloat(hihi);
    if ((hihi != this.state.majorVal || high != this.state.minorVal) && (high < hihi)) {
      this.setState((state, props) => {
        const { pvs } = props;
        return {
          minorVal: high,
          majorVal: hihi,
          minorArray: pvs.map(() => high),
          majorArray: pvs.map(() => hihi)
        };
      });
    }
  }

  render() {
    const { minorVal, majorVal, topLim, botLim } = this.state;
    const { title, backHandler } = this.props;

    return (
      <div className='PressureBar'>
        <div className='Title'>{title}</div>
        <SettingsDialog
          title={title + " settings"}
          high={minorVal} hihi={majorVal}
          topLim={topLim} botLim={botLim}
          handleConfig={this.handleConfig}
          handleConfigLimits={this.handleConfigLimits}
        />
        {this.state.chartData ? <article className='GraphContainer'> {this.renderBar()} </article> : 'loading...'}
      </div>
    );
  }
} export default PressureBar;
