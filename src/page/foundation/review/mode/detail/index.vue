<template>
    <fox-page>
        <fox-content>
            <fox-footer-bar align="right">
                <fox-button type="primary" @click="submit">提交</fox-button>
                <fox-button @click="cancel">取消</fox-button>
                <fox-button @click="stash">暂存</fox-button>
            </fox-footer-bar>          
            <fox-group column="3" title="基本信息">
                <fox-text-item v-model="memAcctNum" require :disabled="m_disabled.memAcctNum">参与者账号</fox-text-item>
                <fox-text-item v-model="memSname" require :disabled="m_disabled.memSname">参与者简称</fox-text-item>
                <fox-select-item v-model="reviewFlag" require :disabled="m_disabled.reviewFlag" source="@CO000001.json">是否复核</fox-select-item>
                <fox-text-item v-model="funcNum" require :disabled="m_disabled.funcNum">功能号</fox-text-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {    
    name: 'RE020301',
    // 数据
    data: function () {
        return {
            memAcctNum: '',
            menSname: '',
            reviewFlag: '',
            funcNum: '',
            m_funcNumList: [],
            m_defaultProps: {
                children: 'children',
                label: 'menuName',
            },
            m_disabled: {
                memAcctNum: false,
                memSname: false,
                reviewFlag: false,
                funcNum: false,
            },
        }
    },
    // 方法
    methods: {
        submit() {
            this.fox_submit()
        },
        cancel() {
            fox.layer.confirm('是否退出', '提示', {
                // confirmButtonText: '确定',
                // cancelButtonText: '取消',
                // type: 'info',
                // type: 'info',
                // type: 'info',
                type: 'info',
            }).then(() => {
                fox.custom.closePage(this)
            }).catch(() => {
                // this.$message.info('取消')
            })
        },
        stash() {
            let data = {
                menuId: this.$route.params.funcNum,
                menuName: '复核配置',
                origBizData: JSON.stringify(fox.custom.getRequestData(this)),
                stashBizOpenDtlPage: '/infra-review/uniReview/mode/detail',
                stashBizOpenType: 'create',
            }
            fox.service.request({
                path: '/api1/infra/review/webfrontmanage/frontdata/createfrontdata',
                data,
            }).then((response) => {
                if (response.code == 0) {
                    this.$message.success(`暂存成功`)
                } else {
                    this.$message.error(`暂存失败:${response.message}`)
                }
            }).cathc((error) => {
                this.$message.error(`暂存异常:${error}`)
            })
        },
        handleNodeClick(node) {
            this.funcNum = node.menuId
        },
        getFuncNum() {
            let promise = new Promise((resolve, reject) => {
                fox.custom.queryMenuList((code, data) => {
                    if (code == 0) {
                        resolve(data)
                    } else {
                        //
                        resolve(data)
                    }
                })
            })
            return promise
        },
    },
    // Fox流程
    fox_flow() {
        return {
            /**
             * 界面渲染后，更改数据会触发钩子函数
             * @param session
             * @param context
             */
            mounted(session, context) {
                if (this.$route.params.type == 'alter') {
                    this.m_disabled.memAcctNum = true
                    this.m_disabled.memSname = true
                    this.m_disabled.funcNum = true
                } else if (this.$route.params.type == 'update') {
                    //
                    //
                    //
                } else if (this.$route.params.type == 'review') {
                    //
                }
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
                // 触发check函数调用（必须执行context.resolve或context.reject）
                context.resolve()
            },
            
            /**
             * 提交前处理
             * @param context
             * @param checkResult
             */
            preSubmit(context, checkResult) {
                console.info('pre submit流程')
                
                // 触发check函数调用（必须执行context.resolve或context.reject）
                context.resolve()
            },
            
            /**
             * 提交处理
             * @param context
             * @param args
             */
            submit(context, ...args) {
                //
                let data = fox.custom.getRequestData(this)
                //
                //
                //
                fox.service.request({
                    //
                    path: '/api1/infra/review/reviewdetailinfo/create',
                    //
                    data,
                }).then((response) => {
                    if (response.code == 0) {
                        context.resolve()
                    } else {
                        context.reject()
                    }
                }).cathc((error) => {
                    context.reject(error)
                })
            },

            /**
             * 提交后处理
             * @param context
             * 
             */
            postSubmit(context) {                
                console.info('post submit流程')
                this.$message({
                    type: 'success',
                    message: '复核配置成功！',
                })
                fox.custom.closePage(this)
            },
 
            /**
             * 提交取消处理
             * @param context
             * 
             */
            cancelSubmit(context, error) {    
                console.log(`复核配置失败！${JSON.stringify(error)}`);                            
                console.info(JSON.stringify(error))
            },
        }
    }
}
</script>

<style scoped>

</style>