<template>
    <div class="my-user-item-wrap">
        <div class="my-user-item-left">
            <img class="my-user-item-img" :src="icon">
        </div>
        <div class="my-user-item-right">
            <div class="my-user-item-name">尊敬的{{mName}}，欢迎您！</div>
            <div class="my-user-item-info">上一次登录时间：{{preLoginDt}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'my-user-item',
        //属性
        props: {
            //图标
            icon: {
                type: String,
                required: true,
            },
            //姓名
            name: {
                type: String,
                required: true,
            },
            //性别
            sex: {
                type: String,
                required: true,
            },
            //说明列表
            preLoginDt: {
                type: String,
                default: '2020-09-17 08:22:32',
            },
            //信息
            info: {
                type: String,
                required: true,
            },
        },
        //计算
        computed: {
            mName() {
                //01 男， 02 女
                if (this.sex === '01') {
                    return `${this.name}男士`
                } else {
                    return `${this.name}女士`
                }
            },
        },

    }
</script>

<style scoped>
    .my-user-item-wrap {
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 14px 8px;
        box-sizing: border-box;
        flex-basis: 55%;
    }


    .my-user-item-left {
        flex: 0 0 auto;
        margin-right: 20px;
    }

    .my-user-item-img {
        width: 79px;
        height: 79px;
    }

    .my-user-item-right {
        flex: 1 1 auto
    }

    .my-user-item-name, .my-user-item-company {
        color: #404D6A;
        font-size: 16px;
        line-height: 24px;
        font-family: PingFangSC-Medium;
    }


    .my-user-item-info {
        color: #8C94A6;
        font-size: 12px;
        line-height: 20px;
        margin-top: 11px;
    }


</style>