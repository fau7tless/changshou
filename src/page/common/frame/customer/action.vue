<template>
    <fox-item id="action" class="action_wrapper">
        <fox-tabs v-model="actionName" type="card" @tab-click="actionClick">
            <fox-tab-pane label="客户提醒" name="actionFirst" class="selected">
                <div class="item_wrapper" id="itemWrapper">
                    <div class="item">
                        <div class="circle"></div>
                        <span class="desc">[1风险]该客户为黑名单客户</span>
                    </div>
                    <div class="item">
                        <div class="circle"></div>
                        <span class="desc">[2内部]客户资料缺失，需要补录地址资料</span>
                    </div>
                    <div class="item">
                        <div class="circle"></div>
                        <span class="desc">[3还款]该客户尾号为7878信用卡欠费800元</span>
                    </div>
                    <div class="item">
                        <div class="circle"></div>
                        <span class="desc">[4到期]理财产品、定期类型产品到期前消息</span>
                    </div>
                    <div class="item">
                        <div class="circle"></div>
                        <span class="desc">[5风险]理财产品、定期类型产品到期前消息</span>
                    </div>
                    <div class="item">
                        <div class="circle"></div>
                        <span class="desc">[6到期]理财产品、定期类型产品到期前消息</span>
                    </div>
                    <div class="item">
                        <div class="circle"></div>
                        <span class="desc">[7到期]理财产品、定期类型产品到期前消息</span>
                    </div>
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
        mounted() {
            var action = document.getElementById('action');
            var itemWrapper = document.getElementById('itemWrapper');
            var item = document.getElementsByClassName('item');
            setTimeout(function () {

                if (action.style.height === '280px') {
                    //高900
                    for(let i of item){
                        i.style.lineHeight = '40px';
                    }
                    itemWrapper.style.height = '250px';
                }else if(action.style.height === '180px'){
                    //高768
                    for(let i of item){
                        i.style.lineHeight = '40px';
                    }
                    itemWrapper.style.height = '130px';
                }else if(action.style.height === '410px'){
                    // 高1080
                    for(let i of item){
                        i.style.lineHeight = '45px';
                    }
                    itemWrapper.style.height = '410px';
                }
                else {
                    // 其他，默认是调试页面时
                    for(let i of item){
                        i.style.lineHeight = '35px';
                    }
                    itemWrapper.style.height = '120px';
                }
            },500);
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
    .el-tabs__header {
        margin-bottom: 0 !important;
    }

    .action_wrapper {
        width: 98%;
        /*margin-bottom: 20px;*/
        /*overflow: scroll;*/
    }

    .action_wrapper .item_wrapper {
        overflow: auto;
        height: 80px;
    }

    .action_wrapper .item {
        width: 95%;
        border-bottom: dotted 3px #ccc;
        /*height: 20px;*/
        line-height: 25px;
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
