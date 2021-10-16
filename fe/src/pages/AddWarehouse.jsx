import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_URL } from "../constants/API";
import { Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/styles/AdminDashboard.css";

export default function AddWarehouse() {
  const [warehouseData, setWarehouseData] = useState({
    warehouse: "",
    adminEmail: "",
    kecamatan: "",
  });
  const [kota, setKota] = useState();
  const [provinsi, setProvinsi] = useState();

  const [provinceList, setProvinceLIst] = useState([]);
  const [cityList, setCityList] = useState([]);

  const inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    console.log(name);
    console.log(value);

    setWarehouseData({ ...warehouseData, [name]: value });
  };

  const kotaHandler = (event) => {
    const value = event.target.value;
    console.log(value);

    setKota(value);
  };

  const provinsiHandler = (event) => {
    const value = event.target.value;

    setProvinsi(value);

    console.log(value);
    axios
      .get(`${API_URL}/cityprovince/city?province=${value}`)
      .then((res) => {
        console.log(res.data.results);
        setCityList(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchProvince = () => {
    axios
      .get(`${API_URL}/cityprovince/province`)
      .then((res) => {
        console.log(res.data.results);
        setProvinceLIst(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let data = {
    warehouse: warehouseData.warehouse,
    adminEmail: warehouseData.adminEmail,
    kecamatan: warehouseData.kecamatan,
    city: kota,
    province: provinsi,
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const submitButtonHandler = () => {
    axios
      .post(`${API_URL}/warehouses`, { data })
      .then((res) => {
        console.log(res);
        alert(
          `Successfuly added ${warehouseData.warehouse} into the warehouse list`
        );
        refreshPage();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProvince();
  }, []);

  return (
    <div style={{ height: "90%", width: "80%" }} className="card mb-4 scroll">
      <div className="card-body p-5 ">
        <div className="content-main " style={{ maxWidth: "920px" }}>
          <div className="content-header">
            <h2 style={{ marginTop: -60 }} className="content-title">
              Add warehouse
            </h2>
          </div>

          <hr className="my-4" />

          <div className="row">
            <div className="col-md-8">
              <div className="mb-4">
                <label className="form-label">Warehouse code</label>
                <input
                  type="text"
                  placeholder="eg: JKT, BDG, SUB"
                  className="form-control box-shadow"
                  name="warehouse"
                  onChange={inputHandler}
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Provinsi</label>
                <select
                  name="provinsi"
                  className="form-select box-shadow"
                  onChange={provinsiHandler}
                >
                  {provinceList.map((val) => {
                    return (
                      <option value={val.provinceName}>
                        {val.provinceName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-4">
                <label className="form-label">Kota</label>
                <select
                  name="kota"
                  className="form-select box-shadow"
                  disabled={!provinsi}
                  onChange={kotaHandler}
                >
                  {cityList.map((val) => {
                    return <option value={val.cityName}>{val.cityName}</option>;
                  })}
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label">Kecamatan</label>
                <input
                  type="text"
                  placeholder="eg: Ujungberung, Lakarsantri"
                  className="form-control box-shadow"
                  name="kecamatan"
                  onChange={inputHandler}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Assign admin</label>
                <input
                  type="email"
                  placeholder="ena@mail.com"
                  className="form-control box-shadow"
                  name="adminEmail"
                  onChange={inputHandler}
                />
              </div>
            </div>
          </div>
          <div
            style={{ marginBottom: -25 }}
            className="d-flex justify-content-end gap-2 "
          >
            <Link to="/warehouse-list">
              <button
                style={{
                  color: "white",
                  fontWeight: "bold",
                }}
                type="button"
                className="btn btn-danger"
              >
                Cancel
              </button>
            </Link>

            <Link to="/warehouse-list">
              <button
                style={{
                  backgroundColor: "#32b280",
                  color: "white",
                  fontWeight: "bold",
                }}
                type="button"
                className="btn"
                disabled={
                  !(
                    warehouseData.warehouse &&
                    warehouseData.adminEmail &&
                    kota &&
                    provinsi
                  )
                }
                onClick={submitButtonHandler}
              >
                Submit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
