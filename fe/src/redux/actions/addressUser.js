import axios from "axios"
import { useDispatch } from "react-redux";
import { API_URL } from "../../constants/API";


export const CheckAddress = (userLocalStorage) => {
    return async dispatch => {
        try {
            const getDataAddress = await axios.post(`${API_URL}/address/`,
                {},
                {
                    headers: {
                        authorization: `Bearer ${userLocalStorage}`,
                    },
                }
            )

            dispatch({
                type: "GET_ADDRESS",
                payload: getDataAddress.data,
            });

        } catch (error) {
            console.log(error);
        }
    }
}

