import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import mypage from '@/views/mypage'
import Title from '@/views/title'
import Image from '@/views/img'
import Cart from '@/views/cart'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/page',
      name: 'mypage',
      // components:{
      //   // default:mypage,默认加载组件
      //   // title:Title,key对应命名视图的name值 value对应组件名
      //   image:Image
      // },
      path: '/page',
      name: 'mypage',
      component:mypage,
      children:[{//子路由
      	path:'title',
      	name:'title',
      	component:Title
      },
      {
      	path:'img',
      	name:'image',
      	component:Image
      }
      ]
    },
    {
     path: '/cart',
      name: 'cart',
      component: Cart,	
    }
  ]
});
