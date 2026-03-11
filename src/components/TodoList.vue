<template>
  <div class="todo-container w-full">
    <div class="add-todo mb-6">
      <div class="flex flex-wrap gap-3 items-center">
        <input
          v-model="newTodo"
          @keyup.enter="addTodo"
          type="text"
          placeholder="添加新待办事项..."
          class="flex-1 min-w-[200px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
        />
        <select
          v-model="newTodoPriority"
          class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all min-w-[120px]"
        >
          <option value="high">高优先级</option>
          <option value="medium">中优先级</option>
          <option value="low">低优先级</option>
        </select>
        <button
          @click="addTodo"
          class="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center whitespace-nowrap"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
         添加
        </button>
      </div>
    </div>
    <!-- tab页 -->
    <div class="todo-tabs flex gap-4 mb-6">
      <button
        v-for="t in tabs"
        :key="t.key"
        @click="handleTabClick(t.key)"
        :class="tabClass(t.key)"
      >
        {{ t.label }} {{ t.getCount() }}
      </button>
    </div>
    <!-- 待办列表 -->
    <div class="todo-list space-y-3 mb-6">
      <div
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="todo-item bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-all"
      >
        <div class="flex items-center gap-3">
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(todo.id)"
            class="w-5 h-5 text-red-500 focus:ring-red-400 rounded transition-all cursor-pointer"
          />
          <div class="flex-1 min-w-0">
            <input
              v-model="todo.text"
              v-if="isEditing && todo.id === editingTodoId"
              @keyup.enter="saveTodo(todo.id)"
              @blur="saveTodo(todo.id)"
              type="text"
              class="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
            />
            <p v-else :class="todo.completed ? 'line-through text-gray-500' : 'text-gray-800 font-medium'" 
               class="transition-all truncate"
               @dblclick="editTodo(todo.id)"
            >
              {{ todo.text }}
            </p>
          </div>
          <div class="priority-badge" :class="`priority-${todo.priority}`">
            {{ todo.priority === 'high' ? '高' : todo.priority === 'medium' ? '中' : '低' }}
          </div>
          <button @click="deleteTodo(todo.id)" class="px-2 py-1 text-gray-500 hover:text-red-500 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- 空状态 -->
    <div v-if="todos.length === 0" class="empty-state text-center py-12 px-4">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-600 mb-2">暂无待办事项</h3>
      <p class="text-gray-500">添加一个新的待办事项开始管理你的任务</p>
    </div>
    <!-- 1. 底部显示“已完成 x/y” 或一个简单的进度条
        2.与清除按钮增加margin-bottom:10px间距
        3.显示在右侧
        4.新增一个好看的进度条显示100%的完成进度
        5.当没有待办事项时 进度条不显示 已完成也不显示
    -->
      <div v-if="todos.length > 0" class="todo-progress-container bg-gray-200 rounded-full h-2.5 w-full">
        <div
          class="todo-progress-bar bg-green-500 h-2.5 rounded-full"
          :style="{ width: `${(completedCount / todos.length) * 100}%` }"
        ></div>
      </div>
     <div v-if="todos.length > 0" class="todo-progress text-sm text-gray-500 mb-4 text-right">
      已完成 {{ completedCount }}/{{ todos.length }}
    </div>
    <!-- 清除操作 -->
    <div v-if="todos.length > 0" class="clear-actions flex gap-3">
      <button
        v-if="completedCount > 0"
        @click="clearCompleted"
        class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
      >
        清除已完成
      </button>
      <button
        @click="clearAll"
        class="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium text-sm"
      >
        清空全部
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// 定义待办事项接口
// 新增priority属性 用于设置待办事项的优先级 可选值为high、medium、low
interface Todo {
  id: number
  text: string
  completed: boolean
  priority: string // 新增优先级属性 可选值为high、medium、low  
  createdTime: number // 新增创建时间属性 用于排序
}

