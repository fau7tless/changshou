<template>
    <!--page每个页面的root元素-->
    <fox-page>
        <fox-content>
            <div>南天柜外清</div>
            <div>
               <fox-button @click="GWQ_GetPwd">密码</fox-button>
               <div>{{pwd}}</div><br/><br/>
               <fox-button @click="GWQ_CallShowPDF">签字</fox-button>
            </div>
            <br/>
            <br/>
            <div>升腾柜内清</div>
            <div>
                <fox-button @click="CT_ReadIDCard">读身份证</fox-button>
                <div>{{idNo}}</div><br/><br/>
                <fox-button @click="CT_ReadMsgCard">读磁条卡</fox-button>
                <div>{{cardNo}}</div><br/><br/>
            </div>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'T0001',
    // 数据
    data() {
        return {
            pwd: '',
            idNo: '',
            cardNo: '',
        }
    },
    // 方法
    methods: {
        GWQ_GetPwd() {
            let that = this
            fxBridge.exec({
                service: 'deviceProxy',
                action: 'Call',
                data: ['multiout', 'GWQ_NonEpt_ReadPin', ['0', '2048']],
                async: true,
                callback: function(data, data1) {
                    console.info(data1); console.info(data)
                    // {"RespCode":0,"Data":"123456"}
                    data1 = JSON.parse(data1)
                    if(data1.RespCode == 0) that.pwd = data1.Data
                },
            })
        },
        GWQ_CallShowPDF() {
            fxBridge.exec({
                service: 'deviceProxy',
                action: 'Call',
                data: ['multiout', 'GWQ_CallShowPDF', ['50', '0', 'C:\\yusys.pdf', '100,100,100,100', 'C:\\sign.pdf']],
                async: true,
                callback: function(data, data1) {
                    console.info(data1); console.info(data)
                },
            })
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
                    // {"RespCode":0,"Data":"{\"PhotoInfo\":\"D:\\\\ppp.jpg|\",\"PersonInfo\":\"0|张三|男|汉|19990218|江苏省XX市|32048119990218037X|苏州市公安局|20110829|20210829||\"}"}
                    data1 = JSON.parse(data1)
                    if(data1.RespCode == 0) {
                        const list = data1.Data.PersonInfo.split('|')
                        that.idNo = list[6]
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
                                            data1 = JSON.parse(data1)
                                            that.cardNo = data1.Data.substring(8, 28).trim()
                                        }, 
                                    })
                                }, 
                            })
                        },
                    })
                },
            })
        },
    },
}
</script>

<style scoped>
</style>