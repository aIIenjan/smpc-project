<template>
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
			<span>点播<i class="el-icon-arrow-right"></i></span>
			<span>{{detailData.columnName}}<i class="el-icon-arrow-right"></i></span>
			<span>{{detailData.programName}}<i class="el-icon-arrow-right"></i></span>
		</div>
		<h3 class="txt-bold" v-if="episodesData.length>1">剧集</h3>
		<el-tabs class="juji-box" v-if="episodesData.length>1">
			<el-tab-pane label="1-20" v-if="episodesData.length>1">
				<span class="juji-list" v-for="(v,index) in episodesData" v-if="index<20" :key="v.programID">
					<el-tooltip class="item" effect="dark" :content="v.titleName" placement="top">
						<el-button>{{index+1}}</el-button>
					</el-tooltip>
				</span>
			</el-tab-pane>
			<el-tab-pane label="21-40" v-if="episodesData.length>=20&&episodesData.length<40">
				<span class="juji-list" v-for="(v,index) in episodesData" v-if="index>=20&&index<40" :key="v.programID">
					<el-tooltip class="item" effect="dark" :content="v.titleName" placement="top">
						<el-button>{{index+1}}</el-button>
					</el-tooltip>
				</span>
			</el-tab-pane>
			<el-tab-pane label="40-60" v-if="episodesData.length>=40&&episodesData.length<60">
				<span class="juji-list" v-for="(v,index) in episodesData" v-if="index>=40&&index<60" :key="v.programID">
					<el-tooltip class="item" effect="dark" :content="v.titleName" placement="top">
						<el-button>{{index+1}}</el-button>
					</el-tooltip>
				</span>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
	props: {
		episodesData: {
			type: Array
		},
		detailData: {
			type: Object
		}
	},
	data () {
		return {}
	}
}
</script>

<style scoped>
.episodes-bd { width: 900px; margin: 30px 0; float: left; }
.episodes-top { position: relative; }
.episodes-top-ri { position: absolute; top: 0; right: 50px; font-size: 20px; color: #888; }
.episodes-top-ri i { display: block; font-size: 14px; margin-top: 5px; }
.juji-list { float: left; width: 72px; height: 48px; border-radius: 5px; line-height: 48px; font-size: 16px; background: #f0f0f0; margin: 0 20px 20px 0; text-align: center; }
.juji-list.cur { background: #ff9c01; }
.juji-list.cur .el-button { color: #fff; }
.juji-list:nth-child(10n+10) { margin-right: 0; }
.juji-list .el-button { background: none; border: 0; }
.episodes-crumb { color: #888; margin: 25px 0 35px; }
.episodes-crumb span:last-child .el-icon-arrow-right { display: none; }
.episodes-crumb .el-icon-arrow-right { font-size: 12px; color: #d1cfcf; }
.juji-box .is-active{ color: #ff9c01; }
.juji-box .el-tabs__active-bar { background: #ff9c01; height: 2px; }
</style>
