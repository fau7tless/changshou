<template>
    <!--page每个页面的root元素-->
    <fox-page group-header-width="120px" >
        <!--page内容区域-->
        <div id="wrapper" class="wrapper">
            <fox-tabs class="topBtn_wrapper" v-model="activeName" type="card" @tab-click="handleClick">
                <fox-tab-pane label="客户信息" name="first">
                    <user-base></user-base>
                    <!-- <user-desc></user-desc> -->
                    <user-card></user-card>
                    <user-action id="action"></user-action>
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

            </fox-tabs>
        </div>
        <user-bottom ></user-bottom>
    </fox-page>
</template>

<script>

import UserBase from './base'
// import UserDesc from './desc'
import UserCard from './card'
import UserAction from './action'
import UserBottom from './bottom'

export default {
    name: 'customer',
    components: {
        UserBase,
        // UserDesc,
        UserCard,
        UserAction,
        UserBottom,
    },
    // 数据
    data: function () {
        return {
            activeName: 'first',
            // actionName: 'actionFirst',
            data: {},
        }
    },
    mounted() {
        let wrapper = document.getElementById('wrapper')
        let action = document.getElementById('action')
        let height = '625px'
        let acHeight = '180px'
        if (window.screen.height === 768) {
            height = '635px'
            acHeight = '180px'
        } else if (window.screen.height === 900) {
            height = '765px'
            acHeight = '280px'
        } else if (window.screen.height === 1080) {
            height = '930px'
            acHeight = '410px'
        } else {
            // height = '65px';
            acHeight = '185px'
        }
        wrapper.style.height = height
        action.style.height = acHeight
    },
    // 方法
    methods: {
        handleClick(tab, event) {
            console.log(tab, event)
        },
        format(row, column) {
            let map = {
                orgId: 'f07006.json',
            }
            let { property } = column
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
        // 加载后处理
        mounted: function () {
            this.query()
            this.userQuery()
        },
        computed() {

        },
    },
}
</script>

<style scoped>
    button:focus,
    button:active:focus,
    button.active:focus,
    button.focus,
    button:active.focus,
    button.active.focus {
        outline: none;
        box-shadow: none;
    }

    button {
        cursor: pointer;
    }

    .wrapper {
        width: 375px;
        height: 80%;
        background-color: #fff;
        margin-bottom: 5px;
    }

    .topBtn_wrapper {
        margin-left: 8px;
    }

    /*清除浮动*/
    /* .clearfix:after {
        display: block;
        content: ' ';
        clear: both;
    }

    .clearfix {
        zoom: 1
    } */

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

    .account_wrapper .item .item_detail {
        border: 1px solid #eee;
        color: #6c6c6c;
    }

    .account_wrapper .item .item_detail .title {
        background-color: #f5f6f8;
        color: #a7a7a7;
        text-align: left;
        display: inline-block;
        width: 70px;
        padding-left: 5px;
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
