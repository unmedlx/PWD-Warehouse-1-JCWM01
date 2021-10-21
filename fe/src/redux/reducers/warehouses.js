const initialState = {
  idWarehouse: 0,
};

const warehousesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_IDWAREHOUSE":
      return { ...state, idWarehouse: payload };

    default:
      return state;
  }
};

export default warehousesReducer;
