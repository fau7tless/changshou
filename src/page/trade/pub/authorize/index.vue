<template>
    <!--page每个页面的root元素-->
    <fox-page >
       <fox-footer-bar align="right">
           <fox-button type="primary" @click="onSubmit">提交</fox-button>
           <fox-button @click="onCancel">取消</fox-button>
       </fox-footer-bar> 
       <fox-content>
           <fox-group column="1">
                <fox-table-item :content="tradeInfo" show-tool="false">
                    <fox-table-column prop="reason" label="授权原因"></fox-table-column>
                    <fox-table-column prop="level" label="授权级别" width="180"></fox-table-column>
               </fox-table-item>
           </fox-group>
           <fox-group column="2" label-width="100px">
               <fox-text-item readonly v-model="model">授权模式</fox-text-item>
               <fox-text-item v-model="teller">授权柜员</fox-text-item>
               <fox-select-item required v-model="loginType" source='@login-type.json'>登录方式</fox-select-item>
               <fox-text-item required v-model="pass" show-password>密码</fox-text-item>
           </fox-group>
       </fox-content>
    </fox-page>
</template>

<script>
    export default {
        name: 'authorize',
        //数据
        data() {
            return {
                tradeInfo:[],
                model:'本地授权',
                loginType: '1',
                teller:'',
                pass:'',
            }
        },
        //方法
        methods: {
            //提交处理
            onSubmit(){
               this.fox_submit()
            },
            //取消处理
            onCancel(){
                this.$confirm('是否取消授权?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                   //返回code：1代表授权操作取消
                   fox.custom.closePageWithResult(this,1,{})
                }) 
            }
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
            
            //覆盖公共流程
            commit(context, data) {
                context.resolve()
            },

            /**
                 * 提交处理
                 * @param context
                 * @param args
                 */
            submit(context) {
                //拼装当前页面的数据
                let data = fox.custom.getRequestData(this)

                //在这里发起本地授权请求验证，成功后执行下面方法
                //TODO
                console.info(`发起本地授权验证请求:${JSON.stringify(data)}`)

                //返回code：0代表授权操作成功了
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
                 if(error.pass === true){
                   //返回code：2代表授权操作出现错误
                    fox.custom.closePageWithResult(this,2,{})
                 }
            },
        }
        
        }
    }
</script>

<style scoped>
</style>