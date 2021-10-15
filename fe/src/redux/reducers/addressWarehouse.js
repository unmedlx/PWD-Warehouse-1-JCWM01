const initialState = {
    data: [],
    loading: false,
    err: ""
};

const addressWarehouse = (state = initialState, { type, payload }) => {
    switch (type) {
        case "FETCH_ADDRESS":
            return { ...state, loading: true };

        case "FETCH_COMPLETE":
            return { ...state, loading: false, data: payload }

        case "FETCH_FAILED":
            return { ...state, loading: false, err: payload }

        default:
            return state;
    }
};

export default addressWarehouse;
