import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import PaymentReceiptModal from './PaymentReceiptModal'

const DataOngoingList = ({ data }) => {
    const [showProof, setShowProof] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const handleShowProof = () => setShowProof(true);
    // const reload = () => window.location.reload();

    const handleCloseProof = () => {
        setShowProof(false);
        // reload()
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
                <td>
                    <Badge onClick={handleShowProof}>Payment Proof</Badge>
                    <Badge>
                        <Link to={`/transaction/detail/${data.idTransaction}`}>
                            Transaction Details
                        </Link>
                    </Badge>
                </td>
            </tr>

            <PaymentReceiptModal show={showProof} handleClose={handleCloseProof} idTransaction={data.idTransaction} buktiPembayaran={data.buktiPembayaran} />
        </>
    )
}

export default DataOngoingList
