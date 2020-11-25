<template>
  <div class="login_wrapper">
    <div class="login">
      <fox-form class="fox-form">
        <div class="leftContainer">
          <div class="backgroundImgContainer"></div>
          <!-- img src="" class="backgroundImg" alt=""-->
          <div class="imgLogoContainer">
            <img src="../../../assets/themes/gold/img/logo.png" alt>
          </div>
          <p class="leftTitle">综合业务系统</p>
          <p class="welcomeMessage1">欢迎来到</p>
          <p class="welcomeMessage2">北京宇信科技集团股份有限公司</p>
          <p class="welcomeMessage3">智能渠道事业部</p>
        </div>
        <div class="rightContainer">
          <p class="title">欢迎登录综合业务系统</p>
          <div class="form">
            <div class="formInputContainer">
              <fox-text-item
                id="userId"
                class="itemWidth"
                v-model="userId"
                @blur="checkIdBack"
                @keydown.enter.native="idBlurEnterKeyDown"
              >用户账号</fox-text-item>
              <fox-select-item
                class="itemWidth"
                v-model="loginOrg"
                :source="orgListJson"
                placeholder="请选择"
                suffix-icon="el-icon-arrow-down"
              >机构编号</fox-select-item>
              <fox-select-item
                class="itemWidth"
                v-model="loginType"
                disabled="disabled"
                source="@ftest005.json"
              >登录方式</fox-select-item>
              <fox-text-item
                id="userPwd"
                class="itemWidth"
                :disabled="usePwd"
                v-model="certPass"
                show-password
                @keydown.enter.native="login"
              >登录密码</fox-text-item>
            </div>
            <!-- 提醒内容 -->
            <div class="tips">
              <div class="tipsMessage" v-if="m_errorInfo.isShowError">
                <i class="el-icon-error"></i>
                <span>{{m_errorInfo.text}}</span>
              </div>
            </div>
            <div class="buttonContainer">
              <span type="button" @click="login">登 录</span>
            </div>
          </div>
        </div>
      </fox-form>
    </div>
  </div>
</template>

