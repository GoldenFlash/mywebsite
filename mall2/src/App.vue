<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/><!-- 渲染首页组件 -->
   <!-- <router-view name="title"></router-view> --><!-- 命名视图 -->
   <!-- <router-view name="img"></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
