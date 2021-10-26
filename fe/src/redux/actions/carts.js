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

        } catch (error) {
            alert(error);
        }
    }
}

