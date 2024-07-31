export const getCurrencies = () => {
  return fetch('https://api.coincap.io/v2/assets')
    .then(response => response.json())
    .then(data => data.data)
    .catch(error => {
      console.log(error.message);
      return [];
    });
};

export const getCurrencyById = async (id) => {
  try {
    const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching currency data for ID ${id}:`, error);
    throw error;
  }
};

export const getHistoricalData = async (id) => {
  try {
    const response = await fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching historical data for ID ${id}:`, error);
    throw error;
  }
};

