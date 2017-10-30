<template>
	<div class="search-box fl">
		<input type="text" placeholder="请输入关键字" class="search-input" v-model="search_key">
		<button class="search-button"><i class="el-icon-search"></i></button>
	</div>
</template>

<script>
// import $ from 'jquery'
export default{
  data () {
    return {
      search_key: ''
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.search-box { position: relative; width: 250px; height: 30px; margin: 0 0 0 20px; border: #898989 1px solid; border-radius: 3px; }
input.search-input { padding: 0 5px; width: 190px; height: 30px; background: none; color: #fff; }
.search-button { position: absolute; right: 0; top: 0; width: 50px; height: 30px; background: #ff9c01; border-radius: 0 2px 2px 0; }
.search-button .el-icon-search { color: #fff; font-size: 20px; }
</style>