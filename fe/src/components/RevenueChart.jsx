import React from 'react'

const RevenueChart = () => {
    return (
    <div className="col-6">
        <div className="card full-height">
            {/* chart */}
            <Chart
                options=""
                series={chartOptions.series}
                type='line'
                height='100%'
            />
        </div>
    </div>            
    )
}

export default RevenueChart
