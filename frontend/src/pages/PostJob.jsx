
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./PostJob.css";

function PostJob() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        company: "",
        role: "",
        description: "",
        location: "",
        jobType: "Full Time",
        package: "",
        eligibility: "",
        requiredSkills: "",
        applicationDeadline: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const token = localStorage.getItem("token");

            const jobData = {
                ...formData,
                requiredSkills: formData.requiredSkills
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(Boolean)
            };

            const response = await API.post("/jobs", jobData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSuccess(response.data.message);

            setTimeout(() => {
                navigate("/find-jobs");
            }, 1200);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to post job. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="post-job-page">

            <div className="post-job-header">
                <h1>Post a New Job</h1>
                <p>Share a placement opportunity with students.</p>
            </div>

            <form className="post-job-form" onSubmit={handleSubmit}>

                <div className="form-grid">

                    <div className="form-group">
                        <label>Company Name *</label>
                        <input
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="e.g. Google"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Job Role *</label>
                        <input
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            placeholder="e.g. Software Engineer"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Location *</label>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. Bangalore"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Employment Type *</label>
                        <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                        >
                            <option value="Full Time">Full Time</option>
                            <option value="Internship">Internship</option>
                            <option value="Part Time">Part Time</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Package / Stipend *</label>
                        <input
                            name="package"
                            value={formData.package}
                            onChange={handleChange}
                            placeholder="e.g. 8 LPA or ₹25,000/month"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Application Deadline</label>
                        <input
                            type="date"
                            name="applicationDeadline"
                            value={formData.applicationDeadline}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>Job Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the job responsibilities..."
                            rows="5"
                            required
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>Eligibility Criteria</label>
                        <textarea
                            name="eligibility"
                            value={formData.eligibility}
                            onChange={handleChange}
                            placeholder="e.g. B.Tech CSE, minimum 7 CGPA"
                            rows="3"
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>Required Skills</label>
                        <input
                            name="requiredSkills"
                            value={formData.requiredSkills}
                            onChange={handleChange}
                            placeholder="React, JavaScript, Node.js (comma separated)"
                        />
                    </div>

                </div>

                {error && <p className="post-error">{error}</p>}
                {success && <p className="post-success">{success}</p>}

                <button
                    type="submit"
                    className="post-job-button"
                    disabled={loading}
                >
                    {loading ? "Posting Job..." : "Publish Job"}
                </button>

            </form>

        </div>
    );
}

export default PostJob;
