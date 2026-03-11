<template>
  <div class="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">用户登录</h2>
    
    <form @submit.prevent="handleLogin" class="space-y-4">
      <!-- 用户名输入 -->
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
        <input 
          id="username" 
          v-model="form.username" 
          type="text" 
          placeholder="请输入用户名" 
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          :class="{ 'border-red-300': errors.username }"
        />
        <p v-if="errors.username" class="mt-1 text-sm text-red-600">{{ errors.username }}</p>
      </div>
      
      <!-- 密码输入 -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
        <input 
          id="password" 
          v-model="form.password" 
          type="password" 
          placeholder="请输入密码" 
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          :class="{ 'border-red-300': errors.password }"
        />
        <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
      </div>
      
      <!-- 记住我 -->
      <div class="flex items-center">
        <input 
          id="remember" 
          v-model="form.remember" 
          type="checkbox" 
          class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label for="remember" class="ml-2 block text-sm text-gray-700">
          记住我
        </label>
      </div>
      
      <!-- 登录按钮 -->
      <button 
        type="submit" 
        class="w-full bg-primary text-white py-2 px-4 rounded hover:bg-pink-600 transition-colors font-medium"
        :disabled="authStore.loading"
      >
        <span v-if="authStore.loading" class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          登录中...
        </span>
        <span v-else>登录</span>
      </button>
      
      <!-- 错误信息 -->
      <div v-if="authStore.error" class="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
        {{ authStore.error }}
      </div>
    </form>
    
    <!-- 其他链接 -->
    <div class="mt-6 text-center">
      <a href="#" class="text-sm text-primary hover:underline">忘记密码?</a>
      <span class="mx-2 text-gray-400">|</span>
      <a href="#" class="text-sm text-primary hover:underline">注册新账号</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuthStore } from '../stores/auth'

// 获取认证状态管理
const authStore = useAuthStore()

// 定义事件
const emit = defineEmits<{
  (e: 'login', user: { username: string; password: string }): void
  (e: 'success', user: any): void
  (e: 'error', message: string): void
}>()

// 表单数据
const form = reactive({
  username: '',
  password: '',
  remember: false
})

// 错误信息
const errors = reactive({
  username: '',
  password: ''
})

// 表单验证
const validateForm = (): boolean => {
  let isValid = true
  
  // 重置错误
  errors.username = ''
  errors.password = ''
  
  // 验证用户名
  if (!form.username.trim()) {
    errors.username = '请输入用户名'
    isValid = false
  }
  
  // 验证密码
  if (!form.password) {
    errors.password = '请输入密码'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = '密码长度至少为6位'
    isValid = false
  }
  
  return isValid
}

// 处理登录
const handleLogin = async () => {
  if (!validateForm()) {
    return
  }
  
  try {
    const success = await authStore.login(form.username, form.password)
    
    if (success) {
      emit('login', { username: form.username, password: form.password })
      emit('success', authStore.user)
      // 可以在这里添加本地存储逻辑
      if (form.remember && authStore.user) {
        localStorage.setItem('user', JSON.stringify(authStore.user))
      }
    } else {
      emit('error', authStore.error || '登录失败')
    }
  } catch (error) {
    emit('error', '登录失败，请稍后重试')
  }
}
</script>

<style scoped>
/* 可以添加额外的本地样式 */
</style>