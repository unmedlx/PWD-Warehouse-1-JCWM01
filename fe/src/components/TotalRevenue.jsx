import React from 'react'

function TotalRevenue(props) {
    // console.log(props.curRev[0] , props.curRev[1]);
    return (
        <div className="d-flex flex-row justify-content-between ">
            
            <div
                className="card card-body shades mb-4 d-flex flex-column justify-content-center align-items-center col-3 mx-3"
                // style={{ height: 160, width: 400 }}
            >
                    <h3 className="">All Time Revenue</h3>
                    <span className="display-6">Rp.{props.curRev[0]}</span>

                  
            </div>  
            <div
                className="card card-body shades mb-4 d-flex flex-column justify-content-center align-items-center col-3"
                // style={{ height: 160, width: 400 }}
            >
                      <h3 className="">This Month Revenue</h3>
                    <span className="display-6">Rp.{props.curRev[1]}</span>
            </div>  
            <div
                className="card card-body shades mb-4 d-flex flex-column justify-content-center align-items-center col-3 mx-3"
                // style={{ height: 160, width: 400 }}
            >
                     <h3 className="">This Week Revenue</h3>
                    <span className="display-6">Rp.{props.curRev[2]}</span>
            </div>  
          
        </div>
    )
}

export default TotalRevenue
