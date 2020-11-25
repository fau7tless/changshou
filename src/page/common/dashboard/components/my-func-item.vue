<template>
    <div class="my-func-item-wrap">
        <div class="my-func-item-left">
            <img class="my-func-item-img" :src="icon">
        </div>
        <div class="my-func-item-right">
            <div class="my-func-item-title">{{title}}</div>
            <ul class="my-func-item-list">
                <template v-for="(item, index) in items">
                    <li v-if="index<limitCount" :key="`func-text-${index}`">{{formatItemText(item)}}</li>
                </template>
            </ul>
        </div>
    </div>
</template>
<script>
import { foxUI } from '@/assets/libs/fox-libs'
export default {
    name: "my-func-item",
    //属性
    props: {
        //图标
        icon: {
            type: String,
            required: true,
        },
        //标题
        title: {
            type: String,
            required: true,
        },
        //说明列表
        items: {
            type: Array,
            required: true
        },
        limitCount: {
            type: Number,
            required: false,
            default: 10
        }
    },
    //方法
    methods: {
        //格式化item text
        formatItemText(text) {
            return foxUI.renderText(text, 12)
        }
    }
};
</script>
<style scoped lang="scss">
.my-func-item-wrap {
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: 33%;
    box-sizing: border-box;
}

@media screen {
    .my-func-item-wrap {
        // min-height: 129px;
    }

    .my-func-item-title {
        margin-bottom: 12px;
    }
}

@media screen and (max-height: 800px) {
    .my-func-item-wrap {
        // min-height: 84px;
    }

    .my-func-item-title {
        margin-bottom: 6px;
    }
}

.my-func-item-wrap:hover {
    cursor: pointer;
}

.my-func-item-left {
    flex: 0 0 auto;
    width: 94px;
    // width: 61px;
    // margin-right: 17px;
}

.my-func-item-img {
    width: 94px;
}

.my-func-item-right {
    flex: 1 1 auto;
    max-width: calc(100% - 78px - 10px);
}

.my-func-item-title {
    color: #505C76;
    font-size: 16px;
    line-height: 16px;
    font-family: PingFangSC-Medium;
}

.my-func-item-list {
    list-style: none;
}

.my-func-item-list li {
    color: #404D6A;
    font-size: 14px;
    line-height: 25px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>