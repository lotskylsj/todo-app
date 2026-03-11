<template>
  <div class="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
    <h2 class="text-xl font-semibold mb-4">数值加法器</h2>
    
    <div class="flex flex-col gap-3 mb-4">
      <div class="flex gap-2 flex-wrap">
        <input 
          v-model.number="firstNumber" 
          type="number" 
          placeholder="输入数字1" 
          class="border border-gray-300 rounded px-3 py-2 flex-1 min-w-[100px]"
        />
        <span class="flex items-center text-gray-500">+</span>
        <input 
          v-model.number="secondNumber" 
          type="number" 
          placeholder="输入数字2" 
          class="border border-gray-300 rounded px-3 py-2 flex-1 min-w-[100px]"
        />
      </div>
      <div class="text-lg font-medium text-center text-gray-700">
        结果: {{ totalSum }}
      </div>
    </div>
    <div class="flex flex-col gap-3 mb-4">
      <div class="flex gap-2 flex-wrap">
        <input 
          v-model.number="thirdNumber" 
          type="number" 
          placeholder="输入数字3" 
          class="border border-gray-300 rounded px-3 py-2 flex-1 min-w-[100px]"
        />
        <span class="flex items-center text-gray-500">-</span>
        <input 
          v-model.number="fourthNumber" 
          type="number" 
          placeholder="输入数字4" 
          class="border border-gray-300 rounded px-3 py-2 flex-1 min-w-[100px]"
        />
      </div>
      <div class="text-lg font-medium text-center text-gray-700">
        结果: {{ totalSubtract }}
      </div>
    </div>
    
    <button 
      @click="emitSum" 
      class="bg-primary text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors w-full sm:w-auto sm:self-start"
    >
      发送结果
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 定义事件
const emit = defineEmits<{
  (e: 'sum', value: number): void
}>()

// 用户输入值
const firstNumber = ref<number>(0)
const secondNumber = ref<number>(0)
const thirdNumber = ref<number>(0)
const fourthNumber = ref<number>(0)

// 计算和
const totalSum = computed(() => {
  return firstNumber.value + secondNumber.value
})

// 计算减法结果
const totalSubtract = computed(() => {
  // 当减数小于被减数时，结果显示不能相减
  // 当减数大于等于被减数时，正常计算减法结果
  // 当减数小于被减数时，显示"不能相减"
  return thirdNumber.value >= fourthNumber.value ? thirdNumber.value - fourthNumber.value : "不能相减"
})



// 发送结果
const emitSum = () => {
  emit('sum', totalSum.value)
}
</script>

<style scoped>
/* 可以添加额外的本地样式 */
</style>