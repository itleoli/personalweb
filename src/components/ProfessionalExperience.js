import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfessionalExperience.css';

const ProfessionalExperience = () => {
  const [experienceData, setExperienceData] = useState({
    startup: '在科技创业领域拥有5年经验，曾参与创建两家初创公司，专注于人工智能和物联网技术应用。具有敏锐的市场洞察力和强大的执行能力，成功帮助团队从概念验证到产品商业化的全流程管理。具备丰富的融资经验和投资者关系管理能力。',
    design: '专业的产品设计师，精通用户体验设计和产品策略制定。擅长从用户需求出发，通过数据分析和用户研究，设计出既美观又实用的产品界面。熟练掌握Figma、Sketch等设计工具，具有完整的设计思维和产品生命周期管理经验。',
    management: '拥有丰富的团队管理经验，曾领导过20+人的跨职能团队。擅长敏捷开发管理、OKR目标管理和团队文化建设。具备优秀的沟通协调能力和决策能力，能够在高压环境下保持团队的高效运作和积极氛围。注重人才培养和团队成长。'
  });

  useEffect(() => {
    // 从后端获取履历信息
    const fetchExperienceData = async () => {
      try {
        const response = await axios.get('/api/experience');
        if (response.data) {
          setExperienceData(response.data);
        }
      } catch (error) {
        console.log('使用默认履历信息');
      }
    };

    fetchExperienceData();
  }, []);

  const experiences = [
    {
      title: '科技创业',
      content: experienceData.startup,
      icon: '🚀',
      color: '#667eea'
    },
    {
      title: '产品设计',
      content: experienceData.design,
      icon: '🎨',
      color: '#f093fb'
    },
    {
      title: '团队管理',
      content: experienceData.management,
      icon: '👥',
      color: '#4facfe'
    }
  ];

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <h2 className="section-title">专业履历</h2>
        <div className="experience-grid">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-card" style={{'--card-color': exp.color}}>
              <div className="card-header">
                <span className="card-icon">{exp.icon}</span>
                <h3 className="card-title">{exp.title}</h3>
              </div>
              <div className="card-content">
                <p>{exp.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalExperience;