import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // For styling

const Home = () => {
  const navigate = useNavigate();
  const aboutRef = useRef(null); // Create a ref for the About section

  // Function to scroll to the About section
  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="navbar-left">
          <span className="logo">KufuWork</span>
        </div>
        <div className="navbar-right">
        <button onClick={scrollToAbout} className="nav-button">
            About
          </button>
          <button onClick={() => navigate('/login')} className="nav-button">
            Login
          </button>
          <button onClick={() => navigate('/signup')} className="nav-button">
            Signup
          </button>
          
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome to KufuWork</h1>
        <p>Manage your employees efficiently with our system.</p>
        <h1>Welcome to KufuWork</h1>
        <p>Manage your employees efficiently with our system.</p>
        <h1>Welcome to KufuWork</h1>
        <p>Manage your employees efficiently with our system.</p>
        <h1>Welcome to KufuWork</h1>
        <p>Manage your employees efficiently with our system.</p>
        <h1>Welcome to KufuWork</h1>
        <p>Manage your employees efficiently with our system.</p>
        <h1>Welcome to KufuWork</h1>
        <p>Manage your employees efficiently with our system.</p>
        <h1>Welcome to KufuWork</h1>
        <p>Manage your employees efficiently with our system.</p>
        <h1>Welcome to KufuWork</h1>
        <p>Manage your employees efficiently with our system.</p>
        <h1>Welcome to KufuWork</h1>
        <p>Manage your employees efficiently with our system.</p>
        <h1>Welcome to KufuWork</h1>
        <p>Manage your employees efficiently with our system.</p>
        <h1>Welcome to KufuWork</h1>
        <p>Manage your employees efficiently with our system.</p>
      </div>

      {/* About Section */}
      <div ref={aboutRef} className="about-section">
        <h2>About KufuWork</h2>
        <p>
          KufuWork is a modern employee management system designed to help businesses
          streamline their operations, manage tasks, and improve productivity. Our platform
          provides tools for admins, managers, and employees to collaborate effectively.
        </p>
      </div>
    </div>
  );
};

export default Home;