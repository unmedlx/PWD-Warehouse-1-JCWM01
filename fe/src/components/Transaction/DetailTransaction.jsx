import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { API_URL } from '../../helper';

const DetailTransaction = () => {
    let { idTransaction } = useParams();

    const fetchTransaction = async () => {
        try {
            const getTransactionDetail = await axios.get(`${API_URL}/checkout/${idTransaction}`)
            console.log(getTransactionDetail.data.data);

        } catch (error) {
            console.log(error);

        }


    }

    useEffect(() => {
        fetchTransaction()
    }, [])

    return (
        <div>
            Ini {idTransaction}
        </div>
    )
}

export default DetailTransaction
