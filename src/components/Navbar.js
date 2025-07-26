import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onAdminClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>个人网站</h2>
        </div>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <button 
            className="nav-link"
            onClick={() => scrollToSection('about')}
          >
            关于我
          </button>
          <button 
            className="nav-link"
            onClick={() => scrollToSection('experience')}
          >
            专业履历
          </button>
          <button 
            className="nav-link"
            onClick={() => scrollToSection('contact')}
          >
            联系我
          </button>
          <button 
            className="nav-link admin-link"
            onClick={onAdminClick}
          >
            管理后台
          </button>
        </div>

        <div 
          className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;