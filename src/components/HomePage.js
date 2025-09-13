import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="logo">
            <h1>Prodexa</h1>
            <span className="tagline">Productivity + Next-Gen</span>
          </div>
          <p className="hero-description">
            The ultimate task management solution that combines cutting-edge technology 
            with intuitive design to supercharge your productivity.
          </p>
          
          {!isAuthenticated ? (
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary">
                Get Started Free
              </Link>
              <Link to="/login" className="btn btn-primary">
                Sign In
              </Link>
            </div>
          ) : (
            <div className="hero-actions">
              <Link to="/tasks" className="btn btn-primary">
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
        <div className="hero-visual">
          <div className="floating-cards">
            <div className="card task-card">✅TaskList </div>
            <div className="card calendar-card">📅 Calendar View</div>
            <div className="card voice-card">✅ Complete Tasks</div>
            <div className="card stats-card">📊 Smart Analytics</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Prodexa?</h2>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <h3>Smart Task Management</h3>
            <p>Organize tasks with priorities, due dates, and categories</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📅</div>
            <h3>Calendar Integration</h3>
            <p>Visualize your tasks on a beautiful calendar interface</p>
          </div>
       
         
         
          <div className="feature">
            <div className="feature-icon">📊</div>
            <h3>Advanced Analytics</h3>
            <p>Track your productivity with detailed statistics</p>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="developer-section">
        <div className="developer-card">
          <div className="developer-info">
            <h3>Developed with ❤️ by</h3>
            <h2>Chandru</h2>
            <p>Full Stack Developer & Productivity Enthusiast</p>
            <div className="developer-tags">
              <span className="tag">React</span>
              <span className="tag">FastAPI</span>
              <span className="tag">PostgreSQL</span>
              <span className="tag">AI Integration</span>
            </div>
          </div>
          <div className="developer-avatar">
            <div className="avatar">C</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Boost Your Productivity?</h2>
        <p>Join thousands of users who are already transforming their workflow with Prodexa</p>
        {!isAuthenticated ? (
          <Link to="/register" className="btn btn-large">
            Start Your Productivity Journey
          </Link>
        ) : (
          <Link to="/tasks" className="btn btn-large">
            Continue to Your Dashboard
          </Link>
        )}
      </section>
    </div>
  );
};

export default HomePage;