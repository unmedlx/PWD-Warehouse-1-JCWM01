import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOngoingTransaction } from '../../redux/actions/ongoingTransaction'
import { Table, Spinner } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '../../constants/API'

import DataOngoingList from './DataOngoingList'

const OngoingTransaction = () => {
    const dispatch = useDispatch()
    const { idUser } = useSelector(state => state.users)
    const { loading, data } = useSelector(state => state.ongoingTransaction)
    const [dataOngoing, setdataOngoing] = useState([])
    // console.log(dataOngoing);

    const [paging, setPaging] = useState({
        previousPage: 0,
        nextPage: 0,
        currentPage: 1,
        productsCount: 0,
        maxPage: 1,
    });

    const [sort, setSort] = useState("");



    const getOngoingTransaction = async () => {
        try {
            // dispatch(
            //     fetchOngoingTransaction(idUser, paging.currentPage, "")
            // )

            const { data } = await axios.get(`${API_URL}/transaction?idUser=${idUser}&page=${paging.currentPage}&status=&sortBy=${sort}&type=ongoing&limit=3`)
            setdataOngoing(data.data)
            setPaging({
                ...paging,
                nextPage: data.next_page || paging.nextPage,
                previousPage: data.previous_page || paging.previousPage,
                productsCount: data.products_count || paging.productsCount,
                maxPage: data.max_page || paging.maxPage,
            });
            renderDataOngoing()

        } catch (error) {
            console.log(error);
        }
    }


    // Render Data Ongoing
    const renderDataOngoing = () => {
        return dataOngoing.map((data) => {
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
        // getOngoingTransaction()
        // // renderDataOngoing()
        console.log("Ganti gan");
    }, [])

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

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Username</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {dataOngoing &&
                        renderDataOngoing()
                    }

                </tbody>
            </Table>
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
                        Page {paging.currentPage} of {paging.maxPage}
                    </div>
                    <button
                        onClick={nextPageHandler}
                        className="btn btn-success"
                        disabled={paging.currentPage === paging.maxPage}
                    >
                        {">"}
                    </button>
                </div>
            </div>



        </>
    )
}

export default OngoingTransaction
