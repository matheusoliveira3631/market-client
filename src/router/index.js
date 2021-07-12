import * as VueRouter from 'vue-router';

import Home from '../views/Home'
import Admin from '@/views/Admin'


const routes = [
  {name:'home', path: '/', component:Home },
  {name:"admin",path:'/admin', component:Admin}
]

const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHistory(),
})

export default router

