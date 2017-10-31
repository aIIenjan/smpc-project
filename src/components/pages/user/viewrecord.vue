<template>
	<div class="view-record">
		<div class="times-box">
			<div class="myorder-top-bd" v-if="recordData.length>0">
				<span class="myorder-delete" @click="deleteRecord($event)">删除观看记录</span>
				<span class="myorder-deleteall unfold-div hide" @click="deleteAllRecord($event)">清空</span>
				<span class="myorder-complete unfold-div hide" @click="completeRecord($event)">完成</span>
			</div>
		</div>
		<ucenterpic :orderData="recordData"></ucenterpic>

	</div>
</template>

<script>
import ucenterpic from 'components/common/ucenterpic'
import $ from 'jquery'
export default {
	components: {
	    ucenterpic
	},
	props : {
		status : {
			type : Boolean,
			default : false,
			toWay : true
		}
	},
	data () {
		return {
			isTrue: false,
			hideDiv: true,
			isShow: false,
			activeName: '',
			//nowIndex:0,
			puser:sessionStorage.getItem('user'),
			ptoken:sessionStorage.getItem('flag'),
			// pserverAddress:'http://172.16.149.133:8080',
			start:0,
			end:'',
			recordData: [
			],
		}
	},
  created(){
	  this.init();
  },
	methods: {
		deleteRecord (event) {
			$(event.target).siblings('.hide').show()
			$(event.target).hide()
			$(event.target).parent().parent().next('.ucenterpic-bd').find('.order-close').show()
		},
		completeRecord (event) {
			$(event.target).siblings('.unfold-div').hide()
			$(event.target).siblings('.myorder-delete').show()
			$(event.target).hide()
			$(event.target).parent().parent().next('.ucenterpic-bd').find('.order-close').hide()
		},
		deleteAllRecord (event) {
			$(event.target).siblings('.unfold-div').hide()
			$(event.target).siblings('.myorder-delete').show()
			$(event.target).parent().parent().next('.ucenterpic-bd').remove()
			$(event.target).hide()
		},
		init() {
			let self = this
			let url = '/api/PortalServer-App/new/ptl_ipvp_vod_vod028'
			self.$http({
				method: 'get',
				url: url,
				params: {
		            ptype: self.GLOBAL.config.ptype,
		            plocation: self.GLOBAL.config.plocation,
		            puser: self.puser,
		            ptoken: self.ptoken,
		            pversion: self.GLOBAL.config.pversion,
					pserverAddress: self.GLOBAL.config.pserverAddress,
					pserialNumber: self.GLOBAL.config.pserialNumber
				}
			})
			.then((res)=>{
				if(res.data.status === '0'){
					this.recordData = res.data.data.historys;
					console.log(this.recordData);
				}
			})
		}
	}
}
</script>

<style scoped>
.view-record { }
.times-box {  position: relative; font-size: 18px; height: 40px; line-height: 40px;}
.point-style, .sj-txt { display: inline-block; vertical-align: middle; }
.point-style { width: 14px; height: 14px; border-radius: 50%; background: #14b871; margin-right: 5px; }
.reset-style-1 { background: #ff9c01; }
.reset-style-2 { background: #ed332a; }
.myorder-top-bd { position: absolute; right: 20px; top: 8px; font-size: 14px; z-index: 2; }
.myorder-top-bd span { margin-left: 15px; cursor: pointer; }
.active-del .hide { }
</style>
