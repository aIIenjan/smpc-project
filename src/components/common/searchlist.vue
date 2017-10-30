<template>
	<div class="movie-wrap">
	    <div class="movie-bd">
	      <ul>
	        <li v-for="v in bookData" @click="urlDirect(v.id)">
	          <div class="pic-ri-top">
	            <img v-lazy="v.images.large">
	              <!-- <span class="pic-mask">
	                <span class="mask-time">01-22 19:35</span>
	                <span class="icon-alarm"></span>
	              </span> -->
	          </div>
	          <div class="pic-btm">
	          	{{v.title}}
	          </div>
	        </li>
	      </ul>
	    </div>
	</div>
</template>

<script>
export default {
	name: 'searchlist',
	components: {
	},
	props: {
		bookData: {
			type: Array
		}
	},
	data () {
		return {
		}
	},
	methods: {
	    urlDirect ($id) {
			this.$router.push({
				// path: '/live/detail/',
				// query:{$id}
				name: 'detail',
				params: { id: $id }
			})
	    }
	}
}
</script>

<style scoped>
.pic-mask { position: absolute; left: 0; bottom: 0; height: 48px; width: 100%; background: rgba(0,0,0,.7); font-size: 18px; color: #fff; line-height: 50px; }
.pic-title { display: block; width: 300px; padding-left: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pic-btm { height: 72px; line-height: 72px; color: #445560; font-size: 24px; padding: 0 20px; }
.progress-bar { position: absolute; width: 100%; height: 4px; bottom: 0; left: 0; background: #ff9c01; }
.movie-bd { width: 100%; overflow: hidden; }
.movie-bd li { float: left; width: 180px; height: 308px; background: #f0f0f0; margin: 0 24px 24px 0; overflow: hidden; }
.movie-bd li:nth-child(6n+6) { margin: 0 0 24px 0; }
.movie-bd .pic-ri-top { position: relative; width: 100%; height: 270px; }
.movie-bd li img { width: 100%; height: 100%; }
.movie-bd .pic-mask { height: 30px; line-height: 30px; font-size: 14px; }
.movie-bd .icon-alarm { position: absolute; top: 6px; right: 5px; font-size: 20px; }
.movie-bd .pic-title { padding-left: 8px; width: 140px; }
.movie-bd .progress-bar { height: 2px; }
.movie-bd .mask-time { position: absolute; font-size: 14px; left: 8px; top: 2px; }
.movie-bd .pic-btm { position: relative; height: 38px; line-height: 38px; font-size: 14px; padding-left: 8px; }
.movie-pos { position: absolute; right: 8px; top: 3px; }
.movie-num { font-size: 26px; font-style: italic; }
.movie-bd .icon-arror { color: #888; font-size: 18px; }
.movie-bd li:nth-child(4n+4) .rank-num, .rank-bd li:nth-child(5n+5) .rank-num { color: #888; }
</style>