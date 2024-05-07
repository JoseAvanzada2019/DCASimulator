// InvestmentSummary.js
import React from 'react';

const InvestmentSummary = () => {
  const summaryItems = [
    { label: "Total Investment", value: "$1000" },
    { label: "Total Portfolio Value", value: "$1200" },
    { label: "Profit", value: "$200" }
];
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
