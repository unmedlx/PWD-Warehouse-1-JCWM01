import axios from 'axios'
import { API_URL } from '../../constants/API'

export const fetchWarehouseAction = (shippingInformation) => {
    return async dispatch => {
        try {
            dispatch({
                type: "FETCH_ADDRESS"
            })

            const { data } = await axios.post(`${API_URL}/address/closest-address/`, shippingInformation)
            dispatch({
                type: "FETCH_COMPLETE",
                payload: data
            })
        } catch (error) {
            dispatch({
                type: "FETCH_FAILED",
                payload: error
            })

        }
    }
}

export const fetchDataWarehouse = () => {
    return async dispatch => {
        try {
            dispatch({
                type: "FETCH_ADDRESS"
            })
            console.log("AKU DIPANGGIL");
            const { data } = await axios.get(`${API_URL}/warehouses/warehouseList`)
            dispatch({
                type: "FETCH_COMPLETE",
                payload: data
            })
        } catch (error) {
            dispatch({
                type: "FETCH_FAILED",
                payload: error
            })
        }
    }
}
