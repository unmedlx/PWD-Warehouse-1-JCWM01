import axios from "axios"
import { useDispatch } from "react-redux";
import { API_URL } from "../../constants/API";


export const CheckCart = (userLocalStorage) => {
    return async dispatch => {
        try {
            const getDataCart = await axios.post(`http://localhost:3001/cart/`,
                {},
                {
                    headers: {
                        authorization: `Bearer ${userLocalStorage}`,
                    },
                }
            )

            console.log(getDataCart.data.results);
            dispatch({
                type: "GET_CART",
                payload: getDataCart.data.results,
            });
            dispatch({
                type: "USER_CHECK_LOGIN",
                payload: true,
            });



        } catch (error) {
            console.log(error);
        }
    }
}

