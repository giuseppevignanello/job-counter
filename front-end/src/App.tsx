import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AppHeader from "./components/AppHeader";
import AppMain from "./components/AppMain";
import JobDetail from "./pages/JobDetail";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import SideBar from "./components/SideBar";
import CategoryDetail from "./pages/CategoryDetail";
import TargetApp from "./pages/TargetApp";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import TargetEdit from "./pages/TargetEdit";
import AppModal from "./components/AppModal";

const App: React.FC = () => {
    const [isAuth, setIsAuth] = useState(() => {
        const storedToken = localStorage.getItem("authToken");
        console.log(storedToken);
        const isAuthenticated = storedToken !== null;
        return isAuthenticated;
    });

    const updateAuthStatus = (newAuthStatus: boolean) => {
        setIsAuth(newAuthStatus);
        if (!newAuthStatus) {
            localStorage.removeItem("authToken");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            updateAuthStatus(true);
        }
    }, []);
    return (
        <BrowserRouter>
            <AppModal></AppModal>
            {!isAuth ? (
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RegisterForm updateAuthStatus={updateAuthStatus} />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <LoginForm updateAuthStatus={updateAuthStatus} />
                        }
                    />
                </Routes>
            ) : (
                <div className="wrapper">
                    <AppHeader></AppHeader>
                    <div className="main_section ">
                        <SideBar></SideBar>

                        <div className="content content-container">
                            <Routes>
                                <Route>
                                    <Route index element={<AppMain />} />
                                    <Route
                                        path="job_detail/:id"
                                        element={<JobDetail />}
                                    />
                                    <Route
                                        path="category_detail/:id"
                                        element={<CategoryDetail />}
                                    />
                                    <Route path="create" element={<Create />} />
                                    <Route path="edit/:id" element={<Edit />} />

                                    <Route
                                        path="target"
                                        element={<TargetApp />}
                                    />
                                    <Route
                                        path="target-edit/:id"
                                        element={<TargetEdit />}
                                    />
                                </Route>
                            </Routes>
                        </div>
                        <Link to="/target">
                            <div className="target">
                                <img src="/target.png" alt="" />
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </BrowserRouter>
    );
};

export default App;
