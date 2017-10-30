<template>
  <div id="app">
    <div v-wechat-title="$route.meta.title"></div>
    <m-header :navData="navData"></m-header>
    <transition :name="transitionName">
      <router-view class="transition-view"></router-view>  
    </transition>
    <m-footer></m-footer>
  </div>
</template>

<script>
// 头部组件
import header from 'components/common/header'
import footer from 'components/common/footer'
export default {
  components: {
    'm-header': header,
    'm-footer': footer
  },
  data () {
    return {
      navData: [],
      transitionName: 'slide-left'
    }
  },
  mounted () {
    this._getNavData()
  },
  created () {
    // this.recordEnter()
  },
  methods: {
    _getNavData () {
      this.$http({
        method: 'post',
        url: '/api/PortalServer-App/new/ptl_ipvp_vod_vod008',
        params: {
          ptype: this.GLOBAL.config.ptype,
          plocation: this.GLOBAL.config.plocation,
          puser: '',
          pserverAddress: this.GLOBAL.config.pserverAddress
        }
      })
      .then((res) => {
        if(res.data.status == 0) {
          // alert(1)
          const navData = res.data.data.columns
          this.navData = navData
        }
      })
      .catch((res) => {
      })
    }
  },
  watch: {
    '$route' (to, from) {  
      if(to.path == '/'){  
        this.transitionName = 'slide-right'
      }else {  
        this.transitionName = 'slide-left' 
      }
    }
  }
}
</script>

<style>
.transition-view { position: relative; height: 100%; transition: all .3s cubic-bezier(.55,0,.1,1); }  
.slide-left-enter, .slide-right-leave-active { opacity: 1; -webkit-transform: translate(100%, 0); transform: translate(100%, 0); }  
.slide-left-leave-active, .slide-right-enter { opacity: 0; -webkit-transform: translate(-100%, 0); transform: translate(-100%, 0); }  
</style>
