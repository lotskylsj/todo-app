<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">Vue3 组件示例</h1>
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4 text-center">用户登录</h2>
        <LoginForm @success="handleLoginSuccess" @error="handleLoginError" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'

const router = useRouter()

// 处理登录成功
const handleLoginSuccess = (user: any) => {
  console.log('登录成功:', user)
  router.push('/dashboard')
}

// 处理登录错误
const handleLoginError = (message: string) => {
  console.log('登录错误:', message)
}
</script>