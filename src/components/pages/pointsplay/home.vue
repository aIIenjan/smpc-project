<template>
	<section class="live-wrap clearfix" id="live-wrap">
		<banner class="clearfix" :bannerData="bannerList"></banner>
		<div class="wrap live-box">
			<crumb :crumbTxt="crumbTxt.txtList1">
				<submenupoint :subList="pointSubList" @showCategoryID="showCategoryID"></submenupoint>
			</crumb>
			<piclistpoint :ContentInfo="pointContent" @showMoreID="showMoreID"></piclistpoint>
		</div>
	</section>
</template>

<script>
import $ from 'jquery'
// banner
import banner from 'components/common/banner'
// 面包title
import crumb from 'components/common/crumb'
// 图文组件
import piclistpoint from 'components/common/piclistpoint'
// 关联菜单
import submenupoint from 'components/common/submenupoint'

export default {
	components: {
    	banner,
	    crumb,
	    piclistpoint,
	    submenupoint
	},
	data () {
		return {
			pointData: [],
			currentPage: 1,
			categoryID: '',
			currentSizeChange: 24,
			pointSubList: [],
			pointContent: [],
			liveSubList: [],
			bannerList: [],
			crumbTxt: {
				'txtList1': '点播'
			},
		}
	},
    mounted () {
		this._getPointData()
		this._getBnnerData()
		$(document).on('click', '.selected-classic', function() {
			$(this).remove()
		})
		$('.el-pager li').on('click', function(index) {
			$(this).dblclick()
		})
		this._getPointContentInfo()
    },
    watch: {
        '$route': '_getPointData'
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
	          // pserverAddress: self.GLOBAL.config.pserverAddress,
	          columnID: '002',
	          count: '6'
	        }
	      })
	      //this.$http.post('/api/PortalServer-App/new/ptl_ipvp_vod_vod011', paramPointList)
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
		_getPointData () {
			var self = this
			// alert(self.categoryID)
			self.$http({
				method: 'post',
				url: '/api/PortalServer-App/new/ptl_ipvp_vod_vod011',
				params: {
					ptype: self.GLOBAL.config.ptype,
					plocation: self.GLOBAL.config.plocation,
					puser: '',
					pserverAddress: self.GLOBAL.config.pserverAddress,
					// pserialNumber: '866769027850901',
					columnID: 0? '' : self.$route.params.id,
					categoryID: self.categoryID,
					start: (self.currentPage-1) * self.currentSizeChange,
					end: (self.currentPage) * self.currentSizeChange,
					sortType: 0
				}
			})
			//this.$http.post('/api/PortalServer-App/new/ptl_ipvp_vod_vod011', paramPointList)
			.then((res) => {
        		if(res.data.status == 0) {
					const pointData = res.data.data
					const count = res.data.data.count
					self.pointData = pointData
					self.count = count
					//alert(this.pointData[0].imageUrl[0]['74d9a882ebf54afe989243fd4bc939e4'])
				}
			})
			.catch((res) => {
				alert(res.data.errorMessage)
			})
		},
		showCurrentPage (val) {
			this.currentPage = val
			// alert(this.currentPage)
		},
		showCurrentSizeChange (val) {
			this.currentSizeChange = val
		},
		showCategoryID (val) {
			this.categoryID = val
			// alert(this.categoryID)
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
      },
      showCategoryID (val) {
        this.categoryID = val
      },
      showMoreID (val) {
        this.showMoreID = val
      },
	}
}
</script>

<style scoped>
.live-wrap { padding-bottom: 30px; min-width: 1200px; }
.reset-arrow .crumb-bd .icon-enter-arror { display: none; }
.tabs-box { height: auto; }
.tabs-box .vue-tablist { border-bottom: 1px #e1e1e1 solid; height: 34px; font-size: 16px; margin-bottom: 20px; overflow: hidden; }
.tabs-box .vue-tablist li { float: left; line-height: 33px; padding: 0 15px; margin: 0 10px 0 0; cursor: pointer; }
.vue-tablist, .vue-tabpanel { overflow: hidden; margin-bottom: 20px; }
.tabs-box .vue-tablist li[aria-selected=true] { border-bottom: #ff9c01 2px solid; color: #ff9c01; }
.tabs-box .rank-bd li { margin-bottom: 20px; }
.live-box .live-crumb { margin-top: 10px; }
</style>
