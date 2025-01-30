import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import './index.css';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Mock = require("./mockQuestionnaire.json");
function responseWeight(res){
  let resArr = res.map((e) => e.response < 3 ? e.x_weight : e.y_weight );
  for(let i = 0 ; i < res.length ; i++){
    if(res[i].response == 0 || res[i].response == 5){
      resArr[i] = resArr[i].map( e => (e+1)*3);}
    if(res[i].response == 1 || res[i].response == 4){
      resArr[i] = resArr[i].map( e => (e+1)*2);}
  }
  let result = [0,0,0,0,0]; 
  for(let k = 0 ; k < resArr.length ; k++){
    for(let j = 0 ; j < 5; j++){
      result[j] = result[j] + resArr[k][j]
    }
  }
  return result.map(e => e / Mock.length );
}

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

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
              label: 'User Responses',
              data: responseWeight(responses),
              backgroundColor: 'rgba(45, 201, 52, 0.27)',
              borderColor: 'rgb(18, 167, 167)',
              borderWidth: 3,
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
    <div className='radar'>
      {data ? <Radar data={data} /> : <p> Loading chart... </p>}
    </div>
  );
};

export default AlignmentChart;