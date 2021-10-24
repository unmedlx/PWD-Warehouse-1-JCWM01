import React from "react";
import * as Io from "react-icons/io5";
import * as Cg from "react-icons/cg";
import * as Fa from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.css";
import "../assets/styles/AdminDashboard.css";

export const SidebarDataSuper = [
  {
    title: "Warehouse List",
    path: "/warehouse-list",
    icons: <Fa.FaWarehouse className="icon" />,
    cName: "menu-item",
  },
  {
    title: "Add Warehouse",
    path: "/add-warehouse",
    icons: <Io.IoAddCircle className="icon" />,
    cName: "menu-item",
  },
  {
    title: "Transaction",
    path: "/super-admin-transaction",
    icons: <Io.IoCart className="icon" />,
    cName: "menu-item",
  },
];
