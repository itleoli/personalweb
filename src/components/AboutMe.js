import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AboutMe.css';

const AboutMe = () => {
  const [aboutData, setAboutData] = useState({
    name: '张三',
    gender: '男',
    mbti: 'INTJ',
    profession: '产品经理 | 创业者',
    bio: '热爱科技创新的产品经理，拥有丰富的团队管理和产品设计经验。'
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
            <div className="image-placeholder">
              <span>个人照片</span>
            </div>
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