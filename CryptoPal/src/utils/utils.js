export const preprocessSymbol = (symbol) => {
    return symbol.toLowerCase().replace(/\d/g, '');
  };
  
  export const getIconForCurrency = (symbol, icons) => {
    const preprocessedSymbol = preprocessSymbol(symbol);
    return icons[preprocessedSymbol] || icons[symbol.toLowerCase()];
  };