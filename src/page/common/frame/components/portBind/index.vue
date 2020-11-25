<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-content>
      <fox-group class="buttonGroup">
        <div class="eachButton">
          <div class="button" @click="directCall">
            <i class="el-icon-phone"></i>
          </div>
          <p>呼叫</p>
        </div>
        <div class="eachButton">
          <div class="bigbutton" @click="signIn">
            <i class="el-icon-paperclip" v-if="show"></i>
            <p style="font-size:30px;font-weight:bold;line-height:120px">{{currentWork}}</p>
          </div>
          <p>{{changeWork}}</p>
        </div>
        <div class="eachButton">
          <div class="button" @click="reCall">
            <i class="el-icon-phone-outline"></i>
          </div>
          <p>重呼</p>
        </div>
      </fox-group>
      <!-- ---------------------号码行-------------------- -->
      <fox-group class="num">
        <div class="each">
          <label class="currentClient">&nbsp;{{winId}}</label>
          <p>当前窗口号</p>
        </div>
        <div class="each">
          <label class="leftPeople">&nbsp;{{leftPeople}}</label>
          <p>剩余人数</p>
        </div>
      </fox-group>
      <!-- ---------------底部按钮------------------ -->
       
      <div class="bottom" v-if="isShow">
        <div class="bottomButton" @click="callLobbyManager">
          <i class="el-icon-s-custom"></i>
          <p>呼叫大堂</p>
        </div>
        <div class="bottomButton" @click="switchCabinet">
          <i class="el-icon-connection"></i>
          <p>转移</p>
        </div>
        <div class="bottomButton" @click="callNumber">
          <i class="el-icon-document-copy"></i>
          <p>选择呼叫</p>
        </div>
        <div class="bottomButton" @click="discardNumber">
          <i class="el-icon-delete"></i>
          <p>弃号</p>
        </div>
        <div class="bottomButton" @click="windowSignBack">
          <i class="el-icon-switch-button"></i>
          <p>签退</p>
        </div>
      </div>
      <div class="bottom" v-else>
        <fox-button type="primary" size="medium" @click="close">关闭</fox-button>
       </div>
    </fox-content>
  </fox-page>
</template>