<script>
export default {
    name: 'login',
    props: {},
    data() {
        return {
            // 新写的自己用的
            userId: 'admin',
            loginType: '',
            loginOrg: '',
            orgList: [],
            orgListJson: [],
            usePwd: false,
            language: 'zh_cn',
            certPassDisabled: false,
            password: 'aaa',
            // 签名串
            certPass: '',
            signature: '',
            // 证书类型
            // certType: 'SM2',
            certType: 'RSA',
            publicKey:
        'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrDUHc85ADQVxXRP4M90nqttWoZctV6JJVVdPjIle5vd9G2/4kgIh'
        + 'Nc78Jd+ENxg+n4Gj9UMwNhJmb2jnMaW3zyGB+qi/ZrMO5dEUhW8salirzRgGg/4Arz4ObPmCWlZsws3Ij/3IEsFD3vMdIZD2j8b33DAbj47PjcCcMbtHYuQIDAQAB',
            privateKey: '',
            m_errorInfo: {
                text: '操作员密码错误，请重新输入！',
                isShowError: false, // 显示错误提示
            },
            needCertPassword: true,
            m_loginAcctList: [],
            m_loginCertList: [],
            m_loginOperCodeList: [],
        }
    },
    mounted() {
    // document.onkeydown = (event) => {
    //     let e = event || window.event || arguments.callee.caller.arguments[0]
    //     if (e && e.keyCode == 13 && this.$route.path == '/login') {
    //         console.log('enter 键')
    //         // enter
    //         this.login()
    //     }
    // }
    // 清理环境
        this.clearEvn()
    // this.initRequestUrl()
    },
    methods: {
        // 登录
        login() {
            let that = this
            // 发起登录服务请求
            fox.service.request({
                // app: backend.uaa,
                // app: backend.uniformRules,
                path: '/demo/login/login',
                // contentType: 'application/x-www-form-urlencoded',
                // path: 'oauth/token',
                // headers: {
                //     "Authorization": "Basic d2ViX2FwcDo=",
                // },
                data: {
                    username: 'admin',
                    password: that.calPwd(that.certPass),
                    // password: "cRvfwLTAeJ9aQpy1BwvK+LtZvDv9inWJV10z2P5NSDD+tJYLqIA1ODgs6vObN3YULcuyeTmQfinbRbAWk8KwBkLZz2aztsK+t19USQH4Pa6B+qS0jf1+qJEn8ozELqvidWsvRg/2LTsQok7QZEgbfmD10J0izPNRafUdqd04G/8=",
                    grant_type: 'password',
                    passwordType: '2',
                    sysId: 'btop',
                    // username: this.formLogin.loginName,
                    // password: this.formLogin.password,
                },
            }).then((response) => {
            // if (response.code === 0) {
            //     console.log("kkk: " + response.data.access_token)
            //     if (response.data.access_token === undefined) {
            //         this.$message.error(`登录失败：${response.data.message}`)
            //         return;
            //     }
            // }
                let userInfo = {
                    userName: '独孤小萱',
                    userAvatar: './static/img/avatar.png',
                    userId: '002913',
                    loginCode: '1',
                    userCode: '777777',
                    loginType: '0',
                    orgName: '常熟银行总行',
                }
                fox.session.setUserInfo(userInfo)
                // fox.sessionStorage.put('global_user', userInfo)
                // fox.userInfo.setName('王小明')
                fox.service.request({
                    id: 'menuandcontr',
                    // url: 'http://47.98.125.109:9200/api/user/menuandcontr',
                    path: '/mock/login/getMenuList',
                    callback: function(code, message, data, ...params) {
                        if (code == 0) {
                            if (fox.type(data) == 'object') {
                            // 历史记录
                                let historyRecords = [
                                    {
                                        text: '现金存款',
                                        path: '/trade/core/cash/t080303',
                                        name: undefined,
                                    },
                                    {
                                        text: '规则组件查询',
                                        path: '/rules/rule-component-query',
                                        name: undefined,
                                    },
                                    {
                                        text: '公共规则配置',
                                        path: '/rules/public-rule',
                                        name: undefined,
                                    },
                                    {
                                        text: '服务规则配置',
                                        path: '/rules/service-rule',
                                        name: undefined,
                                    },
                                    {
                                        text: '场景规则配置',
                                        path: '/rules/scene-setting',
                                        name: undefined,
                                    },
                                ]
                                // 通讯返回值存入session
                                fox.sessionStorage.put(
                                    'global_historyRecords',
                                    historyRecords,
                                )
                                console.log(params[0])
                                if (params[0].responseCode == 200) {
                                    let res = that.toSideBar(data.menus)
                                    // 加入首页
                                    res.splice(0, 0, {
                                        path: '/dashboard',
                                        name: 'dashboard',
                                        index: 'A0',
                                        icon: 'el-icon-home',
                                        text: '首页',
                                    })
                                    fox.sessionStorage.put('global_menus', res)
                                    that.$router.to('/frame')
                                }
                            }
                        } else {
                            //
                        }
                    },
                })
            })
        },
        // 检查证书和证书密码
        checkCertPass() {
            let that = this
            this.certDn = ''
            if (this.certPass.trim() == '') {
                that.m_errorInfo.isShowError = true
                that.m_errorInfo.text = '用户密码不能为空'
                setTimeout(() => {
                    that.m_errorInfo.isShowError = false
                    that.m_errorInfo.text = ''
                }, 5000)
            } else {
                let cert = that.safetyCert
                let certPassTemp = that.certPass
                let arr = []
                arr.push(cert)
                arr.push(certPassTemp)
                let arrTemp = arr.toString()
                if (window.fxBridge.isNativeSupport()) {
                    fox.native.call('confirmPassword', arrTemp, (code, message, data) => {
                        if (data == 'False') {
                            that.certPass = ''
                            that.m_errorInfo.text = '证书密码错误，请重新输入！'
                            that.m_errorInfo.isShowError = true
                            setTimeout(() => {
                                that.m_errorInfo.text = ''
                                that.m_errorInfo.isShowError = false
                            }, 5000)
                        } else {
                            that.getCertDn()
                        }
                    })
                }
                console.log('检查证书和证书密码')
            }
        },
        // 转换为menu菜单（要求父亲节点必须孩子节点的前面）
        toSideBar(data) {
        // let data = JSON.parse(JSON.stringify(list))
            let result = []
            if (!Array.isArray(data)) {
                return result
            }
            //
            //
            //
            let map = {}
            let list = []
            data.forEach((item) => {
                let newItem = {
                    parent: item.upMenuId,
                    index: item.menuId,
                    icon: item.menuIcon,
                    text: item.menuName,
                    path: item.funcUrl,
                    name: undefined,
                }
                list.push(newItem)
                map[item.menuId] = newItem
            })
            list.forEach((item) => {
                let parent = map[item.parent]
                if (parent) {
                    item.index = `${parent.index}/${item.index}`;
                    (parent.children || (parent.children = [])).push(item)
                } else if (item.parent == '0') {
                    result.push(item)
                } else {
                //
                }
            })
            return result
        },
        toSideBarTemp(data) {
        // let data = JSON.parse(JSON.stringify(list))
            let result = []
            if (!Array.isArray(data)) {
                return result
            }
            //
            //
            //
            let map = {}
            let list = []
            data.forEach((item) => {
                let newItem = {
                    parent: item.upMenuId,
                    index: item.menuId,
                    icon: item.menuIcon,
                    text: item.menuName,
                    path: item.funcUrl,
                    name: undefined,
                    menuOrder: item.menuOrder,
                    actions: item.actions,
                }
                list.push(newItem)
                map[item.menuId] = newItem
            })
            list.forEach((item) => {
                let parent = map[item.parent]
                if (parent) {
                    item.index = `${parent.index}/${item.index}`;
                    (parent.children || (parent.children = [])).push(item)
                } else if (item.parent == '0') {
                    result.push(item)
                } else {
                //
                }
            })
            return result
        },

        // 清理环境
        clearEvn() {
            this.$fox.sessionStorage.remove('global_tags')
            this.$fox.sessionStorage.remove('global_selected')
        },
        // 语言选择
        selectThisLanguage(data) {
            this.$i18n.locale = data
            this.language = data
            localStorage.setItem('_sys_fox_lang', data)
        },
        calPwd(pwd) {
            let encrypt = new JSEncrypt()
            encrypt.setPublicKey(this.publicKey)
            return encrypt.encrypt(pwd)
        },
        checkIdBack() {
            let that = this
            fox.service
                .request({
                // app: backend.oca,
                // path: "api/user/queryuser",
                    path: '/mock/login/queryuser',
                    data: {
                        userId: this.userId,
                    },
                })
                .then(
                    (response) => {
                        if (response.code === 0) {
                            this.orgListJson = []
                            let { data } = response
                            that.loginType = data.loginType

                            // that.$data.loginType = newData.loginType;
                            that.usePwd = that.$data.loginType !== '0'
                            this.orgListJson = data.orgList
                            this.loginOrg = data.loginOrg
                        // for (let key of data.orgList) {
                        //   let temp = {
                        //     text: key.orgName,
                        //     value: key.orgId
                        //   };
                        //   that.$data.orgListJson.push(temp);
                        //   that.loginOrg = key.orgId;
                        // }
                        // for (let i of data.orgList) {
                        //     that.$data.m_loginAcctList.push(i);
                        // }
                        } else {
                            fox.layer.message(`失败:${response.message}`)
                        }
                    // 关闭当前页面
                    // fox.custom.closePage(that)
                    },
                    (error) => {
                        fox.layer.message(`请求异常:${error.message}`)
                        console.log(error.message)
                    },
                )
        },
        idBlurEnterKeyDown() {
            console.log('按下回车失去焦点了吗？')
            let pwd = document
                .getElementById('userPwd')
                .getElementsByTagName('input')[0]
            pwd.focus()
            this.checkIdBack()
        },
        // 初始化语言信息
        initLanguage() {
            this.selectThisLanguage('zh_cn')
            fox.service.request({
                path: '',
                data: {},
            }).then((response) => {
                if (response.code == 0) {
                    let data
                    if (fox.type(response.data) == 'array') {
                        data = JSON.stringify(response.data)
                        console.log(response.data)
                    }
                    // 信息框
                    fox.layer.message('成功')
                } else {
                    fox.layer.message(`失败:${response.message}`)
                }
                // 关闭当前页面
                fox.custom.closePage(that)
            },
            (error) => {
                fox.layer.message(`请求异常:${error.message}`)
                console.log(error.message)
            })
        },
    },
    
    watch: {},
    fox_flow() {
        return {
            created(session) {},
            mounted(session, context) {},
        }
    },
}

