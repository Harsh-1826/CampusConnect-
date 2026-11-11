
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { GraduationCap } from "lucide-react";
import "../App.css";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        department: "",
        enrollmentNumber: "",
        graduationYear: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await API.post("/auth/register", {
                ...formData,
                graduationYear: Number(formData.graduationYear)
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            navigate("/dashboard");

        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card register-card">

                <Link to="/" className="auth-logo">
                    <GraduationCap size={30} />
                    <span>CampusConnect</span>
                </Link>

                <h1>Create Your Account</h1>
                <p className="auth-subtitle">
                    Join CampusConnect and explore opportunities.
                </p>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <label>Full Name</label>
                    <input name="name" placeholder="Enter your full name"
                        value={formData.name} onChange={handleChange} required />

                    <label>Email Address</label>
                    <input type="email" name="email" placeholder="Enter your email"
                        value={formData.email} onChange={handleChange} required />

                    <label>Password</label>
                    <input type="password" name="password" placeholder="Minimum 6 characters"
                        value={formData.password} onChange={handleChange}
                        minLength="6" required />

                    <label>Phone Number</label>
                    <input name="phone" placeholder="Enter phone number"
                        value={formData.phone} onChange={handleChange} />

                    <label>Department</label>
                    <input name="department" placeholder="e.g. Computer Science"
                        value={formData.department} onChange={handleChange} />

                    <label>Enrollment Number</label>
                    <input name="enrollmentNumber" placeholder="Enter enrollment number"
                        value={formData.enrollmentNumber} onChange={handleChange} />

                    <label>Graduation Year</label>
                    <input type="number" name="graduationYear" placeholder="e.g. 2027"
                        value={formData.graduationYear} onChange={handleChange} />

                    <button type="submit" disabled={loading}>
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <p className="auth-footer">
                    Already registered? <Link to="/login">Login</Link>
                </p>

                <Link to="/" className="back-home">← Back to Home</Link>

            </div>
        </div>
    );
}

export default Register;