<script>
let flag = ''
export default {
    name: 'portBind',
    // 数据
    data: function() {
        return {
            winId: this.$route.params.winId,
            leftPeople: null,
            isShow: this.$route.params.isShow,
            show: this.$route.params.show,
            currentWork: '',
            changeWork: '',
            items: {},
            centerDialogVisible: false,
            customer: false,
        }
    },
    mounted() {},
    // 方法
    methods: {
        close() {
            fox.custom.closePage(this)
        },
        // --------------签到------------------
        signIn(items) {
            fox.service
                .request({
                    app: backend.generatorService,
                    path: 'api/queue/windowSignIn',
                    data: {
                        orgId: '811701',
                        qmId: 'qm1',
                        tellerId: '003931',
                        winId: '2',
                    },
                })
                .then(
                    (response) => {
                        if (response.code == 0) {
                            this.winId = '2'
                            this.isShow = true
                            this.changeWork = '当前办理业务'
                            localStorage.setItem('winId', this.winId)
                            // fox.layer.open(response.data.message);
                        } else {
                            fox.layer.open(`失败:${response.message}`)
                        }
                    },
                    (error) => {
                        fox.layer.open(`请求异常:${error.message}`)
                    },
                )
        },
        // -------------------顺呼-------------
        directCall() {
            fox.service
                .request({
                    app: backend.generatorService,
                    path: 'api/queue/callNumber',
                    data: {
                        orgId: '811701',
                        qmId: 'qm1',
                        tellerId: '003641',
                        winId: '2',
                    },
                })
                .then(
                    (response) => {
                        if (response.code == 0) {
                            let { data } = response
                            this.show = false
                            this.currentWork = data.queueNum
                            this.leftPeople = data.WAITCOUNT
                            if (this.leftPeople == '0') {
                                this.show = true
                                fox.layer.open(data.message)
                            } else {
                                fox.layer.open('呼叫成功')
                                this.customer = true
                            }
                        } else {
                            fox.layer.open(`失败:${response.message}`)
                            this.customer = false
                        }
                    },
                    (error) => {
                        fox.layer.open(`请求异常:${error.message}`)
                        this.customer = false
                    },
                )
        },
        // --------------------------重呼------------
        reCall() {
            fox.service
                .request({
                    app: backend.generatorService,
                    path: 'api/queue/recall',
                    data: {
                        orgId: '811701',
                        qmId: 'qm1',
                        queueNum: 'V001',
                        tellerId: '003641',
                        winId: '2',
                    },
                })
                .then(
                    (response) => {
                        if (response.code == 0) {
                            let data
                            if (fox.type(response.data.loadingKey) == 'array') {
                                data = JSON.stringify(response.data)
                            }
                            // 信息框
                            fox.layer.open('重新呼叫成功')
                        } else {
                            fox.layer.open(`失败:${response.message}`)
                        }
                    },
                    (error) => {
                        fox.layer.open(`请求异常:${error.message}`)
                    },
                )
        },
        // ---------------------呼叫大堂----------------
        callLobbyManager() {
            fox.service
                .request({
                    app: backend.generatorService,
                    path: 'api/queue/recall',
                    data: {
                        orgId: '811701',
                        qmId: 'qm1',
                        type: '1',
                        winId: '2',
                    },
                })
                .then(
                    (response) => {
                        if (response.code == 0) {
                            let data
                            if (fox.type(response.data.loadingKey) == 'array') {
                                data = JSON.stringify(response.data)
                            }
                            // 信息框
                            fox.layer.open('正在呼叫大堂经理')
                        } else {
                            fox.layer.open(`失败:${response.message}`)
                        }
                    },
                    (error) => {
                        fox.layer.open(`请求异常:${error.message}`)
                    },
                )
        },
        // ----------------------转移---------------------------
        switchCabinet() {
            this.centerDialogVisible = true
            fox.service
                .request({
                    app: backend.generatorService,
                    path: 'api/queue/switchCabinet',
                    data: {
                        orgId: '811701',
                        queueNum: 'V002',
                        tellerId: '006043',
                        toQmId: 'qm1',
                        toReanson: '任性',
                        toWinId: '3',
                        winId: '2',
                    },
                })
                .then(
                    (response) => {
                        if (response.code == 0) {
                            let data
                            if (fox.type(response.data.loadingKey) == 'array') {
                                data = JSON.stringify(response.data)
                            }
                            // 信息框

                            fox.layer.open('成功转柜')
                        } else {
                            fox.layer.open(`失败:${response.message}`)
                        }
                    },
                    (error) => {
                        fox.layer.open(`请求异常:${error.message}`)
                    },
                )
        },
        // ----------------------选择呼叫-----------------------
        callNumber() {
            fox.service
                .request({
                    app: backend.generatorService,
                    path: 'api/queue/callNumber',
                    data: {
                        orgId: '811701',
                        qmId: 'qm1',
                        queueNum: 'V003',
                        tellerId: '003641',
                        winId: '2',
                    },
                })
                .then(
                    (response) => {
                        if (response.code == 0) {
                            let data
                            if (fox.type(response.data.loadingKey) == 'array') {
                                data = JSON.stringify(response.data)
                            }
                            // 信息框
                            fox.layer.open('选择呼叫')
                        } else {
                            fox.layer.open(`失败:${response.message}`)
                        }
                    },
                    (error) => {
                        fox.layer.open(`请求异常:${error.message}`)
                    },
                )
        },
        // -----------------------弃号-------------------------
        discardNumber() {
            fox.service
                .request({
                    app: backend.generatorService,
                    path: 'api/queue/discardNumber',
                    data: {
                        orgId: '811701',
                        qmId: 'qm1',
                        queueNum: 'V003',
                        tellerId: '003641',
                        winId: '2',
                    },
                })
                .then(
                    (response) => {
                        if (response.code == 0) {
                            let data
                            if (fox.type(response.data.loadingKey) == 'array') {
                                data = JSON.stringify(response.data)
                            }
                            // ------------确认框------------
                            const h = this.$createElement
                            this.$msgbox({
                                title: '弃号',
                                message: h('p', null, [
                                    h('span', null, '确定要弃号吗？'),
                                    h('i', { style: 'color: teal' }),
                                ]),
                                showCancelButton: true,
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                beforeClose: (action, instance, done) => {
                                    if (action === 'confirm') {
                                        instance.confirmButtonLoading = true
                                        instance.confirmButtonText = '执行中...'
                                        setTimeout(() => {
                                            done()
                                            setTimeout(() => {
                                                instance.confirmButtonLoading = false
                                            }, 100)
                                        }, 800)
                                    } else {
                                        done()
                                    }
                                },
                            }).then((action) => {
                                this.$message({
                                    type: 'info',
                                    message: '弃号 ',
                                })
                            })
                            // 信息框
                            fox.layer.open('弃号')
                        } else {
                            fox.layer.open(`失败:${response.message}`)
                        }
                    },
                    (error) => {
                        fox.layer.open(`请求异常:${error.message}`)
                    },
                )
        },
        // -----------------------签退--------------------------
        windowSignBack() {
            // -----------确定框----------
            const h = this.$createElement
            this.$msgbox({
                title: '签退',
                message: h('p', null, [
                    h('span', null, '确定要签退吗？'),
                    h('i', { style: 'color: teal' }),
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true
                        instance.confirmButtonText = '执行中...'
                        setTimeout(() => {
                            done()
                            setTimeout(() => {
                                instance.confirmButtonLoading = false
                            }, 300)
                        }, 1000)
                    } else {
                        done()
                    }
                },
            }).then((action) => {
                // -------------------------------------------
                fox.service
                    .request({
                        app: backend.generatorService,
                        path: 'api/queue/windowSignBack',
                        data: {
                            orgId: '811701',
                            qmId: 'qm1',
                            tellerId: '003931',
                            winId: '2',
                        },
                    })
                    .then(
                        (response) => {
                            if (response.code == 0) {
                                let data
                                if (fox.type(response.data.loadingKey) == 'array') {
                                    data = JSON.stringify(response.data)
                                }
                            } else {
                                fox.layer.open(`失败:${response.message}`)
                            }
                        },
                        (error) => {
                            fox.layer.open(`请求异常:${error.message}`)
                        },
                    )

                localStorage.removeItem('winId')
                this.isShow = false
                this.show = true
                this.changeWork = '绑定窗口'
                this.currentWork = ''
                this.winId = ''
                this.leftPeople = ''
                fox.layer.open('签退成功')
            })
        },
    // ---------------------------------------------
    },
    destroyed: function() {
    // 引用event proxy
        const ep = fox.eventproxy
        if (this.customer == true) {
            // 呼叫成功则触发事件
            ep.emit('showCustomer', 'jc')
        }
    },
    // fox流程
    fox_flow() {
        return {
            /**
       *  界面渲染后，更改数据会触发钩子函数
       * @param session
       * @param context
       */
            mounted(session, context) {
                context.resolve()
            },
        }
    },
}
</script>

