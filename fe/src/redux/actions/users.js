import axios from "axios"
import { useDispatch } from "react-redux";

export const CheckLogin = () => {
    const dispatch = useDispatch()
    const userLocalStorage = localStorage.getItem("token_shutter")
    axios
        .patch(
            `http://localhost:3001/users/`,
            {},
            {
                headers: {
                    authorization: `Bearer ${userLocalStorage}`,
                },
            }
        )
        .then((res) => {
            delete res.data[0].password;
            dispatch({
                type: "USER_LOGIN",
                payload: res.data[0],
            });
        })
        .catch((err) => {
            console.log(err);
        });
}