import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, PointElement, LineElement, Filler, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import './index.css';

// response weight
const Mock = require("./mockQuestionnaire.json");
function responseWeight(res){
  let resArr = res.map((e) => e.response < 3 ? e.x_weight : e.y_weight );
  for(let i = 0 ; i < res.length ; i++){
    if(res[i].response == 0 || res[i].response == 5){
      resArr[i] = resArr[i].map( e => (e+1)*3);}
    if(res[i].response == 1 || res[i].response == 4){
      resArr[i] = resArr[i].map( e => (e+1)*2);}
  }
  let result = [0,0,0,0,0]; // hardcodded number of labels
  for(let k = 0 ; k < resArr.length ; k++){
    for(let j = 0 ; j < 5; j++){
      result[j] = result[j] + resArr[k][j]
    }
  }
  return result.map(e => e / Mock.length );
}

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
// overriding default style
const fontSize = 16;
ChartJS.defaults.font.size = fontSize;
ChartJS.defaults.scales.radialLinear.pointLabels.font = fontSize;
ChartJS.defaults.scales.radialLinear.grid.circular = true;
ChartJS.defaults.font.weight = 'bold';

const AlignmentChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-responses');
        const responses = await response.json();
        setData({
          labels: ['Empathy', 'Morality', 'Altruism', 'Practicality', 'Self-Interest'],
          datasets: [
            {
              label: 'Alignment',
              data: responseWeight(responses),
              backgroundColor: 'rgba(45, 201, 52, 0.27)',
              hoverBackgroundColor: 'rgba( 177,77,7, 0.5)',
              borderColor: 'rgb(18, 167, 167)',
              borderWidth: 3,
              borderDash: [0,3,1],
              pointRadius: 12,
              pointHoverRadius: 27,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching responses:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <h1> YOUR RESULT </h1>
    <div className='radar'>
      {data ? <Radar data={data} /> : <p> Loading chart... </p>}
    </div>
    </>
  );
};

export default AlignmentChart;