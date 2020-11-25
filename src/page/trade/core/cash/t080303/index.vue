<template>
    <!--page每个页面的root元素-->
    <fox-page >
        <!--page内容区域-->
        <fox-footer-bar align="right">
            <fox-button @click="CT_ReadMsgCard">读卡</fox-button>
            <fox-button @click="CT_ReadIDCard">读证</fox-button>
            <fox-button @click="onSubmit">提交</fox-button>
            <fox-button @click="onCancel">取消</fox-button>
        </fox-footer-bar>
        <fox-content>
            <fox-group column="2" title="基础信息">
                <fox-text-item id="1" require v-model="hbh"  @keyup.enter.native="nextInput">货币号</fox-text-item>
                <fox-empty-item></fox-empty-item>
                <fox-text-item id="2" v-model="zhh" @keydown.enter.native="nextInput">账/卡号</fox-text-item>
                <fox-text-item id="3" v-model="xuh" @blur="showcustomerinfo" @keydown.enter.native="nextInput">序号</fox-text-item>
            </fox-group>            
            <fox-group column="2" style="margin-top: 0px;" >
                <fox-group sub="true" column="1">
                    <fox-money-item id="4" v-model="je" decimal-length="2" span="1.9" unit="元" style="flex:1" @keydown.enter.native="nextInput" >金额</fox-money-item>
                    <fox-select-item id="5" require v-model="isdz" span="1.9" source="@f07013.json" @visible-change="selectNext"> 是否打折</fox-select-item>
                </fox-group>
                <fox-group sub="true" column="1">
                    <fox-item>
                         <span class="my-tip">存款</span>
                    </fox-item>
                </fox-group>
            </fox-group>
            <fox-group column="2" style="margin-top: 0px;">
                <fox-select-item require id="6" v-model="zy" source="@f07015.json" @visible-change="selectNext">摘要</fox-select-item>
                <fox-text-item v-model="xjly" id="7" @keydown.enter.native="nextInput">现金来源</fox-text-item>
                <fox-select-item require id="8" v-model="zjlx" source="@f07016.json" @visible-change="selectNext">证件类型</fox-select-item>
                <fox-text-item v-model="zjhm" id="9" @keydown.enter.native="nextInput">证件号码
                    <i slot="suffix" class="el-input__icon el-icon-thumb" @click="showInfo"></i>
                </fox-text-item>
            </fox-group>
            <fox-group column="2" title="代理人信息">
                <fox-select-item require v-model="dlrzjlx" id="10" source="@f07016.json" @visible-change="selectNext">证件类型</fox-select-item>
                <fox-text-item v-model="dlrzjhm" id="11" @keydown.enter.native="nextInput">证件号码
                    <i slot="suffix" class="el-input__icon el-icon-thumb" @click="showInfo"></i>
                </fox-text-item>
                <fox-text-item v-model="dlrxm" id="12" @keydown.enter.native="nextInput">姓名</fox-text-item>
                <fox-text-item v-model="dlrphone" id="13" @keydown.enter.native="nextInput">联系电话</fox-text-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
import { pdf4Base64 } from '@/utils/custom/tools'

