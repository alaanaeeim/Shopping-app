/* eslint-disable @typescript-eslint/no-unused-vars */
const initState = {
  count: 0,
  products: [],
};

const ProductReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    case 'ADD_NEW_PRODUCT':
      return {
        ...state,
        count: state.count + action.payload.count,
        products: action.payload.products,
      };
    default:
      return state;
  }
};

export default ProductReducer;
