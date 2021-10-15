const initialState = {
  cartList: [],
};

const cart = (state = initialState, { type, payload }) => {
  switch (type) {
    case "FILL_CART":
      return { ...state, cartList: payload };

    case "UPDATE_CART":
      return {
        ...state,
        cartList: state.cartList.map((item, index) => {
          if (item.idProduct !== payload.idProduct) {
            return item;
          }
          return {
            ...item,
            quantity: payload.quantity,
          };
        }),
      };

    default:
      return state;
  }
};

export default cart;
