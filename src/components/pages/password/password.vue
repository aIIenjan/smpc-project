<template>
  <section class="wrap wrap-passworg">
    <div class="password">
      <div class="passwordlogo">
        <img src="/static/common/images/logo1.png" alt="">
        <router-link to="/" class="appVue">首页</router-link>
      </div>
      <div class="password-text">
        <div class="top">
          <h3 class="title">找回密码</h3>
        </div>
        <div class="content">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="登录名：" prop="pass">
              <el-input type="text" v-model.trim="ruleForm.phoneNum" @input.native=" importPhone " auto-complete="off" placeholder="请输入手机号"></el-input>
              <el-button type="primary" class="sendCode"  :class=" isDisabled ? 'btn' : 'btnDisabled' " v-html=" isDisabled ?  '发送验证码': checkTime " @click.native.prevent="getNumber">发送验证码</el-button>
            </el-form-item>
            <el-form-item prop="randomCode">
              <el-input type="text" @input.native=" importPhone " v-model="ruleForm.randomCode" auto-complete="off" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item prop="newPwd">
              <el-input type="password" v-model="ruleForm.newPwd" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="btn" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    // var validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入账号'));
    //   } else {
    //     if (this.ruleForm.checkPass !== '') {
    //       this.$refs.ruleForm.validateField('checkPass');
    //     }
    //     callback();
    //   }
    // };

    return {
      checkTime: 60,
      isDisabled: 1,
      ruleForm: {
        phoneNum: "",
        randomCode: "",
        newPwd: "",
        serialNo: ""
      },

      rules: {
        phoneNum: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        newPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        randomCode: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      checked: true
    };
  },

  methods: {
    //获取流水号
    getSerial() {
      let url = "/api0/AAA/serialNoFromUAP";
      this.$http.get(url).then(res => {
        this.ruleForm.serialNo = res.data.data.serialno;
      });
    },

    //输入时调用只能输入数字
    importPhone(el) {
      let patt = /[^\d]/;
      el.target.value = el.target.value.replace(patt, "");
    },

    // submitForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       alert("submit!");
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },

    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },

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
      // let url = '/api/PortalServer-App/new/aaa_usr_usr005'
      let url = "/api0/AAA/aaaSendRandomCodeUAP";
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
        //清除计时器
        clearTimeout(this.keys);
        this.isDisabled = 1;
        document.querySelector(".sendCode").innerHTML = "重新发送";

        this.checkTime = 60;
      }
    },

    //认证是否是手机号
    checkPhone(num) {
      let patt = /^1(3|8|7|5)\d{9}$/;
      return patt.test(num) ? true : false;
    },

    //简单密码判断
    checkPwd(val) {
      let pass = /^(\w){6,20}$/;
      return pass.test(val) ? true : false;
    },

    resetForm() {
      this.getSerial();
      if (
        this.ruleForm.randomCode != "" &&
        this.ruleForm.phoneNum != "" &&
        this.ruleForm.newPwd != ""
      ) {
        this.isRegister();
      } else {
        this.$message.warning("请输入完成后再重置密码");
        return false;
      }
    },
    //提交数据
    isRegister() {
      if (!this.checkPwd(this.ruleForm.newPwd)) {
        this.$message.warning("密码不符合规则！请重新输入");
        this.ruleForm.newPwd = "";
        return false;
      }

      // let url = "/api/PortalServer-App/new/aaa_usr_usr007";
      let url = "/api0/AAA/aaaResetPasswordUAP";
      let self = this;
      self
        .$http({
          method: "post",
          url: url,
          params: {
            phoneNum: self.ruleForm.phoneNum,
            randomCode: self.ruleForm.randomCode,
            newPwd: self.$md5(self.ruleForm.newPwd), //密码加密
            serialNo: self.ruleForm.serialNo
          }
        })
        .then(res => {
          if (res.data.status == "0000") {
            this.$confirm('重置密码成功,是否跳转到登录页面？')
            .then(_ => {
                this.$router.push({ name: "login" });
                done();
             })
            .catch(_ => {});

            
            this.ruleForm.newPwd = "";
            this.ruleForm.randomCode = "";
          } else {
            this.$message.warning(res.data.errorMessage);
          }
        });
    }
  }
};
</script>

<style scoped>
.wrap-passworg {
  padding-top: 90px;
}
.password {
  width: 847px;
  height: 437px;
  margin: 0 auto;
  padding: 50px 0 100px;
}
.passwordlogo {
  height: 27px;
  width: 100%;
}
.passwordlogo img {
  height: 27px;
}
.passwordlogo .appVue {
  float: right;
  line-height: 27px;
  color: #333;
}
.password-text {
  margin-top: 10px;
}
.password-text .top {
  border-top: 2px solid orangered;
  height: 88px;
  text-align: center;
  line-height: 88px;
  font-size: 22px;
}
.password .content {
  padding: 60px 0 270px;
  border-top: 1px #f2f2f5 solid;
  background: #fafafa;
  border-radius: 0 0 4px 4px;
}
.el-input {
  width: 200px;
}
.el-form {
  position: absolute;
  left: 50%;
  margin-left: -200px;
}
.btn {
  width: 127px;
}
.btnDisabled {
  border-color: #aaa;
  background: #aaa;
  cursor: no-drop;
}
</style>
