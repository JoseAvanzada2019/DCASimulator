import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DcaForm from './DcaForm';

const formData = {
    cryptocurrency: 'BTC',
    amount: '',
    currency: 'CLP',
    startDate: '',
    endDate: '',
    compare: false
  }


describe('DcaForm', () => {
  test('renders form inputs and button', () => {
    render(<DcaForm formData={formData}/>);
    const cryptocurrencySelect = screen.getByLabelText('Cryptomoneda');
    const currencySelect = screen.getByLabelText('Moneda');
    const amountInput = screen.getByLabelText('Monto');
    const compareCheckbox = screen.getByLabelText('Comparar contra dinero bajo el colchón:');
    const simulateButton = screen.getByText('Simular');

    expect(cryptocurrencySelect).toBeInTheDocument();
    expect(currencySelect).toBeInTheDocument();
    expect(amountInput).toBeInTheDocument();
    expect(compareCheckbox).toBeInTheDocument();
    expect(simulateButton).toBeInTheDocument();
  });

  test('updates form data when inputs change', () => {
    const setFormDataMock = jest.fn();
    render(<DcaForm formData={formData} setFormData={setFormDataMock}/>);
    const cryptocurrencySelect = screen.getByLabelText('Cryptomoneda');
    const currencySelect = screen.getByLabelText('Moneda');
    const amountInput = screen.getByLabelText('Monto');
    const compareCheckbox = screen.getByLabelText('Comparar contra dinero bajo el colchón:');

    fireEvent.change(cryptocurrencySelect, { target: { value: 'BTC' } });
    fireEvent.change(currencySelect, { target: { value: 'CLP' } });
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.click(compareCheckbox)

    expect(setFormDataMock).toHaveBeenCalledTimes(4);
    expect(setFormDataMock).toHaveBeenCalledWith(expect.objectContaining({
      cryptocurrency: 'BTC',
      currency: 'CLP',
      amount: '100',
      compare: false,
    }));
  });
});