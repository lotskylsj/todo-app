<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">仪表盘</h1>
      
      <!-- 导航栏 -->
      <div class="flex justify-between items-center mb-8">
        <div class="text-lg font-medium text-gray-700">
          欢迎，{{ authStore.user?.name }}
        </div>
        <button 
          @click="handleLogout"
          class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors font-medium"
        >
          登出
        </button>
      </div>
      
      <!-- 模块入口卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 计数器模块 -->
        <router-link to="/counter" class="block">
          <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-blue-500">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xl font-semibold text-gray-800">计数器</h3>
                <p class="text-gray-600 mt-2">基本的计数器功能，支持增减操作</p>
              </div>
              <div class="bg-blue-100 p-3 rounded-full">
                <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
            </div>
          </div>
        </router-link>
        
        <!-- 数值加法器模块 -->
        <router-link to="/input-adder" class="block">
          <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-green-500">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xl font-semibold text-gray-800">数值加法器</h3>
                <p class="text-gray-600 mt-2">输入两个数值并计算它们的和</p>
              </div>
              <div class="bg-green-100 p-3 rounded-full">
                <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </router-link>
        
        <!-- 用户信息模块 -->
        <router-link to="/user-info" class="block">
          <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-orange-500">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xl font-semibold text-gray-800">用户信息</h3>
                <p class="text-gray-600 mt-2">查看当前登录用户的详细信息</p>
              </div>
              <div class="bg-orange-100 p-3 rounded-full">
                <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </div>
          </div>
        </router-link>
        
        <!-- 待办事项模块 -->
        <router-link to="/todo" class="block">
          <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-red-500">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xl font-semibold text-gray-800">待办事项</h3>
                <p class="text-gray-600 mt-2">管理个人待办任务</p>
              </div>
              <div class="relative">
                <div class="bg-red-100 p-3 rounded-full">
                  <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                <div v-if="todoCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {{ todoCount }}
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const todoCount = ref(0)

// 读取待办事项数量
const loadTodoCount = () => {
  const stored = localStorage.getItem('vue-todo-list')
  if (stored) {
    try {
      const todos = JSON.parse(stored)
      // 计算未完成的待办事项数量
      todoCount.value = todos.filter((t: any) => !t.completed).length
    } catch {
      todoCount.value = 0
    }
  }
}

onMounted(() => {
  loadTodoCount()
})

// 处理登出
const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>