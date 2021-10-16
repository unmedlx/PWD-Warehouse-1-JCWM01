import axios from 'axios'
import { API_URL } from '../../constants/API'

export const fetchOngoingTransaction = (idUser, page, sortBy,) => {
    return async dispatch => {
        try {
            dispatch({
                type: "FETCH_ONGOING_TRANSACTION"
            })

            console.log(page);
            const { data } = await axios.get(`${API_URL}/transaction?idUser=${idUser}&page=${page}&status=&sortBy=${sortBy}&type=ongoing&limit=3`)
            dispatch({
                type: "FETCH_ONGOING_TRANSACTION_COMPLETE",
                payload: data
            })
            return data
        } catch (error) {
            dispatch({
                type: "FETCH_ONGOING_TRANSACTION_FAILED",
                payload: error
            })

        }
    }
}
