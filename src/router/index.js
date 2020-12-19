import Vue from 'vue'
import VueRouter from 'vue-router'
import { AuthGuard } from '@/auth/AuthGuard';

Vue.use(VueRouter)

const routes = [
    // Auth Routes -----------------------------------------------------------------------------------------------------
    {
        path: '/login',
        name: 'login',
        meta: {
            navbar: false
        }
    },
    {
        path: '/logout',
        name: 'logout',
        meta: {
            navbar: false
        }
    },
    {
        path: '/authorized',
        name: 'authorized',
        meta: {
            navbar: false
        }
    },
    // General Routes --------------------------------------------------------------------------------------------------
    {
        path: '/',
        name: 'dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: {
            requiredPermissions: []
        },
    },
    {
        path: '/account',
        name: 'account',
        component: () => import('../views/Account.vue'),
        meta: {
            requiredPermissions: []
        },
    },
    {
        path: '/budget',
        name: 'budget',
        component: () => import('../views/Budget.vue'),
        meta: {
            requiredPermissions: []
        },
    },
    {
        path: '/goals',
        name: 'goals',
        component: () => import('../views/Goals.vue'),
        meta: {
            requiredPermissions: []
        },
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/Welcome.vue'),
        meta: {
            requiredPermissions: [],
            navbar: false
        },
    },
    // Catch-all Route -------------------------------------------------------------------------------------------------
    {
        path: '*',
        redirect: 'dashboard',
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(AuthGuard)

export default router
