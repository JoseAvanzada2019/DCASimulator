import React, { useEffect, useState, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './DcaChart.scss'; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const DcaChart = ({ details }) => {
  const [dates, setDates] = useState([])
  const [portfolioValues, setPortfolioValues] = useState([])
  const [graphData, setGraphData] = useState({
    labels: dates,
    datasets: [
      {
        fill: true,
        label: 'Portfolio Value',
        data: portfolioValues,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  })

  const chartRef = useRef();
  const canvas = document.createElement('canvas');
      chartRef.current = new ChartJS(canvas, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              label: 'Portfolio Value',
              data: portfolioValues,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Portfolio Value Over Time',
            },
          },
        },
      })

  useEffect(() => {
    if (Object.keys(details).length > 0) {
      const newDates = Object.keys(details);
      const newPortfolioValues = newDates.map(date => details[date].portfolioValue);
      setDates(newDates);
      setPortfolioValues(newPortfolioValues);
      setGraphData(
        {
          labels: dates,
          datasets: [
            {
              fill: true,
              label: 'Portfolio Value',
              data: portfolioValues,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        }
      )
    }
  }, [details]);

  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance && portfolioValues.length > 0 && dates.length > 0) {
      const chartInstance = chartRef.current.chartInstance;
      chartInstance.data.labels = dates;
      chartInstance.data.datasets[0].data = portfolioValues;
      chartInstance.update(); // Update chart with new data
    }
  }, [portfolioValues, dates]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Portfolio Value Over Time',
      },
    },
  };

  return (
    <>
      {portfolioValues.length > 0 && dates.length > 0 && graphData && <Line ref={chartRef} options={options} data={graphData} />}
    </>
  );
};

export default DcaChart;


