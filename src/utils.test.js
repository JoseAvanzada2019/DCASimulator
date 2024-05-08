import { investmentDetails } from './utils';

describe('investmentDetails', () => {
  test('calculates investment details correctly', () => {
    // Mock prices data
    const prices = {
      '2024-01': { price: 100 },
      '2024-02': { price: 120 },
      '2024-03': { price: 150 }
    };
    
    // Initial investment amount
    const initialAmount = 1000;
    
    // Calculate investment details
    const details = investmentDetails(initialAmount, prices);
    
    // Check if the details are calculated correctly for each date
    expect(details['2024-01']).toEqual({
      portfolioValue: '1000.0',
      investedAmount: 1000,
      cryptoAmount: '10.00000000',
      investmentReturn: '0.0',
      priceToDate: 100
    });
    
    expect(details['2024-02']).toEqual({
        portfolioValue: '2200.0',
        investedAmount: 2000,
        cryptoAmount: '18.33333333',
        investmentReturn: '10.0',
        priceToDate: 120
    });
    
    expect(details['2024-03']).toEqual({
        portfolioValue: '3750.0',
        investedAmount: 3000,
        cryptoAmount: '25.00000000',
        investmentReturn: '25.0',
        priceToDate: 150
      });
  });
});