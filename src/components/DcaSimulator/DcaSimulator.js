import React, { useEffect, useState } from 'react';
import DcaForm from './DcaForm/DcaForm';
import DcaChart from './DcaChart/DcaChart';
import DcaTable from './DcaTable/DcaTable';
import InvestmentSummary from './DcaInvestmentSummary/InvestmentSummary';
import Header from './Header';
import Loader from '../spinner/spinner';
import { addArraysWithoutRepeat, investmentDetails } from '../../utils';

const DcaSimulator = ({ callServiceHandler }) => {
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState({})
  const [formData, setFormData] = useState({
    cryptocurrency: 'BTC',
    amount: '',
    currency: 'CLP',
    startDate: '',
    endDate: '',
    compare: false
  });
  const title = "Simulador DCA";
  const [prices, setPrices] = useState({})

  useEffect(() => {
    if (Object.keys(prices).length > 0) {
      setDetails(investmentDetails(Number(formData.amount), prices))
      console.log(details)
    }
  }, [prices]);

  async function calculateInvestment() {
    try {
        const market_id = `${formData.cryptocurrency.toLowerCase()}-${formData.currency.toLowerCase()}`;
        const endDate = new Date(formData.endDate);
        const startDate = new Date(formData.startDate);
        
        const startYear = startDate.getFullYear();
        const startMonth = startDate.getMonth();
        const endYear = endDate.getFullYear();
        const endMonth = endDate.getMonth();
        
        const firstDaysOfMonth = [];
        
        // Calculate the first day of each month within the range
        for (let year = startYear; year <= endYear; year++) {
            const monthStart = (year === startYear) ? startMonth : 0;
            const monthEnd = (year === endYear) ? endMonth : 11;
            for (let month = monthStart; month <= monthEnd; month++) {
                firstDaysOfMonth.push(new Date(year, month, 1));
            }
        }
        
        let trades = []
        for (const firstDay of firstDaysOfMonth) {
          const year = firstDay.getFullYear();
          const month = firstDay.getMonth();
          // Calculate timestamps for the start and end of the month
          const startOfMonthTimestamp = new Date(year, month + 1, 1).setUTCHours(0, 0, 0, 0); // Set to 00:00:00
          console.log(startOfMonthTimestamp)
          const endTimestamp = new Date(year, month + 1, 1).setUTCHours(12, 0, 0, 0); // Set to 23:59:59
          console.log(endTimestamp)
          let currentTimestamp = endTimestamp;
          let lastTimestamp = startOfMonthTimestamp;
      
          // Fetch trades until we cover the entire month
          while (currentTimestamp > lastTimestamp) {
              const url = process.env.REACT_APP_BUDA_API_URL + `/markets/${market_id}/trades?timestamp=${currentTimestamp}&last_timestamp=${lastTimestamp}&limit=100`;
              const response = await callServiceHandler(url, 'GET', null, setLoading);
              trades = addArraysWithoutRepeat(trades, response.trades.entries)
              
              
              // Check if the last timestamp of the response is within the range
              if (response.trades.last_timestamp === lastTimestamp
                 || response.trades.last_timestamp === currentTimestamp ||
                response.trades.entries.length < 100 ) {
                break; // If not, break the loop
              } else {
                  // Update currentTimestamp to fetch the next batch
                  currentTimestamp = response.trades.last_timestamp - 1; // Increment by 1 millisecond to avoid duplicates
              }
          }
        }
        setPrices(getPricesAtFirstOfMonth(trades))
    } catch (error) {
        console.error('Error fetching markets:', error);
    }
}

  const getPricesAtFirstOfMonth = (entries) => {
    const prices = {};
  
    // Iterar sobre los trades
    for (let i = 0; i < entries.length; i++) {
      const trade = entries[i];
      const timestamp = parseInt(trade[0]); // Convertir el timestamp a número
      const date = new Date(timestamp);
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth();

      // Crear una clave para el mes (y año) actual y para el mes anterior
      const keyCurrentMonth = `${year}-${month + 1 < 10 ? '0' : ''}${month + 1}`;

      if (!(keyCurrentMonth in prices) || timestamp > prices[keyCurrentMonth].timestamp) {
        // Si no hay trade registrado o si este trade es más reciente, guardar el trade en el objeto "prices"
        prices[keyCurrentMonth] = {
          timestamp: timestamp,
          price: Number(trade[2])
        };
      }
      
    }
    return prices;
  };

  return (
    <div className="container">
      <Header title={title} />
      <div className="row">
        <div className={`col-md-4 ${Object.keys(details).length > 0 ? "" : "offset-md-4"}`}>
            <DcaForm 
              formData={formData}
              setFormData={setFormData}
              calculateInvestment={calculateInvestment}
            />
        </div>
        <div className="col-md-8">
          <div className='chart-container'>
            {Object.keys(details).length > 0 &&
              <InvestmentSummary 
                details={details}
              />
            }
            {Object.keys(details).length > 0 &&
              <DcaChart 
                details={details}
                formData={formData}
              />
            }
            {Object.keys(details).length > 0 && Object.keys(formData).length > 0 &&
            <DcaTable 
              details={details}
              formData={formData}
            />
          }
          </div>
        </div>
      </div>
      <Loader
        showSpinner={loading}
      />
    </div>
  );
};

export default DcaSimulator;
