export const getRandomPrice = (currentPrice: number) => {
    const fluctuation = Math.random() * 0.1 - 0.05;
    const newPrice = currentPrice * (1 + fluctuation);
    return Number(newPrice.toFixed(2));
};
