import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const AlignmentChart = () => {
    const data = {
    labels: ['Empathy', 'Morality', 'Altruism', 'Practicality', 'Self-Interest'],
    datasets: [
      {
        label: 'User Responses',
        data: [4, 6, 4, 5, 3], // Mock data
        backgroundColor: 'rgba(45, 201, 52, 0.27)',
        borderColor: 'rgb(18, 167, 167)',
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Prevent resizing issues
    scales: {
      r: {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '500px', height: '500px' }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default AlignmentChart;