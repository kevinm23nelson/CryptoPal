export const getCurrencies = () => {
    return fetch('https://api.coincap.io/v2/assets/enjin-coin')
      .then(response => response.json())
      .then(data => data.data)  
      .catch(error => {
        console.log(error.message);
        return null;
      });
  };
  
  export const getHistoricalData = () => {
    return fetch('https://api.coincap.io/v2/assets/enjin-coin/history?interval=d1')
      .then(response => response.json())
      .then(data => data.data)
      .catch(error => {
        console.log(error.message);
        return [];
      });
  };