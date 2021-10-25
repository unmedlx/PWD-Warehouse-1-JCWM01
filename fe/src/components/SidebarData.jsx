import React from "react";
import * as Io from "react-icons/io5";
import * as Cg from "react-icons/cg";

import "bootstrap/dist/css/bootstrap.css";
import "../assets/styles/AdminDashboard.css";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/sales-report",
    icons: <Io.IoHome className="icon" />,
    cName: "menu-item",
  },
  {
    title: "Products",
    path: "/admin-product-list",
    icons: <Io.IoBagHandle className="icon" />,
    cName: "menu-item",
  },
  {
    title: "Add Products",
    path: "/add-product",
    icons: <Io.IoAddCircle className="icon" />,
    cName: "menu-item",
  },
  {
    title: "Orders",
    path: "/admin-transaction",
    icons: <Io.IoCart className="icon" />,
    cName: "menu-item",
  },
  {
    title: "Requests",
    path: "/wh-stocks",
    icons: <Cg.CgArrowsExchangeAltV className="icon" />,
    cName: "menu-item",
  },
];
