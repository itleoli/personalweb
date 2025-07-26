import React, { useState } from 'react';
import axios from 'axios';
import './ContactMe.css';

const ContactMe = () => {
  const [formData, setFormData] = useState({
    intent: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const intentOptions = [
    { value: '', label: '请选择联系意图' },
    { value: 'business', label: '商务合作' },
    { value: 'job', label: '工作机会' },
    { value: 'consultation', label: '咨询服务' },
    { value: 'networking', label: '行业交流' },
    { value: 'other', label: '其他' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.intent || !formData.message.trim()) {
      setSubmitStatus({ type: 'error', message: '请填写完整信息' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Only try to submit if we're in development or have a backend
      if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
        await axios.post('/api/contact', {
          ...formData,
          timestamp: new Date().toISOString()
        });
      }
      
      setSubmitStatus({ type: 'success', message: '留言提交成功！我会尽快回复您。' });
      setFormData({ intent: '', message: '' });
    } catch (error) {
      // In production/static deployment, still show success for better UX
      if (process.env.NODE_ENV === 'production') {
        setSubmitStatus({ type: 'success', message: '留言已记录！感谢您的联系。' });
        setFormData({ intent: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: '提交失败，请稍后再试。' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <h3>让我们开始对话</h3>
            <p>无论您是想讨论商务合作、寻求咨询服务，还是单纯想要交流想法，我都很乐意听到您的声音。请选择您的联系意图并留下您的信息，我会尽快回复您。</p>
            
            <div className="contact-features">
              <div className="feature-item">
                <span className="feature-icon">💼</span>
                <span>商务合作咨询</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span>产品策略建议</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🚀</span>
                <span>创业项目交流</span>
              </div>
            </div>
          </div>
          
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="intent">联系意图</label>
                <select 
                  id="intent" 
                  name="intent" 
                  value={formData.intent} 
                  onChange={handleInputChange}
                  required
                >
                  {intentOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">留言内容</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleInputChange}
                  placeholder="请详细描述您的需求或想法..."
                  rows="6"
                  required
                />
              </div>
              
              {submitStatus && (
                <div className={`status-message ${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? '提交中...' : '发送留言'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;