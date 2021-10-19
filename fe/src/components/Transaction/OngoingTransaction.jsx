import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOngoingTransaction } from '../../redux/actions/Transaction'
import { Table, Spinner } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '../../constants/API'

import '../../assets/styles/Typography.css'


import DataOngoingList from './DataOngoingList'

const OngoingTransaction = () => {
    const dispatch = useDispatch()
    const { idUser } = useSelector(state => state.users)
    const { loading, data, max_page } = useSelector(state => state.ongoingTransaction)

    const [paging, setPaging] = useState({
        currentPage: 1,
    });

    const [sort, setSort] = useState("");

    const getOngoingTransaction = async () => {
        try {
            dispatch(
                fetchOngoingTransaction(idUser, paging.currentPage, sort)
            )

            renderDataOngoing()

        } catch (error) {
            console.log(error);
        }
    }


    // Render Data Ongoing
    const renderDataOngoing = () => {
        // return dataOngoing.map((data) => {
        return data.map((data) => {
            return (
                <DataOngoingList data={data} />
            )
        })
    }


    useEffect(() => {
        getOngoingTransaction()
        renderDataOngoing()
    }, [paging.currentPage, sort])

    useEffect(() => {
        getOngoingTransaction()
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
        <>
            <hr />
            <header
                style={{ width: 1122, backgroundColor: "#f7f7f7" }}
                className="mt-3"
            >
                <div className="row gx-3">
                    <div className="col-lg-10 col-6 col-md-3">
                        <p className="mt-2"><strong>Ongoing Transaction</strong></p>
                    </div>

                    <div className="col-lg-2 col-6 col-md-3">
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



            {renderDataOngoing()}



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

export default OngoingTransaction
