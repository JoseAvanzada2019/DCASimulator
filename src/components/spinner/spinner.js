import React from 'react';
import spinnerSvg from '../../assets/spinner.svg';
import "./spinner.scss";

const Loader = ({ showSpinner }) => {
  return (
    <>
        {showSpinner &&
            <div className="loader-container">
                <div className='spinner'>
                    <img src={spinnerSvg} alt="Spinner" />
                </div>
            </div> 
        }
    </>
  );
};

export default Loader;