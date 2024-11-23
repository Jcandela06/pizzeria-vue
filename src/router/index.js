import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import User from '@/views/User.vue'
import NewUser from '@/components/User/NewUser.vue'
import Clients from '@/views/Clients.vue'
import NewClients from '@/components/Clients/NewClients.vue'
import EditClients from '@/components/Clients/EditClients.vue'

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
  {
    path: '/clients',
    name: 'Clients',
    component: Clients
  },
  {
    path: '/clients/new',
    name: 'NewClients',
    component: NewClients,
  },
  {
    path: '/clients/edit/:id',
    name: 'EditClients',
    component: EditClients,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
