import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { API_URL } from "../constants/API"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.css"

import ProductCard from "../components/ProductCard"

export default function ProductsList() {
  const [products, setProducts] = useState([])

  const [paging, setpPaging] = useState({
    previousPage: 0,
    nextPage: 0,
    currentPage: 1,
    productsCount: 1,
    maxPage: 1,
  })

  const fetchProducts = () => {
    axios
      .get(`${API_URL}/products?page=${paging.currentPage}`)
      .then((response) => {
        setProducts(response.data.data)

        setpPaging({
          ...paging,
          nextPage: response.data.next_page || paging.nextPage,
          previousPage: response.data.previous_page || paging.previousPage,
          productsCount: response.data.products_count || paging.productsCount,
          maxPage: response.data.max_page || paging.maxPage,
        })

        renderProducts()
      })
      .catch((err) => {
        alert(err)
      })
  }

  const renderProducts = () => {
    return products.map((val) => {
      return (
        <ProductCard
          idProduct={val.idProduct}
          productName={val.productName}
          price={val.price}
          productImage={val.productImage}
          description={val.description}
          idCategory={val.idCategory}
        />
      )
    })
  }

  useEffect(() => {
    fetchProducts()
    renderProducts()
  }, [paging.currentPage])

  const nextPageHandler = () => {
    setpPaging({
      currentPage: paging.currentPage + 1,
    })
  }

  const prevPageHandler = () => {
    setpPaging({
      currentPage: paging.currentPage - 1,
    })
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="col-10 d-flex ">
        <div className="d-flex flex-wrap flex-row justify-content-evenly mb-1">
          {renderProducts()}
        </div>
      </div>

      <div className="my-4 d-flex flex-column justify-content-center align-items-center">
        <p>Total found: {paging.productsCount} products</p>
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
    </div>
  )
}
