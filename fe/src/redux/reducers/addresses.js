const initialState = [];

const users = (state = initialState, { type, payload }) => {
    switch (type) {
        case "GET_ADDRESS":
            return { ...state, ...payload };

        default:
            return state;
    }
};

export default users;
