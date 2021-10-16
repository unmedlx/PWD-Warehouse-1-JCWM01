const initialState = {
    data: [],
    loading: false,
    err: ""
};

const ongoingTransaction = (state = initialState, { type, payload }) => {
    switch (type) {
        case "FETCH_ONGOING_TRANSACTION":
            return { ...state, loading: true };

        case "FETCH_ONGOING_TRANSACTION_COMPLETE":
            return { ...state, loading: false, data: payload }

        case "FETCH_ONGOING_TRANSACTION_FAILED":
            return { ...state, loading: false, err: payload }

        default:
            return state;
    }
};

export default ongoingTransaction;