export default {
    name: 't080303',
    // 数据
    data: function() {
        let id = ''
        return {
            hbh: '',
            zhh: '',
            xuh: '',
            je: '',
            isdz: '',
            zy: '',
            xjly: '',
            zjlx: '',
            zjhm: '',
            dlrzjlx: '',
            dlrzjhm: '',
            dlrxm: '',
            dlrphone: '',
            infoDialog: false,
        }
    },
    // 方法
    methods: {
        aaa(ev) {
            console.log(ev)
        },
        firstInput(ev) {
            console.log(ev)
            let el = document.activeElement
            let currId = el.getAttribute('id')
            if(!currId && ev.keyCode != 13) document.getElementById('1').querySelector('input').focus()
            if(ev.keyCode == 13 && !currId && this.infoDialog)this.fox_send('/trade/pub/showcustomerinfo', 'close', true)
        },
        onSubmit() {
            let authType = 'local'
            if(this.je.length > 0 && parseInt(this.je, 10) > 100000) {
                authType = 'remote'
            }
            window.removeEventListener('keypress', this.firstInput)
            this.fox_submit({
                tradeInfo: { tradeCode: 't080303', tradeName: '现金存款' },
                foreAuthType: authType,
            })
            // this.fox_submit()
        },
        onCancel() {
            fox.custom.closePage(this)
        },
        closePage() {
            // fox.custom.closePage(this)
        },
        addKeyEvent() {
            window.addEventListener('keypress', this.firstInput, false)
        },
        removeKeyEvent() {
            window.removeEventListener('keypress', this.firstInput)
        },
        selectNext(val) {
            console.log(val)
            if(!val) this.nextInput()
        },
        nextInput() {
            let el = document.activeElement
            let currId = el.getAttribute('id')
            if(currId == '3') {
                el.blur()
                return
            } 
            if(currId == '13') {
                this.onSubmit()
                return
            }
            const next = document.getElementById(`${Number(currId) + 1}`).querySelector('input')
            this.$nextTick(() => next.focus())
        },
     
        showInfo() {
            alert('123')
        },
        showcustomerinfo() {
            setTimeout(() => {
                fox.custom.appendPage(this, '/trade/pub/showcustomerinfo', '账户信息', {}, this.$data, () => {
                    console.log('打开了')
                    console.log(this)
                    this.infoDialog = true
                }, () => { 
                    console.log('关闭了')
                    const next = document.getElementById('4').querySelector('input')
                    this.infoDialog = false
                    this.fox_send('my-main', 'showInfo', true)
                    this.$nextTick(() => next.focus())
                })
            }, 100)
        },
        CT_ReadIDCard() {
            let that = this
            fxBridge.exec({
                service: 'deviceProxy',
                action: 'Call',
                data: ['multi', 'CT_ReadIDCard', ['C:\\IdImage.jpg']],
                async: true,
                callback: function(data, data1) {
                    console.info(data1); console.info(data)
                    // {"RespCode":0,"Data":"{\"PhotoInfo\":\"D:\\\\ppp.jpg|\",\"PersonInfo\":\"0|强鑫|男|汉|19950310|江苏省溧阳市上兴镇万家边村委东岗村35号|32048119950310481X|溧阳市公安局|20110829|20210829||\"}"}
                    data1 = JSON.parse(data1)
                    if(data1.RespCode == 0) {
                        const list = data1.Data.PersonInfo.split('|')
                        that.zjhm = list[6]
                    }
                },
            })
        },
        CT_ReadMsgCard() {
            let that = this
            // 打开串口
            fxBridge.exec({ 
                service: 'deviceProxy', 
                action: 'Call', 
                data: ['multi', 'PBOC_COMMAND_Signle', ['ST51U000010300000']], 
                async: true, 
                callback: function(data, data1) {
                    console.info(data1); console.info(data)
                    // 上电
                    fxBridge.exec({ 
                        service: 'deviceProxy',
                        action: 'Call', 
                        data: ['multi', 'PBOC_COMMAND_Signle', ['ST51U000010010000']],
                        async: true, 
                        callback: function(data, data1) {
                            console.info(data1); console.info(data)
                            // 测试PPSC
                            fxBridge.exec({
                                service: 'deviceProxy', 
                                action: 'Call', 
                                data: ['multi', 'PBOC_COMMAND_Signle', ['ST51U00001003000100']],
                                async: true, 
                                callback: function(data, data1) {
                                    console.info(data1); console.info(data)
                                    // 卡片信息
                                    fxBridge.exec({ 
                                        service: 'deviceProxy', 
                                        action: 'Call', 
                                        data: ['multi', 'PBOC_COMMAND_Signle', ['ST51U000010080000']], 
                                        async: true, 
                                        callback: function(data, data1) {
                                            console.info(data1); console.info(data)
                                            // {"RespCode":0,"Data":"100800426217001330006220663 &0156&  &140802&240831"}
                                            data1 = JSON.parse(data1)
                                            that.zhh = data1.Data.substring(8, 28).trim()
                                        }, 
                                    })
                                },
                            })
                        }, 
                    })
                }, 
            })
        },

        getPdf() {
            // http://170.100.136.136:8080/icsp-app-paperless/api/btopSealDef/createPdf
            const args = { app: backend.paperless, url: 'api/btopSealDef/createPdf', data: {} }
            return fox.custom.promise(args).then((res) => {
                pdf4Base64({ id: '20', data: res.data.base64 })
            })
        },
    },

    // Fox流程
    fox_flow() {
        return {
            /**
       *  界面渲染后，更改数据会触发钩子函数
       * @param session
       * @param context
       */   
            mounted(session, context) {
                this.addKeyEvent()
                context.resolve()
            },

            /**
       * 销毁处理
       */
            beforeDestroy(session) {
                this.removeKeyEvent()
            },

            /**
       * 消息
       * @param type
       * @param data
       */
            onMessage(type, data) {},

            /**
       * 设置检查条件
       * @param context
       */
            setCheckConditions(context) {
                // 触发check函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
       * 提交前处理
       * @param context
       * @param checkResult
       */
            preSubmit(context, checkResult) {
                console.info('pre submit流程')
                // 触发submit函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
       * 提交处理
       * @param context
       * @param args
       */
            submit(context) {
                console.info('执行提交动作')
                let path = '/trade/pub/voucher'
                let attrs = {
                    top: '3vh',
                    width: '60%',
                    title: '凭证',
                }
                // let syncData = {
                //     // path: './static/pdf/ide.pdf',
                //     path: '',
                // }
                // 打开凭证s页面
                fox.custom.appendPageWithResult(
                    this, path, attrs, {}, {}, (code, rsp) => {
                        // 触发post submit函数调用(必须执行context.resolve或context.reject)
                        context.resolve()
                    },
                )
            },
            postSubmit(context) {
                fox.custom.closePage(this)
            },
        }
    },
   
}
</script>

<style scoped>

.my-tip{
    font-size:54px;
    color:red;
    margin-left: 60px;
}

</style>