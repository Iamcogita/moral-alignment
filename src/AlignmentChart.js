import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import './index.css';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// Mock data and function
const Mock = require("./mockQuestionnaire.json");

function responseWeight(res){
  let resArr = res.map((e) => e.response < 4 ? e.x_weight : e.y_weight );
  for(let i = 0 ; i < res.length ; i++){
    if(res[i].response == 1 || res[i].response == 6){
      resArr[i] = resArr[i].map( e => e*3);}
    if(res[i].response == 2 || res[i].response == 5){
      resArr[i] = resArr[i].map( e => e*2);}
  }
  let result = [0,0,0,0,0];
  for(let k = 0 ; k < resArr.length ; k++){
    for(let j = 0 ; j < 5; j++){
      result[j] = result[j] + resArr[k][j]
    }
  }
  return result.map(e => e/10)
}

const AlignmentChart = () => {
    const data = {
    labels: ['Empathy', 'Morality', 'Altruism', 'Practicality', 'Self-Interest'],
    datasets: [
      {
        label: 'User Responses',
        data: responseWeight(Mock), 
        backgroundColor: 'rgba(45, 201, 52, 0.27)',
        borderColor: 'rgb(18, 167, 167)',
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        ticks: {
          beginAtZero: true,
          stepSize: 1.5,
        },
      },
    },
  };

  return (
    <div className='radar'>
      <Radar data={data} options={options} />
    </div>
  );
};

export default AlignmentChart;