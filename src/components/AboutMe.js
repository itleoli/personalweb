import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AboutMe.css';

const AboutMe = () => {
  const [aboutData, setAboutData] = useState({
    name: '李明轩',
    gender: '男',
    mbti: 'INTJ-A',
    profession: '高级产品经理 | 科技创业者 | 全栈开发者',
    bio: '热爱科技创新的产品经理，拥有8年互联网行业经验和丰富的团队管理经验。专注于用户体验优化和商业价值创造，致力于通过技术驱动解决实际问题。曾主导多个千万级用户产品的从0到1孵化，具有敏锐的市场洞察力和优秀的跨团队协作能力。擅长敏捷开发、数据驱动决策和用户增长策略，同时具备全栈开发技能，能够深度参与产品技术实现。',
    location: '北京',
    education: '清华大学 计算机科学与技术学士',
    experience_years: '8',
    skills: ['产品管理', '用户体验设计', '数据分析', '团队管理', '全栈开发', '创业孵化'],
    interests: ['人工智能', '区块链技术', '摄影', '登山', '阅读'],
    languages: ['中文(母语)', '英语(流利)', '日语(基础)'],
    avatar_path: './images/avatar.svg'
  });
  
  const [loading, setLoading] = useState(false); // Changed to false for better deployment experience

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        // Only try to fetch if we're in development or have a backend
        if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
          const response = await axios.get('/api/about');
          if (response.data) {
            setAboutData(response.data);
          }
        }
      } catch (error) {
        console.log('使用默认个人信息 - API不可用或在静态部署中');
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to prevent loading flash in static deployments
    const timer = setTimeout(() => {
      fetchAboutData();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const InfoRow = ({ label, value, icon }) => (
    <div className="info-row">
      {icon && <span className="info-icon">{icon}</span>}
      <div className="info-content">
        <span className="info-label">{label}</span>
        <span className="info-value">{value}</span>
      </div>
    </div>
  );

  const TagsList = ({ title, items, className }) => (
    <div className={`tags-container ${className}`}>
      <h4 className="tags-title">{title}</h4>
      <div className="tags-wrapper">
        {items?.map((item, index) => (
          <span key={index} className="tag">
            {item}
          </span>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <section id="about" className="about-section">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>加载个人信息中...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">关于我</h2>
          <p className="section-subtitle">了解我的背景、技能和兴趣</p>
        </div>
        
        <div className="about-layout">
          {/* 左侧头像区域 */}
          <div className="avatar-section">
            <div className="avatar-container">
              <div className="avatar-wrapper">
                <img 
                  src={aboutData.avatar_path || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMDAiIGZpbGw9IiNmNWY1ZjUiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMzAiIGZpbGw9IiNkZGQiLz48cGF0aCBkPSJNNTAgMTUwIEMxMDAiIGZpbGw9IiNkZGQiLz48L3N2Zz4="} 
                  alt={`${aboutData.name}的头像`}
                  className="avatar-image"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMDAiIGZpbGw9IiNmNWY1ZjUiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMzAiIGZpbGw9IiNkZGQiLz48cGF0aCBkPSJNNTAgMTUwIEMxMDAiIGZpbGw9IiNkZGQiLz48L3N2Zz4=";
                  }}
                />
                <div className="avatar-glow"></div>
              </div>
              <div className="avatar-decoration">
                <div className="decoration-ring"></div>
                <div className="decoration-dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧信息区域 */}
          <div className="info-section">
            {/* 基本信息卡片 */}
            <div className="info-card basic-info">
              <div className="card-header">
                <h3 className="card-title">基本信息</h3>
                <div className="title-decoration"></div>
              </div>
              
              <div className="info-grid">
                <InfoRow label="姓名" value={aboutData.name} icon="👤" />
                <InfoRow label="性别" value={aboutData.gender} icon="⚤" />
                <InfoRow label="MBTI" value={aboutData.mbti} icon="🧠" />
                <InfoRow label="职业" value={aboutData.profession} icon="💼" />
                <InfoRow label="地点" value={aboutData.location} icon="📍" />
                <InfoRow label="学历" value={aboutData.education} icon="🎓" />
                <InfoRow label="经验" value={`${aboutData.experience_years}年`} icon="⏱️" />
              </div>
            </div>

            {/* 个人简介卡片 */}
            <div className="info-card bio-card">
              <div className="card-header">
                <h3 className="card-title">个人简介</h3>
                <div className="title-decoration"></div>
              </div>
              <div className="bio-content">
                <p className="bio-text">{aboutData.bio}</p>
              </div>
            </div>

            {/* 技能和兴趣卡片 */}
            <div className="info-card skills-interests">
              <div className="skills-interests-layout">
                <TagsList 
                  title="专业技能" 
                  items={aboutData.skills} 
                  className="skills-section"
                />
                <TagsList 
                  title="兴趣爱好" 
                  items={aboutData.interests} 
                  className="interests-section"
                />
                {aboutData.languages && aboutData.languages.length > 0 && (
                  <TagsList 
                    title="语言能力" 
                    items={aboutData.languages} 
                    className="languages-section"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;