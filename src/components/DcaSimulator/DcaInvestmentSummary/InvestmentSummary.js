// InvestmentSummary.js
import React, { useState, useEffect } from 'react';
import './InvestmentSummary.scss';

const InvestmentSummary = ({ details }) => {
  const [summaryItems, setSummary] = useState([
    { label: "Monto invertido", value: "" },
    { label: "Valor portafolio", value: "" },
    { label: "Rendimiento", value: "" }
  ])

  useEffect(() => {
    if (Object.keys(details).length > 0) {
      const dataLastMonth = getDataFromLastDate(details)
      setSummary(
        [
          { label: "Total invertido", value: dataLastMonth.investedAmount },
          { label: "Valor portafolio", value: dataLastMonth.portfolioValue },
          { label: "Rendimiento", value: "% " + dataLastMonth.investmentReturn  }
        ]
      )
    }
  }, [details]);

  function getDataFromLastDate(details) {
    // Extract dates and sort them
    const datesArray = Object.keys(details).sort();
    
    // Get the last date
    const lastDate = datesArray[datesArray.length - 1];

    // Retrieve data associated with the last date
    const dataFromLastDate = details[lastDate];

    return dataFromLastDate;
  }
  return (
    <div className="investment-summary">
      {summaryItems.map((item, index) => (
        <div key={index} className="summary-item">
          <h3>{item.label}</h3>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default InvestmentSummary;
