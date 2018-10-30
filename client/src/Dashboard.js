import React from 'react';
import { Doughnut, Pie, Bar } from 'react-chartjs-2';

const pie_data = {
	labels: [
		'Actual Data',
		'Made Up Data'
	],
	datasets: [{
		data: [0, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB'
		]
	}]
};

const dnut_data = {
	labels: [
		'Q1',
		'Q2',
    'Q3',
    'Q4'
	],
	datasets: [{
		data: [300, 250, 60, 420],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
    '#FFCE56',
    '#87FFC1'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
    '#FFCE56',
    '#FFCE56'
		]
	}]
};

const bar_data = {
  labels: ['0-3 years', '4-8 years', '9+ years'],
  datasets: [
    {
      label: 'Vehicles by Age',
      backgroundColor: 'rgba(97,218,251,0.4)',
      borderColor: 'rgba(97,218,251,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [10, 12, 8]
    }
  ]
};

const Dashboard = () => (
  <div className="sub-container">
    <header className="sub-header">
      <h4>User Dashboard</h4>
    </header>
    <div className="sub-body">
      <div className="dashboard">
        <Widget title="Dashboard Data Integrity">
          <Pie data={pie_data} />
        </Widget>
        <Widget title="Campaign Counts by Quarter">
          <Doughnut data={dnut_data} />
        </Widget>
        <Widget title="Vehicles by Age">
          <Bar data={bar_data} />
        </Widget>
      </div>
    </div>
  </div>
);

const Widget = ({ title, children }) => (
  <div className="dashboard-widget">
    <h4>{title}</h4>
    <div>{ children }</div>
  </div>
);

export default Dashboard;