</script>

<style>
.login_wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e1e1e1;
}

.login_wrapper .el-atuocomplete {
  position: relative;
  width: 100%;
  display: inline-block;
}

.login_wrapper .login {
  min-width: 800px;
  height: 520px;
  display: flex;
}

.login_wrapper .login .fox-form {
  margin: 0;
  width: 100%;
}

.login_wrapper .login .fox-form .title {
  text-align: center;
  color: #505458;
}

.login_wrapper .login .fox-form .el-form-item__content {
  width: 300px;
}

.login_wrapper .login .fox-form .submit {
  width: 300px;
  margin-top: 20px;
}

.login_wrapper .login .fox-form .el-form {
  margin: 30px 80px 20px 80px;
}

.login_wrapper .login .fox-form .el-form .error {
  display: block;
  text-align: center;
  color: red;
}

.login_wrapper .login .fox-form .lang {
  text-align: center;
}

.login_wrapper .login .fox-form .leftContainer {
  float: left;
  width: 300px;
  height: 520px;
  position: relative;
  color: #e1b48c;
}

.login_wrapper .login .fox-form .leftContainer .backgroundImgContainer {
  position: absolute;
  width: 300px;
  height: 520px;
  background: url("../../../assets/img/login/backgroundImg.png");
  background-color: #e1b48c;
  filter: brightness(0.25);
  background-size: 300px 520px;
}

