export const getters = {
  inStockProducts: (state) => {
    return state.products.filter((p) => p.stock > 0);
  },
};