<style scoped>
.buttonGroup {
  display: flex;
  margin-top: 30px;
  justify-content: space-around;
}

.button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ffefd5;
  margin-bottom: 30px;
  margin-top: 36px;
}

.button i {
  color: #d2691e;
  line-height: 60px;
  font-size: 24px;
}
.button:hover {
  background-color: #fff8dc;
}

.bigbutton {
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
  border-radius: 50%;
  background-color: #f5d4a9;
}
.bigbutton:hover {
  background-color: #ffdead;
}
.bigbutton i {
  font-size: 40px;
  font-weight: bold;
  line-height: 120px;
  color: #d2691e;
}
.eachButton {
  text-align: center;
}
.num {
  display: flex;
  justify-content: space-around;
  margin-top: 60px;
}
.num .each {
  text-align: center;
}
.num .each fox-lable {
  font-size: 30px;
  font-weight: bold;
}
.bottomButton {
  width: 50px;
  height: 50px;
  border: none;
  text-align: center;
}
.bottomButton :hover {
  color: orange;
}
.bottomButton p {
  font-size: 10px;
  color: black;
  margin-top: 12px;
}
.bottomButton i {
  font-size: 30px;
  color: #cfab6f;
}
.bottom {
  display: flex;
  justify-content: space-around;
  border-top: 2px solid #eee;
  padding-top: 30px;
  margin-top: 50px;
}
</style>
