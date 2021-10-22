import React, {useState, useEffect} from 'react'
import axios from "axios";
import Chart from "react-apexcharts"
import {API_URL} from "../constants/API"



const RevenueChart = (props) => {
    // const [month, setMonth] = useState()

    // const getRevenueMonthly = () => {
    //     const monthRevenue = [] 
    //     for (let i = 1; i <= 12; i++) {
    //         axios.get(`${API_URL}/salesReport/monthRevenue?idWarehouse=${props.idWarehouse}&monthNumber=${i}`)
    //         .then((res) => {
    //             console.log(res.data);
    //             monthRevenue.push(res.data.revenueMonth)
    //         })
    //     }

    //     console.log(monthRevenue);
    //     setMonth(monthRevenue)
    //     // console.log(props.idWarehouse);
    // }

    // console.log(month);

    // useEffect(() => {
    //     // getRevenueMonthly();
    //   }, [month]);

    const chartOptions = {
        series: [{
            name: 'Your Revenue',
            data: props.month
        }],
        options: {
            color: ['#6ab04c', '#2980b9'],
            chart: {
                background: 'transparent'
            },
            dataLabels: {
                enabled: true
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            legend: {
                position: 'top'
            },
            grid: {
                show: true
            }
        }
    }
    return (
    
        <div className="d-flex flex-column card card-body shades m-5 align-items-center" >
            {/* chart */}
            <Chart
                options={chartOptions.options}
                series={chartOptions.series}
                type='line'
                height={450}
            />

            {/* <button onClick={getRevenueMonthly}>Get Data</button> */}
        </div>
           
    )
}

export default RevenueChart
