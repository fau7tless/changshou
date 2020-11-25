<template>

    <div class="my-bottom">
        <div class="my-bottom-info">
            <div class="bottom-info-list">
                <span class="el-icon-link  span-icon"></span>
                <span class="span-bottom">BIPS_A</span>
                <span class="el-icon-time  span-icon"></span>
                <span class="span-bottom" @click="backlog">待办</span><span class="span-num">0</span>
                <span class="el-icon-message  span-icon"></span>
                <span class="span-bottom">消息</span><span class="span-num">0</span>
                <span class="el-icon-bell span-icon"></span>
                <span class="span-bottom">提醒</span><span class="span-num">0</span>
                <span @click="openShoppingBus">
                <span class="el-icon-shopping-cart-full span-icon"></span>
                <span class="span-bottom">购物车</span>
                <span class="span-num" >{{tradeNum}}</span>
                </span>
            </div>
        </div>
        
        <div class="my-bottom-tools">
            <div class="bottom-tools-list">
                <span class="el-icon-date  span-icon" title="计算器"></span>
                <span class="el-icon-notebook-1  span-icon" title="日志"></span>
                <span class="el-icon-s-tools  span-icon" title="工具"></span>
                <span class="span-date">{{localTime}}</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'my-bottom',
    data() {
        return{
            tradeNum: 0,
            localTime: '',
        }
    },
    mounted() {
        this.showTime()
    },
    methods: {
        showTime() {
            let that = this
            setInterval(() => {
                that.localTime = new Date().format('yyyy年MM月dd日 hh:mm:ss')
            }, 1000)
        },
        backlog() {
            fox.custom.openPage(this, '/trade/pub/authorize-list', {
                openType: 'normal',
            })
        },
        openShoppingBus() {
            fox.custom.openPage(this, '/trade/shopping', {}, this.$data)
        },
    },
    fox_flow() {
        return {
            onMessage(type, data) {
                if(type == 'add') {
                    this.$set(this, 'tradeNum', this.tradeNum + 1)
                }
                if(type == 'clear') {
                    this.$set(this, 'tradeNum', 0)
                }
            },
        }
    },
}
</script>

<style scoped>
    .my-bottom {
        background-color: #e8ebf3;
        width: 100%;
        bottom: 0;
        border-top: 1px solid #c8c7cc;
        display: -webkit-flex;
        /* Safari */
        display: flex;
        flex-flow: row nowrap;
        align-items: stretch;
        justify-content: space-between;
        box-sizing: border-box;

    }

    .my-bottom-info {
        flex: 0 0 calc(60%);
        /*flex 布局*/
        display: flex;
        /*实现垂直居中*/
        align-items: center;
        /*实现水平居中*/
        justify-content: flex-start;

        text-align: justify;
    }

    .my-bottom-tools {
        flex: 0 0 calc(40%);
        /*flex 布局*/
        display: flex;
        /*实现垂直居中*/
        align-items: center;
        /*实现水平居中*/
        justify-content: flex-end;

        text-align: justify;
    }

    .bottom-info-list {
        margin-left: 20px;
        font-size: 16px;
        display: flex;
        display: -webkit-flex;
        align-items: flex-start;
        justify-content: center;
    }

    .bottom-tools-list {
        margin-right: 20px;
        font-size: 16px;
        display: flex;
        display: -webkit-flex;
        align-items: flex-start;
        justify-content: center;
    }

    .span-icon {
        margin: 2px 5px 0px 30px;
        color: #C4892B;
        font-size: 18px;
        font-weight: bold;
    }

    .span-bottom {
        font-size: 16px;
    }

    .span-date {
        margin-left: 30px;
        font-size: 18px;
    }

    .span-num {
        padding: 0px 10px 0px 10px;
        color: #fff;
        background-color: #ee9900;
        border-radius: 6px;
        margin-left: 5px;
        font-weight: bold;
    }

</style>