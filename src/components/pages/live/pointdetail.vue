<template>
	<section class="livedetail-wrap clearfix" :class="episodesData.length<2?'infodiscrib-rest-bd':''">
		<player :detailData="detailData"></player>
		<div class="wrap clearfix">
			<episodes :episodesData="episodesData" :detailData="detailData"></episodes>
			<infodiscrib :detailData="detailData"></infodiscrib>
		</div>
	</section>
</template>

<script>
import player from 'components/common/player'
import episodes from 'components/common/episodes'
import infodiscrib from 'components/common/infodiscrib'
export default {
	components: {
		player,
		infodiscrib,
		episodes
	},
	data () {
		return {
			detailData: {},
			episodesData: []
		}
	},
    mounted () {
		this._getDetailData()
		this._getEpisodes ()
    },
    watch: {
        // '$route': '_getDetailData'
    },
	methods: {
		_getDetailData () {
			this.$http({
				method: 'post',
				url: '/api/PortalServer-App/new/ptl_ipvp_vod_vod013',
				params: {
					ptype: this.GLOBAL.config.ptype,
					plocation: this.GLOBAL.config.plocation,
					puser: '',
					pserverAddress: this.GLOBAL.config.pserverAddress,
					// pserialNumber: '866769027850901',
					programID: this.$route.params.id
				}
			})
			.then((res) => {
				// alert(1)
        		if(res.data.status == 0) {
					const detailData = res.data.data.programinfo
					this.detailData = detailData
					//alert(this.detailData)
				}
			})
			.catch((res) => {
				alert(res.data.errorMessage)
			})
		},
		_getEpisodes () {
			this.$http({
				method: 'post',
				url: '/api/PortalServer-App/new/ptl_ipvp_vod_vod012',
				params: {
					ptype: this.GLOBAL.config.ptype,
					plocation: this.GLOBAL.config.plocation,
					puser: '',
					pserverAddress: this.GLOBAL.config.pserverAddress,
					// pserialNumber: '866769027850901',
					programID: this.$route.params.id
				}
			})
			.then((res) => {
				// alert(1)
        		if(res.data.status == 0) {
					const episodesData = res.data.data.programItems
					this.episodesData = episodesData
					// alert(this.episodesData)
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
.infodiscrib-rest-bd .infodiscrib-bd, .infodiscrib-rest-bd .episodes-bd, .infodiscrib-rest-bd .infodiscrib-con { display: block; float: none; width: 100%; height: auto; padding-top: 0; }
</style>
