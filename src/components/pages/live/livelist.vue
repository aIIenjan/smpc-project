<template>
	<section class="live-wrap clearfix">
		<banner class="clearfix" :bannerData="bannerList"></banner>
		<div class="wrap live-box" id="live-box">
			<div class="reset-arrow">
				<crumb :crumbTxt="crumbTxt.txtList1">
					<div class="sub-menu-bd">
						<router-link tag="span" to="/">返回首页 <i>&gt;&gt;</i></router-link>
					</div>
				</crumb>
			</div>
			<livecon :liveConData="liveConData" :liveConData1="liveConData1"></livecon>
		</div>
	</section>
</template>

<script>
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
			liveConData1: [],
			liveContent: [],
			categoryID: 46,
			bannerList: [],
			page: 0,
			crumbTxt: {
				'txtList1': '直播'
			}
		}
	},
    mounted () {
		this._getliveConData()
		this._getBnnerData()
		this._loadMore()
	},
	created () {
	},
    watch: {
        '$route': '_getliveConData'
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
					page: this.page,
					contentSize: '10'
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
		},
		_loadMore () {
			this.page = 1
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
					page: this.page,
					contentSize: '10'
				}
			})
			.then((res) => {
				if(res.data.status == 0) {
					self.liveConData1 = res.data.data.contents
					// alert(self.liveConData)
					// res.data.data.contents.forEach(function(val, index){
					// 	self.liveConData.push(val)
					// })
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
.live-wrap { padding-bottom: 30px; min-width: 1200px; }
.tabs-box { height: auto; }
.tabs-box .el-tabs__item { float: left; line-height: 33px; height: 33px; font-size: 16px; padding: 0 15px; margin: 0; cursor: pointer; }
.vue-tablist, .vue-tabpanel { overflow: hidden; margin-bottom: 20px; }
.tabs-box .is-active{ color: #ff9c01; }
.tabs-box .el-tabs__active-bar { background: #ff9c01; height: 2px; }
.tabs-box .rank-bd li { margin-bottom: 20px; }
.live-box .live-crumb { margin-top: 10px; }
.sub-menu-bd { position: absolute; top:0; right: 0; font-size: 0; }
.sub-menu-bd span { display: inline-block; vertical-align: middle; padding: 0 15px; border-right: #ddd 1px solid; font-size: 14px; height: 16px; line-height: 16px; cursor: pointer; }
.sub-menu-bd span:last-child { border-right: 0; padding-right: 0; }
.sub-menu-bd .el-icon-arrow-right { font-size: 12px; margin-right: -5px; color: #999; }
.sub-menu-bd span i { font-family: Simsun; }
</style>
