<template>
    <!--page每个页面的root元素-->
    <fox-page >
       <fox-content>
           <fox-group column="3" label-width="100px">
               <fox-text-item v-model="queryParams.tradeName">交易名称</fox-text-item>
               <fox-text-item v-model="queryParams.tradeCode">交易码</fox-text-item>
               <fox-date-item
                        value-format="yyyy-MM-dd HH:mm:ss"
                        v-model="queryParams.timeScope"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">默认</fox-date-item>
                <fox-button-row align="center">
                      <fox-button @click="onQuery">查询</fox-button>
                      <fox-button @click="onReset">重置</fox-button>
                </fox-button-row>    
           </fox-group>
           <fox-group>
              <fox-table-item id="fx_table_001" ref="table" auto-refresh="false" :content="m_url" page-index="1" :page-sizes="[10, 50, 100, 200]"
                        :page-size="10" :base-params="baseParams" :params="params"
                        highlight-current-row>
                  <fox-table-column prop="seq" label="流水号"></fox-table-column>
                  <fox-table-column prop="tradeCode" label="交易码"></fox-table-column>
                  <fox-table-column prop="tradeName" label="交易名"></fox-table-column>
                  <fox-table-column prop="tradeDate" label="交易时间"></fox-table-column>
                  <fox-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <fox-button type="text" size="small" @click="onAuthAction(scope)">提交</fox-button>
                    </template>
                  </fox-table-column>
               </fox-table-item>
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
                m_url:'/icsp-app-task/api/csnshTask/index',
                baseParams:{

                },
                queryParams:{
                  tradeName:'',
                  tradeCode:'',
                  timeScope:[]
                },

                params:{

                },

                m_items:[
                    {
                        seqId:'007',
                        tradeCode:'',
                        tradeName:'现金存款',
                        date:'2020/11/08',
                    },
                ]
            }
        },
        //方法
        methods: {
            //提交处理
            onQuery(){
              this.$refs.table.refresh()
            },
            //重置
            onReset(){
                this.tradeName = ''
                this.tradeCode = ''
                this.timeScope = []
            },
            //授权操作
            onAuthAction({$index, row}){
               let authData = row.authData
               if(typeof authData){
                   authData = JSON.parse(authData)
               }
               //获取UI数据
               let uiData = authData.uiData
               //获取路由
               let route = authData.route
               //生成同步数据
               let syncData ={
                   uiData:uiData
               }

               fox.custom.appendPageWithResult(this, route, {top:"1vh",title:row.tradeName,width:'80%'}, { foxOpenType: 'auth'}, syncData,(code, rsp)=>{
                   //刷新任务
                   this.$refs.table.refresh()
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
                this.onQuery()
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
                
            },
        }
        
        }
    }
</script>

<style scoped>
</style>