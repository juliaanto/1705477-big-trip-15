export const makeItemsUniq = (items) => [...new Set(items)];

export const getPriceByType = (points, type) => {
  let priceByType = 0;

  points.filter((point) => {
    if (point.type === type) {
      priceByType += point.price;
    }
  });

  return priceByType;
};

export const makeItemsUpperCase = (items) => items.map((item) => item.toUpperCase());

export const countPointsByType = (points, type) => points.filter((point) => point.type === type).length;
