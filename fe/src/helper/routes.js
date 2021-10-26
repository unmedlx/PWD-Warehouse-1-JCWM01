import Admin from "../pages/Admin";
import ProductsList from "../pages/ProductsList";
import ProductDetail from "../pages/ProductDetail";
import AddProduct from "../pages/AddProduct";
import AdminEditProduct from "../pages/AdminEditProduct";
import WarehouseList from "../pages/WarehouseList";
import AddWarehouse from "../pages/AddWarehouse";
import Verification from "../pages/Verification";
import Address from "../pages/Address";
import Profile from "../pages/Profile";
import AdminProductList from "../pages/AdminProductList";
import ChangePassword from "../pages/ChangePassword";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import WarehouseStock from "../pages/WarehouseStock";
import Checkout from "../pages/Checkout";
import DetailTransaction from "../components/Transaction/DetailTransaction";
import UserTransaction from "../pages/UserTransaction";
import AdminViewTransaction from "../pages/Admin/AdminViewTransaction";
import SuperAdminViewTransaction from "../pages/SuperAdmin/SuperAdminViewTransaction";
import SalesReport from "../pages/SalesReport";

export const routes = [
  { component: ProductsList, path: "/product-list" },
  { component: ProductDetail, path: "/product-detail/:idProduct" },
  { component: Verification, path: "/verification/:token" },
  { component: ForgotPassword, path: "/forgot-password" },
  { component: ResetPassword, path: "/reset-password/:id/:token" },
];

export const LoggedInRoute = [
  { component: Checkout, path: "/checkout", exact: true },
  {
    component: DetailTransaction,
    path: "/transaction/detail/:idTransaction",
    exact: true,
  },
  { component: UserTransaction, path: "/transaction", exact: true },
  { component: Address, path: "/address", exact: true },
  { component: ChangePassword, path: "/change-password", exact: true },
  { component: Profile, path: "/profile", exact: true },
];

export const AdminRoute = [
  { component: AdminProductList, path: "/admin-product-list", exact: true },
  { component: Admin, path: "/admin", exact: true },
  { component: AddProduct, path: "/add-product", exact: true },
  {
    component: AdminEditProduct,
    path: "/edit-product/:idProduct",
    exact: true,
  },
  { component: AdminViewTransaction, path: "/admin-transaction", exact: true },
  {
    component: DetailTransaction,
    path: "/admin-transaction-detail/:idTransaction",
    exact: true,
  },
  { component: WarehouseStock, path: "/admin-warehouse", exact: true },
  { component: SalesReport, path: "/sales-report", exact: true },
];

export const SuperAdminRoute = [
  {
    component: SuperAdminViewTransaction,
    path: "/super-admin-transaction",
    exact: true,
  },
  { component: AddWarehouse, path: "/add-warehouse", exact: true },
  { component: WarehouseList, path: "/warehouse-list", exact: true },
];
