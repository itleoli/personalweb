import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfessionalExperience.css';

const ProfessionalExperience = () => {
  const [experienceData, setExperienceData] = useState({
    startup: '在科技创业领域拥有8年丰富经验，曾联合创立3家初创公司，其中2家成功获得A轮融资。专注于AI赋能的SaaS产品和移动互联网应用，累计用户超过1000万。具有敏锐的市场洞察力和强大的执行能力，成功帮助团队从MVP到产品商业化的全流程管理。具备丰富的融资经验，累计融资金额超过5000万人民币，擅长商业模式设计、投资者关系管理和战略规划布局。',
    design: '专业的产品设计师和用户体验专家，拥有6年B端和C端产品设计经验。精通用户体验设计、交互设计和产品策略制定，曾主导设计多个千万级用户产品。擅长从用户需求出发，通过数据分析、用户研究和A/B测试，设计出既美观又实用的产品界面。熟练掌握Figma、Sketch、Principle、Adobe Creative Suite等专业设计工具，具有完整的设计思维和产品生命周期管理经验，注重设计系统构建。',
    management: '拥有5年团队管理经验，曾成功领导过50+人的跨职能敏捷团队，包括产品、技术、设计、运营等多个部门。擅长敏捷开发管理、OKR目标管理和企业文化建设，团队交付效率提升40%以上。具备优秀的沟通协调能力和战略决策能力，能够在高压环境下保持团队高效运作和积极氛围。注重人才培养和团队成长，建立了完善的绩效评估、职业发展和技能培训体系，团队留存率达95%以上。'
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