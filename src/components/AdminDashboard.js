import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = ({ onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/admin/messages', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessages(response.data);
    } catch (error) {
      setError('获取留言失败');
      if (error.response?.status === 401) {
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (messageId) => {
    if (!window.confirm('确定要删除这条留言吗？')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/messages/${messageId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessages(messages.filter(msg => msg.id !== messageId));
    } catch (error) {
      setError('删除留言失败');
    }
  };

  const getIntentLabel = (intent) => {
    const intentMap = {
      'business': '商务合作',
      'job': '工作机会',
      'consultation': '咨询服务',
      'networking': '行业交流',
      'other': '其他'
    };
    return intentMap[intent] || intent;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">加载中...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>管理员后台</h1>
        <button onClick={onLogout} className="logout-btn">
          退出登录
        </button>
      </div>

      <div className="dashboard-content">
        <div className="messages-section">
          <h2>用户留言 ({messages.length})</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          {messages.length === 0 ? (
            <div className="no-messages">
              <p>暂无留言</p>
            </div>
          ) : (
            <div className="messages-grid">
              {messages.map((message) => (
                <div key={message.id} className="message-card">
                  <div className="message-header">
                    <span className="intent-badge">
                      {getIntentLabel(message.intent)}
                    </span>
                    <span className="message-date">
                      {formatDate(message.timestamp)}
                    </span>
                  </div>
                  
                  <div className="message-content">
                    <p>{message.message}</p>
                  </div>
                  
                  <div className="message-actions">
                    <button 
                      onClick={() => deleteMessage(message.id)}
                      className="delete-btn"
                    >
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;