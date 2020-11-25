<template>
<fox-page>
  <fox-footer-bar align="center">
    
  </fox-footer-bar>  
  <fox-content style="height:200px">
      <div class="tradeMenu">
           <template v-for="(item, index) in tradeList">
                <div class="cmnBtn" style="width:70px" :title="item.text" :key="`func-item-${index}`" :id="`icon-${index}`" @click="oepnTrade(item.tradeUrl,item.obj)" >
                  <div :class="item.icon" style="width:100%;text-align:center;font-size: 3rem" ></div>
                  <span style="display: block"> {{item.tradeName}}</span>
                </div>
            </template>
          <!-- <span v-for="item in tradeList" :key="item.tradeUrl" @click="oepnTrade(item.tradeUrl,item.tradeName)">
              {{item.tradeName}}
          </span> -->
      </div>
  </fox-content>
</fox-page>
</template>

<script>

export default {
    // 名称
    name: 'shoppingBus',
    // 注册组件
   
    data() {
        return {
            source: 'bus',
            preSubmitList: [],
            tradeList: [
                {
                    tradeName: '水费', tradeUrl: '/foundation/term/water', icon: 'el-icon-wallet', obj: 'water', 
                },
                {
                    tradeName: '转账', tradeUrl: '/business/transfer/transferAccounts', icon: 'el-icon-money', obj: 'transfer', 
                },
                {
                    tradeName: '现金转入', tradeUrl: '/mainTrade/cash/cashInfo', icon: 'el-icon-coin', obj: 'cashIn', 
                },
            ],
        }
    },
    // 方法
    methods: {
        async  oepnTrade(tradeUrl, obj) {
            if(tradeUrl) {
                await fox.custom.closePage(this)
                this.$nextTick(() => {
                    this.fox_send('shopping', 'openTrade', { tradeUrl, obj })
                })
             
                // fox.custom.openPage(this, tradeUrl, {}, this.$data)
            }
        },
        // 取消处理
        onCancel() {
            fox.custom.closePage(this)
        },
        // 提交处理
        onSubmit() {
           
        },

    },
}
</script>

<style scoped>
.tradeMenu{
    display: flex;
    text-align: center;

}
.tradeMenu :hover{
    background-color: rgb(228, 193, 97);
    cursor: pointer;
}
</style>