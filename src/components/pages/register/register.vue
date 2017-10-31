<template>
  <section class="wrap login-wrap">
    <div class="login">
      <div class="login-box">
        <div class="top">帐号密码注册</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
          <el-form-item prop="phoneNum" class="btn0">
            <el-input type="text"  v-model.trim="ruleForm.phoneNum" @input.native=" importPhone " auto-complete="off" placeholder="请输入手机号" ></el-input>
            <el-button type="primary"   class="sendCode"  :class=" isDisabled ? 'btn' : 'btnDisabled' " v-html=" isDisabled ?  '发送验证码': checkTime " @click.native.prevent="getNumber" :loading="logining" ></el-button>
          </el-form-item>
          <el-form-item prop="token">
            <el-input type="text" @input.native=" importPhone " v-model="ruleForm.token" auto-complete="off" placeholder="请输入验证码"></el-input>
          </el-form-item>
          <el-form-item prop="Pwd">
            <el-input type="password"  v-model="ruleForm.Pwd" auto-complete="off" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">注册</el-button>
          </el-form-item>
        </el-form>
        <div class="check">
          <router-link to="/login">登录</router-link>
          <span>|</span>
          <router-link to="/">首页</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { requestLogin } from "api/api";

export default {
  data() {
    return {
      logining: false,
      checkTime: 60,
      isDisabled: 1,
      ruleForm: {
        regtype: 1,
        regparam: "",
        assistparam: "",
        Pwd: "",
        serialno: "",
        phoneNumber: "",
        token: "",
        phoneNum: ""
      },
      rules: {
        phoneNum: [
          { required: true, message: "请输入手机号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        Pwd: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ],
        token: [
          { required: true, message: "请输入验证码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  
  methods: {
    //获取流水号
    getSerial() {
      let url = "/api0/AAA/serialNoFromUAP";
      this.$http.get(url).then(res => {
        this.ruleForm.serialno = res.data.data.serialno;
      });
    },

    //输入时调用只能输入数字
    importPhone(el) {
      let patt = /[^\d]/;
      el.target.value = el.target.value.replace(patt, "");
    },

    //提交数据
    isRegister() {
      if (!this.checkPwd(this.ruleForm.Pwd)) {
        this.$message.warning("密码不符合规则！请重新输入");
        this.ruleForm.Pwd = "";
        return false;
      }

      let url = "/api0/AAA/registerFromUAP";
      let self = this;
      self
        .$http({
          method: "post",
          url: url,
          params: {
            regtype: 1,
            assistparam: "",
            regparam: self.ruleForm.phoneNum, //字符串注册参数根据regtype的不同传具体的值
            Pwd: self.$md5(self.ruleForm.Pwd), //密码加密
            serialno: self.ruleForm.serialno,
            phoneNumber: self.ruleForm.phoneNum,
            token: self.ruleForm.token
          }
        })
        .then(res => {
          // console.log(res.data)
          if (res.data.status == "0000") {
            this.$message("注册成功");
            this.$router.push({ name: "login" });
          } else {
            this.$message.warning(res.data.errorMessage);
          }
        });
    },
    //点击注册
    handleSubmit() {
      this.getSerial();

      if (
        this.ruleForm.token != "" &&
        this.ruleForm.phoneNum != "" &&
        this.ruleForm.Pwd != ""
      ) {
        this.isRegister();
      } else {
        this.$message.warning("请输入完成后再注册");
        return false;
      }
    },

    //点击调用验证码
    getNumber() {
      if (this.ruleForm.phoneNum == "") {
        this.$message.warning("手机号为空！");
        return;
      } else {
        this.checkPhone(this.ruleForm.phoneNum)
          ? this.isgetCode()
          : this.$message.warning("您输入的手机号格式有误！");
      }
    },

    //获取验证码数据
    isgetCode() {
      if (this.checkTime < 60) {
        return;
      }
      let self = this;
      let url = "/api0/AAA/aaaSendRandomCodeUAP";
      // url = url + '?phoneNum='+this.ruleForm.phoneNum;
      self
        .$http({
          methods: "get",
          url: url,
          params: {
            phoneNum: self.ruleForm.phoneNum
          }
        })
        .then(res => {
          if (res.data.status == "0") {
            this.$message.success("验证码发送成功，请注意查收！");

            self.isDisabled = 0;
            self.getverifytime();
            self.keys = setInterval(self.getverifytime, 1000);
          } else {
            this.$message.error("验证码发送失败，请重新发送！");
          }
        });
    },
    //禁用按钮 倒计时
    getverifytime() {
      
      this.checkTime--;

      if (this.checkTime == 0) {
        clearTimeout(this.keys);
        this.isDisabled = 1;
        document.querySelector(".sendCode").innerHTML = "重新发送";

        this.checkTime = 60;
      }
    },

    
    checkPhone(num) {
      let patt = /^1(3|8|7|5)\d{9}$/;
      return patt.test(num) ? true : false;
    },

    //简单密码判断
    checkPwd(val) {
      let pass = /^(\w){6,20}$/;
      return pass.test(val) ? true : false;
    }
  },

};
</script>

<style scoped>
.login-wrap .login {
  width: 100%;
  height: 100%;
}
.login-box {
  width: 622px;
  height: 350px;
  margin: 140px auto 90px;
  z-index: 10;
  padding: 0px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.top {
  width: 100%;
  height: 51px;
  background: #4C4C4C;
  color: #fff;
  line-height: 51px;
  text-align: center;
  font-size: 18px;
  margin-bottom: 20px;
}
.tips-txt {
  margin: 30px 0 20px 0;
  font-size: 14px;
  line-height: 22px;
  color: #a2a2a2;
  text-align: center;
  zoom: 1;
}
.el-input {
  width: 258px;
}
.btn0 {
  position: relative;
}
.btn {
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 0 5px 5px 0;
  background: #20A0FF;
}
.btnDisabled {
  border-color: #aaa;
  background: #aaa;
  cursor: no-drop;
}
.el-form {
  position: absolute;
  left: 50%;
  margin-left: -130px;
}
.check {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 16px;
}
</style>
