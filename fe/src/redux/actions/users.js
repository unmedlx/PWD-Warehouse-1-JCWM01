import axios from "axios"
import { useDispatch } from "react-redux";
import { API_URL } from "../../constants/API";


export const CheckLogin = (userLocalStorage) => {
    return async dispatch => {
        try {
            const getDataLogin = await axios.post(`${API_URL}/users/`,
                {},
                {
                    headers: {
                        authorization: `Bearer ${userLocalStorage}`,
                    },
                }
            )

            delete getDataLogin.data.password;
            if (getDataLogin.data.idRole == 1) {
                dispatch({
                    type: "ADMIN_CHECK_LOGIN",
                    payload: getDataLogin.data,
                });
                return;
            } else if (getDataLogin.data.idRole == 2) {
                dispatch({
                    type: "ADMIN_CHECK_LOGIN",
                    payload: getDataLogin.data,
                });
                return;
            } else {
                dispatch({
                    type: "USER_CHECK_LOGIN",
                    payload: getDataLogin.data,
                });
            }

        } catch (error) {
            console.log(error);
        }
    }
}

