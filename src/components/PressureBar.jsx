import React from 'react';
import {Bar} from 'react-chartjs-2';
import {color} from '../utils/Colors';
import Epics from '../utils/Epics';

function getRandomInt() {
  return Math.random() * 10e-8;
}

class  PressureBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: "Pressure Monitor"
    };
    this.timer = null;
    this.refreshInterval = 1000;
    this.epics = new Epics(['BO-06U:VA-CCG-ED:Pressure-Mon']);
  }

  updateContent = ()=>{
    let data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'MKS - Cold Cathode',
          backgroundColor: color.OK_BG,
          borderColor: color.OK_LINE,
          borderWidth: 1,
          hoverBackgroundColor: color.OK_BG,
          hoverBorderColor: color.HOVER_LINE,
          data: [
            getRandomInt(),
            getRandomInt(),
            getRandomInt(),
            getRandomInt(),
            getRandomInt(),
            getRandomInt(),
            getRandomInt() ]
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
          data: [
            1e-8,
            1e-8,
            1e-8,
            1e-8,
            1e-8,
            1e-8,
            1e-8]

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
          data: [
            1e-7,
            1e-7,
            1e-7,
            1e-7,
            1e-7,
            1e-7,
            1e-7]

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
          width={650}
          height={400}
          options={{
            maintainAspectRatio: false,
            // responsive: true,
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