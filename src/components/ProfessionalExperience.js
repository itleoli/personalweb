import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfessionalExperience.css';

const ProfessionalExperience = () => {
  const [experienceData, setExperienceData] = useState({
    startup: '在科技创业领域拥有8年丰富经验，曾联合创立3家初创公司，其中2家成功获得A轮融资。专注于AI赋能的SaaS产品和移动互联网应用，累计用户超过1000万。具有敏锐的市场洞察力和强大的执行能力，成功帮助团队从MVP到产品商业化的全流程管理。具备丰富的融资经验，累计融资金额超过5000万人民币，擅长商业模式设计、投资者关系管理和战略规划布局。',
    design: '专业的产品设计师和用户体验专家，拥有6年B端和C端产品设计经验。精通用户体验设计、交互设计和产品策略制定，曾主导设计多个千万级用户产品。擅长从用户需求出发，通过数据分析、用户研究和A/B测试，设计出既美观又实用的产品界面。熟练掌握Figma、Sketch、Principle、Adobe Creative Suite等专业设计工具，具有完整的设计思维和产品生命周期管理经验，注重设计系统构建。',
    management: '拥有5年团队管理经验，曾成功领导过50+人的跨职能敏捷团队，包括产品、技术、设计、运营等多个部门。擅长敏捷开发管理、OKR目标管理和企业文化建设，团队交付效率提升40%以上。具备优秀的沟通协调能力和战略决策能力，能够在高压环境下保持团队高效运作和积极氛围。注重人才培养和团队成长，建立了完善的绩效评估、职业发展和技能培训体系，团队留存率达95%以上。'
  });
  
  const [loading, setLoading] = useState(false); // Changed to false for better deployment experience
  const [expandedCards, setExpandedCards] = useState(new Set());

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        // Only try to fetch if we're in development or have a backend
        if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
          const response = await axios.get('/api/experience');
          if (response.data) {
            setExperienceData(response.data);
          }
        }
      } catch (error) {
        console.log('使用默认履历信息 - API不可用或在静态部署中');
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to prevent loading flash in static deployments
    const timer = setTimeout(() => {
      fetchExperienceData();
    }, 100);

    return () => clearTimeout(timer);
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
    const truncateText = (text, maxLength = 200) => {
      if (text.length <= maxLength) return text;
      return text.slice(0, maxLength) + '...';
    };

    const shouldShowExpand = experience.content.length > 200;

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