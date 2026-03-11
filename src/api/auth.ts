// 认证相关API

// 登录请求参数
interface LoginRequest {
  username: string;
  password: string;
}

// 登录响应
interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: number;
    username: string;
    name: string;
  };
  message?: string;
}

// 登录API
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    // 这里使用模拟数据，实际项目中应该调用真实的API
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // });
    // return await response.json();
    
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.username === 'admin' && data.password === '123456') {
          resolve({
            success: true,
            token: 'mock-token-' + Date.now(),
            user: {
              id: 1,
              username: data.username,
              name: '管理员'
            }
          });
        } else {
          resolve({
            success: false,
            message: '用户名或密码错误'
          });
        }
      }, 500);
    });
  } catch (error) {
    console.error('登录失败:', error);
    return {
      success: false,
      message: '登录失败，请稍后重试'
    };
  }
};

// 登出API
export const logout = async (): Promise<{ success: boolean }> => {
  try {
    // 实际项目中应该调用真实的API
    // const response = await fetch('/api/logout', {
    //   method: 'POST'
    // });
    // return await response.json();
    
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 300);
    });
  } catch (error) {
    console.error('登出失败:', error);
    return { success: false };
  }
};

// 获取用户信息API
export const getUserInfo = async (): Promise<{
  success: boolean;
  user?: {
    id: number;
    username: string;
    name: string;
  };
}> => {
  try {
    // 实际项目中应该调用真实的API
    // const response = await fetch('/api/userinfo', {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   }
    // });
    // return await response.json();
    
    // 模拟API响应
    return new Promise((resolve) => {
      setTimeout(() => {
        const token = localStorage.getItem('token');
        if (token) {
          resolve({
            success: true,
            user: {
              id: 1,
              username: 'admin',
              name: '管理员'
            }
          });
        } else {
          resolve({ success: false });
        }
      }, 300);
    });
  } catch (error) {
    console.error('获取用户信息失败:', error);
    return { success: false };
  }
};