<template>
  <div class="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
    <h1 class="text-2xl font-bold text-center text-gray-800 mb-8">Vue3 计数器</h1>
    
    <!-- 计数器显示 -->
    <div class="text-6xl font-light text-center text-gray-900 mb-8">
      {{ count }}
    </div>
    
    <!-- 控制按钮 -->
    <div class="flex justify-center gap-4 mb-8">
      <button 
        @click="decrement" 
        class="w-12 h-12 rounded-full border border-gray-300 bg-white text-gray-600 text-xl flex items-center justify-center hover:bg-red-50 hover:border-red-300 hover:text-red-500 transition-all duration-200"
      >−</button>
      <button 
        @click="reset" 
        class="w-12 h-12 rounded-full border border-gray-300 bg-white text-gray-600 text-xl flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 hover:text-blue-500 transition-all duration-200"
      >↺</button>
      <button 
        @click="increment" 
        class="w-12 h-12 rounded-full border border-gray-300 bg-white text-gray-600 text-xl flex items-center justify-center hover:bg-green-50 hover:border-green-300 hover:text-green-500 transition-all duration-200"
      >+</button>
    </div>
    
    <!-- 计数信息 -->
    <div class="text-center text-gray-600">
      <p>当前计数: {{ count }}</p>
      <p class="mt-2">累计操作: {{ operations }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 定义属性和事件
const props = defineProps<{
  initialCount?: number
}>()

const emit = defineEmits<{
  (e: 'update:count', value: number): void
}>()

// 计数器状态
const count = ref<number>(props.initialCount || 0)
// 操作次数
const operations = ref<number>(0)

// 增加计数
const increment = () => {
  count.value++
  operations.value++
  emit('update:count', count.value)
}

// 减少计数
const decrement = () => {
  if (count.value > 0) {
    count.value--
    operations.value++
    emit('update:count', count.value)
  }
}

// 重置计数
const reset = () => {
  count.value = 0
  operations.value++
  emit('update:count', count.value)
}

// 外部添加值
const addValue = (value: number) => {
  if (value > 0) {
    count.value += value
    operations.value++
    emit('update:count', count.value)
  }
}

// 暴露方法
defineExpose({
  addValue
})
</script>

<style scoped>
/* 可以添加额外的本地样式 */
</style>