<template>
    <!--    <div class='my-card-history-item' :class="{ 'nohover' : closable }" @click="handleClickHistoryItem">-->
    <!--        <span>{{title}}</span>-->
    <!--        <template v-if="closable">-->
    <!--            <div class="close-item el-icon-error" @click="handleCloseHistoryItem"></div>-->
    <!--        </template>-->
    <!--    </div>-->


    <!--    <ul>-->
    <!--        <li v-for="item in hanlemessimage" :key="item.key" class="face-message"-->
    <!--            @click="hanleGoUser(items,item)">-->
    <!--            <div>-->
    <!--                        <span :class="'iconfont ' + item.funcIcon + ' hanle-icon-style'"-->
    <!--                              :style="hanleStyle(item.color1,item.color2)">-->
    <!--                        </span>-->
    <!--                <p class="hanle-icon">{{item.funcName}}</p>-->
    <!--            </div>-->
    <!--        </li>-->
    <!--    </ul>-->

    <div>
        <div class="shortcut">
        <span class="el-icon-edit-outline my-card-history-item" :title="title">
        </span>
            <p class="shortcuttext">{{title}}</p>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'my-history-record-item',
        // 属性
        props: {
            // 是否关闭
            closable: {
                type: Boolean,
                required: false,
                default: false,
            },
            //标题
            title: {
                type: String,
                required: true,
            },
        },
        //方法
        methods: {
            //格式化item text
            handleCloseHistoryItem() {
                this.$emit('close')
            },
            //格式化item text
            handleClickHistoryItem() {
                this.$emit('click')
            },
        },
    }
</script>
<style scoped>

    /*.hanle-icon-style {*/
    /*    font-size: 36px;*/
    /*    padding-right: 6px;*/
    /*    !*background-image: linear-gradient(135deg, #7eb7fe, #6895ff);*!*/
    /*    -webkit-background-clip: text;*/
    /*    */
    /*    !*padding-top: 3px;*!*/
    /*    padding-top: 4px;*/
    /*    transform: translate(0%, 25%);*/
    /*}*/

    .shortcut {
        height: 85px;
        width: 90px;
        text-align: center;
        margin: 0px 10px 0px 0px;

    }

    .my-card-history-item {
        height: 55px;
        width: 55px;
        box-sizing: border-box;
        font-size: 55px;
        margin-bottom: 2px;
    }

    .shortcuttext {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 15px;
        width: 100%;
    }

    .nohover {
        cursor: pointer;
    }

    .shortcut:not(.nohover):hover {
        border-radius: 10px;
        background: #ecf5ff;
        cursor: pointer;
    }

    .shortcut > .close-item:hover {
        color: #404D6A;
        opacity: 0.6;
    }
</style>