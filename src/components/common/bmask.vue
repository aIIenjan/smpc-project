<template>
  <div class="maskBar">
      <div class="mask" v-for="(item,index) in alterListData">

      </div>
  </div>
</template>
<script>
    export default {
      props:{
        alterListData:{
          type:Object
        }
      },
        data() {
            return {}
        }
    }
</script>
<style scoped>
  .mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.2);
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
