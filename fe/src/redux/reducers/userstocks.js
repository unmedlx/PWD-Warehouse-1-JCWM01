const initialState = {
  userstocksList: [],
};

const userstocks = (state = initialState, { type, payload }) => {
  switch (type) {
    case "FILL_USERSTOCKS":
      return { ...state, userstocksList: payload };

    default:
      return state;
  }
};

export default userstocks;
