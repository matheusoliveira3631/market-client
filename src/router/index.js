import * as VueRouter from 'vue-router';

import Home from '../views/Home'
import Admin from '@/views/Admin'
import store from '@/store'

const routes = [
  {name:'home', path: '/', component:Home },
  {
      name:"admin",
      path:'/admin', 
      component:Admin,
      beforeEnter: (to, from, next) => {
                if(store.state.authenticated == false) {
                    next({name:'home'});
                } else {
                    next();
                }
            }
}
]

const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHistory(),
})

export default router

