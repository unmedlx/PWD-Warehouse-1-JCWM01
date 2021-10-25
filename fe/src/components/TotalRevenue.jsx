import React from "react";

function TotalRevenue(props) {
  const formatter = new Intl.NumberFormat("id-ID");
  let allTime = formatter.format(props.curRev[0]);
  let month = formatter.format(props.curRev[1]);
  return (
    <div className="d-flex flex-row justify-content-between ">
      <div className="card card-body shades mb-4 d-flex flex-column justify-content-center align-items-center col-3 mx-3">
        <h3 className="">All Time Revenue</h3>
        <span className="display-6">Rp {allTime}</span>
      </div>
      <div className="card card-body shades mb-4 d-flex flex-column justify-content-center align-items-center col-3">
        <h3 className="">This Month Revenue</h3>
        <span className="display-6">Rp {month}</span>
      </div>
      {/* <div
                className="card card-body shades mb-4 d-flex flex-column justify-content-center align-items-center col-3 mx-3"
            >
                    <h3 className="">This Week Revenue</h3>
                    <span className="display-6">Rp {week}</span>
            </div>   */}
    </div>
  );
}

export default TotalRevenue;
