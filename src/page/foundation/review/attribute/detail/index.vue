<template>
    <fox-page>
        <fox-content>
            <fox-footer-bar align="right">
                <fox-button type="primary" size="medium" @click="submit">确定</fox-button>
                <fox-button size="medium" @click="cancel">取消</fox-button>
            </fox-footer-bar>          
            <fox-group column="3" title="基本信息">
                <fox-text-item v-model="btnId" require>按钮ID</fox-text-item>
                <fox-text-item v-model="funcName" require>功能名称</fox-text-item>
                <fox-select-item v-model="reviewMode" require source="@CO000005.json" @change="changeMode">复核模式</fox-select-item>
                <fox-text-item v-model="firstApproveChkUrl" require>初审检查URL</fox-text-item>
                <fox-text-item v-model="secondApproveChkUrl" require>复审检查URL</fox-text-item>
                <fox-text-item v-model="secondApprovePassUrl" require>复审通过URL</fox-text-item>
                <fox-text-item v-model="reviewOpType">复核操作类型</fox-text-item>
                <fox-text-item v-model="approveFlag">是否审核</fox-text-item>
                <fox-text-item v-model="inputChkUrl">录入检查URL</fox-text-item>
                <fox-text-item v-model="reviewPassChkUrl">复核通过检查URL</fox-text-item>
                <fox-text-item v-model="reviewPassProcUrl">复核通过处理URL</fox-text-item>
                <fox-text-item v-model="invalidPostProcUrl">作废后处理URL</fox-text-item>
                <fox-text-item v-model="specialPageDtlPath">特殊页详情</fox-text-item>
                <fox-text-item v-model="specialPageModifyPath">特殊页修改</fox-text-item>
                <fox-text-item v-model="specialPageFirstapprovePath">特殊页初审</fox-text-item>
                <!-- -->
                <fox-text-item v-model="autoInvalidOffsetDays">自动作废偏移天数</fox-text-item>
                <fox-text-item v-model="bizQryFieldList">业务查询字段列表</fox-text-item>
                <fox-text-item v-model="reviewDtlPage">复核详情页</fox-text-item>
                <fox-text-item v-model="bizDtlQryUrl">业务详情查询URL</fox-text-item>
                <fox-text-item v-model="inputPostProcUrl">录入后处理URL</fox-text-item>
                <fox-empty-item></fox-empty-item>
                <fox-transfer
                    v-model="inputFieldList"
                    v-if="reviewMode=='02'"
                    class="dialog-transfer"
                    :titles="m_titles"
                    :data="m_transferData"
                ></fox-transfer>
                <div class="my-wrap">
                    <fox-router-view name="_sys_root_extract"></fox-router-view>
                </div>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
import ModelObserver from '@/utils/commons/controller/model-observer'

export default {    
    name: 'RE020001',
    // 数据
    data: function () {
        return {
            btnId : "",
            funcName : "",
            reviewMode : "",
            firstApproveChkUrl : "",
            secondApproveChkUrl : "",
            secondApprovePassUrl : "",
            reviewOpType : "",
            approveFlag : "",
            inputChkUrl : "",
            reviewPassChkUrl : "",
            reviewPassProcUrl : "",
            invalidPostProcUrl : "",
            specialPageDtlPath : "",
            specialPageModifyPath : "",
            specialPageFirstapprovePath : "",
            autoInvalidOffsetDays : "",
            bizQryFieldList : "",
            reviewDtlPage : "",
            bizDtlQryUrl : "",
            inputPostProcUrl : "",
            // 录入字段列表
            inputFieldList: [],

            m_titles: ['上下文', '复核字段'],
            // 备选字段列表
            m_transferData: [],
            //
            //
            //
            //
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
            //
            //
            this.fox_submit()
        },
        cancel() {
            fox.layer.confirm('是否退出', '提示', {
                type: 'info',
            }).then(() => {
                fox.custom.closePage(this)
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
                        this.$message.error('获取功能列表失败！')
                        resolve(data)
                    }
                })
            })
            return promise
        },
        // 改变复核方式
        changeMode() {
            this.getContext()
        },
        // 获取上下文信息
        getContext() {
            if (this.reviewMode == '02' && this.btnId){
                let route = {
                    //
                    //
                    name: this.btnId,
                    root: '_sys_root_extract',
                    //
                    success: () => {
                        //
                        this.generateData()
                        //
                    },
                }
                this.$route.put(route)
            }
        },
        // 获取页面信息
        generateData() {
            let modelOberver = new ModelObserver()
            modelOberver.look(this, '_sys_root_extract').then((vmItems) => {
                this.m_transferData = []
                for(let i = 0; i < vmItems.length; i++) {
                    if (vmItems[i].label) {
                        this.m_transferData.push({
                            key: vmItems[i].name,
                            lable: `${vmItems[i].name}-${vmItems[i].label || 'unknown'}`,
                            contextid: vmItems[i].name,
                            name: vmItems[i].label,
                        })
                    }
                }
                console.log('this.m_transferData:' + JSON.stringify(this.m_transferData))
            })
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
                    this.getContext()
                } else if (this.$route.params.type == 'update') {
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
                console.info('page-submit流程')
                let data = fox.custom.getRequestData(this)
                data.inputFieldList = JSON.stringify(this.inputFieldList)
                fox.service.request({
                    //
                    path: '/api1/infra/review/reviewmodeconfig/modeset/updatemodeset',
                    data,
                }).then((response) => {
                    if (response.code == 0) {
                        this.$message.success('复核配置成功')
                        context.resolve()
                    } else {
                        this.$alert(`复核配置失败！${response.message}`, '提示', {
                            type: 'error',
                        })
                        context.reject()
                    }
                }).cathc((error) => {
                    this.$alert(`复核配置失败！${response.message}`, '提示', {
                        type: 'error',
                    })
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
                fox.custom.closePage(this)
            },
 
            /**
             * 提交取消处理
             * @param context
             * 
             */
            cancelSubmit(context, error) {                        
                console.info(JSON.stringify(error))
            },
        }
    }
}
</script>

<style scoped>
.tree-area {
    max-height: 200px; overflow: hidden;
}
.tree-area .tree-area-inner {
    max-height: 200px; overflow: auto;
}
.dialog-transfer {
    margin: 0 auto 20px; width: 582px
}
.my-wrap {
    width: 0; height: 0; overflow: hidden; display: none;
}
</style>