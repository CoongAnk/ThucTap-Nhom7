import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', minHeight: '60vh' }}>
      <h1>📋 Hộ sơ</h1>
      <div style={{ 
        border: '1px solid #e0e0e0', 
        borderRadius: '8px', 
        padding: '24px',
        marginTop: '24px'
      }}>
        <div style={{ marginBottom: '16px' }}>
          <strong>Họ tên:</strong>
          <p>{userData.fullName || 'N/A'}</p>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <strong>Email:</strong>
          <p>{userData.email || 'N/A'}</p>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <strong>Vai trò:</strong>
          <p>{userData.role === 'student' ? 'Học viên' : userData.role === 'teacher' ? 'Giáo viên' : 'Phụ huynh'}</p>
        </div>
      </div>
      <button
        onClick={() => navigate('/courses')}
        style={{
          marginTop: '24px',
          padding: '10px 24px',
          backgroundColor: '#2975e8',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600'
        }}
      >
        Quay lại
      </button>
    </div>
  );
};

export default Profile;
