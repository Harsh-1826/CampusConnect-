
import { useEffect, useState } from "react";
import { Users, Search, Trash2, ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./AdminStudents.css";

function AdminStudents() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchStudents = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await API.get("/admin/students", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setStudents(response.data.students);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load students."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const deleteStudent = async (id, name) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${name}'s account?`
        );

        if (!confirmed) return;

        try {
            const token = localStorage.getItem("token");

            await API.delete(`/admin/students/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setStudents((previous) =>
                previous.filter((student) => student._id !== id)
            );

            alert("Student deleted successfully!");
        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Failed to delete student."
            );
        }
    };

    const filteredStudents = students.filter((student) => {
        const value = search.toLowerCase();

        return (
            student.name?.toLowerCase().includes(value) ||
            student.email?.toLowerCase().includes(value) ||
            student.department?.toLowerCase().includes(value) ||
            student.enrollmentNumber?.toLowerCase().includes(value)
        );
    });

    return (
        <div className="admin-students-page">

            <header className="students-header">
                <div>
                    <h1><Users size={26} /> Manage Students</h1>
                    <p>View and manage registered student accounts.</p>
                </div>

                <button onClick={() => navigate("/admin-dashboard")}>
                    <ArrowLeft size={17} /> Dashboard
                </button>
            </header>

            <div className="students-summary">
                <div>
                    <span>Total Registered Students</span>
                    <h2>{students.length}</h2>
                </div>

                <Users size={35} />
            </div>

            <div className="students-toolbar">

                <div className="students-search">
                    <Search size={19} />
                    <input
                        type="text"
                        placeholder="Search by name, email, department or UID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <button onClick={fetchStudents}>
                    <RefreshCw size={17} /> Refresh
                </button>

            </div>

            {loading ? (
                <p className="students-message">Loading students...</p>
            ) : error ? (
                <p className="students-error">{error}</p>
            ) : filteredStudents.length === 0 ? (
                <p className="students-message">No students found.</p>
            ) : (

                <div className="students-table-wrapper">
                    <table className="students-table">

                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Enrollment Number</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredStudents.map((student) => (
                                <tr key={student._id}>

                                    <td>
                                        <strong>{student.name}</strong>
                                    </td>

                                    <td>{student.email}</td>

                                    <td>{student.department || "Not provided"}</td>

                                    <td>{student.enrollmentNumber || "Not provided"}</td>

                                    <td>{student.phone || "Not provided"}</td>

                                    <td>
                                        <button
                                            className="delete-student-button"
                                            onClick={() =>
                                                deleteStudent(student._id, student.name)
                                            }
                                            title="Delete student"
                                        >
                                            <Trash2 size={17} />
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            )}

            <footer className="students-footer">
                Showing {filteredStudents.length} of {students.length} students
            </footer>

        </div>
    );
}

export default AdminStudents;
