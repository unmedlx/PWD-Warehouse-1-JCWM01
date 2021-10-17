const initialState = {
    data: [],
    loading: false
};

const detailTransaction = (state = initialState, { type, payload }) => {
    switch (type) {
        case "FETCH_DETAIL_TRANSACTION":
            return { ...state, loading: true };

        case "FETCH_DETAIL_TRANSACTION_COMPLETE":
            return { ...state, ...payload, loading: false, }

        case "FETCH_DETAIL_TRANSACTION_FAILED":
            return { ...state, loading: false, err: payload }

        default:
            return state;
    }
};

export default detailTransaction;
