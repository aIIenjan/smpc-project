<template>
	<div class="player-btm">
		<div class="p-btm-list s-hover p-btm-border" @click="collect">
			<span class="icon-btm el-icon-star-off"></span>
			<span>收藏</span>
		</div>
		<div class="p-btm-list s-hover p-btm-border" @click="praise">
			<span class="icon-btm icon-thumbs-up"></span>
			<span>点赞(1584)</span>
		</div>
		<div class="p-btm-list s-hover p-ri-0">
			<span class="icon-btm icon-share2"></span>
			<span>分享：</span>
		</div>
		 <div class="p-btm-list p-le-0 share-bd bdsharebuttonbox" data-tag="share_0">
			<a href="javascript:viod(0)" class="icon-btm icon-qq2 bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
			<a href="javascript:viod(0)" class="icon-btm icon-qq bds_sqq" data-cmd="sqq" title="分享给QQ好友"></a>
			<a href="javascript:viod(0)" class="icon-btm icon-wechat bds_weixin" data-cmd="weixin" title="分享给微信"></a>
			<a href="javascript:viod(0)" class="icon-btm icon-sina-weibo bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
		</div> 
		<!-- <share :config="config"></share>
 <social-sharing url="https://vuejs.org/"
                      title="The Progressive JavaScript Framework"
                      description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                      quote="Vue is a progressive framework for building user interfaces."
                      hashtags="vuejs,javascript,framework"
                      twitter-user="vuejs"
                      inline-template>
  <div>
      <network network="email">
          <i class="fa fa-envelope"></i> Email
      </network>
      <network network="facebook">
        <i class="fa fa-facebook"></i> Facebook
      </network>
      <network network="googleplus">
        <i class="fa fa-google-plus"></i> Google +
      </network>
      <network network="line">
        <i class="fa fa-line"></i> Line
      </network>
      <network network="linkedin">
        <i class="fa fa-linkedin"></i> LinkedIn
      </network>
      <network network="odnoklassniki">
        <i class="fa fa-odnoklassniki"></i> Odnoklassniki
      </network>
      <network network="pinterest">
        <i class="fa fa-pinterest"></i> Pinterest
      </network>
      <network network="reddit">
        <i class="fa fa-reddit"></i> Reddit
      </network>
      <network network="skype">
        <i class="fa fa-skype"></i> Skype
      </network>
      <network network="sms">
        <i class="fa fa-commenting-o"></i> SMS
      </network>
      <network network="telegram">
        <i class="fa fa-telegram"></i> Telegram
      </network>
      <network network="twitter">
        <i class="fa fa-twitter"></i> Twitter
      </network>
      <network network="vk">
        <i class="fa fa-vk"></i> VKontakte
      </network>
      <network network="weibo">
        <i class="fa fa-weibo"></i> Weibo
      </network> 
      <network network="qq">
        <i class="fa fa-qq"></i> qq
      </network>
      <network network="whatsapp">
        <i class="fa fa-whatsapp"></i> Whatsapp
      </network>
  </div>
</social-sharing>-->
	</div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
import {getDay, Monday,dateComparate} from '@/util'
export default {
	data () {
		return {

       praiseData: '',
       puser:sessionStorage.getItem('user'),
			//ptoken:'',
       ptoken:sessionStorage.getItem('flag')
      


		/*	config: {
				url: 'http://baidu.com',
				source: '',
				title: 'ssssss',
				image: '',
				sites: 'http://baidu.com',
				wechatQrcodeTitle   : 'dddd',
				wechatQrcodeHelper  : 'sssss'
      }*/


		}
	},
	mounted () {
		// this.$on('qq', function (network, url) {
		// 	network = 'qq',
		// 	url = 'http://baidu.com'
		// })
	},
  methods: {

      collect(){
        if (!this.puser) { // 未登录跳到登录页
          this.$message.warning( '您还没有登录请先登录！' );
          return false;
        }

        var self = this;
        self.$http({
              method: 'post',
              url: '/api/PortalServer-App/new/ptl_ipvp_live_live016',
              params: {
                ptype: self.GLOBAL.config.ptype,
                plocation: self.GLOBAL.config.plocation,
                puser: self.puser,
                ptoken: self.ptoken,
                pversion: '03010',
                // locationName: '',
                // countyName: '',
                // hmace: '',
                // timestamp: new Date().getTime(),
                // nonce: Math.random().toString().slice(2),
                pserverAddress: self.GLOBAL.config.pserverAddress,
                pserialNumber: self.ptoken,
                BODY: [{
                    channelID: '68',
                    localModifyTime: new Date().getTime()
                }]
              }
            })
            .then((res) => {
                if(res.data.status == 0) {
                  console.log(66)
              }
            })
            .catch((res) => {
              alert(res.data.errorMessage)
            })
      },
      //点赞接口
      praise(){
           if (!this.puser) { // 未登录跳到登录页
            this.$message.warning( '您还没有登录请先登录！' );
            return false;
          }
         var self = this;
         self.$http({
              method: 'post',
              url: '/api/PortalServer-App/new/ptl_ipvp_cmn_cmn014',
              params: {
                ptype: self.GLOBAL.config.ptype,
                plocation: self.GLOBAL.config.plocation,
                puser: self.puser,
                ptoken: self.ptoken,
                pversion: '03010',
                pserverAddress: self.GLOBAL.config.pserverAddress,
                pserialNumber: self.ptoken,
               
                operateType: '1',
                programID: '520',
                channelID: '68',
                programItemID: '-1'
               
              }
            })
            .then((res) => {
                if(res.data.status == 0) {
                  this.praiseData = res.data.data.likeOrNot;
                  console.log(this.praiseData)
              }
            })
            .catch((res) => {
              alert(res.data.errorMessage)
            })
      } 


  }
}
</script>

<style>
.player-btm { text-align: right; padding: 20px 0 0 0; }
.p-btm-list { padding: 0 15px; }
.p-btm-list, .p-btm-list span { display: inline-block; vertical-align: middle; color: #aaa; }
.p-btm-list .icon-sina-weibo { font-size: 24px; }
.icon-btm { font-size: 20px; }
.p-btm-0 { padding: 0; }
.p-le-0 { padding-left: 0; }
.p-ri-0 { padding-right: 0; }
.p-btm-border { border-right: #aaa 1px solid; cursor: pointer;}
.p-btm-border:hover span{ color: #ef9914; }
.share-bd span { margin-right: 10px; }
.s-hover:hover { color: #ef9914; }

.tabs-hd-list i { display: block; margin-bottom: 5px; }
.icon-p-tabs { position: absolute; right: 15px; top: 5px; font-size: 20px; }
.bdshare-button-style0-24 .bds_qzone, .bdshare-button-style0-24 .bds_sqq, .bdshare-button-style0-24 .bds_weixin, .bdshare-button-style0-24 .bds_tsina { background: none; color: #aaa; font-size: 24px; padding: 0; margin: 0 10px 0 5px; }
.bdshare-button-style0-24 .bds_tsina
.share-bd .bdshare-button-style0-24 a, .bdshare-button-style0-24 .bds_more { padding-left: 0; }
.bdshare-button-style0-24 .bds_tsina { font-size: 26px; }
.bdshare-button-style0-24 .bds_qzone:hover, .bdshare-button-style0-24 .bds_sqq:hover, .bdshare-button-style0-24 .bds_weixin:hover, .bdshare-button-style0-24 .bds_tsina:hover { color: #ff9c01; opacity: 1; }
.share-component, .social-share-icon { display:inline-block; vertical-align: middle; }
.social-share-icon { width: 30px; height: 30px; }
</style>
