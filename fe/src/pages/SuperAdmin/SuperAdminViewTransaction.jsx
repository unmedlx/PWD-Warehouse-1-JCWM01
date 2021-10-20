import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchSuperAdminViewTransaction } from '../../redux/actions/Transaction';
import SuperAdminViewTransactionList from '../../components/SuperAdmin/SuperAdminViewTransactionList';

import '../../assets/styles/Typography.css'
import { fetchDataWarehouse } from '../../redux/actions/addressWarehouse';


const SuperAdminViewTransaction = () => {
    const dispatch = useDispatch()
    const adminGlobal = useSelector(state => state.admins)
    const { data, max_page, currentPage } = useSelector(state => state.ongoingTransaction)
    const addressWarehouseGlobal = useSelector(state => state.addressWarehouse)
    const dataWarehouse = addressWarehouseGlobal.data

    const [paging, setPaging] = useState({
        currentPage: 1,
    });

    const { idRole, idWarehouse } = adminGlobal
    const [sort, setSort] = useState("");
    const [status, setStatus] = useState(0);
    const [invoice, setInvoice] = useState("");
    const [warehouse, setWarehouse] = useState(0);


    // Get Data Transaction
    const getUserTransaction = () => {
        dispatch(fetchSuperAdminViewTransaction(warehouse, paging.currentPage, status, sort, invoice))
    }
    const getWarehouse = () => {
        dispatch(fetchDataWarehouse())
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
        getWarehouse()
        // renderTransactions()
    }, [paging.currentPage, sort, status, invoice, warehouse])



    const renderTransactions = () => {
        return data.map((d) => {
            return (
                <SuperAdminViewTransactionList data={d} currentPage={currentPage} />
            )
        })
    }
    return (
        <div style={{ padding: "60px", backgroundColor: "white" }} className="">
            <div className="content-header">
                <h2 className="content-title d-flex flex-row align-items-center">
                    Transaction List
                </h2>

            </div>
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
                                onChange={(e) => setWarehouse(e.target.value)}
                            >
                                <option value="">Warehouse</option>
                                {
                                    dataWarehouse.map((warehouse) => {
                                        return (
                                            <option value={warehouse.idWarehouse}>{warehouse.warehouse}</option>
                                        )
                                    })
                                }
                            </select>
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
                                <option value="3">Pesanan Dibayar</option>
                                <option value="4">Stock Barang Kurang</option>
                                <option value="5">Mengambil Stock</option>
                                <option value="6">Barang Diproses</option>
                                <option value="7">Pesanan Dikirim</option>
                                <option value="8">Pesanan Selesai</option>
                                <option value="9">Pesanan Dibatalkan</option>
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
                <div className="row transaction-card">
                    <div className="col-3 subtitle">
                        Order
                    </div>
                    <div className="col-2 subtitle">
                        Contact Detail
                    </div>
                    <div className="col-2 subtitle">
                        Delivery
                    </div>
                    <div className="col-2 subtitle">
                        Total
                    </div>
                    <div className="col-2 subtitle">
                        Payment
                    </div>
                    <div className="col-1 subtitle">
                        Action
                    </div>
                </div>
            </div>
            <hr />
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
        </div>
    )
}

export default SuperAdminViewTransaction