.login_wrapper .login .fox-form .leftContainer .backgroundImg {
  position: absolute;
  z-index: 100;
  width: 300px;
  height: 520px;
}

.login_wrapper .login .fox-form .leftContainer .imgLogoContainer {
  position: absolute;
  z-index: 100;
  left: 8px;
  top: 8px;
  width: 138px;
  height: 46px;
  background-size: 138px 46px;
}

.login_wrapper .login .fox-form .leftContainer .leftTitle {
  position: absolute;
  z-index: 100;
  top: 184px;
  left: 40px;
  font-size: 24px;
}

.login_wrapper .login .fox-form .leftContainer .welcomeMessage1,
.login_wrapper .login .fox-form .leftContainer .welcomeMessage2,
.login_wrapper .login .fox-form .leftContainer .welcomeMessage3 {
  position: absolute;
  z-index: 100;
  color: #e0b38b;
  font-size: 14px;
  left: 40px;
}

.login_wrapper .login .fox-form .leftContainer .welcomeMessage1 {
  top: 232px;
}

.login_wrapper .login .fox-form .leftContainer .welcomeMessage2 {
  top: 262px;
}

.login_wrapper .login .fox-form .leftContainer .welcomeMessage3 {
  bottom: 43px;
}

.login_wrapper .login .fox-form .rightContainer {
  float: left;
  position: relative;
  padding: 50px 96px 42px 96px;
  width: 308px;
  height: 428px;
  background-color: #ffffff;
}

.login_wrapper .login .fox-form .rightContainer .operateContainer {
  position: absolute;
  top: 16px;
  right: 8px;
}

