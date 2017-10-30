<template>
	<div>
		<p>我的页面 wqe</p>
		<span>{{$route.params.id}}</span>
		<router-link to="/page/title">标题</router-link><!-- to写路由绝对路径 -->
		<router-link to="/page/img">图片</router-link>
		<button type="" @click="jump">购物车</button><!-- 编程式路由 -->
		<router-link :to="{name:'cart',params:{userId:123}}">go</router-link><!-- 命名式路由 -->
		<router-view></router-view><!-- 渲染子组件 -->
	</div>
</template>
<script type="text/javascript">
	export default {
		name:'mypage',
		data(){
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		methods:{
			jump(){
				this.$router.push({path:'/cart?id=123'})
			}
		}
	}
</script>