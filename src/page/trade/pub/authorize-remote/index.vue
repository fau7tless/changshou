<template>
    <!--page每个页面的root元素-->
    <fox-page >

       <fox-content>
           <fox-group column="4" label-width="90px" label-position="left">
               <fox-group :sub="true" column="1" span="3">
                  <fox-x-camera v-model="images"></fox-x-camera>
               </fox-group>
               <fox-group :sub="true" column="1" span="1" style="margin-top:0px" label-position="left">
                    <fox-table-item class="my-item-row" :content="tradeInfo" show-tool="false" height="277px">
                       <fox-table-column prop="reason" label="授权原因"></fox-table-column>
                       <fox-table-column prop="level" label="授权级别" width="100"></fox-table-column>
                    </fox-table-item>
                    <fox-item class="my-item-row">
                        <div class="my-items">
                           <fox-button>检查授权中心人数</fox-button>
                           <fox-text-item style="margin-bottom:0px"></fox-text-item>
                        </div>
                    </fox-item>
                    <fox-text-item class="my-item-row" required v-model="teller">审核人</fox-text-item>
                    <fox-select-item class="my-item-row" required v-model="validateType" item-type="item" source='@validate-type.json'>验证方式</fox-select-item>
                    <fox-text-item class="my-item-row" required v-model="pass" show-password>密码</fox-text-item>
                    <fox-button-row style="margin-top:10px" align="center">
                       <fox-button @click="onSubmit">提交</fox-button>
                       <fox-button @click="onCancel">取消</fox-button>
                   </fox-button-row>
               </fox-group>
           </fox-group>
       </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'authorize_remote',
    // 数据
    data() {
        return {
            tradeInfo: [],
            validateType: '1',
            teller: '',
            pass: '',
            images: [],
        }
    },
    // 方法
    methods: {
        // 提交处理
        onSubmit() {
            this.fox_submit()
        },
        // 取消处理
        onCancel() {
            this.$confirm('是否取消授权?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                // 返回code：1代表授权操作取消
                fox.custom.closePageWithResult(this, 1, {})
            }) 
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

            // 覆盖公共流程
            commit(context, data) {
                context.resolve()
            },

            /**
                 * 提交处理
                 * @param context
                 * @param args
                 */
            submit(context) {
                // 获取授权页面UI数据
                let syncData = fox.custom.getSyncData(this)
                let { authData } = syncData

                // 拼装当前页面的数据
                let data = fox.custom.getRequestData(this)

                // 拼装当前数据
                let reqData = {
                    tradeData: JSON.stringify(data),
                    authData: JSON.stringify(authData),
                }

                fox.service.request({
                    path: '/icsp-app-task/api/csnshTask/create',
                    data: reqData,
                }).then((rsp) => {
                    console.info(JSON.stringify(rsp))
                }, (error) => {
                    console.info(error)
                })

                // 在这里发起远程授权请求，成功后执行下面方法
                // TODO
                console.info(`发起远程授权请求:${JSON.stringify(reqData)}`)

                // 返回code：0代表授权操作成功了
                fox.custom.closePageWithResult(this, 0, {})
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
                if(error.pass === true) {
                    // 返回code：2代表授权操作出现错误
                    fox.custom.closePageWithResult(this, 2, {})
                }
            },
        }
    },
}
</script>

<style scoped>
.my-items{
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
}
.my-item-row{
    margin-bottom:20px
}

.my-img-div{
    background:white;
    width:100%; 
    min-height:520px
}
</style>