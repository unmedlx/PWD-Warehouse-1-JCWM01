import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderStatusCard from "../components/OrderStatusCard";
import BestSellerCard from "../components/BestSellerCard";
import DemographicCard from "../components/DemographicCard";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { API_URL } from "../constants/API";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Label,
  Pie,
  PieChart,
  Sector,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function SalesReport() {
  const userGlobal = useSelector((state) => state.users);
  const adminGlobal = useSelector((state) => state.admins);
  const [jumlahOrder, setJumlahOrder] = useState([]);
  const [warehouse, setWarehouse] = useState(0);
  const [bestSeller, setBestSeller] = useState([]);
  const [demographic, setDemographic] = useState([]);

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#800000"];

  const fetchStatus = () => {
    axios
      .get(`${API_URL}/warehouses?idUser=${adminGlobal.idUser}`)
      .then((response) => {
        setWarehouse(response.data[0].idWarehouse);
        console.log(response.data[0].idWarehouse);
        axios
          .get(
            `${API_URL}/salesReport/transactionStatus?idWarehouse=${response.data[0].idWarehouse}`
          )
          .then((response) => {
            setJumlahOrder(response.data.results);
            console.log(response.data.results);
          })
          .catch((err) => {
            alert(err);
          });

        axios
          .get(
            `${API_URL}/salesReport/bestSelling?idWarehouse=${response.data[0].idWarehouse}`
          )
          .then((response) => {
            setBestSeller(response.data.results);
            console.log(response.data.results);
          })
          .catch((err) => {
            alert(err);
          });

        axios
          .get(
            `${API_URL}/salesReport/demographic?idWarehouse=${response.data[0].idWarehouse}`
          )
          .then((response) => {
            setDemographic(response.data.results);
            console.log(response.data.results);
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const renderOrder = () => {
    return jumlahOrder.map((val) => {
      return (
        <OrderStatusCard status={val.status} jumlahOrder={val.jumlahOrder} />
      );
    });
  };

  const renderBestSeller = () => {
    return bestSeller.map((val) => {
      return (
        <BestSellerCard
          productImage={val.productImage}
          productName={val.productName}
          soldQuantity={val.soldQuantity}
        />
      );
    });
  };
  const renderDemographic = () => {
    return demographic.map((val) => {
      return <DemographicCard kota={val.kota} revenueKota={val.revenueKota} />;
    });
  };

  let renderLabel = (demographic) => {
    return demographic.kota;
  };

  useEffect(() => {
    fetchStatus();
  }, []);
  return (
    <div>
      <div>
        <h1 style={{ marginTop: 30, marginLeft: 68 }}>ONGOING ORDERS</h1>
        <div className="d-flex flex-wrap justify-content-evenly p-4">
          {renderOrder()}
        </div>
      </div>

      <div className="d-flex flex-column card card-body shades m-5 align-items-center">
        <h4 className="display-5 mt-4">Best Selling Items</h4>

        <div className="d-flex flex-row justify-content-between p-4">
          <div>
            <BarChart
              style={{ height: 500, marginTop: 30 }}
              width={600}
              height={450}
              data={bestSeller}
              margin={{
                top: 5,
                bottom: 5,
              }}
              barSize={50}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis className="m-4" dataKey="productName"></XAxis>
              <YAxis dataKey="soldQuantity" />
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey="soldQuantity" fill="#32b280" />
            </BarChart>
          </div>

          <div
            style={{ height: 500, marginTop: 30, marginLeft: 20, width: 500 }}
          >
            {renderBestSeller()}
          </div>
        </div>
      </div>

      <div
        style={{ height: 1000, width: 750 }}
        className="d-flex flex-column card card-body shades m-5 align-items-center"
      >
        <h4 className="display-5 mt-4">Total Revenue by City</h4>
        <div className="d-flex flex-column justify-content-between align-items-center p-4">
          <PieChart width={750} height={500}>
            <Pie
              data={demographic}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={0}
              dataKey="revenueKota"
              label={renderLabel}
            >
              {demographic.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
              <Tooltip />
            </Pie>
          </PieChart>
          <div style={{ height: 500, width: 500 }}>{renderDemographic()}</div>
        </div>
      </div>

      <div className="d-flex flex-column card card-body shades m-5 align-items-center">
        <LineChart
          width={500}
          height={300}
          data={bestSeller}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
}
