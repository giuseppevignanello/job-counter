import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import AppMain from "./components/AppMain";
import JobDetail from "./pages/JobDetail";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import SideBar from "./components/SideBar";
import CategoryDetail from "./pages/CategoryDetail";
import TargetApp from "./pages/TargetApp";

function App() {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <AppHeader></AppHeader>
                <div className="main_section">
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

                                <Route path="target" element={<TargetApp />} />
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
        </BrowserRouter>
    );
}

export default App;
