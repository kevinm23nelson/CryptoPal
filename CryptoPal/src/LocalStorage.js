export const loadFavorites = () => {
  const savedFavorites = localStorage.getItem('favoriteCurrencies');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

export const saveFavorites = (favorites) => {
  localStorage.setItem('favoriteCurrencies', JSON.stringify(favorites));
};
