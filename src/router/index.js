import { createRouter, createWebHistory } from 'vue-router'

import NewTaskFormAndTasksList from '../components/NewTaskFormAndTasksList.vue'
import TaskEditor from '../components/TaskEditor.vue'

const routes = [
  {
    path: '/',
    name: 'newTaskFormAndTasksList',
    component: NewTaskFormAndTasksList
  },
  {
    path: '/editTask',
    name: 'TaskEditor',
    component: TaskEditor
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
