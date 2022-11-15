export const addNewProduct = (products: any) => {
  return {
    type: 'ADD_NEW_PRODUCT',
    payload: {
      count: 1,
      products: products,
    },
  };
};
