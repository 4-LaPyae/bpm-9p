import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { reloadHandler } from "./features/login/LoginSlice";
import { createKey } from "./features/login/LoginApi";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import { getCompanyList } from "./features/company/CompanyApi";

function App() {
    const { token, publisher } = useSelector(
        (state) => state.loginInfo
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reloadHandler());
        dispatch(createKey());
    }, []);

    return (
        <Routes>
            {token ? (
                publisher.length > 1 ? (
                    <>
                        <Route path="/*" element={<PrivateRoute />} />
                        <Route
                            index
                            element={<Navigate to="/lists" />}
                        />
                    </>
                ) : (
                    <>
                        <Route path="/*" element={<PrivateRoute />} />
                        <Route
                            index
                            element={<Navigate to="/books" />}
                        />
                    </>
                )
            ) : (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="*"
                        element={<Navigate to="/login" />}
                    />
                </>
            )}
        </Routes>
    );
}

export default App;
