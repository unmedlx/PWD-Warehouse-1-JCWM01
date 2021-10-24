const initialState = {
  globalState1: "",
  globalState2: "",
  globalState3: "",
  globalState4: 0,
  globalState5: false,
  newArrival: []
}

const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "NEW_ARRIVAL":
      return { ...state, newArrival: payload }

    default:
      return state
  }
}

export default productsReducer
