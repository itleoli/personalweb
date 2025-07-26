import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfessionalExperience.css';

const ProfessionalExperience = () => {
  const [experienceData, setExperienceData] = useState({
    startup: '在科技创业领域拥有8年丰富经验，曾联合创立3家初创公司，其中2家成功获得A轮融资。',
    design: '专业的产品设计师和用户体验专家，拥有6年B端和C端产品设计经验。',
    management: '拥有5年团队管理经验，曾成功领导过50+人的跨职能敏捷团队。'
  });
  
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState(new Set());

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const response = await axios.get('/api/experience');
        if (response.data) {
          setExperienceData(response.data);
        }
      } catch (error) {
        console.log('使用默认履历信息');
      } finally {
        setLoading(false);
      }
    };

    fetchExperienceData();
  }, []);

  const toggleExpand = (index) => {
    const newExpandedCards = new Set(expandedCards);
    if (newExpandedCards.has(index)) {
      newExpandedCards.delete(index);
    } else {
      newExpandedCards.add(index);
    }
    setExpandedCards(newExpandedCards);
  };

  const ExperienceCard = ({ experience, index, isExpanded }) => {
    const truncateText = (text, maxLength = 150) => {
      if (text.length <= maxLength) return text;
      return text.slice(0, maxLength) + '...';
    };

    const shouldShowExpand = experience.content.length > 150;

    return (
      <div className={`experience-card ${isExpanded ? 'expanded' : ''}`}>
        <div className="card-background">
          <div className="background-pattern"></div>
        </div>
        
        <div className="card-header">
          <div className="icon-container">
            <span className="card-icon" style={{ '--icon-color': experience.color }}>
              {experience.icon}
            </span>
            <div className="icon-glow" style={{ '--glow-color': experience.color }}></div>
          </div>
          <div className="header-content">
            <h3 className="card-title">{experience.title}</h3>
            <div className="title-underline" style={{ '--underline-color': experience.color }}></div>
          </div>
        </div>

        <div className="card-body">
          <div className="content-wrapper">
            <p className="card-text">
              {isExpanded || !shouldShowExpand 
                ? experience.content 
                : truncateText(experience.content)
              }
            </p>
            
            {shouldShowExpand && (
              <button 
                className="expand-button"
                onClick={() => toggleExpand(index)}
                style={{ '--button-color': experience.color }}
              >
                <span className="button-text">
                  {isExpanded ? '收起' : '展开更多'}
                </span>
                <span className="button-icon">
                  {isExpanded ? '↑' : '↓'}
                </span>
              </button>
            )}
          </div>
          
          <div className="card-footer">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ '--progress-color': experience.color }}
              ></div>
            </div>
            <div className="expertise-level">
              <span className="level-text">专业水平</span>
              <div className="level-dots">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`level-dot ${i < experience.level ? 'active' : ''}`}
                    style={{ '--dot-color': experience.color }}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card-decoration">
          <div className="decoration-element" style={{ '--decoration-color': experience.color }}></div>
        </div>
      </div>
    );
  };

  const experiences = [
    {
      title: '科技创业',
      content: experienceData.startup,
      icon: '🚀',
      color: '#667eea',
      level: 5
    },
    {
      title: '产品设计',
      content: experienceData.design,
      icon: '🎨',
      color: '#f093fb',
      level: 4
    },
    {
      title: '团队管理',
      content: experienceData.management,
      icon: '👥',
      color: '#4facfe',
      level: 5
    }
  ];

  if (loading) {
    return (
      <section id="experience" className="experience-section">
        <div className="container">
          <div className="loading-container">
            <div className="loading-animation">
              <div className="loading-circle"></div>
              <div className="loading-circle"></div>
              <div className="loading-circle"></div>
            </div>
            <p className="loading-text">加载专业履历中...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="experience-section">
      <div className="section-background">
        <div className="background-grid"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">专业履历</h2>
          <p className="section-subtitle">
            多年来在不同领域积累的专业经验与技能
          </p>
          <div className="header-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-diamond"></div>
            <div className="decoration-line"></div>
          </div>
        </div>
        
        <div className="experiences-container">
          <div className="experiences-grid">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                experience={exp}
                index={index}
                isExpanded={expandedCards.has(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="section-footer">
          <div className="statistics">
            <div className="stat-item">
              <span className="stat-number">8+</span>
              <span className="stat-label">年经验</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">项目</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">3</span>
              <span className="stat-label">专业领域</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalExperience;