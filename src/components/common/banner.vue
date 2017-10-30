<template>
	<el-carousel class="swiper-container" trigger="click" :interval="5000" arrow="always">
      <el-carousel-item v-for="v in bannerData" :key="v.value">
        <router-link class="carousel-box" :to="{name: 'detail', params: { id: v.contentID }}">
        	<img v-lazy="v.imageUrl">
        	<span class="carousel-mask">{{v.contentName}}</span>
        </router-link>
      </el-carousel-item>
    </el-carousel>
</template>

<script type="text/ecmascript-6">
export default {
	data () {
		return {
			id: this.$route.params.id,
		}
	},
	props: {
		bannerData: {
			type: Array
		}
	}
}
</script>

<style>
.swiper-container a { cursor: pointer; }
.swiper-container, .swiper-container img { position: relative; width: 100%; height: 500px; z-index: 1; }
.swiper-container .el-carousel__container { height: 100%; }
.swiper-container .el-carousel__button { width: 10px; height: 10px; border-radius: 50%; background: #fff; }
.swiper-container .is-active .el-carousel__button { background: #f00; }
.swiper-container .is-active .el-carousel__button:hover { background: #f00; }
.swiper-container .el-carousel__arrow { width: 55px; height: 55px; background-color: rgba(31,45,61,.3); }
.swiper-container .el-carousel__arrow .el-icon-arrow-left, .swiper-container .el-carousel__arrow .el-icon-arrow-right { font-size: 20px; }
.carousel-box { position: relative; display: block; }
.swiper-container .el-carousel__indicators { left: auto; right: 0; }
.carousel-mask { position: absolute; height: 50px; line-height: 50px; font-size: 18px; width: 100%; position: absolute; left: 0; bottom: 0; background: rgba(0,0,0,.5); color: #fff; text-align: center; z-index: 2; }
</style>
