const initialState = {
  idWarehouse: 0,
  warehouse: "",
};

const warehousesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_IDWAREHOUSE":
      return {
        ...state,
        idWarehouse: payload.idWarehouse,
        warehouse: payload.warehouse,
      };

    default:
      return state;
  }
};

export default warehousesReducer;
