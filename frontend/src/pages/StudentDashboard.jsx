
import { useState } from "react";
import {
    GraduationCap, LayoutDashboard, BriefcaseBusiness,
    FileText, CalendarDays, UserRound, LogOut,
    Bell, MapPin, Clock, ArrowUpRight,
    Menu, X
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [menuOpen, setMenuOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const openTab = (tab) => {
        setMenuOpen(false);

        if (tab === "Find Jobs") {
            navigate("/find-jobs");
        } else {
            setActiveTab(tab);
        }
    };

    const jobs = [
        {
            company: "Google",
            role: "Software Engineer",
            location: "Bangalore",
            type: "Full Time",
            package: "₹18-25 LPA"
        },
        {
            company: "Microsoft",
            role: "AI/ML Engineer",
            location: "Hyderabad",
            type: "Full Time",
            package: "₹15-22 LPA"
        },
        {
            company: "Amazon",
            role: "Graduate Developer",
            location: "Bangalore",
            type: "Full Time",
            package: "₹12-18 LPA"
        }
    ];

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard },
        { name: "Find Jobs", icon: BriefcaseBusiness },
        { name: "My Applications", icon: FileText },
        { name: "Placement Drives", icon: CalendarDays },
        { name: "My Profile", icon: UserRound }
    ];

    return (
        <div className="dashboard-layout">

            <aside className={`dashboard-sidebar ${menuOpen ? "sidebar-open" : ""}`}>
                <div className="dashboard-brand">
                    <GraduationCap size={30} />
                    <span>CampusConnect</span>
                    <button className="close-menu" onClick={() => setMenuOpen(false)}>
                        <X />
                    </button>
                </div>

                <p className="sidebar-label">MAIN MENU</p>

                <nav>
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.name}
                                className={`sidebar-link ${activeTab === item.name ? "active" : ""}`}
                                onClick={() => openTab(item.name)}
                            >
                                <Icon size={19} />
                                <span>{item.name}</span>
                            </button>
                        );
                    })}
                </nav>

                <button className="sidebar-logout" onClick={logout}>
                    <LogOut size={19} />
                    Logout
                </button>
            </aside>

            {menuOpen && (
                <div className="sidebar-overlay" onClick={() => setMenuOpen(false)} />
            )}

            <main className="dashboard-main">

                <header className="dashboard-header">
                    <button className="menu-button" onClick={() => setMenuOpen(true)}>
                        <Menu />
                    </button>

                    <div>
                        <h2>{activeTab}</h2>
                        <p>Welcome to your career dashboard</p>
                    </div>

                    <div className="header-profile">
                        <button className="notification-button">
                            <Bell size={20} />
                        </button>

                        <div className="profile-avatar">
                            {user.name?.charAt(0)?.toUpperCase() || "S"}
                        </div>

                        <div className="header-user">
                            <strong>{user.name || "Student"}</strong>
                            <small>Student</small>
                        </div>
                    </div>
                </header>

                <section className="dashboard-content">

                    <div className="welcome-banner">
                        <div>
                            <span>STUDENT PORTAL</span>
                            <h1>Hello, {user.name?.split(" ")[0] || "Student"}!</h1>
                            <p>Your next career opportunity starts here.</p>
                        </div>
                        <GraduationCap size={90} />
                    </div>

                    <div className="dashboard-stats">
                        <div className="dashboard-stat">
                            <div className="stat-icon blue"><BriefcaseBusiness /></div>
                            <div>
                                <h3>12</h3>
                                <p>Available Jobs</p>
                            </div>
                        </div>

                        <div className="dashboard-stat">
                            <div className="stat-icon purple"><FileText /></div>
                            <div>
                                <h3>0</h3>
                                <p>Applications</p>
                            </div>
                        </div>

                        <div className="dashboard-stat">
                            <div className="stat-icon green"><CalendarDays /></div>
                            <div>
                                <h3>3</h3>
                                <p>Upcoming Drives</p>
                            </div>
                        </div>

                        <div className="dashboard-stat">
                            <div className="stat-icon orange"><UserRound /></div>
                            <div>
                                <h3>60%</h3>
                                <p>Profile Completion</p>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-section-heading">
                        <div>
                            <h2>Recommended Opportunities</h2>
                            <p>Explore opportunities from top companies.</p>
                        </div>
                        <button onClick={() => navigate("/find-jobs")}>
                            View All <ArrowUpRight size={16} />
                        </button>
                    </div>

                    <div className="job-list">
                        {jobs.map((job) => (
                            <div className="job-card" key={job.company}>
                                <div className="company-avatar">
                                    {job.company.charAt(0)}
                                </div>

                                <div className="job-details">
                                    <h3>{job.role}</h3>
                                    <p>{job.company}</p>
                                    <div className="job-meta">
                                        <span><MapPin size={14} /> {job.location}</span>
                                        <span><Clock size={14} /> {job.type}</span>
                                    </div>
                                </div>

                                <div className="job-action">
                                    <strong>{job.package}</strong>
                                    <button onClick={() => navigate("/find-jobs")}>
                                        View Details <ArrowUpRight size={15} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="dashboard-bottom">
                        <div className="dashboard-panel">
                            <h2>Upcoming Placement Drives</h2>

                            <div className="drive-item">
                                <div className="drive-date">
                                    <strong>10</strong>
                                    <span>NOV</span>
                                </div>
                                <div>
                                    <h3>Microsoft Campus Drive</h3>
                                    <p>Software and AI/ML roles</p>
                                </div>
                            </div>

                            <div className="drive-item">
                                <div className="drive-date">
                                    <strong>15</strong>
                                    <span>NOV</span>
                                </div>
                                <div>
                                    <h3>Amazon Recruitment Drive</h3>
                                    <p>Graduate Developer roles</p>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-panel profile-panel">
                            <h2>Complete Your Profile</h2>
                            <div className="profile-progress">
                                <div></div>
                            </div>
                            <p>Your profile is 60% complete.</p>
                            <button onClick={() => setActiveTab("My Profile")}>
                                Complete Profile
                            </button>
                        </div>
                    </div>

                    <footer className="dashboard-footer">
                        © 2026 CampusConnect. All rights reserved.
                    </footer>

                </section>
            </main>
        </div>
    );
}

export default StudentDashboard;