// 定义存储键
const STORAGE_KEY = 'vue-todo-list'
// 定义编辑状态
const isEditing = ref(false)
const editingTodoId = ref<number | null>(null)
// 定义tab状态
const tab = ref('all')
const todos = ref<Todo[]>([])
const newTodo = ref('')
// 定义tab项
const tabs = [
  { 
    key: 'all', 
    label: '全部', 
    baseClass: 'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
    activeClass: 'bg-gray-100 text-gray-700',
    hoverClass: 'text-gray-700 hover:bg-gray-100',
    getCount: () => todos.value.length
  },
  { 
    key: 'completed', 
    label: '已完成', 
    baseClass: 'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
    activeClass: 'bg-green-100 text-green-700',
    hoverClass: 'text-green-700 hover:bg-green-100',
    getCount: () => completedCount.value
  },
  { 
    key: 'uncompleted', 
    label: '未完成', 
    baseClass: 'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
    activeClass: 'bg-yellow-100 text-yellow-700',
    hoverClass: 'text-yellow-700 hover:bg-yellow-100',
    getCount: () => uncompletedCount.value
  }
]
// 定义新增待办事项的优先级
const newTodoPriority = ref('medium')
// 定义过滤后的待办事项
// 1.根据创建时间倒序排序
const filteredTodos = computed(() => {
  if (tab.value === 'all') return todos.value.sort((a, b) => b.createdTime - a.createdTime)
  return todos.value.filter(t => t.completed === (tab.value === 'completed')).sort((a, b) => b.createdTime - a.createdTime)
})
// 定义已完成待办事项数量
const completedCount = computed(() => todos.value.filter(t => t.completed).length)
// 定义未完成待办事项数量
const uncompletedCount = computed(() => todos.value.filter(t => !t.completed).length)
// 定义加载待办事项
const loadTodos = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      todos.value = JSON.parse(stored)
    } catch {
      todos.value = []
    }
  }
}
// 定义保存待办事项
const saveTodos = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
}
// 定义添加待办事项
const addTodo = () => {
  const text = newTodo.value.trim()
  if (!text) return
  todos.value.push({ id: Date.now(), text, completed: false, priority: newTodoPriority.value, createdTime: Date.now() })
  newTodo.value = ''
  // 重置编辑状态
  isEditing.value = false
  saveTodos()
}
// 定义切换待办事项状态
const toggleTodo = (id: number) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
    saveTodos()
  }
}
// 定义删除待办事项
const deleteTodo = (id: number) => {
  todos.value = todos.value.filter(t => t.id !== id)
  saveTodos()
}
// 定义清除已完成待办事项
const clearCompleted = () => {
  todos.value = todos.value.filter(t => !t.completed)
  saveTodos()
}
// 定义清空全部待办事项 
const clearAll = () => {
  if (confirm('确定要清空所有待办事项吗？')) {
    todos.value = []
    saveTodos()
  }
}
// 定义切换tab项
const switchTab = (key: string) => {
  tab.value = key
}
// 定义tab项点击事件
const handleTabClick = (key: string) => {
  switchTab(key)
}
// 定义tab项类名
const tabClass = (key: string) => {
  const tabItem = tabs.find(t => t.key === key)
  if (!tabItem) return ''
  return `${tabItem.baseClass} ${tab.value === key ? tabItem.activeClass : tabItem.hoverClass}`
}
// 定义编辑待办事项
const editTodo = (id: number) => {
  const todo = todos.value.find(t => t.id === id)
  // 设置当前编辑的待办事项ID
  editingTodoId.value = id
  // 切换编辑状态
  isEditing.value = true
  // 如果找到待办事项 则设置新的待办事项文本和优先级
  if (todo) {
    todo.text = todo.text.trim()
    todo.priority = todo.priority.trim()
  }
}
// 定义编辑保存待办事项
const saveTodo = (id: number) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.text = todo.text.trim()
    todo.priority = todo.priority.trim()
    // 重置编辑状态
    isEditing.value = false
    editingTodoId.value = null
    saveTodos()
  }
}



loadTodos()
</script>

<style scoped>
.todo-container { width: 100%; }

/* 响应式布局调整 */
@media (max-width: 640px) {
  .add-todo {
    flex-direction: column;
  }
  
  .add-todo select {
    width: 100%;
  }
  
  .add-todo button {
    width: 100%;
    justify-content: center;
  }
  
  .todo-tabs {
    flex-wrap: wrap;
  }
  
  .todo-tabs button {
    flex: 1;
    min-width: 80px;
  }
}

/* 优先级标签样式 */
.priority-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  transition: all 0.2s ease;
}

.priority-high {
  background-color: #ef4444;
}

.priority-medium {
  background-color: #f59e0b;
}

.priority-low {
  background-color: #10b981;
}
</style>
