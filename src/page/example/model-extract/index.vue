<template>
    <fox-page>
        <fox-footer-bar>
            <fox-button class="my-button el-button--primary" @click="closePage">关闭页面</fox-button>
        </fox-footer-bar>
        <fox-content>
            <fox-group no="1" title="基础操作" label-width="80px" column="4" >
                <fox-select-item text-name="name" value-name="path" v-model="routePath" :source="m_items" filterable span="2">交易</fox-select-item>
                <fox-item span="2">
                    <fox-button class="my-button el-button--danger" @click="load">加载</fox-button>
                    <fox-button class="my-button el-button--primary" @click="openNormal">经办打开</fox-button>
                    <fox-button class="my-button el-button--primary" @click="openCheck">复核打开</fox-button>
                </fox-item>
                <fox-button-row align="left">
                    <fox-transfer :titles="m_titles" v-model="value" :data="data"></fox-transfer>
                </fox-button-row>
            </fox-group>
            <fox-group class="my-wrap" style="width: 1px; height: 1px;box-sizing: border-box;overflow: hidden;z-index: 20;position: relative">
                <fox-router-view name="_sys_root_extract"></fox-router-view>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
import ModelObserver from '../../../utils/commons/controller/model-observer'

export default {
    name: 'example_model-extract',
    // 数据
    data() {
        return {
            m_items: [],
            m_titles: ['上下文', '复核字段'],
            data: [],
            value: [],
            routePath: '',
            vmItems: [],
        }
    },
    // 方法
    methods: {
        openNormal() {
            fox.custom.openPage(this, this.routePath)
        },

        openCheck() {
            let location = {
                route: {
                    path: '/frame',
                },
            }
            let filterModels = []
            for(let index of this.value) {
                filterModels.push(this.vmItems[index].name)
            }
            // 保存数据到bus中
            fox.bus.put('sys_global', 'filterModels', filterModels)

            // 打开页面
            fox.custom.openPage(this, this.routePath, { foxOpenType: 'check' })
        },

        // 加载页面
        load() {
            console.info(`加载page path:${this.routePath}`)
            let route = {
                path: this.routePath,
                root: '_sys_root_extract',
                params: { fox_openType: 'other' },
                success: () => {
                    // 抽取数据
                    this.generateData()
                },
            }
            this.$router.put(route)
        },

        // 获取页面信息
        generateData() {
            let modelObserver = new ModelObserver()
            modelObserver.look(this, '_sys_root_extract').then((vmItems) => {
                this.vmItems = vmItems
                this.data = []
                for(let i = 0; i < this.vmItems.length; i++) {
                    if(this.vmItems[i].index == 0) {
                        this.data.push({
                            key: i,
                            label: `${this.vmItems[i].name}-${this.vmItems[i].label || 'unknown'}`,
                        })
                    }
                }
            })
        },
        // 关闭页面
        closePage() {
            fox.custom.closePage(this)
        },
    },
    // Fox流程
    fox_flow() {
        return {
            /**
                 *  界面渲染后，更改数据会触发钩子函数
                 * @param session
                 * @param context
                 */
            mounted(session, context) {
                let list = this.$router.getRoutes()
                this.m_items = list

                // 完成mounted函数
                context.resolve()
            },

            /**
                 * 销毁处理
                 */
            beforeDestroy(session) {

            },

            /**
                 * 消息
                 * @param type
                 * @param data
                 */
            onMessage(type, data) {

            },

            /**
                 * 设置检查条件
                 * @param context
                 */
            setCheckConditions(context) {
                // 触发check函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
                 * 提交前处理
                 * @param context
                 * @param checkResult
                 */
            preSubmit(context, checkResult) {
                console.info('pre submit流程')

                // 触发submit函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
                 * 提交处理
                 * @param context
                 * @param args
                 */
            submit(context) {
                console.info('submit流程')
                // 触发post submit函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
                 * 提交后处理
                 * @param context
                 * @param params
                 */
            postSubmit(context) {
                console.info('post submit流程')
            },

            /**
                 * 提交取消处理
                 * @param context
                 * @param args
                 */
            cancelSubmit(context, error) {
                console.info(JSON.stringify(error))
            },
        }
    },
}
</script>

<style scoped>
.my-button{
    width: 100px;
}

.my-wrap .my-page{
    display: none;
}
</style>