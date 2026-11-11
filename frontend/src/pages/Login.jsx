
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { GraduationCap } from "lucide-react";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
            const response = await API.post("/auth/login", formData);

            const user = response.data.user;

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect according to user role
            if (user.role === "admin") {
                navigate("/admin-dashboard");
            } else if (user.role === "recruiter") {
                navigate("/recruiter-dashboard");
            } else {
                navigate("/dashboard");
            }

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <Link to="/" className="auth-logo">
                    <GraduationCap size={30} />
                    <span>CampusConnect</span>
                </Link>

                <h1>Welcome Back!</h1>

                <p className="auth-subtitle">
                    Login to continue your career journey.
                </p>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="auth-footer">
                    Don't have an account?{" "}
                    <Link to="/register">Register Now</Link>
                </p>

                <Link to="/" className="back-home">
                    ← Back to Home
                </Link>

            </div>
        </div>
    );
}

export default Login;
