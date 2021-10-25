import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Io from "react-icons/io5";
import * as Cg from "react-icons/cg";
import * as Fa from "react-icons/fa";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { SidebarDataSuper } from "./SidebarDataSuper";

import "bootstrap/dist/css/bootstrap.css";
import "../assets/styles/AdminDashboard.css";

export default function AdminSidebar(props) {
  const adminGlobal = useSelector((state) => state.admins);
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  const logout = () => {
    localStorage.removeItem("token_shutter");
    dispatch({
      type: "USER_LOGOUT",
    });
    dispatch({
      type: "ADMIN_LOGOUT",
    });
    alert("logout success");
  };

  const superAdminSidebar = (params) => {
    if (adminGlobal.idRole === 1) {
      return SidebarDataSuper.map((item, index) => {
        return (
          <li key={index} className={item.cName}>
            <Link className="menu-link" to={item.path}>
              {<i className="icon">{item.icons}</i>}
              {sidebar ? <span className="text">{item.title}</span> : ""}
            </Link>
          </li>
        );
      });
    } else if (adminGlobal.idRole === 2) {
      return SidebarData.map((item, index) => {
        return (
          <li key={index} className={item.cName}>
            <Link className="menu-link" to={item.path}>
              {<i className="icon">{item.icons}</i>}
              {sidebar ? <span className="text">{item.title}</span> : ""}
            </Link>
          </li>
        );
      });
    }
  };

  const superAdminCheck = () => {
    if (adminGlobal.idRole === 1) {
      return "SPR";
    } else if (adminGlobal.idRole === 2) {
      return props.warehouse;
    }
  };

  return (
    <>
      <aside className={sidebar ? "navbar-aside" : "navbar-mini"}>
        <div className="aside-top">
          <Link
            style={{
              textDecoration: "none",
              color: "#32b280",
              fontWeight: "bolder",
            }}
            to="/sales-report"
            className="brand-wrap display-6"
          >
            Brange
          </Link>
          <div onClick={showSidebar}>
            <button className="btn btn-icon btn-aside-minimize">
              {" "}
              <i className="">
                <Io.IoMenu />
              </i>{" "}
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">{superAdminSidebar()}</ul>
          <hr />
          <ul className="menu-aside mt-auto">
            {sidebar ? (
              <span
                style={{ marginLeft: 12, fontWeight: "bolder" }}
                className="text"
              >
                Warehouse:{" "}
                {
                  <span className="menu-item badge rounded-pill bg-success">
                    {superAdminCheck()}
                  </span>
                }
              </span>
            ) : (
              <li key={98} className="menu-item badge rounded-pill bg-success">
                {superAdminCheck()}
              </li>
            )}

            <li key={99} className="menu-item">
              <Link onClick={logout} className="menu-link" to="/authentication">
                {
                  <i className="icon-out">
                    <Io.IoLogOut className="icon-out" />
                  </i>
                }
                {sidebar ? (
                  <span className="text" style={{ color: "red" }}>
                    Logout
                  </span>
                ) : (
                  ""
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
