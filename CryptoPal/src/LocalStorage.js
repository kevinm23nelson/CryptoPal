export const loadFavorites = () => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  };
  
  export const saveFavorites = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };