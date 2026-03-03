import { getAccessToken } from './auth.api.js';

const BASE_URL = 'http://localhost:8088/api/v1';

/**
 * Lấy danh sách khóa học của user
 */
export const getUserCourses = async () => {
  try {
    const token = getAccessToken();
    if (!token) {
      throw new Error('No token found. Please login first.');
    }

    const response = await fetch(`${BASE_URL}/courses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Không thể lấy danh sách khóa học');
    }

    return data.data;
  } catch (error) {
    console.error('Get courses error:', error);
    throw error;
  }
};

/**
 * Lấy chi tiết khóa học
 */
export const getCourseDetail = async (courseId) => {
  try {
    const token = getAccessToken();
    if (!token) {
      throw new Error('No token found. Please login first.');
    }

    const response = await fetch(`${BASE_URL}/courses/${courseId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Không thể lấy chi tiết khóa học');
    }

    return data.data;
  } catch (error) {
    console.error('Get course detail error:', error);
    throw error;
  }
};

/**
 * Lấy tiến độ học của user
 */
export const getUserProgress = async () => {
  try {
    const token = getAccessToken();
    if (!token) {
      throw new Error('No token found. Please login first.');
    }

    const response = await fetch(`${BASE_URL}/user/progress`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Không thể lấy tiến độ học');
    }

    return data.data;
  } catch (error) {
    console.error('Get progress error:', error);
    throw error;
  }
};

/**
 * Cập nhật tiến độ bài học
 */
export const updateLessonProgress = async (lessonId, completed) => {
  try {
    const token = getAccessToken();
    if (!token) {
      throw new Error('No token found. Please login first.');
    }

    const response = await fetch(`${BASE_URL}/lessons/${lessonId}/progress`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Không thể cập nhật tiến độ');
    }

    return data.data;
  } catch (error) {
    console.error('Update progress error:', error);
    throw error;
  }
};
