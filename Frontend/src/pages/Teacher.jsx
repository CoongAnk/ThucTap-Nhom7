import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Teacher = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return (
    <div style={{ padding: '40px', textAlign: 'center', minHeight: '60vh' }}>
      <h1>👨‍🏫 Giáo viên</h1>
      <p style={{ fontSize: '16px', color: '#666' }}>
        Trang này đang được cập nhật. Quay lại <span 
          style={{ color: '#2975e8', cursor: 'pointer' }}
          onClick={() => navigate('/courses')}
        >
          Các khóa học
        </span>
      </p>
    </div>
  );
};

export default Teacher;
