import Vue from 'vue'
import Router from 'vue-router'
import goodlists from '@/views/goodlists'
import cart from '@/views/cart'
import address from '@/views/address'
import addAddress from '@/views/addAddress'
import orderConfirm from '@/views/orderConfirm'
import orderSuccess from '@/views/orderSuccess'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'goodlists',
      component: goodlists
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/address',
      name: 'address',
      component: address
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: addAddress
    },
     {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: orderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: orderSuccess
    },
  ]
})
