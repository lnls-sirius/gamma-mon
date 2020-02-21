import React from 'react';
import {Bar} from 'react-chartjs-2';
import {color} from '../utils/Colors';
import Epics from '../utils/Epics';

const pressure = [
  'BO-01U:VA-CCG-BG:Pressure-Mon',
  'BO-04U:VA-CCG-BG:Pressure-Mon',
  'BO-05D:VA-CCG-RFC:Pressure-Mon',
  'BO-06U:VA-CCG-ED:Pressure-Mon',
  'BO-09U:VA-CCG-BG:Pressure-Mon',
  'BO-11U:VA-CCG-ED:Pressure-Mon',
  'BO-14U:VA-CCG-BG:Pressure-Mon',
  'BO-16U:VA-CCG-ED:Pressure-Mon',
  'BO-19U:VA-CCG-BG:Pressure-Mon',
  'BO-21U:VA-CCG-ED:Pressure-Mon',
  'BO-24U:VA-CCG-BG:Pressure-Mon',
  'BO-26U:VA-CCG-ED:Pressure-Mon',
  'BO-29U:VA-CCG-BG:Pressure-Mon',
  'BO-31U:VA-CCG-ED:Pressure-Mon',
  'BO-34U:VA-CCG-BG:Pressure-Mon',
  'BO-36U:VA-CCG-ED:Pressure-Mon',
  'BO-39U:VA-CCG-BG:Pressure-Mon',
  'BO-41U:VA-CCG-ED:Pressure-Mon',
  'BO-44U:VA-CCG-BG:Pressure-Mon',
  'BO-46U:VA-CCG-ED:Pressure-Mon',
  'BO-47U:VA-CCG-ED:Pressure-Mon',
  'BO-49U:VA-CCG-BG:Pressure-Mon'];

class  PressureBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: "Pressure Monitor"
    };
    this.timer = null;
    this.refreshInterval = 100;
    this.epics = new Epics(pressure);
    this.minor = pressure.map(()=>1e-6);
    this.major = pressure.map(()=>1e-8);
    this.values = [];
  }

  updatePVValues = ()=>{
    this.values = pressure.map(pv =>{
        return this.epics.pvData[pv].value;
    });
  }

  updateContent = ()=>{
    this.updatePVValues();
    let data = {
      labels: pressure,
      datasets: [
        {
          label: 'MKS - Cold Cathode',
          backgroundColor: color.OK_BG,
          borderColor: color.OK_LINE,
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
          // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          // hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.minor 
        },
        {
          label: 'Major Alarm',
          type: 'line',
          fill: false,
          backgroundColor: color.MAJOR_BG,
          borderColor: color.MAJOR_LINE,
          borderWidth: 1,
          // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          // hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.major
        }
      ]
    };

    this.setState({chartData:data});
  }

  componentDidMount(){
    this.timer = setInterval(
      this.updateContent,
      this.refreshInterval
    );
  }

  componentWillUnmount(){
    clearInterval(this.setInterval);
  }

  renderBar(){
    return (
        <Bar
          data={this.state.chartData}
          width={750}
          height={700}
          options={{
            // maintainAspectRatio: false,
            responsive: true,
            legend:{
              position: 'bottom',
              align: 'center'
            },
            // title:{
            //   display: true,
            //   text: 'Pressure Monitor'
            // },
            scales: {
              yAxes: [{
                ticks: {
                  min: 1e-12,
                  max: 1e-6
                  // beginAtZero: true
                },
                display: true,
                type: 'logarithmic',
                // min: 0,
                // max: 1e-1
                // suggestedMin: 1e-12,
                // suggestedMax: 1e-6
              }]
            }
          }}
        />)
  }

  render() {
    return (
      <div>
        <h2> {this.state.title} </h2>
        {this.state.chartData?this.renderBar():'loading...'}
      </div>
    );
  }
} export default PressureBar;