import { defineStore } from 'pinia'

interface User {
  id: number
  username: string
  name: string
}

interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  success: boolean
  token?: string
  user?: User
  message?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null as User | null,
    token: localStorage.getItem('token'),
    loading: false,
    error: ''
  }),
  actions: {
    async login(username: string, password: string) {
      this.loading = true
      this.error = ''

      try {
        const response: LoginResponse = await new Promise((resolve) => {
          setTimeout(() => {
            if (username === 'admin' && password === '123456') {
              resolve({
                success: true,
                token: 'mock-token',
                user: { id: 1, username: 'admin', name: '管理员' }
              })
            } else {
              resolve({
                success: false,
                message: '用户名或密码错误'
              })
            }
          }, 1000)
        })

        if (response.success && response.token && response.user) {
          this.token = response.token
          this.user = response.user
          this.isAuthenticated = true
          localStorage.setItem('token', response.token)
          return true
        } else {
          this.error = response.message || '登录失败'
          return false
        }
      } catch (error) {
        this.error = '登录失败，请稍后重试'
        return false
      } finally {
        this.loading = false
      }
    },
    async logout() {
      this.loading = true

      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        this.token = null
        this.user = null
        this.isAuthenticated = false
        localStorage.removeItem('token')
        return true
      } catch (error) {
        return false
      } finally {
        this.loading = false
      }
    },
    async initAuth() {
      if (this.token) {
        try {
          const user: User = await new Promise((resolve) => {
            setTimeout(() => {
              resolve({ id: 1, username: 'admin', name: '管理员' })
            }, 500)
          })
          this.user = user
          this.isAuthenticated = true
        } catch (error) {
          this.token = null
          this.user = null
          this.isAuthenticated = false
          localStorage.removeItem('token')
        }
      }
    }
  }
})