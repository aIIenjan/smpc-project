<template>
	<div class="player-bd clearfix">
		<div class="wrap clearfix">
			<div class="fl palyer-le">
				<video-player class="vjs-custom-skin" :options="playerOptions" @ready="playerReadied">
				</video-player>
			</div>
      <slot></slot>
		</div>
    <share></share>
	</div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
import share from 'components/common/share'
export default {
	components: {
		share,
		// jujilist
	},
    data() {
      return {
        playerOptions: {
          // videojs and plugin options
          sources: [{
            withCredentials: false,
            type: "application/x-mpegURL",
            src: "http://cg5.rifestone.com:8060/live/10017_1200.m3u8?ci=123"
          }],
          // controlBar: {
          //   timeDivider: false,
          //   durationDisplay: false
          // },
          live:true,
          flash: { hls: { withCredentials: true }},
          html5: { hls: { withCredentials: true }},
          poster: "/static/pic/2.jpg"
        }
      }
    },
    methods: {
      playerReadied(player) {
        var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
        player.tech_.hls.xhr.beforeRequest = function(options) {
          // console.log(options)
          return options
        }
      }
    },
	mounted() {
	}
}
</script>

<style>
.player-bd { padding: 55px 0 25px; background: #212121; min-width: 1200px; height: 515px; }
.player-bd .wrap { padding-top: 20px; }
.palyer-le { width: 100%; height: 100%; }
.player-box, .player-box img { width: 812px; height: 455px; }
.palyer-ri .el-tabs__item { color: #aaa; }
.palyer-tabs-top .el-tabs__item { font-size: 18px; padding: 0; width: 185px; text-align: center; }
.palyer-tabs-top .is-active{ color: #ff9c01; }
.palyer-tabs-top .el-tabs__active-bar { background: #ff9c01; height: 2px; }
.player-tabs-list { position: relative; line-height: 36px; height: 36px; padding: 0 15px 0 80px; overflow: hidden; }
.player-tabs-list.cur { color: #ff9c01; }
.player-tabs-re { line-height: 25px; }
.player-tabs-con { height: 400px; overflow-y: auto; }
.player-bd ::-webkit-scrollbar { border-radius: 2.5px; width: 5px; height: 5px; background-color: #363636; }
 
/*定义滚动条轨道 内阴影+圆角*/
.player-bd ::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); border-radius: 2.5px; background-color: #363636; }
.player-bd ::-webkit-scrollbar-thumb { border-radius: 2.5px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #aaa; }
</style>
