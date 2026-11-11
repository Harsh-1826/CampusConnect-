
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import FindJobs from "./pages/FindJobs";
import PostJob from "./pages/PostJob";
import AdminStudents from "./pages/AdminStudents";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Student Dashboard */}
            <Route
                path="/dashboard"
                element={<StudentDashboard />}
            />

            {/* Admin Dashboard */}
            <Route
                path="/admin-dashboard"
                element={<AdminDashboard />}
            />

            {/* Job Management */}
            <Route path="/find-jobs" element={<FindJobs />} />
            <Route path="/post-job" element={<PostJob />} />

            {/* Admin Students */}
            <Route
                path="/admin-students"
                element={<AdminStudents />}
            />
        </Routes>
    );
}

export default App;
