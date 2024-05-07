import React, { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import './DcaChart.scss'; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const DcaChart = ({ details, formData }) => {
  const [dates, setDates] = useState([]);
  const [portfolioValues, setPortfolioValues] = useState([]);
  const [InvestedAmounts, setInvestedAmounts] = useState([])
  const chartRef = useRef(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const newChartInstance = new ChartJS(canvas, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Portfolio Value',
          data: portfolioValues,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Estrategia guardar bajo el colchón',
          data: portfolioValues
        }],
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
    });
    chartRef.current = newChartInstance;

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [dates, portfolioValues, InvestedAmounts]);

  useEffect(() => {
    if (Object.keys(details).length > 0) {
      const newDates = Object.keys(details);
      const newPortfolioValues = newDates.map(date => details[date].portfolioValue);
      const newInvestedValues = newDates.map(date => details[date].investedAmount);
      setDates(newDates);
      setPortfolioValues(newPortfolioValues);
      setInvestedAmounts(newInvestedValues)
    }
  }, [details]);

  return (
    <>
      {formData?.compare ? (
        <>
          {portfolioValues.length > 0 && dates.length > 0 ? (
            <Line 
            ref={chartRef} 
            data={{ 
              labels: dates, 
              datasets: [
                { 
                  label: 'Portafolio DCA', 
                  data: portfolioValues, 
                  borderColor: 'rgb(53, 162, 235)' 
                },
                { 
                  label: 'Estrategia guardar bajo el colchón', 
                  data: InvestedAmounts, 
                  borderColor: 'rgb(255, 99, 132)' 
                }
              ] 
            }} 
          />
          ) : (
            "Loading..."
          )}
        </>
      ) : (
        <>
          {portfolioValues.length > 0 && dates.length > 0 ? (
            <Line 
              ref={chartRef} 
              data={{ 
                labels: dates, 
                datasets: [{ 
                  label: 'Portafolio DCA', 
                  data: portfolioValues, 
                  borderColor: 'rgb(53, 162, 235)' 
                }] 
              }} 
            />
          ) : (
            "Loading..."
          )}
        </>
      )}
    </>
  );
};

export default DcaChart;