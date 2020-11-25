<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-footer-bar align="center">
      <fox-button @click="submitAll">全部提交</fox-button>
      <fox-button @click="addTrade">添加交易</fox-button>
      <fox-button @click="clear">清空</fox-button>
      <fox-button @click="cancel">取消</fox-button>
    </fox-footer-bar>
    <fox-content>
        <fox-group class="groupBorder" v-if="preSubmitList.length <1" style="height:55vh;justify-content:center;position:relative">
           <div><span style="position:absolute;top:50%;color:gray">购物车为空</span></div>
        </fox-group>
      <fox-group readonly v-else class="groupBorder" v-for="(item,index) in preSubmitList" :key="index" :no="String(index)" :title="item.title" column="2" @dblclick.native="preview(index)"> 
        <fox-text-item  v-model="item.account">客户账号</fox-text-item>
        <fox-text-item  v-model="item.cstNm">客户名称</fox-text-item>
        <fox-text-item  v-model="item.amt">交易金额</fox-text-item>
        <fox-text-item  v-model="item.seq">交易流水</fox-text-item>
        <fox-select-item  :source='m_status' v-model="item.status">交易状态</fox-select-item>
        <fox-text-item  v-model="item.res">返回信息</fox-text-item>
      </fox-group>
    </fox-content>
  </fox-page>
</template>
<script>
import { water, transfer, cashIn } from '@/api/request/shopping/shopping.js'
import { setTimeout } from 'timers'

let seq = 90001
let account = 888888888888
export default {
    name: 'shopping',
    // 数据
   
    data: function() {
        return {
            water: {
                source: 'bus',
                wtrMsrNo: '',
                usrNm: '',
                feeMo: '',
                ltPymtAmt: '',
                payFeeAmt: '',
                identCd: '',
                identTp: '',
                cstNm: '',
                account: '',
                telNum: '',
            },
            transfer: {

            },
            m_status: [
                { text: '待提交', value: '1' },
                { text: '已提交', value: '2' },
                { text: '成功', value: '3' },
                { text: '失败', value: '4' },
            ],
            preSubmitList: [
                
            ],
        }
    },
    // 方法
    methods: {
        preview(index) {
            const { url, tradeData, title } = this.preSubmitList[index]
            tradeData.source = 'preview'
            const args = {
                top: '10vh',
                title,
                height: '400px',
                width: '65%',
            }
            fox.custom.appendPage(this, url, args, {}, tradeData)
        },
        openTrade(args) {
            const { tradeUrl, obj } = args
            setTimeout(() => {
                fox.custom.openPage(this, tradeUrl, {}, { source: 'bus' })
            }, 100)
        },
        addTrade() {
            const args = {
                title: '添加交易',
                width: '50%',
                top: '30vh',
            }
            fox.custom.appendPage(this, '/trade/pub/shoppingBus', args, {}, this.$data)
        },
        submitAll() {
            fox.layer.alert('提交成功')
            this.preSubmitList = []
        },
        clear() {
            console.log(this)
            this.preSubmitList = []
            this.fox_send('my-bottom', 'clear', 'all')
        },
        cancel() {
            fox.custom.closePage(this)
        },
        onClose() {
            console.info('------------->dialog close')
        },
        sync() {
            console.log('------------>提交')
        },
        innerClear() {},
    },
    fox_flow() {
        return {
            /**
             *  界面渲染后，更改数据会触发钩子函数
             * @param session
             * @param context
             */
            mounted(session, context) {
                // 完成mounted函数
                context.resolve()
            },

            /**
             * 销毁处理
             */
            beforeDestroy(session) {
               
            },

            /**
             * 消息
             * @param type
             * @param data
             */
            onMessage(type, data) {
                if(type == 'openTrade') {
                    return this.openTrade(data)
                }
                let obj = {}
                if(type == 'addWater') {
                    obj = {
                        title: '水费',
                        type: 'water',
                        url: '/foundation/term/water',
                        account: account + 1,
                        cstNm: data.cstNm,
                        amt: data.payFeeAmt,
                        seq: seq + 1,
                        status: '1',
                        tradeData: data,
                    }
                }
                if(type == 'addTransfer') {
                    obj = {
                        title: '转账',
                        type: 'transfer',
                        url: '/business/transfer/transferAccounts',
                        account: data.acctNo,
                        cstNm: data.cstNm,
                        amt: data.txnAmt,
                        seq: seq + 1,
                        status: '1',
                        tradeData: data, 
                    }
                }
                if(type == 'cashIn') {
                    obj = {
                        title: '现金转入',
                        type: 'cashIn',
                        url: '/mainTrade/cash/cashInfo',
                        account: data.acctNo,
                        cstNm: data.cstNm,
                        amt: data.txnAmt,
                        seq: seq + 1,
                        status: '1',
                        tradeData: data, 
                    }
                }
                this.preSubmitList.push(obj)
            },
        } 
    },
}
</script>

<style scoped>
.groupBorder {
  border: 1px solid #e4cce9;
  padding: 10px;
}
</style>
