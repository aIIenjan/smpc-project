<template>
	<section class="livedetail-wrap clearfix">
		<player class="live-player">
			<jujilist :getDay="getDay" :detailData="detailData" @dateData="dateData" @showPlayeUrl="playUrl"></jujilist>
		</player>
		<div class="wrap clearfix">
			<div class="episodes-bd">
				<div class="episodes-top">
					<h3 class="txt-bold">正在播放：</h3>
					<span class="episodes-top-ri">
						166.8万
						<i>次播放</i>
					</span>
				</div>
				<div class="episodes-crumb">
					<span>首页 <i class="el-icon-arrow-right"></i></span>
					<span>直播<i class="el-icon-arrow-right"></i></span>
					<span>ssss<i class="el-icon-arrow-right"></i></span>
					<span>eeee<i class="el-icon-arrow-right"></i></span>
				</div>
			</div>
			<!-- <infodiscrib :episodesData="episodesData" :detailData="detailData"></infodiscrib> -->
		</div>
	</section>
</template>

<script>
import $ from 'jquery'
import player from 'components/common/player'
import episodes from 'components/common/episodes'
import infodiscrib from 'components/common/infodiscrib'
import jujilist from 'components/common/jujilist'
import {getDay, Monday,dateComparate} from '@/util'

export default {
	components: {
		player,
		infodiscrib,
		episodes,
		jujilist
	},
	data () {
		return {

			detailData: [],
			episodesData: [],
			getDay:getDay(),
			startTime: Monday(getDay())+'000000',
			endTime: Monday(getDay())+'235959',
			playUrl: ''
			// monDay:Monday()
		}
	},
	created () {
		
	},
    mounted () {
		this._getDetailData()
		
    },
    watch: {
        // '$route': '_getDetailData'
	},



	methods: {
		_getDetailData () {
			this.$http({
				method: 'post',
				url: '/api/PortalServer-App/new/ptl_ipvp_live_live008',
				params: {
					ptype: this.GLOBAL.config.ptype,
					plocation: this.GLOBAL.config.plocation,
					puser: '',
					pserverAddress: this.GLOBAL.config.pserverAddress,
					// pserialNumber: '866769027850901',
					channelID: this.$route.params.channelid.split('_')[0],
					startTime: this.startTime,
					endTime: this.endTime

				}
			})
			.then((res) => {
				// alert(1)
        		if(res.data.status == 0) {
					const detailData = res.data.data.epgs
					this.detailData = detailData
				}
			})
			.catch((res) => {
				alert(res.data.errorMessage)
			})
		},
		dateData (date) {
			this.startTime = date+'000000'
			this.endTime = date+'235959'
			this._getDetailData()
		},

		dateCompa: function (date) {
			let year = date.substr(0,4)
			let month = date.substr(4,2)
			let day = date.substr(6,2)
			let hour = date.substr(8,2)
			let minute = date.substr(10,2)
			let second = date.substr(12,2)
			let d = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second
            return dateComparate(d)
		},
		showPlayeUrl (value) {
			this.playUrl = value
			alert(111)
		}
	}
}
</script>

<style>
.episodes-bd { width: 900px; margin: 30px 0; float: left; }
.episodes-top { position: relative; }
.episodes-top-ri { position: absolute; top: 0; right: 50px; font-size: 20px; color: #888; }
.episodes-top-ri i { display: block; font-size: 14px; margin-top: 5px; }
.episodes-crumb { color: #888; margin: 25px 0 35px; }
.episodes-crumb span:last-child .el-icon-arrow-right { display: none; }
.episodes-crumb .el-icon-arrow-right { font-size: 12px; color: #d1cfcf; }
.infodiscrib-rest-bd .infodiscrib-bd, .infodiscrib-rest-bd .episodes-bd, .infodiscrib-rest-bd .infodiscrib-con { display: block; float: none; width: 100%; height: auto; padding-top: 0; }
.live-player .palyer-le { width: 812px; height: 100%; }
.palyer-box { color: #f00; }
</style>
