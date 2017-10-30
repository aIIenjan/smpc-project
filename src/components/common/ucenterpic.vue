<template>
	<div class="ucenterpic-bd">
		<ul>
			<li v-for="(v, index) in orderData">
				<span class="order-close" @click="deleteDom(index)"><i class="el-icon-close"></i></span>
				<router-link tag="div" :to="{name: 'detail', params: { id: v.programID }}" :key="v.id">
					<div class="pic-ri-top">
						<img v-lazy="item" :alt="v.titleName" v-for="item in v.imageUrl[0]">
			  			<span class="pic-mask">
			  				<span class="mask-time">
				  				{{v.updateTime.substr(4,2)}}-{{v.updateTime.substr(6,2)}}
								{{v.updateTime.substr(8,2)}}:{{v.updateTime.substr(10,2)}}
			  				</span>
			  			</span>
					</div>
					<div class="pic-btm" :title="v.programName">
						{{v.programName}}
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'moviewrap',
	props: {
		orderData: {
			type: Array
		}
	},
	data () {
		return {
		}
	},
    methods: {
    	deleteDom (index) {
			this.orderData.splice(index, 1)
    	}
    }
}
</script>

<style scoped>
.ucenterpic-bd .pic-mask { position: absolute; left: 0; bottom: 0; height: 30px; width: 100%; background: rgba(0,0,0,.7); color: #fff; line-height: 30px; }
.ucenterpic-bd .mask-time { position: absolute; left: 10px; top: 0; font-size: 14px; color: #fff; }
.progress-bar { position: absolute; width: 100%; height: 4px; bottom: 0; left: 0; background: #ff9c01; }
.ucenterpic-bd { width: 100%; overflow: hidden; }
.ucenterpic-bd ul { padding: 15px 0 0 28px; }
.ucenterpic-bd li { position: relative; float: left; width: 165px; height: 280px; background: #f0f0f0; margin: 0 24px 24px 0; overflow: hidden; cursor: pointer; }
.ucenterpic-bd li:nth-child(5n+5) { margin: 0 0 24px 0; }
.ucenterpic-bd .pic-ri-top { position: relative; width: 100%; height: 245px; }
.ucenterpic-bd li img { width: 100%; height: 100%; }
.ucenterpic-bd .pic-title { padding-left: 8px; width: 140px; }
.ucenterpic-bd .progress-bar { height: 2px; }
.ucenterpic-bd .pic-btm { position: relative; height: 35px; line-height: 35px; font-size: 14px; color: #445560; padding: 0 8px; }
.movie-pos { position: absolute; right: 8px; top: 3px; }
.movie-num { font-size: 26px; font-style: italic; }
.ucenterpic-bd .icon-arror { color: #888; font-size: 18px; }
.ucenterpic-bd li:nth-child(4n+4) .rank-num, .rank-bd li:nth-child(5n+5) .rank-num { color: #888; }
.ucenterpic-bd .order-close { cursor: pointer; display: none; position: absolute; right: 0; top: 0; background: #eb5031; width: 30px; height: 30px; line-height: 30px; text-align: center; color: #fff; z-index: 2; }
.ucenterpic-bd .block { display: block; }
</style>