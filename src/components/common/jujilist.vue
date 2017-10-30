<template>
	<div class="fr palyer-ri">
		<div class="player-tabs-box">
			<div class="player-tabs-header clearfix">
				<span class="tabs-hd-list"  v-for="index in 7" :class="{ cur:index == nowIndex }" @click="changeTab(index,monday(index))">
					<i v-if="getDay==index">今天</i>
					<i v-else>
						<span v-if="index==1">周一</span>
						<span v-if="index==2">周二</span>
						<span v-if="index==3">周三</span>
						<span v-if="index==4">周四</span>
						<span v-if="index==5">周五</span>
						<span v-if="index==6">周六</span>
						<span v-if="index==7">周日</span>
					</i>
					<i>
						{{monday(index).substr(4,2)}}.{{monday(index).substr(6,2)}}
					</i>
				</span>
			</div>
			<div class="player-tabs-con">
				
				<div class="player-tabchange" :class="{'block':item === nowIndex}" v-for="item in 7">
					<div class="player-tabs-list" @click="changeMovies(v,$event)"  v-for="(v,index) in detailData"  :class=" v.epgID == endTimeArr.epgID && isok ? 'player-cur aaa':'' ">
						<span class="p-tabs-time">
							{{v.startTime.substr(8,2)}}.{{v.startTime.substr(10,2)}}
						</span>
						<span class="p-tabs-con">{{v.channelName}}：{{v.epgName}}</span>
						<span class="icon-p-tabs  icon-undo2"  :class=" v.epgID == endTimeArr.epgID ? 'playa':'' " v-if="dateCompa(v.startTime)<0"></span>

						<span class="icon-p-tabs icon-alarm"  v-if="dateCompa(v.startTime)>0"></span>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
