import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard.jsx";
import Layout from "../app/components/layout/Layout.jsx";
import Admin from "../pages/Admin.jsx";
import CompanyDetail from "../components/company/CompanyDetail.jsx";
import Company from "../pages/Company.jsx";
import Profile from "../pages/Profile.jsx";
import PublisherList from "../pages/PublisherList.jsx";
import { useSelector } from "react-redux";
import Sale from "../pages/Sale.jsx";
import SaleNewInvoice from "../components/sale/SaleNewInvoice.jsx";
import Couriers from "../pages/Couries.jsx";
import ProductTable from "../components/company/product/ProductTable.jsx";
import ProductTabView from "../components/company/product/ProductTabView.jsx";
import Customer from "../pages/Customer.jsx";
import CompanyUserList from "../components/company/user/CompanyUser.jsx";
import CourierTabView from "../components/couriers/CourierTabView.jsx";
import Setting from "../components/company/setting/index.jsx";
import UserTabView from "../components/company/user/UserTabView.jsx";
import ReturnBooks from "../pages/ReturnBooks.jsx";

function PrivateRoute() {
    const { publisher } = useSelector((state) => state.loginInfo);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="admins" element={<Admin />} />
                <Route path="profile" element={<Profile />} />
                <Route path="customers" element={<Customer />} />
                <Route path="users" element={<UserTabView />} />
                <Route path="couriers" element={<CourierTabView />} />
                <Route path="setting" element={<Setting />} />
                <Route path="returnBooks" element={<ReturnBooks />} />
                <Route
                    index
                    path="books"
                    element={<ProductTabView />}
                ></Route>
                <Route path="sales">
                    <Route index element={<Sale />} />
                    <Route
                        path="invoice"
                        element={<SaleNewInvoice />}
                    />
                    <Route path=":id" element={<SaleNewInvoice />} />
                </Route>
                <Route path="couriers" element={<Couriers />} />
                <Route
                    path="publishers"
                    element={<CompanyDetail />}
                ></Route>
            </Route>
            <Route path="lists" element={<PublisherList />} />
            {publisher.length > 1 ? (
                <Route path="*" element={<Navigate to="/lists" />} />
            ) : (
                <Route path="*" element={<Navigate to="/books" />} />
            )}
        </Routes>
    );
}

export default PrivateRoute;
