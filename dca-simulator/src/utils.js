

const callServiceHandler = async (url, method = 'GET', data = null, setLoading) => {
  let result = null;
  try {
    setLoading(true); // Show loader

    const requestOptions = {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : null
    };

    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    result = responseData;

    setLoading(false); // Hide loader
  } catch (error) {
    console.error('Error:', error);
    setLoading(false); // Hide loader
    // Handle error (e.g., show error message)
  }
  return result;
};

export { callServiceHandler };

export const dateToTimestamp = (date) => {

  // Obtener el timestamp
  const timestamp = date.getTime();

  return timestamp;
}

export function addArraysWithoutRepeat(arr1, arr2) {
  // Concatenate the arrays
  let combinedArray = arr1.concat(arr2);
  
  // Create a Set to remove duplicates
  let uniqueElements = new Set(combinedArray);
  
  // Convert Set back to an array
  let result = Array.from(uniqueElements);
  
  return result;
}

export function investmentDetails(initialAmount, prices) {
  let currentInvestedAmount = 0;
  let amountOfCryptos = 0;
  let results = {};
  // Extract dates and sort them
  const sortedDates = Object.keys(prices).sort();
  // Iterate over sorted dates
  sortedDates.forEach((key) => {
    currentInvestedAmount += Number(initialAmount);
    amountOfCryptos += Number(initialAmount) / prices[key].price;
    const currentValue = amountOfCryptos * prices[key].price;
    const currentReturn = ((currentValue / currentInvestedAmount) - 1) * 100;
    results[key] = {
      portfolioValue: currentValue.toFixed(1),
      investedAmount: currentInvestedAmount,
      cryptoAmount: amountOfCryptos.toFixed(8),
      investmentReturn: currentReturn.toFixed(1),
      priceToDate: prices[key].price
    };
  });

  return results;
}

export const cryptoCodeToName = {
  "BCH": "Bitcoin Cash",
  "BTC": "Bitcoin",
  "ETH": "Ethereum",
  "LTC": "Litecoin",
  "USDT": "Tether",
  "USDC": "USD Coin"
}

export const baseCurrencyToName = {
  "CLP": "Peso chileno",
  "COP": "Peso colombiano",
  "PEN": "Sol peruano",
  "ARS": "Peso argentino"
}
