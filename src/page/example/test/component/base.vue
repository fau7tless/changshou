<template>
    <fox-group class="base_wrapper">
        <fox-item class="base_left">
            <img src="../../../../../static/img/idPic.jpg" class="item_img">
            <div class="info_empty_img">
                <img src="">
                <span>采集照片</span>
            </div>
        </fox-item>
        <fox-item class="base_right">
            <div class="user_name">
                <span class="name">沈清其（女士）</span>
                <span class="vip">VIP</span>
                <span class="iconfont edit">&#xe634</span>
                <!--<button icon="el-icon-edit" class="edit"></button>-->
            </div>
            <div class="user_en_name">
                ShenQingQi
            </div>
            <div class="user_btn">
                <button>切换为代理人</button>
            </div>
            <div class="user_id">
                客户编号：
                <span>25465348</span>
            </div>
            <div class="user_tel">
                手机号码：
                <span>13654655348</span>
            </div>
        </fox-item>
    </fox-group>
</template>

<script>
    export default {
        name: "UserBase"
    }
</script>

<style scoped>
    /*图片和基本信息框*/
    .base_wrapper {
        display: flex;
        width: 95%;
        height: 145px;
        margin-bottom: 5px;
        overflow: hidden;
    }

    .base_left {
        width: 48% !important;
        height: 80%;
        /*background-color: red;*/
        position: relative;
        margin-left: 5px;
    }

    .base_left .item_img {
        width: 50%;
        position: absolute;
        float: left;
        height: 157px;
        /*height: 100%;*/
    }

    .base_left .info_empty_img {
        /*background-color: blue;*/
        width: 48%;
        float: right;
        height: 141px;
        border: solid 2px #ccc;
        margin-left: 5px;
    }

    .base_right {
        width: 50% !important;
        height: 100%;
        /*background-color: purple;*/
    }

    .base_right .user_name {
        position: relative;
        margin-left: 8px;
    }

    .base_right .user_name .vip {
        background-color: #F0A117;
        color: white;
        font-size: 12px;
        font-weight: bold;
        padding: 2px 5px;
        border-radius: 3px;
    }

    .base_right .user_name .edit {
        margin-left: 7px;
        cursor: pointer;
    }

    .base_right .user_en_name {
        margin-top: -17px;
        margin-left: 8px;
        color: #ccc;
    }

    .base_right .user_btn {
        margin-left: 8px;
        color: #a7a7a7;
    }

    .base_right .user_btn button {
        padding: 2px 3px;
    }

    .base_right .user_id {
        margin-left: 8px;
    }

    .base_right .user_tel {
        margin-top: -12px;
        margin-left: 8px;
    }

</style>
