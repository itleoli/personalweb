import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AboutMe.css';

const AboutMe = () => {
  const [aboutData, setAboutData] = useState({
    name: '李明轩',
    gender: '男',
    mbti: 'INTJ-A',
    profession: '高级产品经理 | 科技创业者 | 全栈开发者',
    bio: '热爱科技创新的产品经理，拥有8年互联网行业经验和丰富的团队管理经验。',
    location: '北京',
    education: '清华大学 计算机科学与技术学士',
    experience_years: '8',
    skills: ['产品管理', '用户体验设计', '数据分析', '团队管理', '全栈开发', '创业孵化'],
    interests: ['人工智能', '区块链技术', '摄影', '登山', '阅读'],
    languages: ['中文(母语)', '英语(流利)', '日语(基础)'],
    avatar_path: '/images/avatar.svg'
  });

  useEffect(() => {
    // 从后端获取个人信息
    const fetchAboutData = async () => {
      try {
        const response = await axios.get('/api/about');
        if (response.data) {
          setAboutData(response.data);
        }
      } catch (error) {
        console.log('使用默认个人信息');
      }
    };

    fetchAboutData();
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="section-title">关于我</h2>
        <div className="about-content">
          <div className="about-image">
                              <img 
                    src={aboutData.avatar_path || "/images/avatar.svg"} 
                    alt="个人头像" 
                    className="avatar-image"
                  />
            <div className="background-overlay"></div>
          </div>
          
          <div className="about-info">
            <div className="info-card">
              <div className="info-item">
                <span className="info-label">姓名:</span>
                <span className="info-value">{aboutData.name}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">性别:</span>
                <span className="info-value">{aboutData.gender}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">MBTI性格类型:</span>
                <span className="info-value">{aboutData.mbti}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">职业属性:</span>
                <span className="info-value">{aboutData.profession}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">工作地点:</span>
                <span className="info-value">{aboutData.location}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">教育背景:</span>
                <span className="info-value">{aboutData.education}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">工作经验:</span>
                <span className="info-value">{aboutData.experience_years}年</span>
              </div>
              
              <div className="skills-section">
                <h3>专业技能</h3>
                <div className="skills-tags">
                  {aboutData.skills?.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="interests-section">
                <h3>兴趣爱好</h3>
                <div className="interests-tags">
                  {aboutData.interests?.map((interest, index) => (
                    <span key={index} className="interest-tag">{interest}</span>
                  ))}
                </div>
              </div>
              
              <div className="bio-section">
                <h3>个人简介</h3>
                <p>{aboutData.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;