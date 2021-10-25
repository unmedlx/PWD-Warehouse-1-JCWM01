import axios from "axios"


export const CheckCart = (userLocalStorage) => {
    return async dispatch => {
        try {
            const getDataCart = await axios.post(`http://localhost:3001/cart/getCart`,
                {},
                {
                    headers: {
                        authorization: `Bearer ${userLocalStorage}`,
                    },
                }
            )

            dispatch({
                type: "GET_CART",
                payload: getDataCart.data.results,
            });
            dispatch({
                type: "USER_CHECK_LOGIN",
                payload: true,
            });

        } catch (error) {
            alert(error);
        }
    }
}

