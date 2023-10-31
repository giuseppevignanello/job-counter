import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import AppMain from "./components/AppMain";
import JobDetail from "./pages/JobDetail";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

function App() {
    return (
        <BrowserRouter>
            <AppHeader></AppHeader>
            <Routes>
                <Route>
                    <Route index element={<AppMain />} />
                    <Route path="job_detail/:id" element={<JobDetail />} />
                    <Route path="create" element={<Create />} />
                    <Route path="edit/:id" element={<Edit />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
