import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DcaTable from './DcaTable';

describe('DcaTable', () => {
  test('renders table with correct data', () => {
    const details = {
      '2024-01': {
        cryptoAmount: '10.00000000',
        priceToDate: 100,
        investedAmount: 1000,
        portfolioValue: '1000.0',
        investmentReturn: '0.0'
      },
      '2024-02': {
        cryptoAmount: '10.00000000',
        priceToDate: 120,
        investedAmount: 1200,
        portfolioValue: '1200.0',
        investmentReturn: '0.0'
      }
    };

    const formData = {
      cryptocurrency: 'BTC'
    };

    render(<DcaTable details={details} formData={formData} />);

    const dateCells = screen.getAllByText(/2024-0[12]/);
    expect(dateCells).toHaveLength(2);

    const cryptoAmountCells = screen.getAllByText('10.00000000');
    expect(cryptoAmountCells).toHaveLength(2);

    const priceToDateCells = screen.getAllByText(/100|120/);
    expect(priceToDateCells).toHaveLength(6);

    const investedAmountCells = screen.getAllByText(/1000|1200/);
    expect(investedAmountCells).toHaveLength(4);

    const portfolioValueCells = screen.getAllByText(/1000.0|1200.0/);
    expect(portfolioValueCells).toHaveLength(2);

    const investmentReturnCells = screen.getAllByText(/0.0/);
    expect(investmentReturnCells).toHaveLength(7);
  });
});