import $ from "jquery";
import { Monday, dateComparate } from "@/util";
export default {
  props: {
    detailData: {
      type: Array
    },
    getDay: {
      type: Number
    }
  },
  data() {
    return {
      authority : '', //截取后的鉴权返回值
      isok: true,//是否默认选中
      weekIndex: "",
      nowIndex: this.getDay,
      clickIndex: this.getDay,
      playIndex: "",
      monday: Monday,
      puser:sessionStorage.getItem('user'),
      ptoken:sessionStorage.getItem('flag'),
      playUrl: ''
    };
  },

  computed: {
    //计算属性
    endTimeArr: function() {
      if (this.getDay == this.nowIndex) {
        let arr = [];
        this.detailData.forEach(
          function(val, index) {
            let gg = this.dateCompa(val.startTime);
            if (gg < 0) {
              arr.push(val);
            }
          }.bind(this)
        );
        return arr.pop() || {};
      } else {
        return false;
      }
    }
  },

  created() {
    // $(".tabs-hd-list.cur").click();
  
  },
  mounted() {
    //  this.changeMovie( this.detailData,{} )
  //  console.log( this.$route.params.channelid.split('_')[0] )
     console.log(  )
    
  },
  methods: {
    changeTab(index, date) {
      this.nowIndex = index;
      this.$emit("dateData", date);
    },
    playerClick(index) {
      this.playIndex = index;
      
    },

    dateCompa: function(date) {
      let year = date.substr(0, 4);
      let month = date.substr(4, 2);
      let day = date.substr(6, 2);
      let hour = date.substr(8, 2);
      let minute = date.substr(10, 2);
      let second = date.substr(12, 2);
      let d =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      return dateComparate(d);
    },
    //预定提醒
  appoint( val ){
    var self = this;
    // let url = `/api/PortalServer-App/new/ptl_ipvp_live_live024?ptype=${self.GLOBAL.config.ptype}&plocation=${self.GLOBAL.config.plocation}&puser=${self.puser}&ptoken=${self.ptoken}
    // &pversion=03010&pserverAddress=${self.$route.params.channelid.split('_')[0]}&pserialNumber=${self.ptoken} `
    self.$http({
				method: 'post',
        // url: url,
        url: '/api/PortalServer-App/new/ptl_ipvp_live_live024',
				data: {
				  ptype: self.GLOBAL.config.ptype,
          plocation: self.GLOBAL.config.plocation,
          puser: self.puser,
          ptoken: self.ptoken,
          pversion: '03010',
          // ptv: '1',
          // ptn: '',
          locationName: '',
          countyName: '',
          hmace: '2e34151626',
          timestamp: new Date().getTime(),
          nonce: Math.random().toString().slice(2),
					pserverAddress: self.GLOBAL.config.pserverAddress,
          pserialNumber: '',
          // BODY: {
              // channelID: self.$route.params.channelid.split('_')[0],
              channelID: self.$route.params.channelid.split('_')[0],
				      remindTime: val.startTime,
          // }
				}
			})
			.then((res) => {
        // alert(1)
        alert(res.data.status)
        if(res.data.status == 0) {
				    console.log(66)
				}
			})
			.catch((res) => {
				alert(res.data.errorMessage)
			})
  },
    changeMovies(val, el) {
      if (this.dateCompa(val.startTime) > 0) {  //如果时间比当前时间大

          let user = sessionStorage.getItem('user')
          if (!user) { // 未登录跳到登录页
            this.$message.warning( '您还没有登录请先登录！' );
            return false;
          }

          let target = $( el.target ).closest(".player-tabs-list ").find('.icon-alarm');
          target.toggleClass( 'yuding' );
          if( target.hasClass( 'yuding' )  ){
              
              this.appoint( val );
              this.$message( '你已成功订阅' );
             

          }else{

            //  val.selectAppoint = 0;
             this.$message( '取消订阅' )

          }
      } else {

        this.isok = false;
        $(".player-tabs-list ").removeClass("player-cur aaa");
        $(el.target)
          .closest(".player-tabs-list ")
          .addClass("player-cur aaa");

          // setTimeout(function() {
          //   alert(this.authority)
          // }, 800)
        // alert(this.authority)
        // let value = val.historyUrl[0]['3']+'&'+this.authority;
        // console.log(JSON.stringify(value))


        // this.playUrl = this.broadcast(val.historyUrl[0]['3'])
        let self = this;
         this.$http({
            method: 'get',
            url: '/api/PortalServer-App/new/aaa_aut_aut002',
            params: {
              ptype: self.GLOBAL.config.ptype,
              plocation: self.GLOBAL.config.plocation,
              puser: self.puser,
              ptoken: self.ptoken,
              pversion: '030101',
              timestamp: new Date().getTime(),
              v: '2',
              u: self.puser,
              d: '',
              nonce: Math.random().toString().slice(2),
              hmac: '',
              DRMtoken: '',
              p: '3',
              n: '',
              l: '001',
              cid: this.$route.params.channelid.split('_')[0],
              pserverAddress: this.GLOBAL.config.pserverAddress,
              pserialNumber: self.ptoken,

            }
          })
          .then((res) => {
              if(res.data.status == 0) {
                this.authority = res.data.data.authResult.split('?')[1];
                let value = val.historyUrl[0]['3']+'&'+this.authority;
                // alert(JSON.stringify(value))
                this.playUrl = value
                alert(this.playUrl)
                this.$emit('playUrl', value)
                // console.log(res.data.data.authResult.split('?')[1])
            }
          })
          .catch((res) => {
            alert(res.data.errorMessage)
          })
      }
    },
    //请求鉴权  
    // broadcast(value){
    //     let self = this;
    //      this.$http({
    //         method: 'get',
    //         url: '/api/PortalServer-App/new/aaa_aut_aut002',
    //         params: {
    //           ptype: self.GLOBAL.config.ptype,
    //           plocation: self.GLOBAL.config.plocation,
    //           puser: self.puser,
    //           ptoken: self.ptoken,
    //           pversion: '030101',
    //           timestamp: new Date().getTime(),
    //           v: '2',
    //           u: self.puser,
    //           d: '',
    //           nonce: Math.random().toString().slice(2),
    //           hmac: '',
    //           DRMtoken: '',
    //           p: '3',
    //           n: '',
    //           l: '001',
    //           cid: this.$route.params.channelid.split('_')[0],
    //           pserverAddress: this.GLOBAL.config.pserverAddress,
    //           pserialNumber: self.ptoken,

    //         }
    //       })
    //       .then((res) => {
    //           if(res.data.status == 0) {
    //             // this.authority = res.data.data.authResult.split('?')[1];
    //             // alert(this.authority)
    //             value = value + '&' + res.data.data.authResult.split('?')[1]
    //             // alert(value)
    //         }
    //       })
    //       .catch((res) => {
    //         alert(res.data.errorMessage)
    //       })
    // }

  },
  
  
};
</script>

<style scoped>
.palyer-ri {
  width: 370px;
  height: 515px;
  color: #f0f0f0;
  overflow: hidden;
}
.tabs-hd-list {
  float: left;
  width: 14.285714%;
  text-align: center;
  cursor: pointer;
}
.tabs-hd-list.cur {
  color: #ff9c01;
}
.tabs-hd-list i.cur {
  color: #ff9c01;
}
.tabs-hd-list i {
  display: block;
  margin-bottom: 5px;
}
.player-tabs-list {
  font-size: 0;
  position: relative;
  width: 260px;
  line-height: 36px;
  height: 36px;
  padding: 0 15px 0 80px;
  overflow: hidden;
  cursor: pointer;
}
.player-tabs-list.cur {
  color: #ff9c01;
}
.icon-p-tabs {
  display: inline-block;
  vertical-align: middle;
  position: absolute;
  right: 15px;
  top: 5px;
  font-size: 20px;
}
.p-tabs-time {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
  text-align: center;
}
.player-tabs-re {
  line-height: 25px;
}
.player-tabs-con {
  height: 400px;
  overflow-y: auto;
}
.player-bd ::-webkit-scrollbar {
  border-radius: 2.5px;
  width: 5px;
  height: 5px;
  background-color: #363636;
}
.p-tabs-con {
  display: inline-block;
  vertical-align: middle;
  width: 230px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
}
.player-cur.aaa {
  color: #ff9c01;
}
.yuding{
  color: #ff9c01;
}
.playa.icon-undo2:before {
  content: "\ea1c";
}

.player-tabchange {
  display: none;
}
.block {
  display: block;
}
</style>
