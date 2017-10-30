<template>
  <section class="index-wrap">
    <banner class="clearfix" :bannerData="bannerList"></banner>
    <div class="wrap">
      <crumb :crumbTxt="crumbTxt.txtList2">
        <submenu :subList="liveSubList" @showCategoryID="showCategoryID"></submenu>
      </crumb>
      <piclist :ContentInfo="liveContent"></piclist>
      <crumb :crumbTxt="crumbTxt.txtList1">
        <submenupoint :subList="pointSubList" @showCategoryID="showCategoryID"></submenupoint>
      </crumb>
      <piclistpoint :ContentInfo="pointContent" @showMoreID="showMoreID"></piclistpoint>
    </div>
  </section>
</template>

<script>
import Vuex from 'vuex'
import $ from 'jquery'
// banner
import banner from 'components/common/bannerlive'
// 面包title
import crumb from 'components/common/crumb'
// 图文组件
import piclist from 'components/common/piclist'
import piclistpoint from 'components/common/piclistpoint'
// 关联菜单
import submenu from 'components/common/submenu'
import submenupoint from 'components/common/submenupoint'

export default {
  components: {
    banner,
    crumb,
    piclist,
    piclistpoint,
    submenu,
    submenupoint
  },
  data () {
    return {
      bannerList: [],
      crumbTxt: {
        'txtList1': '点播',
        'txtList2': '直播'
      },
      pointSubList: [],
      liveSubList:[],
      liveContent: [],
      pointContent: [],
      nameData:'',
      flag: false
    }
  },
  mounted () {
    this._getBnnerData()
    this._getLiveContentInfo()
    this._getPointContentInfo()
    // this._getMode ()
    // alert(this.dateCompa('201710241610','201710241409'))
    // alert(this.dateCompa('201710241610','201710241409'))
    // alert(percentNum(this.dateCompa1('201710241409'),this.dateCompa('201710241610','201710241409')))
    // alert(percentNum(2,3))
  },
  methods: {
      showCategoryID (val) {
        this.categoryID = val
      },
      showMoreID (val) {
        this.showMoreID = val
      },
      _getBnnerData () {
        let self = this
        self.$http({
          method: 'post',
          url: '/banner/RSWeb/gd/getContentListByColumnID',
          params: {
            ptype: self.GLOBAL.config.ptype,
            plocation: self.GLOBAL.config.plocation,
            puser: '',
            pserverAddress: self.GLOBAL.config.pserverAddress,
            columnID: '003',
            count: '6'
          }
        })
        .then((res) => {
          if(res.data.status == 0) {
            self.bannerList = res.data.data.contentInfos
            // alert(self.bannerList)
          }
        })
        .catch((res) => {
          alert(res.data.errorMessage)
        })
      },
      _getLiveContentInfo () {
        var self = this
        self.$http({
          method: 'post',
          url: '/banner/RSWeb/gd/getCards',
          params: {
            ptype: self.GLOBAL.config.ptype,
            plocation: self.GLOBAL.config.plocation,
            puser: '',
            page: 0,
            pserverAddress: self.GLOBAL.config.pserverAddress,
            parentID: '003'
          }
        })
        .then((res) => {
          if(res.data.status == 0) {
            const dataCard = res.data.data.cards
            dataCard.forEach(function (value, key) {
              if(value.type === 'category') {
                self.liveSubList = value.contents
              }
              if(value.type === 'live') {
                self.liveContent = value.contents.slice(0,7)
              }
            })
          }
        })
        .catch((res) => {
          alert(res.data.errorMessage)
        })
      },
      _getPointContentInfo () {
        var self = this
        self.$http({
          method: 'post',
          url: '/banner/RSWeb/gd/getCards',
          params: {
            ptype: self.GLOBAL.config.ptype,
            plocation: self.GLOBAL.config.plocation,
            puser: '',
            page: 0,
            pserverAddress: self.GLOBAL.config.pserverAddress,
            parentID: '002'
          }
        })
        .then((res) => {
          if(res.data.status == 0) {
            const dataCard = res.data.data.cards
            dataCard.forEach(function (value, key) {
              if(value.type === 'category') {
                self.pointSubList = value.contents
              }
              if(value.type === 'vod') {
                self.pointContent.push(value)
              }
            })
          }
        })
        .catch((res) => {
          alert(res.data.errorMessage)
        })
      }
  }
}
</script>

<style scoped>
.index-wrap { padding-bottom: 30px; min-width: 1200px; }
</style>
