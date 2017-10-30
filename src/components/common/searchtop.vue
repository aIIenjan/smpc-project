<template>
	<div class="search-top">
    <div class="wrap">
      <i class="el-icon-arrow-left" @click="goBack"></i>
      <input placeholder="输入关键字" v-model="key_word" class="search-text" @keyup="key_word=key_word.replace(/\s/g,'')" @keyup.enter="clickListen(key_word)">
      <button class="search-btn" @click="clickListen(key_word)"><i class="el-icon-search"></i></button>
    </div>
	</div>
</template>

<script>
import $ from 'jquery'
export default{
  data () {
    return {
      key_word: ''
    }
  },
  methods: {
    clickListen (val) {
      if(!$.trim(val)) {
        // alert('请输入搜索关键字！')
        this.$confirm('请输入搜索关键字！', '错误提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          val = $.trim(val);
        }).catch(() => {

        })
      }else {
        this.$emit('searchKeyListen', val)
      }
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.el-icon-arrow-left { position: absolute; left: 0; top: 0; color: #999; font-size: 24px; line-height: 55px; cursor: pointer; }
.search-top { height: 55px; /*position: fixed; top: 0; left: 0;*/ width: 100%; /*background: #333;*/ z-index: 10; }
.search-text { float: left; border: #ddd 1px solid; width: 300px; margin: 8px 0 0 50px; height: 35px; padding: 0 8px; border-radius: 5px 0 0 5px; background: rgba(255,255,255,.1); color: #333; }
.search-btn { width: 70px; border-radius: 0 5px 5px 0; background: #ff9c01; height: 37px; float: left; margin: 8px 0 0 -1px; }
.el-icon-search { color: #fff; font-size: 26px; }
</style>