import os
import json
import sqlite3
from datetime import datetime, timedelta
from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
from functools import wraps

app = Flask(__name__)
CORS(app)

# 配置
app.config['SECRET_KEY'] = 'your-secret-key-change-in-production'

# 数据库配置
DATABASE = 'database.db'

# 默认管理员账号
# 从配置文件读取管理员信息
def load_admin_config():
    try:
        admin_config_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'admin.json')
        with open(admin_config_path, 'r', encoding='utf-8') as f:
            config = json.load(f)
            return config.get('username', 'admin'), config.get('password', 'admin123')
    except FileNotFoundError:
        print("管理员配置文件未找到，使用默认账号")
        return 'admin', 'admin123'
    except Exception as e:
        print(f"读取管理员配置失败: {e}")
        return 'admin', 'admin123'

ADMIN_USERNAME, ADMIN_PASSWORD = load_admin_config()

def init_db():
    """初始化数据库"""
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    # 创建留言表
    c.execute('''
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            intent TEXT NOT NULL,
            message TEXT NOT NULL,
            timestamp TEXT NOT NULL
        )
    ''')
    
    conn.commit()
    conn.close()

def token_required(f):
    """JWT token验证装饰器"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            # 移除 "Bearer " 前缀
            token = token.replace('Bearer ', '')
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        
        return f(*args, **kwargs)
    
    return decorated

def load_json_file(filename):
    """加载JSON文件"""
    try:
        with open(f'data/{filename}', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return None

@app.route('/api/about', methods=['GET'])
def get_about():
    """获取个人信息"""
    data = load_json_file('about.json')
    if data:
        return jsonify(data)
    else:
        return jsonify({
            'name': '张三',
            'gender': '男',
            'mbti': 'INTJ',
            'profession': '产品经理 | 创业者',
            'bio': '热爱科技创新的产品经理，拥有丰富的团队管理和产品设计经验。'
        })

@app.route('/api/experience', methods=['GET'])
def get_experience():
    """获取专业履历"""
    data = load_json_file('experience.json')
    if data:
        return jsonify(data)
    else:
        return jsonify({
            'startup': '在科技创业领域拥有5年经验...',
            'design': '专业的产品设计师...',
            'management': '拥有丰富的团队管理经验...'
        })

@app.route('/api/contact', methods=['POST'])
def submit_contact():
    """提交联系留言"""
    try:
        data = request.get_json()
        
        if not data or not data.get('intent') or not data.get('message'):
            return jsonify({'error': '请填写完整信息'}), 400
        
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()
        
        c.execute('''
            INSERT INTO messages (intent, message, timestamp)
            VALUES (?, ?, ?)
        ''', (data['intent'], data['message'], data.get('timestamp', datetime.now().isoformat())))
        
        conn.commit()
        conn.close()
        
        return jsonify({'message': '留言提交成功'})
    
    except Exception as e:
        return jsonify({'error': '提交失败'}), 500

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    """管理员登录"""
    try:
        data = request.get_json()
        
        if not data or not data.get('username') or not data.get('password'):
            return jsonify({'error': '请填写用户名和密码'}), 400
        
        if data['username'] == ADMIN_USERNAME and data['password'] == ADMIN_PASSWORD:
            # 生成JWT token
            token = jwt.encode({
                'username': data['username'],
                'exp': datetime.utcnow() + timedelta(hours=24)
            }, app.config['SECRET_KEY'], algorithm='HS256')
            
            return jsonify({'token': token})
        else:
            return jsonify({'error': '用户名或密码错误'}), 401
    
    except Exception as e:
        return jsonify({'error': '登录失败'}), 500

@app.route('/api/admin/messages', methods=['GET'])
@token_required
def get_messages():
    """获取所有留言（需要管理员权限）"""
    try:
        conn = sqlite3.connect(DATABASE)
        conn.row_factory = sqlite3.Row
        c = conn.cursor()
        
        c.execute('SELECT * FROM messages ORDER BY timestamp DESC')
        messages = []
        
        for row in c.fetchall():
            messages.append({
                'id': row['id'],
                'intent': row['intent'],
                'message': row['message'],
                'timestamp': row['timestamp']
            })
        
        conn.close()
        return jsonify(messages)
    
    except Exception as e:
        return jsonify({'error': '获取留言失败'}), 500

@app.route('/api/admin/messages/<int:message_id>', methods=['DELETE'])
@token_required
def delete_message(message_id):
    """删除留言（需要管理员权限）"""
    try:
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()
        
        c.execute('DELETE FROM messages WHERE id = ?', (message_id,))
        
        if c.rowcount == 0:
            return jsonify({'error': '留言不存在'}), 404
        
        conn.commit()
        conn.close()
        
        return jsonify({'message': '删除成功'})
    
    except Exception as e:
        return jsonify({'error': '删除失败'}), 500

if __name__ == '__main__':
    # 初始化数据库
    init_db()
    
    # 启动应用
    app.run(debug=True, host='0.0.0.0', port=5000)