import React, { useEffect, useState } from 'react';
import './DcaTable.scss'; // Import CSS file for table styling

const DcaTable = ({ details, formData }) => {
  
  const [tableEntries, setTableEntries] = useState()

  useEffect(() => {
    if (Object.keys(details).length > 0) {
      setTableEntries(details)
    }
  }, [details]);
      
  return (
    <div className="dca-table-container">
      <h2 className="dca-table-heading">Detalle por mes</h2>
      
      {tableEntries && formData &&
        <table className="dca-table">
          <thead>
            <tr>
              <th>FECHA</th>
              <th>CANTIDAD {formData.cryptocurrency}</th>
              <th>PRECIO A LA FECHA</th>
              <th>MONTO INVERTIDO</th>
              <th>VALOR DEL PORTAFOLIO</th>
              <th>CAMBIO %</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(tableEntries).map((key, index) => (
              <tr key={index}>
                <td>{key}</td>
                <td>{tableEntries[key].cryptoAmount}</td>
                <td>{tableEntries[key].priceToDate}</td>
                <td>{tableEntries[key].investedAmount}</td>
                <td>{tableEntries[key].portfolioValue}</td>
                <td>% {tableEntries[key].investmentReturn}</td>
              </tr>
            ))}
          </tbody>
        </table>}
    </div>
  );
};

export default DcaTable;