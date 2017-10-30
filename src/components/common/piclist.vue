<template>
  <div class="pic-list clearfix">
  	<div class="fl pic-lebar" v-for="(v,index) in ContentInfo" v-if="index<1" @click.stop="urlDirect(v.contentID, v.extraInfo.channelID)">
  		<div class="pic-le-top">
  			<img v-lazy="v.contentImageUrl" alt="">
  			<span class="pic-mask">
  				<span class="pic-title">{{v.contentName}}</span>
          <span class="mask-time">
          {{v.extraInfo.epgStartTime.substr(4,2)}}-{{v.extraInfo.epgStartTime.substr(6,2)}}
          {{v.extraInfo.epgStartTime.substr(8,2)}}:{{v.extraInfo.epgStartTime.substr(10,2)}}
          <!-- date.substr(0,4) -->
          </span>
  				<!-- <span class="progress-bar" :style="{ width: percentNum(dateCompa1(v.extraInfo.epgStartTime),dateCompa(v.extraInfo.epgEndTime,v.extraInfo.epgStartTime)) }"></span> -->
  			</span>
  		</div>
  		<div class="pic-btm">
        {{v.extraInfo.channelName}}
        <span class="mask-time">{{v.extraInfo.viewNumber}}人正在看</span>
      </div>
  	</div>
  	<div class="fr pic-ribar">
  		<ul>
        <li v-for="(v,index) in ContentInfo" v-if="index>=1" @click.stop="urlDirect(v.contentID, v.extraInfo.channelID)">
          <div class="pic-ri-top">
            <img v-lazy="v.contentImageUrl" alt="">
            <span class="pic-mask">
              <span class="pic-title">{{v.contentName}}</span>
              <span class="mask-time">
                <!-- {{v.extraInfo.epgStartTime}} -->
                {{v.extraInfo.epgStartTime.substr(4,2)}}-{{v.extraInfo.epgStartTime.substr(6,2)}}
                {{v.extraInfo.epgStartTime.substr(8,2)}}:{{v.extraInfo.epgStartTime.substr(10,2)}}
              </span>
              <!-- <span class="progress-bar" :style="{ width: percentNum(dateCompa1(v.extraInfo.epgStartTime),dateCompa(v.extraInfo.epgEndTime,v.extraInfo.epgStartTime)) }"></span> -->
            </span>
          </div>
          <div class="pic-btm">
            {{v.extraInfo.channelName}}
            <span class="mask-time">{{v.extraInfo.viewNumber}}人正在看</span>
          </div>
        </li>
  		</ul>
  	</div>
  </div>
</template>

<script>
import {dateComparate1,ComparateDiff, percentNum, dateCompa, dateCompa1} from '@/util'
export default {
	name: 'piclist',
	props: {
		ContentInfo: {
			type: Array
		}
	},
	data () {
		return {
      id: this.$route.params.id,
    }
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
.pic-lebar { width: 460px; height: 330px; background: #f0f0f0; cursor: pointer; overflow: hidden; }
.pic-le-top { position: relative; width: 100%; height: 260px; }
.pic-le-top img { width: 100%; height: 100%; }
.pic-mask { position: absolute; left: 0; bottom: 0; height: 48px; width: 100%; background: rgba(0,0,0,.7); font-size: 18px; color: #fff; line-height: 50px; }
.pic-title { display: block; width: 300px; padding-left: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mask-time { position: absolute; right: 15px; top: 0; font-size: 20px; color: #fff; }
.pic-btm { position: relative; height: 72px; line-height: 72px; color: #445560; font-size: 24px; padding: 0 20px; }
.pic-btm .mask-time { color: #999; }
.progress-bar { position: absolute; width: 100%; height: 4px; bottom: 0; left: 0; background: #ff9c01; }
.pic-ribar { width: 714px; height: 330px; overflow: hidden; }
.pic-ribar li { position: relative; float: left; width: 226px; height: 157px; background: #f0f0f0; margin: 0 18px 16px 0; cursor: pointer; overflow: hidden; }
.pic-ribar li:nth-child(3n+3) { margin: 0 0 16px 0; }
.pic-ri-top { position: relative; width: 100%; height: 124px; }
.pic-ribar li img { width: 100%; height: 124px; }
.pic-ribar .pic-mask { height: 25px; line-height: 25px; font-size: 12px; }
.pic-ribar .pic-title { padding-left: 8px; width: 140px; }
.pic-ribar .progress-bar { height: 2px; }
.pic-ribar .mask-time { font-size: 12px; right: 5px; top: 2px; }
.pic-ribar .pic-btm { height: 30px; line-height: 30px; font-size: 14px; padding-left: 8px; }
</style>