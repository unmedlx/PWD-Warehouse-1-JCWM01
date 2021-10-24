import axios from "axios"
import { API_URL } from "../../constants/API";


export const CheckAddress = (userLocalStorage) => {
    return async dispatch => {
        try {
            console.log("saya checkAddress");
            const getDataAddress = await axios.post(`${API_URL}/address/`,
                {},
                {
                    headers: {
                        authorization: `Bearer ${userLocalStorage}`,
                    },
                }
            )
            console.log(getDataAddress.data);
            dispatch({
                type: "GET_ADDRESS",
                payload: getDataAddress.data,
            });

        } catch (error) {
            console.log(error);
        }
    }
}

export const EditAddress = (data, idUser, userLocalStorage) => {
    return async dispatch => {
        try {

            const editAddress = await axios.patch(`${API_URL}/address/${idUser}`, { data })
            // console.log("editAddress");
            // setSuccessUpload(editAddress.data.success)
            alert(editAddress.data.message)
            CheckAddress(userLocalStorage)


        } catch (error) {
            console.log(error);
        }
    }
}

export const AddAddress = (data, userLocalStorage) => {
    return async dispatch => {
        try {
            const addAddress = await axios.post(`${API_URL}/address/addAddress`, { data })

            console.log(addAddress);
            dispatch(CheckAddress(userLocalStorage))
            alert(addAddress.data.message)

        } catch (error) {
            console.log(error);
        }
    }
}

export const DeleteAddress = (idAddress, userLocalStorage) => {
    return async dispatch => {
        try {
            const deleteAddress = await axios.delete(`${API_URL}/address/${idAddress}`)
            alert(deleteAddress.data.message)
        } catch (error) {
            console.log(error);
        }

    }
}

