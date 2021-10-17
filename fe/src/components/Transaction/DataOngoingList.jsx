import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';



import PaymentReceiptModal from './PaymentReceiptModal'

const DataOngoingList = ({ data }) => {
    const [showProof, setShowProof] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const handleShowProof = () => setShowProof(true);


    const handleCloseProof = () => {
        setShowProof(false);

    }



    return (
        <>
            <div className="row transaction-card">
                <div className="col-3">
                    <h5 className="subtitle-600 m-0">{data.invoiceNumber}</h5>
                    <h6 className="subtitle-500 m-0">{data.transactionDate}</h6>
                    <Badge>{data.status}</Badge>
                </div>
                <div className="col-5">
                    <div className="row">
                        <div className="row">
                            <div className="col">
                                <p className="m-0">{data.sumquantity} item(s)</p>
                            </div>
                            <div className="col">
                                <p className="m-0 p-0">Rp. {data.subtotalPrice}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                Delivery Cost
                            </div>
                            <div className="col">
                                <p className="m-0 p-0">Rp. {data.deliveryCost}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                Total
                            </div>
                            <div className="col">
                                <p className="m-0 p-0">Rp. 200000</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row">

                        Delivery Cost

                    </div>
                    <div className="row">
                        <p className="m-0 p-0">Rp. 200000</p>
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-8">

                </div>
                <div className="col-4">
                    <button onClick={handleShowProof}>Payment Proof</button>
                    <button>
                        <Link to={`/transaction/detail/${data.idTransaction}`}>
                            Transaction Details
                        </Link>
                    </button>
                </div>

            </div>
            <hr />
            <PaymentReceiptModal show={showProof} handleClose={handleCloseProof} idTransaction={data.idTransaction} buktiPembayaran={data.buktiPembayaran} />
        </>
    )
}

export default DataOngoingList
