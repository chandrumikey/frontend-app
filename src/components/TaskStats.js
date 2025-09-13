import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const TaskStats = ({ tasks }) => {
  // Calculate statistics
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Priority breakdown
  const priorityCounts = {
    high: tasks.filter(task => task.priority === 'high').length,
    medium: tasks.filter(task => task.priority === 'medium').length,
    low: tasks.filter(task => task.priority === 'low').length,
  };

  // Pie Chart Data
  const pieChartData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [completedTasks, pendingTasks],
        backgroundColor: ['#4CAF50', '#FF9800'],
        hoverBackgroundColor: ['#45a049', '#e68a00'],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  // Bar Chart Data
  const barChartData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Tasks by Priority',
        data: [priorityCounts.high, priorityCounts.medium, priorityCounts.low],
        backgroundColor: ['#f44336', '#ff9800', '#4caf50'],
        borderColor: ['#d32f2f', '#f57c00', '#388e3c'],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Task Completion Status',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Tasks by Priority',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="task-stats">
      <h2>Task Statistics</h2>
      
      <div className="stats-overview">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <span className="stat-number">{totalTasks}</span>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <span className="stat-number completed">{completedTasks}</span>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <span className="stat-number pending">{pendingTasks}</span>
        </div>
        <div className="stat-card">
          <h3>Completion Rate</h3>
          <span className="stat-number rate">{completionRate}%</span>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-wrapper">
          <div className="chart">
            <Doughnut data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
        
        <div className="chart-wrapper">
          <div className="chart">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
      </div>

      <div className="priority-breakdown">
        <h3>Priority Breakdown</h3>
        <div className="priority-list">
          <div className="priority-item">
            <span className="priority-dot high"></span>
            <span>High Priority: {priorityCounts.high}</span>
          </div>
          <div className="priority-item">
            <span className="priority-dot medium"></span>
            <span>Medium Priority: {priorityCounts.medium}</span>
          </div>
          <div className="priority-item">
            <span className="priority-dot low"></span>
            <span>Low Priority: {priorityCounts.low}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;