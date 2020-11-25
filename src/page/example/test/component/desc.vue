<template>
    <fox-item class="desc_wrapper">
        <div class="item">
            <span class="check_title">证件类型</span>
            <div class="check_right">
                <span class="check_status">未核查</span>
                <span class="check_type">身份证</span>
            </div>
        </div>
        <div class="item">
            <span class="check_title">证件号码</span>
            <div class="check_right">
                <span class="check_type">130456178909182345</span>
            </div>
        </div>
        <div class="item">
            <span class="check_title">有效期</span>
            <fox-button>该身份证将要过期</fox-button>
            <div class="check_right">
                <span class="check_type">2019-10-10</span>
            </div>
        </div>
        <div class="item">
            <span class="check_title">核查结果</span>
            <fox-button>未核查</fox-button>
            <div class="check_right">
                        <span class="check_button">
                            <span class="iconfont">&#xe64f;</span>
                            联网检查
                        </span>
            </div>
        </div>
        <div class="item">
            <span class="check_title long">当前操作凭证</span>
            <div class="check_right">
                        <span class="check_button">
                            <span class="iconfont">&#xe645;</span>
                            切换凭证
                        </span>
            </div>
        </div>
    </fox-item>
</template>

<script>
    export default {
        name: "UserDesc"
    }
</script>

<style scoped>
    /*个人详细信息部分*/
    .desc_wrapper {
        width: 95%;
        margin: 0 5px 5px 5px;
    }

    .desc_wrapper .item {
        display: block;
        border-bottom: #ccc solid 1px;
    }

    .desc_wrapper .check_title {
        margin-left: 10px;
        color: #a7a7a7;
        width: 60px;
        display: inline-block;
    }
    .desc_wrapper .long{
        width: 90px;
    }

    .desc_wrapper .check_right {
        float: right;
        margin-right: 15px;
    }

    .desc_wrapper .check_status {
        padding: 3px 10px;
        color: #fff;
        background-color: #c69651;
        border-radius: 15px;
    }

    .desc_wrapper .check_type {
        margin-left: 5px;
        font-weight: bold;
    }

    .desc_wrapper .check_right .check_button {
        background-color: #f3f3f3;
        padding: 3px 5px;
        color: #898989;
        border: 1px solid #ccc;
        border-radius: 2px;
        cursor: pointer;
    }

</style>
