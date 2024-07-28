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
    console.error('Error fetching currency data:', error);
    throw error;
  }
};



  // export const getHistoricalData = () => {
  //   return fetch('https://api.coincap.io/v2/assets/enjin-coin/history?interval=d1')
  //     .then(response => response.json())
  //     .then(data => data.data)
  //     .catch(error => {
  //       console.log(error.message);
  //       return [];
  //     });
  // };