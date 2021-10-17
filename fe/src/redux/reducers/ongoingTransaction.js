const initialState = {
    message: "",
    data: [],
    next_page: 0,
    previous_page: 0,
    transactions_count: 0,
    max_page: 0,
    loading: false,
    err: ""
};

const ongoingTransaction = (state = initialState, { type, payload }) => {
    switch (type) {
        case "FETCH_ONGOING_TRANSACTION":
            return { ...state, loading: true };

        case "FETCH_ONGOING_TRANSACTION_COMPLETE":
            return { ...state, ...payload, loading: false, }

        case "FETCH_ONGOING_TRANSACTION_FAILED":
            return { ...state, loading: false, err: payload }

        default:
            return state;
    }
};

export default ongoingTransaction;
