<template>
	<div>
		<p>购物车页面</p>
		<p>{{$route.query.id}}</p>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:'cart',
		data(){
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		}
	}
</script>