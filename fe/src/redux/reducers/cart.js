const initialState = {
  cartList: [],
};

const cart = (state = initialState, { type, payload }) => {
  switch (type) {
    case "FILL_CART":
      return { ...state, cartList: payload };

    default:
      return state;
  }
};

export default cart;
