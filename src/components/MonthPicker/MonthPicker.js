import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './MonthPicker.scss';
import calendarSvg from '../../assets/calendar-symbol.svg';

const MonthPicker = ({ onChange }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    useEffect(() => {
        if (startDate && endDate && endDate < startDate) {
          setEndDate(null);
        }
      }, [startDate, endDate]);
    // Function to handle date changes
    const handleStartDateChange = (date) => {
      setStartDate(date);
      // Call onChange function with updated start and end dates
      onChange({ startDate: date, endDate });
    };
  
    const handleEndDateChange = (date) => {
      setEndDate(date);
      // Call onChange function with updated start and end dates
      onChange({ startDate, endDate: date });
    };


  return (
    <div >
        <div className="form-groups">
          <div >
            <label htmlFor="startDate">Inicio</label>
            <div>
                <img alt='' src={calendarSvg} className="calendar-icon"/>
            </div>
            <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                className="react-datepicker"
                maxDate={new Date()}
            />
          </div>
          <div >
            <label htmlFor="endDate">Término</label>
            <div>
                <img alt='' src={calendarSvg} className="calendar-icon"/>
            </div>
            <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                className="react-datepicker"
                maxDate={new Date()}
            />
          </div>
        </div> 
    </div>
  );
};

export default MonthPicker;
