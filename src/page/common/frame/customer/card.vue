<template>
    <fox-group class="card_wrapper">
        <fox-item class="card_left">
            <span class="iconfont icon">&#xe64f;</span>
            <span class="bank">CMCC</span>
        </fox-item>
        <fox-item class="card_right">
            <!--<span class="iconfont bgImg">&#xe64f;</span>-->
            <div class="card_type">普通借记卡
                <span class="type_status">活期</span>
                <span class="type_status">正常</span>
            </div>
            <!--<div class="card_duration">活期</div>-->
            <div class="card_id">6130 1834 2311 9860 340</div>
        </fox-item>
    </fox-group>
</template>

<script>
    export default {
        name: "UserCard"
    }
</script>

<style scoped>
    /*卡片部分*/
    .card_wrapper {
        /*min-width: 364px;*/
        background-color: #6bbe83;
        width: 95% ;
        height: 90px;
        border-radius: 10px;
        display: flex;
        margin-bottom: 10px;
    }

    .card_wrapper .card_left {
        /*width: 150px!important;*/
        height: 100px;
        width: 20% !important;
        /*background-color: red;*/

    }

    .card_wrapper .card_left .icon {
        font-size: 30px;
        line-height: 70px;
        padding-left: 20px;
        color: #fff;
    }

    .card_wrapper .card_left .bank {
        color: #fff;
        display: block;
        margin-top: -30px;
        margin-left: 18px;
        font-size: 11px;
    }

    .card_right {
        /*background-color: blue;*/
        width: 80% !important;
        color: #fff;
        font-size: 18px;
        position: relative;
        background: url("../../../../assets/img/card_bg.png") no-repeat;
        background-size: 90%;
        background-position-x: 10px;
        overflow: hidden;
        border-radius: 10px;
    }

    .card_right .card_type {
        font-size: 18px;
        margin-top: 5px;
    }

    .card_right .card_type .type_status {
        float: right;
        margin-right: 20px;
    }

    /*.card_right .card_duration {*/
    /*font-size: 18px;*/
    /*margin-top: -5px;*/
    /*}*/

    .card_right .card_id {
        font-size: 18px;
        /*margin-top: -5px;*/
        font-weight: bold;
    }
</style>
