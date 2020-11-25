<template>
    <fox-item class="action_wrapper">
        <fox-tabs v-model="actionName" type="card" @tab-click="actionClick">
            <fox-tab-pane label="客户提醒" name="actionFirst" class="selected">
                <!--<div class="action_page clearfix">-->
                <!--<div class="action_item selected">客户提醒</div>-->
                <!--<div class="action_item">代理人信息</div>-->
                <!--</div>-->
                <div class="item">
                    <div class="circle"></div>
                    <span class="desc">[风险]该客户为黑名单客户</span>
                </div>
                <div class="item">
                    <div class="circle"></div>
                    <span class="desc">[内部]客户资料缺失，需要补录地址资料</span>
                </div>
                <div class="item">
                    <div class="circle"></div>
                    <span class="desc">[还款]该客户尾号为7878信用卡欠费800元</span>
                </div>
                <div class="item">
                    <div class="circle"></div>
                    <span class="desc">[到期]理财产品、定期类型产品到期前消息</span>
                </div>
            </fox-tab-pane>
            <fox-tab-pane label="代理人信息" name="actionSecond">代理人信息</fox-tab-pane>
        </fox-tabs>

    </fox-item>
</template>

<script>
    export default {
        name: "UserAction",
        data: function () {
            return {
                actionName: 'actionFirst',
            }
        },
        methods: {
            actionClick(tab, event) {
                console.log(tab, event);
            },
        }
    }
</script>

<style scoped>
    /*用户操作部分*/
    .action_wrapper {
        width: 98%;
        margin-bottom: 20px;
    }

    .action_wrapper .item {
        width: 95%;
        border-bottom: dotted 3px #ccc;
    }

    .action_wrapper .circle {
        background-color: #6ea97c;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        display: inline-block;
        margin-left: 10px;
    }

    .action_wrapper .desc {
        margin-left: 10px;
    }
</style>
