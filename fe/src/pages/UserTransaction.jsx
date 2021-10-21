import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { Badge } from 'react-bootstrap';

import ProfileNavbar from '../components/ProfileNavbar';
import ProfileSidebar from '../components/ProfileSidebar';
import DataOngoingList from '../components/Transaction/DataOngoingList';
import { fetchTransaction } from '../redux/actions/Transaction'

import '../assets/styles/UserTransaction.css'

const UserTransaction = () => {
    const dispatch = useDispatch()
    const { idUser } = useSelector(state => state.users)
    const { loading, data, max_page } = useSelector(state => state.ongoingTransaction)

    const [paging, setPaging] = useState({
        currentPage: 1,
    });

    const [sort, setSort] = useState("");
    const [status, setStatus] = useState(0);
    const [invoice, setInvoice] = useState("");
    // console.log(data);

    const getTransaction = async () => {
        try {
            dispatch(
                fetchTransaction(idUser, paging.currentPage, sort, status, invoice)
            )

            renderTransactions()

        } catch (error) {
            console.log(error);
        }
    }

    const renderTransactions = () => {
        return data.map((data) => {
            return (
                <DataOngoingList data={data} />
            )
        })

    }

    useEffect(() => {
        getTransaction()
        renderTransactions()
    }, [paging.currentPage, sort, status, invoice])

    useEffect(() => {
        getTransaction()
    }, [dispatch])

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




    return (
        <div className="container mt-5">
            <div className="profile-container">
                <ProfileSidebar />

                <div className="profile-main">
                    <ProfileNavbar />

                    <div className="profile-main-detail">
                        <h2 className="subtitle">Transaction</h2>
                        <h6 className="substitle-600"></h6>
                        <hr className="hr-line" />


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
                                            <option value="3">Pesanan Dibayar</option>
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

                        {renderTransactions()}

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
                </div>

            </div>
        </div>



    )
}

export default UserTransaction
