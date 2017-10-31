<template>
	<section class="live-wrap clearfix" id="live-wrap">
		<banner class="clearfix" :bannerData="bannerList"></banner>
		<div class="wrap live-box" id="live-box">
			<crumb :crumbTxt="crumbTxt.txtList1">
				<submenu :subList="liveSubList" @showCategoryID="showCategoryID"></submenu>
			</crumb>
			<livecon :liveConData="liveContent"></livecon>
		</div>
	</section>
</template>

<script>
import $ from 'jquery'
// banner
import banner from 'components/common/bannerlive'
// 面包title
import crumb from 'components/common/crumb'
// 关联菜单
import submenu from 'components/common/submenu'
// 排行
import livecon from 'components/common/livecon'

export default {
	components: {
	    banner,
	    crumb,
	    submenu,
	    livecon
	},
	data () {
		return {
			active: false,
			activeName: 'second',
			liveTabData: [],
			liveConData: [],
			liveContent: [],
			liveSubList: [],
			categoryID: 46,
			bannerList: [],
			crumbTxt: {
				'txtList1': '直播'
			}
		}
	},
    mounted () {
		this._getliveTabData()
		this._getliveConData()
		this._getBnnerData()
		this._getLiveContentInfo()
	},
    watch: {
        // '$route': '_getliveConData'
    },
	methods: {
	    _getBnnerData () {
	      var self = this
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
		_getliveTabData () {
			var self = this;
			self.$http({
				method: 'post',
				url: '/api/PortalServer-App/new/ptl_ipvp_live_live003',
				params: {
					ptype: self.GLOBAL.config.ptype,
					plocation: self.GLOBAL.config.plocation,
					puser: '',
					pserverAddress: self.GLOBAL.config.pserverAddress
				}
			})
			//this.$http.post('/api/PortalServer-App/new/ptl_ipvp_vod_vod011', paramPointList)
			.then((res) => {
        		if(res.data.status == 0) {
					self.liveTabData = res.data.data.liveCategoryList
					//alert(self.liveTabData)
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
                self.liveContent = value.contents
                // alert(self.liveContent)
              }
            })
          }
        })
        .catch((res) => {
          alert(res.data.errorMessage)
        })
      },
		_getliveConData () {
			var self = this
			// alert(self.categoryID)
			self.$http({
				method: 'post',
				url: '/banner/RSWeb/gd/getCardContents',
				params: {
					ptype: self.GLOBAL.config.ptype,
					plocation: self.GLOBAL.config.plocation,
					puser: '',
					pserverAddress: self.GLOBAL.config.pserverAddress,
					cardID: self.$route.params.id,
					page: 0,
					contentSize: '100'
				}
			})
			.then((res) => {
        		if(res.data.status == 0) {
					self.liveConData = res.data.data.contents
					// alert(self.liveConData)
				}
			})
			.catch((res) => {
				alert(res.data.errorMessage)
			})
		},
		showCategoryID (val) {
			this.categoryID = val
			this._getliveConData()
		}
	}
}
</script>

<style scoped>
.live-wrap { padding-bottom: 30px; min-width: 1200px; }
.reset-arrow .crumb-bd .icon-enter-arror { display: none; }
.tabs-box { height: auto; }
.tabs-box .el-tabs__item { float: left; line-height: 33px; height: 33px; font-size: 16px; padding: 0 15px; margin: 0; cursor: pointer; }
.vue-tablist, .vue-tabpanel { overflow: hidden; margin-bottom: 20px; }
.tabs-box .is-active{ color: #ff9c01; }
.tabs-box .el-tabs__active-bar { background: #ff9c01; height: 2px; }
.tabs-box .rank-bd li { margin-bottom: 20px; }
.live-box .live-crumb { margin-top: 10px; }
</style>
