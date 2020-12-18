import Vue from 'vue'
import VueRouter from 'vue-router'
import { AuthGuard } from '@/auth/AuthGuard';

Vue.use(VueRouter)

const routes = [
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
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/Welcome.vue'),
        meta: {
            requiredPermissions: [],
            navbar: false
        },
    },
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
