import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import OrderById from '@/components/OrderById'
import AddOrder from '@/components/AddOrder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/add',
      name: 'AddOrder',
      component: AddOrder
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/:id',
      name: 'orderById',
      component: OrderById,
      props: true
    }
  ]
})
