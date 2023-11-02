import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import AppMain from "./components/AppMain";
import JobDetail from "./pages/JobDetail";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

function App() {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <AppHeader></AppHeader>
                <div className="d-flex main_section">
                    <div className="sidebar"></div>
                    <div className="content content-container">
                        <Routes>
                            <Route>
                                <Route index element={<AppMain />} />
                                <Route
                                    path="job_detail/:id"
                                    element={<JobDetail />}
                                />
                                <Route path="create" element={<Create />} />
                                <Route path="edit/:id" element={<Edit />} />
                            </Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
