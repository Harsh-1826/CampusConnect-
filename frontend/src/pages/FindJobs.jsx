
import React, { useEffect, useState } from "react";
import API from "../api";
import "./FindJobs.css";

function FindJobs() {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch jobs from MongoDB
    const fetchJobs = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await API.get("/jobs", {
                params: {
                    search,
                    location,
                    jobType
                }
            });

            setJobs(response.data.jobs);
        } catch (err) {
            setError("Unable to load jobs. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [search, location, jobType]);

    return (
        <div className="find-jobs-page">

            <div className="jobs-header">
                <div>
                    <h1>Find Your Dream Job</h1>
                    <p>
                        Explore placement opportunities and take
                        the next step in your career.
                    </p>
                </div>

                <div className="jobs-count">
                    <h2>{jobs.length}</h2>
                    <span>Available Jobs</span>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="jobs-filters">

                <input
                    type="text"
                    placeholder="Search company or job role..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                >
                    <option value="">All Job Types</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Part Time">Part Time</option>
                </select>

            </div>

            {/* Job Listings */}
            <div className="jobs-list">

                {loading && <p className="jobs-message">Loading jobs...</p>}

                {!loading && error && (
                    <p className="jobs-message error">{error}</p>
                )}

                {!loading && !error && jobs.length === 0 && (
                    <div className="no-jobs">
                        <h2>No Jobs Found</h2>
                        <p>
                            There are currently no matching opportunities.
                            Please check again later.
                        </p>
                    </div>
                )}

                {!loading && !error && jobs.map((job) => (
                    <div className="job-card" key={job._id}>

                        <div className="job-card-top">
                            <div>
                                <h2>{job.role}</h2>
                                <h3>{job.company}</h3>
                            </div>

                            <span className="job-type">
                                {job.jobType}
                            </span>
                        </div>

                        <p className="job-description">
                            {job.description}
                        </p>

                        <div className="job-details">
                            <span>📍 {job.location}</span>
                            <span>💰 {job.package}</span>
                        </div>

                        <div className="job-skills">
                            {job.requiredSkills?.map((skill, index) => (
                                <span key={index}>{skill}</span>
                            ))}
                        </div>

                        <div className="job-card-bottom">
                            <span>
                                Eligibility: {job.eligibility}
                            </span>

                            <button
                                onClick={() => alert("Job details page coming soon!")}
                            >
                                View Details
                            </button>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default FindJobs;
