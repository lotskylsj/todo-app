<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">Vue3 组件示例</h1>
      
      <!-- 导航栏 -->
      <div class="flex justify-between items-center mb-8">
        <router-link 
          to="/dashboard" 
          class="text-primary hover:underline flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          返回仪表盘
        </router-link>
        <button 
          @click="handleLogout"
          class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors font-medium"
        >
          登出
        </button>
      </div>
      
      <div class="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
        <h2 class="text-2xl font-semibold mb-6 text-center">待办事项</h2>
        <TodoList />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import TodoList from '../components/TodoList.vue'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// 处理登出
const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>