// localStorage.js
export const loadFavorites = () => {
  const savedFavorites = localStorage.getItem('favoriteCurrencies');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

export const saveFavorites = (favorites) => {
  localStorage.setItem('favoriteCurrencies', JSON.stringify(favorites));
};

export const saveTrade = (trade) => {
  const trades = JSON.parse(localStorage.getItem('trades') || '[]');
  trades.push(trade);
  localStorage.setItem('trades', JSON.stringify(trades));
};

export const loadTrades = () => {
  const savedTrades = localStorage.getItem('trades');
  return savedTrades ? JSON.parse(savedTrades) : [];
};
