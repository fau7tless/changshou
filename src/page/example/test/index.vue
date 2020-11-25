<template>
    <!--page每个页面的root元素-->
    <fox-page group-header-width="120px">
        <!--page内容区域-->
        <fox-content >
            <div class="wrapper">
                <fox-tabs class="topBtn_wrapper" v-model="activeName" type="card" @tab-click="handleClick">
                    <fox-tab-pane label="客户信息" name="first">
                        <user-base></user-base>
                        <user-desc></user-desc>
                        <user-card></user-card>
                        <user-action></user-action>
                    </fox-tab-pane>
                    <fox-tab-pane label="账户信息" name="second">
                        <!--<fox-button @click="accountInfo">uihiuhiu</fox-button>-->
                        <fox-item class="account_wrapper">
                            <div class="item">
                                <div class="item_detail">
                                    <span class="title">账号</span>
                                    <span class="num">10000001097664456</span>
                                    <span class="btn">账户视图</span>
                                </div>
                                <div class="item_detail">
                                    <span class="title">账户类型</span>
                                    <span class="num">活期结算户</span>
                                </div>
                                <div class="item_detail">
                                    <span class="title">账户余额</span>
                                    <span class="num">98,009,00</span>
                                </div>
                            </div>
                            <div class="item">
                                <div class="item_detail">
                                    <span class="title">账号</span>
                                    <span class="num">10000001097664456</span>
                                    <span class="btn">账户视图</span>
                                </div>
                                <div class="item_detail">
                                    <span class="title">账户类型</span>
                                    <span class="num">活期结算户</span>
                                </div>
                                <div class="item_detail">
                                    <span class="title">账户余额</span>
                                    <span class="num">98,009,00</span>
                                </div>
                            </div>
                            <div class="item">
                                <div class="item_detail">
                                    <span class="title">账号</span>
                                    <span class="num">10000001097664456</span>
                                    <span class="btn">账户视图</span>
                                </div>
                                <div class="item_detail">
                                    <span class="title">账户类型</span>
                                    <span class="num">活期结算户</span>
                                </div>
                                <div class="item_detail">
                                    <span class="title">账户余额</span>
                                    <span class="num">98,009,00</span>
                                </div>
                            </div>
                            <div class="item">
                                <div class="item_detail">
                                    <span class="title">账号</span>
                                    <span class="num">10000001097664456</span>
                                    <span class="btn">账户视图</span>
                                </div>
                                <div class="item_detail">
                                    <span class="title">账户类型</span>
                                    <span class="num">活期结算户</span>
                                </div>
                                <div class="item_detail">
                                    <span class="title">账户余额</span>
                                    <span class="num">98,009,00</span>
                                </div>
                            </div>
                            <div class="item">
                                <div class="item_detail">
                                    <span class="title">账号</span>
                                    <span class="num">10000001097664456</span>
                                    <span class="btn">账户视图</span>
                                </div>
                                <div class="item_detail">
                                    <span class="title">账户类型</span>
                                    <span class="num">活期结算户</span>
                                </div>
                                <div class="item_detail">
                                    <span class="title">账户余额</span>
                                    <span class="num">98,009,00</span>
                                </div>
                            </div>
                        </fox-item>

                    </fox-tab-pane>
                    <fox-group class="service_wrapper">
                        <button class="wait_submit">待提交
                            <span class="sub_num">1</span>
                        </button>
                        <button class="wait_print">待打印
                            <span class="print_num">4</span>
                        </button>
                        <button class="end_service">结束服务
                        </button>
                    </fox-group>
                </fox-tabs>
            </div>
        </fox-content>
    </fox-page>
</template>

<script>
    import UserBase from './component/base'
    import UserDesc from './component/desc'
    import UserCard from './component/card'
    import UserAction from './component/action'

    export default {
        name: "index",
        components: {
            UserBase,
            UserDesc,
            UserCard,
            UserAction
        },
        //数据
        data: function () {
            return {
                activeName: "first",
                // actionName: 'actionFirst',
                data: {}
            };
        },
        //方法
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            format(row, column) {
                let map = {
                    orgId: 'f07006.json',
                }
                let {property} = column
                return fox.custom.mapping(this, map[property], row[property])
            },
            accountInfo() {
                let params = {
                    btnType: 'add',
                }
                fox.custom.appendPage(this, '/example/test/account', '自增', params, this.$data, {}, this.query)
            },
            query() {

            },
            update() {

            },
            //加载后处理
            mounted: function () {
                this.query();
                this.userQuery();
            },
            computed() {

            },
        }
    }
</script>

<style scoped>
    button:focus,
    button:active:focus,
    button.active:focus,
    button.focus,
    button:active.focus,
    button.active.focus{
        outline: none;
        box-shadow: none;
    }
    button{
        cursor: pointer;
    }
    .fox-content{
        height: 760px!important;
    }
    .wrapper {
        overflow-y: scroll;
        overflow-x: hidden;
        width: 375px;
        height: 950px;
        background-color: #fff;
        border-radius: 8px;
        /*padding-left: 8px;*/
    }
    .topBtn_wrapper{
        /*width: 98%;*/
        margin-left: 8px;
    }

    /*最后的服务按钮*/
    .service_wrapper {
        height: 40px;
        padding-right: 20px;
    }

    .service_wrapper button {
        border: none;
        min-width: 110px;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
    }

    .wait_submit {
        background-color: #ff780d;
    }

    .wait_print {
        background-color: #229747;
    }

    .end_service {
        background-color: #f76256;
    }

    /*清除浮动*/
    .clearfix:after {
        display: block;
        content: ' ';
        clear: both;
    }

    .clearfix {
        zoom: 1
    }

    /*--------------------------------*/
    /*账户信息部分*/
    .account_wrapper {
        width: 98%;
        margin-left: 5px;
        border-bottom: solid 1px #eee;
        margin-bottom: 11px;
    }

    .account_wrapper .item {
        margin-bottom: 7px;

    }
    .account_wrapper .item  .item_detail{
        border: 1px solid #eee;
        color: #6c6c6c;
    }

    .account_wrapper .item  .item_detail .title {
        background-color: #f5f6f8;
        /*padding: 10.5px 15px;*/
        color: #a7a7a7;
        text-align: left;
        display: inline-block;
        width: 70px;
        padding-left: 5px;
        /*padding: 10.5px 25px 10.5px 5px;*/
    }

    .account_wrapper .item .item_detail .num {
        font-weight: bold;
        margin-right: 52px;
    }

    .account_wrapper .item .item_detail .btn {
        background-color: #f8f8f8;
        padding: 3px 5px;
        border: 1px solid #eee;
        border-radius: 3px;
    }
</style>
