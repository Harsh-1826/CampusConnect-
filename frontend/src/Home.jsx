import { Link } from "react-router-dom";
import { useState } from "react";
import {
  GraduationCap,
  BriefcaseBusiness,
  Users,
  Building2,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  TrendingUp,
  Target,
  BookOpen
} from "lucide-react";
import "./Home.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    {
      icon: <BriefcaseBusiness />,
      title: "Explore Opportunities",
      description: "Discover internships, jobs and placement opportunities from leading companies."
    },
    {
      icon: <Target />,
      title: "Track Applications",
      description: "Monitor your applications and stay updated throughout the recruitment process."
    },
    {
      icon: <BookOpen />,
      title: "Career Preparation",
      description: "Access career resources and prepare yourself for upcoming placement drives."
    }
  ];

  const stats = [
    { number: "500+", label: "Hiring Companies" },
    { number: "10K+", label: "Student Opportunities" },
    { number: "95%", label: "Career Focus" },
    { number: "50+", label: "Recruitment Drives" }
  ];

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <a href="#" className="logo">
          <div className="logo-icon">
            <GraduationCap size={28} />
          </div>
          <span>Campus<span className="logo-highlight">Connect</span></span>
        </a>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>

          <div className="mobile-buttons">
            <button className="login-btn">Login</button>
            <button className="register-btn">Get Started</button>
          </div>
        </div>

       <div className="nav-actions">
    <Link to="/login" className="login-btn">Login</Link>

    <Link to="/register" className="register-btn">
        Get Started <ArrowRight size={16} />
    </Link>
</div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            YOUR CAREER JOURNEY STARTS HERE
          </div>

          <h1>
            Connect Your Talent.
            <br />
            <span>Discover Your Future.</span>
          </h1>

          <p>
            Your gateway to campus placements, internships and career
            opportunities. Connect with top recruiters and take the next
            step towards your professional journey.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Explore Opportunities <ArrowRight size={18} />
            </button>
            <button className="secondary-btn">
              Learn More
            </button>
          </div>

          <div className="hero-trust">
            <div className="trust-icon"><CheckCircle2 /></div>
            <span>One platform. Multiple career opportunities.</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card main-card">
            <div className="visual-top">
              <div className="visual-symbol"><GraduationCap /></div>
              <span className="live-tag">Career Ready</span>
            </div>
            <h3>Build Your Future</h3>
            <p>Your next opportunity is waiting for you.</p>

            <div className="visual-progress">
              <div><span>Career Growth</span><strong>85%</strong></div>
              <div className="progress-track"><div></div></div>
            </div>

            <div className="visual-bottom">
              <div className="company-icon"><Building2 /></div>
              <div>
                <strong>Top Recruiters</strong>
                <small>Opportunities from leading companies</small>
              </div>
            </div>
          </div>

          <div className="floating-card floating-one">
            <TrendingUp />
            <div><strong>Career Growth</strong><small>Move forward</small></div>
          </div>

          <div className="floating-card floating-two">
            <Users />
            <div><strong>Student First</strong><small>Connect & grow</small></div>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="stats-section" id="about">
        {stats.map((stat, index) => (
          <div className="stat-item" key={index}>
            <h2>{stat.number}</h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="section-heading">
          <span>WHAT WE OFFER</span>
          <h2>Everything You Need to Build Your Career</h2>
          <p>
            A centralized platform designed to make your campus placement
            journey easier, smarter and more organized.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <a href="#contact">Explore <ArrowRight size={15} /></a>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-section" id="contact">
        <h2>Your Future Starts With One Connection.</h2>
        <p>Take charge of your career journey with CampusConnect.</p>
        <button className="cta-btn">
          Join CampusConnect <ArrowRight size={18} />
        </button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <a href="#" className="logo footer-logo">
          <GraduationCap size={26} />
          <span>Campus<span className="logo-highlight">Connect</span></span>
        </a>
        <p>Connecting students with opportunities. Building careers together.</p>
        <small>© 2026 CampusConnect. All rights reserved.</small>
      </footer>

    </div>
  );
}

export default App;
