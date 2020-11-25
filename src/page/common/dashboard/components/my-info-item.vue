<template>
    <div class="my-info-item-wrap">
        <div style="margin-bottom: 8px">
            <div class="my-info-item-label">当前流水：</div>
            <span class="my-info-item-text" style="color:#C43846">T202009180023</span>
        </div>
        <div style="margin-bottom: 8px">
            <div class="my-info-item-label">服务客户数：</div>
            <span class="my-info-item-text">23</span>
<!--            <span class="my-info-item-action" @click="onAction(2)">[全部状态]</span>-->
        </div>
        <div>
            <div class="my-info-item-label">交易笔数：</div>
            <span class="my-info-item-text">99</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "my-info-item",
    //属性
    props: {
        //过期日期
        endDate: {
            type: String,
            required: true,
        },
        //最近登录时间
        lastLoginTime: {
            type: String,
            required: true,
        },
        //尝试次数
        tryTimes: {
            type: String,
            required: false,
        }
    },
    //方法
    methods: {
        onAction(type) {
            this.$emit('action', type)
        }
    }

};
</script>
<style scoped>
@media screen {
    .my-info-item-wrap>div {
        margin-left: 48px;
        font-size: 0px
    }
}

@media screen and (max-height: 800px) {
    .my-info-item-wrap>div {
        margin-left: 19px;
    }
}

.my-info-item-wrap {
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    box-sizing: border-box;
    flex-basis: 45%;
}


.my-info-item-wrap:before {
    content: "";
    position: absolute;
    left: -1;
    top: 21%;
    width: 1px;
    height: 44%;
    background-color: #DEDEDE
}

.my-info-item-label {
    display: inline-block;
    color: #8C94A6;
    width: 90px;
    font-size: 14px;
    box-sizing: border-box;
    text-align: right;
}

.my-info-item-text:not(:last-child) {
    font-family: PingFangSC-Medium;
}

.my-info-item-text {
    font-size: 14px;
    line-height: 20px;
    text-align: right;
}

.my-info-item-text-last {
    color: #8C94A6;
    font-size: 14px;
}

.my-info-item-action {
    color: #5099FC;
    font-size: 14px;
    cursor: pointer;
}
</style>