.login_wrapper .login .fox-form .rightContainer .operateContainer i {
  cursor: pointer;
  font-size: 18px;
  margin-right: 8px;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .operateContainer
  i:nth-child(1) {
  font-size: 16px;
}

.login_wrapper .login .fox-form .rightContainer .operateContainer i:hover {
  color: #eac58b;
}

.login_wrapper .login .fox-form .rightContainer .title {
  color: #404d6a;
  font-size: 24px;
  font-weight: bold;
}

.login_wrapper .login .fox-form .rightContainer .form {
  margin-left: -80px;
}

.login_wrapper .login .fox-form .rightContainer .form .radio {
  margin-top: 28px;
}

.login_wrapper .login .fox-form .rightContainer .form .formInputContainer {
  width: 100%;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .form
  .formInputContainer
  .inputItem {
  position: relative;
  height: 40px;
  padding: 0 12px;
  margin-bottom: 8px;
  background-color: #f7f8fa;
  border-radius: 2px;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .form
  .formInputContainer
  .inputItem
  .leftLogo {
  position: absolute;
  top: 12px;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .form
  .formInputContainer
  .inputItem
  .leftLogo
  img {
  width: 16px;
  height: 15px;
}

.formInputContainer {
  margin-top: 30px;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .form
  .formInputContainer
  .inputItem
  .leftLogo
  .img2 {
  margin-left: 2px;
  width: 13px;
  height: 13px;
  margin-top: 2px;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .form
  .formInputContainer
  .inputItem
  .input {
  position: absolute;
  left: 39px;
  top: 7px;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .form
  .formInputContainer
  .inputItem
  .input
  span {
  width: 240px;
  height: 26px;
  border: none;
  background-color: #f7f8fa;
  font-size: 14px;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .form
  .formInputContainer
  .inputItem
  .input
  input:focus {
  outline: none;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .form
  .formInputContainer
  .inputItem
  .rightLogo {
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .form
  .formInputContainer
  .inputItem
  .rightLogo
  img {
  width: 18px;
  height: 18px;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .form
  .formInputContainer
  .inputItem
  .rightLogo
  .img3 {
  position: absolute;
  margin-bottom: -17px;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .form
  .formInputContainer
  .itemWidth {
  width: 308px;
  margin-bottom: 8px;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .form
  .formInputContainer
  .el-atuocomplete {
  position: relative;
  width: 100%;
  display: inline-block;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .form
  .formInputContainer
  .el-input__inner {
  border: none;
  padding-left: 32px;
  background-color: #f7f8fa !important;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .form
  .formInputContainer
  .el-input__prefix,
.login_wrapper
  .login
  .fox-form
  .rightContainer
  .form
  .formInputContainer
  .el-input__suffix {
  color: #404d6a;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .form
  .formInputContainer
  .el-input--medium
  .el-input__inner {
  height: 40px;
  width: 270px !important;
  line-height: 40px;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .form
  .formInputContainer
  .el-input__prefix,
.login_wrapper
  .login
  .fox-form
  .rightContainer
  .form
  .formInputContainer
  .el-input__suffix {
  top: 2px;
}

.login_wrapper .login .fox-form .rightContainer .select {
  position: absolute;
  top: 242px;
  left: 103px;
  width: 284px;
  min-height: 40px;
  overflow: auto;
  border-radius: 2px;
}

.login_wrapper .login .fox-form .rightContainer .select .selectItem {
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  background-color: #d3cece;
  color: #000000;
  cursor: pointer;
}

.login_wrapper .login .fox-form .rightContainer .select .selectItem:hover {
  background-color: #928282;
  color: #ffffff;
}

.login_wrapper .login .fox-form .rightContainer .tips {
  margin-top: 24px;
  width: 100%;
  color: #e35f6d;
  font-size: 14px;
}

.login_wrapper .login .fox-form .rightContainer .tips .tipsMessage {
  text-align: center;
}

.login_wrapper .login .fox-form .rightContainer .buttonContainer {
  width: 308px;
  height: 42px;
  margin-left: 80px;
}

.login_wrapper .login .fox-form .rightContainer .buttonContainer .button {
  border-radius: 2px;
  width: 100%;
  height: 100%;
  border: none;
  font-weight: bold;
  color: #6f4300;
  font-size: 14px;
  cursor: pointer;
  background: linear-gradient(to right, #f9d7af 0%, #eac58b 100%);
}

.login_wrapper .login .fox-form .rightContainer .buttonContainer .button:focus {
  outline: none;
}

.login_wrapper .login .fox-form .rightContainer .buttonContainer .button:hover {
  background: #eac58b;
}

.login_wrapper .login .fox-form .rightContainer .buttonContainer .button {
  border-radius: 2px;
  width: 100%;
  height: 100%;
  border: none;
  font-weight: bold;
  color: #6f4300;
  font-size: 14px;
  cursor: pointer;
  background: linear-gradient(to right, #f9d7af 0%, #eac58b 100%);
}

.login_wrapper .login .fox-form .rightContainer .buttonContainer span {
  display: block;
  border-radius: 2px;
  width: 100%;
  height: 100%;
  border: none;
  font-weight: bold;
  color: #6f4300;
  font-size: 14px;
  cursor: pointer;
  line-height: 42px;
  text-align: center;
  background: linear-gradient(to right, #f9d7af 0%, #eac58b 100%);
}

.login_wrapper .login .fox-form .rightContainer .buttonContainer input:focus {
  outline: none;
}

.login_wrapper .login .fox-form .rightContainer .buttonContainer input:hover {
  background: #eac58b;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .buttonContainer
  ::-moz-placeholder {
  font-size: 14px;
  color: #9ba2b1;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .buttonContainer
  ::-ms-input-placeholder {
  font-size: 14px;
  color: #9ba2b1;
}

.login_wrapper
  .login
  .fox-form
  .rightContainer
  .buttonContainer
  ::-webkit-input-placeholder {
  font-size: 14px;
  color: #9ba2b1;
}

.radio-beauty-container {
  margin-top: 36px;
  margin-bottom: 12px;
  font-size: 0;
}

.radio-beauty-container .radio-name {
  vertical-align: middle;
  font-size: 14px;
  cursor: pointer;
}

.radio-beauty-container .radioName1 {
  line-height: 14px;
}

.radio-beauty-container .radio-beauty {
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  display: inline-block;
  border: 1px solid #e1b48c;
  vertical-align: middle;
  margin: 0 8px 0 0;
  border-radius: 50%;
}

.radio-beauty-container .radio-beauty:hover {
  box-shadow: 0 0 7px #e1b48c;
  padding: 3px;
  cursor: pointer;
  background-color: #e1b48c;
  background-clip: content-box;
}

.radio-beauty-container input[type="radio"]:checked + .radio-beauty {
  padding: 3px;
  cursor: pointer;
  background-color: #e1b48c;
  background-clip: content-box;
}

.radio-beauty-container .labelMarginRight {
  margin-right: 32px;
}
</style>
