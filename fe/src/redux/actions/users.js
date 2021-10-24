import axios from "axios"
import { useDispatch } from "react-redux";
import { API_URL } from "../../constants/API";


export const CheckLogin = (userLocalStorage) => {
    return async dispatch => {
        try {
            const getDataLogin = await axios.post(`${API_URL}/auth/`,
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

export const EditDataProfile = (data, userLocalStorage) => {
    return async dispatch => {
        try {
            const editDataProfile = await axios.patch(`${API_URL}/auth/edit`,
                data,
                {
                    headers: {
                        authorization: `Bearer ${userLocalStorage}`,
                    }
                }

            )
            dispatch({
                type: "USER_LOGIN",
                payload: editDataProfile.data[0]
            })
            alert("Berhasil Update Data")

        } catch (error) {
            console.log(error);
        }
    }
}

export const editPhotoProfile = (idUser, userLocalStorage, data) => {
    return async dispatch => {
        try {
            const editPhoto = await axios.patch(`${API_URL}/profile/${idUser}`,
                data,
                {
                    headers: {
                        authorization: `Bearer ${userLocalStorage}`,
                    },
                }
            )
            dispatch(CheckLogin(userLocalStorage))
            // setSuccessUpload(res.data.success)
            alert(editPhoto.data.message)

        } catch (error) {
            console.log(error);
        }
    }
}

export const userLogout = () => {
    return async dispatch => {
        try {
            localStorage.removeItem("token_shutter");
            dispatch({
                type: "USER_LOGOUT",
            });
            dispatch({
                type: "ADMIN_LOGOUT",
            });
            alert("logout success");
            ;
        } catch (error) {
            console.log(error);
        }
    }
}


