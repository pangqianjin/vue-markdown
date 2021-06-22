<template>
  <el-container>
    <el-header><MyHeader/></el-header>
    <el-main><MyMain/></el-main>
</el-container>
</template>

<script>
import MyHeader from './components/MyHeader.vue'
import MyMain from './components/MyMain.vue'

export default {
  name: 'app',
  components: {
    MyHeader,
    MyMain
  }
}
</script>

<style>
</style>
