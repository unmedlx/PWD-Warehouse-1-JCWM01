import axios from "axios"
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
            alert(error);
        }
    }
}

export const EditAddress = (data, idUser, userLocalStorage) => {
    return async dispatch => {
        try {

            const editAddress = await axios.patch(`${API_URL}/address/${idUser}`, { data })
            alert(editAddress.data.message)
            CheckAddress(userLocalStorage)
        } catch (error) {
            alert(error);
        }
    }
}

export const AddAddress = (data, userLocalStorage) => {
    return async dispatch => {
        try {
            const addAddress = await axios.post(`${API_URL}/address/addAddress`, { data })
            dispatch(CheckAddress(userLocalStorage))
            alert(addAddress.data.message)

        } catch (error) {
            alert(error);
        }
    }
}

export const DeleteAddress = (idAddress, userLocalStorage) => {
    return async dispatch => {
        try {
            const deleteAddress = await axios.delete(`${API_URL}/address/${idAddress}`)
            alert(deleteAddress.data.message)
        } catch (error) {
            alert(error);
        }

    }
}

