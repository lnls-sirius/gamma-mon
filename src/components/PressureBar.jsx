
import React from 'react';
import Epics from '../utils/Epics';

import { Bar } from 'react-chartjs-2';
import { color } from '../utils/Colors';


class PressureBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Pressure Monitor",
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

  updatePVValues = () => {
    this.values = this.props.pvs.map(pv => {
      return this.epics.pvData[pv].value;
    });

    this.alarms.bg = this.values.map(value => {
      if (value) {
        if (value < this.minorVal) {
          return color.OK_BG;
        } else if (value >= this.minorVal && value < this.majorVal) {
          return color.MINOR_BG;
        } else {
          return color.MAJOR_BG;
        }
      }
    });

    this.alarms.border = this.values.map(value => {
      if (value) {
        if (value < this.minorVal) {
          return color.OK_LINE;
        } else if (value >= this.minorVal && value < this.majorVal)
          return color.MINOR_LINE;
      } else {
        return color.MAJOR_LINE;
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
          data: this.minor
        },
        {
          label: 'Major Alarm',
          type: 'line',
          fill: false,
          backgroundColor: color.MAJOR_BG,
          borderColor: color.MAJOR_LINE,
          borderWidth: 1,
          data: this.major
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
    clearInterval(this.setInterval);
  }

  customTooltip = (tooltipModel) => {

    if (tooltipModel.opacity === 0) {
      this.setState({ tooltipVisible: false });
      return;
    }

    // set values
    const x = tooltipModel.dataPoints[0].xLabel;
    const y = tooltipModel.dataPoints[0].yLabel;

    this.setState({ tooltipVisible: true, tooltipX: x, tooltipY: y });
  }

  renderBar() {
    return (
      <Bar
        data={this.state.chartData}
        width={950}
        height={600}
        options={{
          tooltips: {
            mode: 'index',
            enabled: false,
            custom: this.customTooltip
          },
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            position: 'bottom',
            align: 'center'
          },
          scales: {
            yAxes: [{
              ticks: {
                min: 1e-12,
                max: 1e-6
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
      <div>
        <h2> {this.state.title} </h2>
        <table align='center'>
          <tbody>
          {this.state.tooltipVisible ? (
            <tr>
              <td>{this.state.tooltipX}</td>
              <td>{this.state.tooltipY}</td>
            </tr>
          ) : (<tr>
            <td>-</td>
            <td>-</td>
          </tr>)}
          </tbody>
        </table>
        {this.state.chartData ? <div> {this.renderBar()} </div>: 'loading...'}
      </div>
    );
  }
} export default PressureBar;