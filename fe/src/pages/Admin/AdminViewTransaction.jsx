import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdminViewTransaction } from '../../redux/actions/Transaction';


const AdminTransaction = () => {
    const dispatch = useDispatch()
    const adminGlobal = useSelector(state => state.admins)
    const { loading, data, max_page } = useSelector(state => state.ongoingTransaction)

    const [paging, setPaging] = useState({
        currentPage: 1,
    });

    const { idRole, idWarehouse } = adminGlobal
    const [sort, setSort] = useState("");
    const [status, setStatus] = useState(0);
    const [invoice, setInvoice] = useState("");


    // Get Data Transaction
    const getUserTransaction = () => {
        dispatch(fetchAdminViewTransaction(idWarehouse, paging.currentPage, status, sort, invoice))
    }

    const nextPageHandler = () => {
        setPaging({
            currentPage: paging.currentPage + 1,
        });
    };

    const prevPageHandler = () => {
        setPaging({
            currentPage: paging.currentPage - 1,
        });
    };

    useEffect(() => {
        getUserTransaction()
        // renderTransactions()
    }, [paging.currentPage, sort, status, invoice])

    // useEffect(() => {
    //     getUserTransaction()
    // }, [dispatch])

    const renderTransactions = () => {
        return data.map((d) => {
            return (
                <>
                    <div>{d.invoiceNumber}</div>
                    <div>{d.recipientName}</div>
                </>
            )
        })
    }


    return (
        <>
            <div className="mb-4">
                <header className="mt-3 p-3">
                    <div className="row gx-3">
                        <div className="col-lg-4 col-md-6 me-auto">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="form-control box-shadow"
                                name="byName"
                                onChange={(e) => { setInvoice(e.target.value) }}
                            />
                        </div>

                        <div style={{ marginTop: 7 }} className="col-lg-2 col-6 col-md-3">
                            <select
                                name="byCategory"
                                className="form-select box-shadow"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Status</option>
                                <option value="1">Belum Bayar</option>
                                <option value="2">Menunggu Verifikasi</option>
                                <option value="3">Status 3</option>
                                <option value="4">Status 4</option>
                                <option value="5">Status 5</option>
                                <option value="6">Status 6</option>
                            </select>
                        </div>

                        <div style={{ marginTop: 7 }} className="col-lg-2 col-6 col-md-3">
                            <select
                                name="sort"
                                className="form-select box-shadow"
                                onChange={(e) => setSort(e.target.value)}
                            >
                                <option value="">Sort by</option>
                                <option value="newest">Newest Transaction</option>
                                <option value="oldest">Oldest Transaction</option>
                            </select>
                        </div>
                    </div>
                </header>
            </div>

            <div>
                {renderTransactions()}
            </div>

            <div className="my-4 d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <button
                        onClick={prevPageHandler}
                        className="btn btn-success"
                        disabled={paging.currentPage === 1}
                    >
                        {"<"}
                    </button>
                    <div className="text-center px-4">
                        Page {paging.currentPage} of {max_page}
                    </div>
                    <button
                        onClick={nextPageHandler}
                        className="btn btn-success"
                        disabled={paging.currentPage === max_page}
                    >
                        {">"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default AdminTransaction
