const BASE_URL = "http://localhost:8088/api/v1";

export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

export const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Đăng nhập thất bại");
    }

    const { accessToken, user, expiresIn } = data.data;

    setAccessToken(accessToken);
    setUser(user);
    
    if (expiresIn) {
      localStorage.setItem("tokenExpiry", Date.now() + (expiresIn * 1000));
    }

    return {
      user,
      accessToken,
      expiresIn,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async ({ email, fullName, password, role, birthDay }) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, fullName, password, role, birthDay }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Đăng ký thất bại");
    }

    const { accessToken, user, expiresIn } = data.data;

    setAccessToken(accessToken);
    setUser(user);

    if (expiresIn) {
      localStorage.setItem("tokenExpiry", Date.now() + (expiresIn * 1000));
    }

    return {
      user,
      accessToken,
      expiresIn,
    };
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const token = getAccessToken();

    if (!token) {
      throw new Error("No token found. Please login first.");
    }

    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!data.success) {
      if (response.status === 401) {
        removeAccessToken();
        removeUser();
        localStorage.removeItem("tokenExpiry");
      }
      throw new Error(data.message || "Không thể lấy profile");
    }

    return data.data;
  } catch (error) {
    console.error("Get profile error:", error);
    throw error;
  }
};

export const logout = () => {
  removeAccessToken();
  removeUser();
  localStorage.removeItem("tokenExpiry");
};

export const isTokenExpired = () => {
  const expiry = localStorage.getItem("tokenExpiry");
  if (!expiry) return true;
  return Date.now() > parseInt(expiry);
};

export const isLoggedIn = () => {
  const token = getAccessToken();
  return token && !isTokenExpired();
};

export const fetchWithAuth = async (url, options = {}) => {
  const token = getAccessToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (response.status === 401) {
    removeAccessToken();
    removeUser();
    localStorage.removeItem("tokenExpiry");
  }

  return data;
};