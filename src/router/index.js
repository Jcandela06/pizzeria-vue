import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import User from '@/views/User.vue'
import NewUser from '@/components/User/NewUser.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/users/new',
    name: 'NewUser',
    component: NewUser
  },
  {
    path: '/users/edit/:id',
    name: 'EditarUser',
    component: () => import('@/components/User/EditarUser.vue'),
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
