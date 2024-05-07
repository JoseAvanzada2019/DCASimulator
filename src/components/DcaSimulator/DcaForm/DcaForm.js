import React, { useState, useEffect } from 'react';
import './DcaForm.scss';
import { baseCurrencyToName, cryptoCodeToName } from '../../../utils';
import MonthPicker from '../../MonthPicker/MonthPicker';

const DcaForm = ({ formData, setFormData, calculateInvestment}) => {
  const [isFormFilled, setIsFormFilled] = useState(false)

  useEffect(() => {
    setIsFormFilled(formData.startDate && formData.endDate  && formData.currency && formData.amount && formData.cryptocurrency)
  }, [formData]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "compare") {
      setFormData({ ...formData, [name]: !formData[name] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateInvestment();
  };

  const handleDateChange = ({ startDate, endDate }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      startDate,
      endDate,
    }));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className='form-groups'>
          <div className="form-group">
            <label htmlFor="cryptocurrency">Cryptomoneda</label>
            <select className="half" id="cryptocurrency" name="cryptocurrency" value={formData.cryptocurrency} onChange={handleChange}>
              {Object.keys(cryptoCodeToName).map(key => (
                <option key={key} value={key}>
                  {cryptoCodeToName[key]}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="currency">Moneda</label>
            <select className="half" id="currency" name="currency" value={formData.currency} onChange={handleChange}>
              {Object.keys(baseCurrencyToName).map(key => (
                  <option key={key} value={key}>
                    {baseCurrencyToName[key]}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Monto</label>
          <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} />
        </div>
        <div className="form-group">
          <MonthPicker onChange={handleDateChange} />
        </div>
        <div className="form-group">
          <label htmlFor="compare">Comparar contra dinero bajo el colchón:</label>
          <div className="switch">
            <input
              type="checkbox"
              id="compare"
              name="compare"
              checked={formData.compare}
              onChange={handleChange}
              className="switch-input"
            />
            <label htmlFor="compare" className="switch-label"></label>
          </div>
        </div>
        <div className="form-group">
          <button className='button' disabled={!isFormFilled} onClick={handleSubmit}>
            Simular
          </button>
        </div>
      </form>
    </div>
  );
};

export default DcaForm;
