
import { useState } from "react";
import {
    GraduationCap,
    LayoutDashboard,
    Users,
    BriefcaseBusiness,
    Building2,
    CalendarDays,
    FileText,
    LogOut,
    Bell,
    Menu,
    X,
    UserRound,
    TrendingUp
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const [activeTab, setActiveTab] = useState("Dashboard");
    const [menuOpen, setMenuOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard },
        { name: "Manage Students", icon: Users },
        { name: "Manage Recruiters", icon: Building2 },
        { name: "Manage Jobs", icon: BriefcaseBusiness },
        { name: "Placement Drives", icon: CalendarDays },
        { name: "Applications", icon: FileText }
    ];

    const stats = [
        { title: "Total Students", value: "1,250", icon: Users, color: "blue" },
        { title: "Recruiters", value: "48", icon: Building2, color: "purple" },
        { title: "Active Jobs", value: "86", icon: BriefcaseBusiness, color: "green" },
        { title: "Applications", value: "2,450", icon: FileText, color: "orange" }
    ];

    const activities = [
        {
            title: "New student registered",
            description: "A new student joined CampusConnect.",
            time: "Recently",
            icon: UserRound
        },
        {
            title: "New placement opportunity",
            description: "A new job opportunity was added.",
            time: "Recently",
            icon: BriefcaseBusiness
        },
        {
            title: "Placement drive scheduled",
            description: "A new placement drive was created.",
            time: "Recently",
            icon: CalendarDays
        }
    ];

    return (
        <div className="admin-layout">

            <aside className={`admin-sidebar ${menuOpen ? "admin-sidebar-open" : ""}`}>

                <div className="admin-brand">
                    <GraduationCap size={30} />
                    <span>CampusConnect</span>

                    <button
                        className="admin-close-menu"
                        onClick={() => setMenuOpen(false)}
                    >
                        <X />
                    </button>
                </div>

                <p className="admin-sidebar-label">ADMINISTRATION</p>

                <nav>
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.name}
                                className={`admin-nav-link ${
                                    activeTab === item.name ? "active" : ""
                                }`}
                               onClick={() => {
    setMenuOpen(false);

    if (item.name === "Manage Students") {
        navigate("/admin-students");
    } else {
        setActiveTab(item.name);
    }
}}
                            >
                                <Icon size={19} />
                                <span>{item.name}</span>
                            </button>
                        );
                    })}
                </nav>

                <button className="admin-logout" onClick={logout}>
                    <LogOut size={19} />
                    Logout
                </button>

            </aside>

            {menuOpen && (
                <div
                    className="admin-overlay"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            <main className="admin-main">

                <header className="admin-header">

                    <button
                        className="admin-menu-button"
                        onClick={() => setMenuOpen(true)}
                    >
                        <Menu />
                    </button>

                    <div>
                        <h2>{activeTab}</h2>
                        <p>CampusConnect Administration Portal</p>
                    </div>

                    <div className="admin-header-profile">
                        <Bell size={20} />

                        <div className="admin-avatar">
                            {user.name?.charAt(0)?.toUpperCase() || "A"}
                        </div>

                        <div>
                            <strong>{user.name || "Administrator"}</strong>
                            <small>Administrator</small>
                        </div>
                    </div>

                </header>

                <section className="admin-content">

                    <div className="admin-welcome-banner">
                        <div>
                            <span>ADMINISTRATOR PORTAL</span>
                            <h1>Welcome, {user.name?.split(" ")[0] || "Admin"}!</h1>
                            <p>
                                Manage campus placements and career opportunities
                                from one place.
                            </p>
                        </div>

                        <GraduationCap size={90} />
                    </div>

                    <div className="admin-stats">

                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div className="admin-stat-card" key={stat.title}>
                                    <div className={`admin-stat-icon ${stat.color}`}>
                                        <Icon size={23} />
                                    </div>

                                    <div>
                                        <h3>{stat.value}</h3>
                                        <p>{stat.title}</p>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                    <div className="admin-section-heading">
                        <div>
                            <h2>Quick Management</h2>
                            <p>Access the main administration sections.</p>
                        </div>
                    </div>

                    <div className="admin-management-grid">

                        {menuItems.slice(1).map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    className="admin-management-card"
                                    key={item.name}
                                    onClick={() => {
    if (item.name === "Manage Students") {
        navigate("/admin-students");
    } else {
        setActiveTab(item.name);
    }
}}
                                >
                                    <Icon size={26} />
                                    <h3>{item.name}</h3>
                                    <span>Manage and view records</span>
                                </button>
                            );
                        })}

                    </div>

                    <div className="admin-section-heading">
                        <div>
                            <h2>Recent Activity</h2>
                            <p>Latest updates across CampusConnect.</p>
                        </div>
                    </div>

                    <div className="admin-activity-list">

                        {activities.map((activity, index) => {
                            const Icon = activity.icon;

                            return (
                                <div className="admin-activity" key={index}>
                                    <div className="admin-activity-icon">
                                        <Icon size={20} />
                                    </div>

                                    <div>
                                        <h3>{activity.title}</h3>
                                        <p>{activity.description}</p>
                                    </div>

                                    <span>{activity.time}</span>
                                </div>
                            );
                        })}

                    </div>

                    <div className="admin-footer">
                        © 2026 CampusConnect. All rights reserved.
                    </div>

                </section>

            </main>
        </div>
    );
}

export default AdminDashboard;
