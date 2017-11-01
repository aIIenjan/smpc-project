<template>
	<div class="rank-bd livecon">
		<ul>
			<li v-for="(v, index) in liveConData" @click.stop="urlDirect(v.contentID, v.extraInfo.channelID)">
				<div class="pic-ri-top">
					<img v-lazy="v.contentImageUrl" alt="">
		  			<span class="pic-mask">
		  				<span class="pic-title">{{v.contentName}}</span>
		  				<span class="mask-time">
		  				{{v.extraInfo.epgStartTime.substr(4,2)}}-{{v.extraInfo.epgStartTime.substr(6,2)}}
						{{v.extraInfo.epgStartTime.substr(8,2)}}:{{v.extraInfo.epgStartTime.substr(10,2)}}
		  				</span>
		  				<!-- <span class="progress-bar" :style="{ width: percentNum(dateCompa1(v.extraInfo.epgStartTime),dateCompa(v.extraInfo.epgEndTime,v.extraInfo.epgStartTime)) }"></span> -->
		  			</span>
				</div>
				<div class="pic-btm">
					{{v.extraInfo.channelName}}
				</div>
			</li>
			<li v-for="(v, index) in liveConData1" @click.stop="urlDirect(v.contentID, v.extraInfo.channelID)">
				<div class="pic-ri-top">
					<!-- <img v-lazy="v.liveRealImg" alt=""> -->
					<img v-lazy="v.contentImageUrl" alt="">
		  			<span class="pic-mask">
		  				<span class="pic-title">{{v.contentName}}</span>
		  				<span class="mask-time">01-22 19:35</span>
		  				<!-- <span class="progress-bar" :style="{ width: percentNum(dateCompa1(v.extraInfo.epgStartTime),dateCompa(v.extraInfo.epgEndTime,v.extraInfo.epgStartTime)) }"></span> -->
		  			</span>
				</div>
				<div class="pic-btm">
					{{v.extraInfo.channelName}}
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import {dateComparate1,ComparateDiff, percentNum, dateCompa, dateCompa1} from '@/util'
export default {
	name: 'livecontent',
	props: {
		liveConData: {
			type: Array
		},
		liveConData1: {
			type: Array
		}
	},
	data () {
		return {}
	},
	methods: {
		urlDirect ($id, $channelId) {
			this.$router.push({
				name: 'livedetail',
				params: {
					id: this.$md5($id),
					channelid: $channelId + '_channel'
				}
			})
		},
	    dateCompa (date1,date2) {
	      return dateCompa(date1,date2)
	    },
	    dateCompa1 (date) {
	      return dateCompa1(date)
	    },
	    percentNum (d1,d2) {
	      return percentNum(d1,d2)
	    }
	}
}
</script>

<style scoped>
.pic-mask { position: absolute; left: 0; bottom: 0; height: 48px; width: 100%; background: rgba(0,0,0,.7); font-size: 18px; color: #fff; line-height: 50px; }
.pic-title { display: block; width: 300px; padding-left: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mask-time { position: absolute; right: 15px; top: 5px; font-size: 20px; color: #fff; }
.pic-btm { height: 72px; line-height: 72px; color: #445560; font-size: 24px; padding: 0 20px; }
.progress-bar { position: absolute; width: 100%; height: 4px; bottom: 0; left: 0; background: #ff9c01; }
.rank-bd { width: 100%; overflow: hidden; }
.rank-bd li { float: left; width: 226px; height: 157px; background: #f0f0f0; margin: 0 17px 0 0; overflow: hidden; }
.livecon li { margin-bottom: 20px; cursor: pointer; }
.rank-bd li:nth-child(5n+5) { margin: 0; }
.rank-bd .pic-ri-top { position: relative; width: 100%; height: 124px; }
.rank-bd li img { width: 100%; height: 124px; }
.rank-bd .pic-mask { height: 25px; line-height: 25px; font-size: 12px; }
.rank-bd .pic-title { padding-left: 8px; width: 140px; }
.rank-bd .progress-bar { height: 2px; }
.rank-bd .mask-time { font-size: 12px; right: 5px; top: 2px; }
.rank-bd .pic-btm { position: relative; height: 30px; line-height: 30px; font-size: 14px; padding-left: 8px; }
.rank-pos { position: absolute; right: 8px; top: 3px; }
.rank-num { font-size: 26px; font-style: italic; }
.rank-bd .icon-arror { color: #888; font-size: 18px; }
.rank-bd li:nth-child(4n+4) .rank-num, .rank-bd li:nth-child(5n+5) .rank-num { color: #888; }
</style>