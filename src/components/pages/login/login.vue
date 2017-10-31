<template>
  <section class="wrap login-wrap">
      <div class="login">
          <div class="login-box">
            <div class="top">帐号密码登录</div>
            <p class="tips-txt">请妥善管理好自己的账号密码</p>
            <p class="tips-notes">登录后高清播放更流畅</p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
              <el-form-item prop="loginparam">
                <el-input type="text" v-model="ruleForm.loginparam" auto-complete="off" placeholder="账号"></el-input>
              </el-form-item>
              <el-form-item prop="Pwd">
                <el-input type="password" v-model="ruleForm.Pwd" auto-complete="off" placeholder="密码"></el-input>
              </el-form-item>
              <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
              <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
                <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
              </el-form-item>
              <div class="check">
                <router-link tag="span" to="/password" class="check-list">忘记密码?</router-link>
                <span class="line">|</span>
                <router-link tag="span" to="/register" class="check-list">注册账号</router-link>
              </div>
            </el-form>
          </div>
      </div>
  </section>
</template>

<script>
import Vue from 'vue'
import { requestLogin } from 'api/api'
export default {
  data() {
    return {
      logining: false,
      newToken:'',
      user:'',
      ruleForm: {
        LoginType:'1',
        loginparam:'',
        Pwd:'',
        serialno:''
      },
      rules: {
        loginparam: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        Pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
      checked: true
    };
  },
  methods: {
    // ...mapActions([USER_SIGNIN]),
    //获取表单数据
    isLogin(){
      this._init();
      let self = this
      let url = '/api0/AAA/loginFromUAP'
      self.$http({
        methods: 'get',
        url: url,
        params: {
          LoginType: 1,
          loginparam: self.ruleForm.loginparam,
          Pwd: self.$md5(self.ruleForm.Pwd),
          serialno: self.ruleForm.serialno,
          terminalID: ''
        }
      })
      .then((res)=>{
        if(res.data.status == '0'){
          // console.log(res.data);
          self.newToken = res.data.data.newToken
          self.user = res.data.data.userName;
          // self.USER_SIGNIN(self.ruleForm)
          // console.log(self.USER_SIGNIN(self.ruleForm))
          sessionStorage.setItem('flag',self.newToken)
          sessionStorage.setItem('user',self.user)
          self.$router.replace({ path: '/' })
          setTimeout(() => {
            location.reload()
          }, 100)
        }else{
          self.$message('登录失败，请重新登录');
        }
      })
    },
    //获取serialno流水号
    _init(){
      let self = this
      let url = '/api0/AAA/serialNoFromUAP'
      self.$http({
        methods: 'get',
        url: url,
        params: {
        }
      })
      .then((res)=>{
          this.ruleForm.serialno = res.data.data.serialno;
          console.log(this.ruleForm.serialno)
      })
    },
    handleSubmit2(){
      //this.$md5(this.ruleForm.Pwd)
      this.isLogin();
    }
  },
  created(){

  }
}
</script>

<style scoped>
.login-wrap .login{ width: 100%; height: 100%; }
.login-box{ width: 622px; height: 420px; margin: 140px auto 90px;  padding: 0px; border: 1px solid rgba(0,0,0,.1); z-index: 10; overflow: hidden; }
.top{ width: 100%; height: 51px; background: #333; line-height: 51px; text-align: center; color: white; font-size: 18px; }
.tips-notes{ margin: 8px 0 30px 0; font-size: 24px; line-height: 30px; color: #333; text-align: center; zoom: 1; }
.tips-txt { margin-top: 30px; font-size: 14px; line-height: 22px; color: #a2a2a2; text-align: center; zoom: 1; }
.el-input{ width: 258px; }
.el-form{ position: absolute; left: 50%; margin-left: -130px; }
.el-button{ margin-top: 10px; }
.check{ display: inline-block; vertical-align: middle; color: #26a; }
.check-list { cursor: pointer; }
.check .line { margin: 0 10px; }
</style>
