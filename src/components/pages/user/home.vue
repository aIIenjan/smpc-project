<template>
	<div class="user-home">
		<div class="bg-info clearfix">
			<ul>
				<li>
					<span class="info-list-txt">
						<span class="icon-info icon-user2"></span>
						<span>头像</span>
					</span>
					<span class="info-ri info-pic"><img src="/static/common/images/tx.png"></span>
				</li>
				<li>
					<span class="info-list-txt">
						<span class="icon-info icon-user"></span>
						<span>账户名</span>
					</span>
					<span class="info-ri" v-text="userList.user"></span>
				</li>
				<!-- <li>
					<span class="info-list-txt">
						<span class="icon-info icon-envelope"></span>
						<span>邮箱</span>
					</span>
					<span class="info-ri" v-text="userList.email"></span>
				</li> -->
			</ul>
		</div>
		<div class="bg-info clearfix">
			<ul>
				<!-- <li>
					<span class="info-list-txt">
						<span class="icon-info el-icon-time"></span>
						<span>注册时间</span>
					</span>
					<span class="info-ri" v-text="userList.createTime"></span>
				</li> -->
				<li>
					<span class="info-list-txt">
						<span class="icon-info icon-floppy-disk"></span>
						<span>上次登录时间</span>
					</span>
					<span class="info-ri">{{lastLogin}}</span>
				</li>
			</ul>
		</div>
		<!-- <div class="bg-info clearfix">
			<ul>
				<li>
					<span class="info-list-txt">余额</span>
				</li>
			</ul>
		</div> -->
		<button class="info-reset" @click.stop="btnMask">修改资料</button>
    <bmask v-show="eye" :alterListData="alterList"></bmask>
	</div>
</template>

<script>
import usercenterleft from 'components/common/usercenterleft'
import bmask from 'components/common/bmask'
import $ from 'jquery'
export default {
	components: {
		usercenterleft,
    bmask
	},
  beforeCreate(){
    this.lastLogin = sessionStorage.getItem('dateTime')
  },
	data () {
		return {
      eye:false,
		  userList:{
        user:'',
        phoneNumber:'',
        email:'',
        cardNumber:'',
        createTime:'',
        lastLogin:'',
        nickname:'',
        sex:'',
        birthday:'',
        personalitySignature:'',
        photoImg:{
          high:'',
          low:'',
          middle:''
        }
      },
      ruleForm2:{
        LoginType:'1',
        loginparam:'',
        Pwd:'',
        serialno:'',
        terminalID:''
      },
      ptype:'5',
      plocation:'001',
      //puser:'',
      puser:sessionStorage.getItem('user'),
      //ptoken:'',
      ptoken:sessionStorage.getItem('flag'),
      pversion:'030000',
      pserverAddress:'http://172.16.149.133:8080',
      pserialNumber:'864905033377784',
      //pkv:'1',
      //ptn:'Y29tLnN1bWF2aXNpb24uc2FucGluZy5ndWRvdQ',
      alterList:{
        nickname:'',
        sex:'',
        birthday:'',
        personalitySignature:'',
        email:'',
        customerNum:''
      }
    }
	},
  created(){
    this.init();
  },
	methods:{
    //获取用户信息
      init(){
        let url = '/api/PortalServer-App/new/aaa_usr_usr008';
        url = url+'?ptype='+this.ptype+'&plocation='+this.plocation+'&puser='+this.puser+'&ptoken='+this.ptoken+'&pversion='+this.pversion+'&pserverAddress='+this.pserverAddress+'&pserialNumber='+this.pserialNumber
        this.$http.get(url).then((res)=>{
          if(res.data.status == 0){
            this.userList = res.data.data;
            console.log(this.userList.photoImg);
          }else {
            //this.$router.push({name:'login'})
          }
        })
      },
    //获取serialno流水号
      // __init(){
      //   let url = '/api0/AAA/serialNoFromUAP';
      //   this.$http.get(url).then((res)=>{
      //     this.ruleForm2.serialno = res.data.data.serialno;
      //     //console.log(this.ruleForm2.serialno)
      //   })
      // },
    //获取用户名和登录牌
     // _init(){
     //   this.__init();
     //   let url = '/api0/AAA/loginFromUAP';
     //   url = url +'?LoginType='+1 + '&loginparam=' +this.ruleForm2.loginparam +'&Pwd=' + this.$md5(this.ruleForm2.Pwd) +'&serialno=' + this.ruleForm2.serialno+'&terminalID='+'';
     //   this.$http.get(url).then((res)=>{
     //     if(res.data.status == 0){
     //       this.ptoken = res.data.data.newToken;
     //       this.puser = res.data.data.userName;
     //     }else{
     //       //this.$router.push({name:'login'})
     //     }
     //   })
     // },
    btnMask(){
      this.eye = true;
    },
    //获取修改的信息
    alter(){
      let url = '/api/PortalServer-App/new/aaa_usr_usr009'
      url = url+'?ptype='+this.ptype+'&plocation='+this.plocation+'&puser='+this.puser+'&ptoken='+this.ptoken+'&pversion='+this.pversion+'&pserverAddress='+this.pserverAddress+'&pserialNumber='+this.pserialNumber
      let pramas = {
        nickname:this.alterList.nickname,
        sex:this.alterList.sex,
        birthday:this.alterList.birthday,
        personalitySignature:this.alterList.personalitySignature,
        email:this.alterList.email,
        customerNum:this.alterList.customerNum
      }
      this.$http.post(url,pramas).then((res)=>{
        this.alterList = res.data.data;
      })
    }
  },
  mounted(){

  }
}
</script>

<style scoped>
.user-home { background: #f6f6f6; padding: 80px 100px 150px; }
.info-reset { display: block; width: 100%; background: #32b16c; height: 44px; border-radius: 5px; color: #fff; font-size: 16px; margin-top: 30px; }
.bg-info { background: #fff; margin-bottom: 20px; padding: 0 20px; }
.bg-info li { position: relative; border-bottom: #e1e1e1 1px solid; line-height: 55px; padding-left: 10px; overflow: hidden; }
.bg-info li:last-child { border-bottom: 0; }
.info-list-txt { float: left; }
.info-list-txt span { display: inline-block; vertical-align: middle; }
.info-ri { position: absolute; right: 10px; top: 0; }
.info-list-txt .icon-info { color: #ff9c01; font-size: 28px; margin-right: 8px; }
.info-list-txt .icon-user { font-size: 26px; font-weight: 700; }
.info-list-txt .icon-floppy-disk { font-size: 20px; }
.info-list-txt .icon-user2, .info-list-txt .el-icon-time, .info-list-txt .icon-envelope { font-size: 22px; }
.info-pic { top: 10px; }
.info-pic img { width: 34px; height: 34px; border-radius: 50%; }
</style>
