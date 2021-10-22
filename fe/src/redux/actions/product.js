import axios from "axios"
import { useDispatch } from "react-redux";
import { API_URL } from "../../constants/API";


export const getNewArrival = () => {
    return async dispatch => {
        try {
            const newArrival = await axios.get(`${API_URL}/products?newArrival=new`)
            console.log(newArrival.data);
            dispatch({
                type: "NEW_ARRIVAL",
                payload: newArrival.data,
            });


        } catch (error) {
            console.log(error);
        }
    }
}

