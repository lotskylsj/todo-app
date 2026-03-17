import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/LoginView.vue'),
            meta: { requiresAuth: false }
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import('../views/DashboardView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/counter',
            name: 'Counter',
            component: () => import('../views/CounterView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/input-adder',
            name: 'InputAdder',
            component: () => import('../views/InputAdderView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/user-info',
            name: 'UserInfo',
            component: () => import('../views/UserInfoView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/todo',
            name: 'Todo',
            component: () => import('../views/TodoView.vue'),
            meta: { requiresAuth: true }
        }
    ]
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()
    const requiresAuth = to.meta.requiresAuth

    // 初始化认证状态
    if (!authStore.isAuthenticated && authStore.token) {
        await authStore.initAuth()
    }

    // 如果需要认证且用户未登录，重定向到登录页面
    if (requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'Login' })
    } else {
        next()
    }
})

export default router