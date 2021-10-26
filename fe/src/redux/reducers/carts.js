const initialState = [];

const carts = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_CART":
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default carts;
