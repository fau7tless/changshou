<template>
    <div class="my-main">
        <div class="my-main-left">
            <my-main-header class="my-header"></my-main-header>
            <div class="my-content">
                <fox-router-view
                        key="_sys_root_first"
                        v-show="first"
                        class="my-content-card"
                        name="_sys_root_first"
                        :multi="false"></fox-router-view>
                <div v-show="!first" class="my-content-card">
                    <my-main-path class="my-path"></my-main-path>
                    <fox-router-view
                            key="_sys_root"
                            class="fox-card-views"
                            view-class="fox-card-view"
                            view-active-class="fox-card-view-active"
                            enter-class="fox-card-view-trans-enter"
                            enter-active-class="fox-card-view-trans-enter-active"
                            enter-to-class="fox-card-view-trans-enter-to"
                            name="_sys_root"
                            :multi="true"
                    ></fox-router-view>
                </div>
            </div>
        </div>
        <div class="my-btn-div">
      <span @click="showCustomer" class="my-btn">
        <span :class="custBtnIcon"></span>
      </span>
        </div>
        <div id="customer" class="my-main-right" v-show="customerShow">
            <!-- 客户信息面板 -->
            <coustomer></coustomer>
        </div>
    </div>
</template>

<script>
import MyMainHeader from './my-main-header'
import MyMainPath from './my-main-path'
import coustomer from '../customer'

export default {
    name: 'my-main',
    // 组件
    components: {
        MyMainPath,
        MyMainHeader,
        coustomer,
    },
    // 数据
    data() {
        return {
            first: true,
            customerShow: false,
            custBtnIcon: 'el-icon-s-fold',
        }
    },
    // 加载后处理
    created() {
        // 注册监听tab修改事件
        this.$fox_on('global_event_to_home', (msg) => {
            this.first = msg
        })
    },
    mounted() {
        // 引用event proxy
        // const ep = fox.eventproxy
        // //绑定事件
        // ep.on('showCustomer', function (name) {
        //     var doc = document.getElementById('customer')
        //     if (doc.style.width != '375px') {
        //         doc.style.width = '375px'
        //         this.custBtnIcon = 'el-icon-s-unfold'
        //     }
        // })
    },
    methods: {
        // 显示客户信息
        showCustomer() {
            this.customerShow = !this.customerShow
            this.fox_send('contract', 'customerShow', this.customerShow)
            fox.bus.put('public', 'customerShow', this.customerShow)
            this.custBtnIcon = this.customerShow ? 'el-icon-s-unfold' : 'el-icon-s-fold'
            // let doc = document.getElementById('customer')
            // if (doc.style.width != '375px') {
            //     doc.style.width = '375px'
            //     this.custBtnIcon = 'el-icon-s-unfold'
            // } else {
            //     doc.style.width = '0px'
            //     this.custBtnIcon = 'el-icon-s-fold'
            // }
            //
            // console.log(doc.style.width)
        },
    },
    fox_flow() {
        return {
            onMessage(type, data) {
                if(type == 'showInfo') {
                    this.customerShow = true
                }
            },
        }
    },
}
</script>

<style scoped>
    .my-main {
        width: 100%;
        position: absolute;
        display: -webkit-flex; /* Safari */
        display: flex;
    }

    .my-main-left {
        flex: 1 0 auto;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-flow: column nowrap;
        align-items: stretch;
        justify-content: flex-start;
        background: #f1f3f8;
        width: calc(100% - 375px)
    }

    .my-main-right {
        flex: 0 0 auto;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-flow: column nowrap;
        align-items: stretch;
        justify-content: flex-start;
        float: right;
        z-index: 10;
    }

    .my-btn-div {
        flex: 0 0 auto;
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        z-index: 10;
    }

    .my-btn {
        z-index: 55;
        margin-left: -20px;
        width: 20px;
        height: 30px;
        font-size: 20px;
        color: #6c6c6c;
        background: white;
        border-bottom-left-radius: 12px;
        border-top-left-radius: 12px;
        box-shadow: 2px 5px 7px #888;
        text-align: center;
        padding: 10px 0 0 0;
    }

    .my-header {
        flex: 0 0 auto;
    }

    .my-content {
        flex: 1 1 auto;
    }

    .my-content-card {
        width: 100%;
        box-sizing: border-box;
    }

    .fox-card-views {
        padding: 0px 20px 0px 20px;
        margin-top: -10px;
    }

    .fox-card-view {
        position: relative;
        overflow: hidden;
    }

    /* .fox-card-view-trans-enter {
    } */

    .fox-card-view-trans-enter-active {
        /*        animation: fox-card-view-in-slide-right 330ms;
                      -webkit-animation: fox-card-view-in-slide-right 330ms;*/
        z-index: 120;
    }

    /* .fox-card-view-trans-enter-to {
    } */

    /* 进场动画 */
    @-webkit-keyframes fox-card-view-in-slide-right {
        0% {
            opacity: 0;
            -webkit-transform: translateX(30%);
            transform: translateX(30%);
        }
        100% {
            opacity: 1;
            -webkit-transform: translateX(0%);
            transform: translateX(0%);
        }
    }

    @keyframes fox-card-view-in-slide-right {
        0% {
            opacity: 0;
            -webkit-transform: translateX(30%);
            transform: translateX(30%);
        }
        100% {
            opacity: 1;
            -webkit-transform: translateX(0%);
            transform: translateX(0%);
        }
    }
</style>
