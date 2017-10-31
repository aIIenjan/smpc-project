<template>
  <div class="myorder-box">
	<div class="myorder-top-bd" v-if="orderList.length>0">
		 <span class="myorder-delete" @click="deleteRecord()" v-show="hideDiv">删除预订记录</span>
		<span class="myorder-deleteall" v-if="isTrue" @click="deleteAllRecord()">清空</span>
		<span class="myorder-complete" v-if="isTrue" @click="completeRecord()">完成</span>
	</div>
	<!--<el-tabs class="myorder-tabs-bd">
		<el-tab-pane v-for="(v,index) in orderList" :label="v.name" :key="v.value">
			<ucenterpic :orderData="v.content" :key="v.value"></ucenterpic>
		</el-tab-pane>
	</el-tabs>-->
    <div class="myorderBar">
      <ul>
        <li v-for="(v, index) in orderList">
			<span class="order-close" @click="deleteDom(index)"><i class="el-icon-close"></i></span>
			<router-link tag="div" :to="{name: 'detail', params: { id: v.programID }}" :key="v.id">
				<div class="pic-ri-top">
					<img v-lazy="item" alt="" v-for="item in v.imageUrl[0]">
					<span class="pic-mask">
						<span class="mask-time">
							<!-- {{v.createTime}} -->
							{{v.updateTime.substr(4,2)}}-{{v.updateTime.substr(6,2)}}
							{{v.updateTime.substr(8,2)}}:{{v.updateTime.substr(10,2)}}
						</span>
					</span>
				</div>
				<div class="pic-btm">
				{{v.programName}}
				</div>
			</router-link>
        </li>
      </ul>
    </div>
	<!-- <pagination></pagination> -->
  </div>
</template>

<script>
// 排行
import ucenterpic from 'components/common/ucenterpic'
import pagination from 'components/common/pagination'
export default {
	components: {
	    //ucenterpic,
	    pagination
	},
	data () {
		return {
			isTrue: false,
			hideDiv: true,
			isShow: false,
			puser:sessionStorage.getItem('user'),
			//ptoken:'',
			ptoken:sessionStorage.getItem('flag'),
			start:0,
			end:'',
			orderList: [],
		}
	},
  created(){
	  this.init();
  },
	methods: {
	    init(){
			let self = this
			let url = '/api/PortalServer-App/new/ptl_ipvp_live_live023'
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
				if(res.data.status == 0){
					this.orderList = res.data.data.reminds;
					// console.log(res.data.data.reminds);
				}
			})
	    },
		deleteRecord () {
			this.isTrue = true
			this.hideDiv = false
		},
		completeRecord () {
			this.isTrue = false
			this.hideDiv = true
		},
		deleteAllRecord () {
			let obj = document.getElementsByTagName('el-tab-pane')
			obj.innerHTML = ''
		}
	}
}
</script>

<style>
.myorder-tabs-bd { position: relative; height: auto; }
.myorder-tabs-bd .el-tabs__header { position: relative; z-index: 1; }
.myorder-tabs-bd .el-tabs__item { float: left; line-height: 33px; height: 33px; font-size: 18px; padding: 0 15px; margin: 0; cursor: pointer; }
.myorder-tabs-bd .is-active{ color: #ff9c01; }
.myorder-tabs-bd .el-tabs__active-bar { background: #ff9c01; height: 2px; }
.myorder-tabs-bd .rank-bd li { margin-bottom: 20px; }
.myorder-tabs-bd .live-crumb { margin-top: 10px; }
.myorder-top-bd { position: absolute; right: 25px; top: 0px; font-size: 14px; z-index: 2; }
.myorder-top-bd span { margin-left: 15px; cursor: pointer; }



.myorderBar .pic-mask { position: absolute; left: 0; bottom: 0; height: 30px; width: 100%; background: rgba(0,0,0,.7); color: #fff; line-height: 30px; }
.myorderBar .mask-time { position: absolute; left: 10px; top: 0; font-size: 14px; color: #fff; }
.progress-bar { position: absolute; width: 100%; height: 4px; bottom: 0; left: 0; background: #ff9c01; }
.myorderBar { width: 100%; overflow: hidden; }
.myorderBar ul { padding: 15px 0 0 28px; }
.myorderBar li { position: relative; float: left; width: 165px; height: 280px; background: #f0f0f0; margin: 0 24px 24px 0; overflow: hidden; }
.myorderBar li:nth-child(5n+5) { margin: 0 0 24px 0; }
.myorderBar .pic-ri-top { position: relative; width: 100%; height: 245px; }
.myorderBar li img { width: 100%; height: 100%; }
.myorderBar .pic-title { padding-left: 8px; width: 140px; }
.myorderBar .progress-bar { height: 2px; }
.myorderBar .pic-btm { position: relative; height: 35px; line-height: 35px; font-size: 14px; color: #445560; padding: 0 8px; }
.movie-pos { position: absolute; right: 8px; top: 3px; }
.movie-num { font-size: 26px; font-style: italic; }
.myorderBar .icon-arror { color: #888; font-size: 18px; }
.myorderBar li:nth-child(4n+4) .rank-num, .rank-bd li:nth-child(5n+5) .rank-num { color: #888; }
.myorderBar .order-close { cursor: pointer; display: none; position: absolute; right: 0; top: 0; background: #eb5031; width: 30px; height: 30px; line-height: 30px; text-align: center; color: #fff; z-index: 2; }
.myorderBar .block { display: block; }
</style>
