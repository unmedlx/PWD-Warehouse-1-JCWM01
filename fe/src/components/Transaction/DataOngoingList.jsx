import React, { useEffect, useState } from 'react'

import PaymentReceiptModal from './PaymentReceiptModal'

const DataOngoingList = ({ data }) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const reload = () => window.location.reload();

    const handleClose = () => {
        setShow(false);
        reload()

    }


    return (
        <>
            <tr>
                <td>{data.idTransaction}</td>
                <td>{data.transactionDate}</td>
                <td>{data.subtotalPrice}</td>
                <td>{data.deliveryCost}</td>
                <td>{data.sumquantity} item(s)</td>
                <td>{data.idStatus}</td>
                <td onClick={handleShow}>upload</td>
            </tr>

            <PaymentReceiptModal show={show} handleClose={handleClose} idTransaction={data.idTransaction} buktiPembayaran={data.buktiPembayaran} />
        </>
    )
}

export default DataOngoingList
