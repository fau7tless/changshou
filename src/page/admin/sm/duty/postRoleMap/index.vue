<template>
    <!--page每个页面的root元素-->
    <fox-page>
        <!--page内容区域-->
        <fox-footer-bar align="right">
            <fox-button @click="submit">确定</fox-button>
            <fox-button @click="cancel">取消</fox-button>
        </fox-footer-bar>
        <fox-content>
            <div style="width:100%;display:flex;">
                <fox-transfer :data="data" v-model="value" :props="{key: 'roleId',label: 'roleName'}" :titles="['全部角色','拥有角色']"></fox-transfer>
            </div>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'postManagePostRoleMap',
    // 数据
    data: function () {
        return {
            data: [
                {
                    roleName: 'J001-系统管理',
                    roleId: '1',
                }, {
                    roleName: 'J002-岗位角色设置',
                    roleId: '2',
                }, {
                    roleName: 'J003-角色权限管理',
                    roleId: '3',
                }, {
                    roleName: 'J004-现金业务处理',
                    roleId: '4',
                }, {
                    roleName: 'J005-综合业务处理',
                    roleId: '5',
                }, {
                    roleName: 'J006-国结业务处理',
                    roleId: '6',
                }, {
                    roleName: 'J007-管库',
                    roleId: '7',
                }, {
                    roleName: 'J008-公共查询',
                    roleId: '8',
                }, {
                    roleName: 'J009-总行运营查询',
                    roleId: '9',
                }, {
                    roleName: 'J010-结算中心处理',
                    roleId: '10',
                }, {
                    roleName: 'J011-业务主任处理',
                    roleId: '11',
                }, {
                    roleName: 'J012-业务主办处理',
                    roleId: '12',
                }, {
                    roleName: 'J013-机房值班处理',
                    roleId: '13',
                }, {
                    roleName: 'J014-协储管理',
                    roleId: '14',
                }, {
                    roleName: 'J015-附加积数管理',
                    roleId: '15',
                }, {
                    roleName: 'J016-卡部管理',
                    roleId: '16',
                }, {
                    roleName: 'J017-财务查询',
                    roleId: '17',
                }, {
                    roleName: 'J018-审计处理',
                    roleId: '18',
                }, {
                    roleName: 'J019-ATM柜员处理',
                    roleId: '19',
                }, {
                    roleName: 'J020-分行营业查询',
                    roleId: '20',
                },
            ],
            value: [],
            row: '',
            rowMap: [],
        }
    },
    // 方法
    methods: {
        query() {
            this.row = fox.custom.getSyncData(this)
            let that = this
            fox.service.request({
                app: backend.oca,
                path: 'api/adminsmdutyrolemapping/index',
                data: {"dutyId":this.row.dutyId},
            }).then((response) => {
                if (response.code == 0) {
                    let data
                    if (fox.type(response.data) == 'array') {
                        that.rowMap = response.data
                        data = JSON.stringify(response.data)
                        console.log(response.data)
                        for(let one of that.rowMap){
                            that.value.push(one.roleId)
                        }
                    }
                    // 信息框
                    // fox.layer.message(`成功:${data}`)
                } else {
                    fox.layer.message(`失败:${response.message}`)
                }
            }, (error) => {
                fox.layer.message(`请求异常:${error.message}`)
            })
        },
        submit() {
            console.log(fox.custom.getSyncData(this))
             this.rowMap[0] = this.value
             console.log(this.rowMap[0])
            let that = this
            fox.service.request({
                app: backend.oca,
                path: 'api/adminsmdutyrolemapping/updateDutyRoles',
                data: {"dutyId":fox.custom.getSyncData(this).dutyId,"roleId":this.rowMap[0]},//[0]
            }).then((response) => {
                if (response.code == 0) {
                    let data
                    if (fox.type(response.data) == 'array') {
                        data = JSON.stringify(response.data)
                        console.log(response.data)
                    }
                    // 信息框
                    fox.layer.message(`成功:${data}`)
                } else {
                    fox.layer.message(`失败:${response.message}`)
                }
                fox.custom.closePage(that)
            }, (error) => {
                fox.layer.message(`请求异常:${error.message}`)
            })
        },
        cancel() {
            fox.custom.closePage(this)
            object.assign(this.$data, this.$options.data)
        },
    },
    // fox流程
    fox_flow() {
        return {
            /**
                 *  界面渲染后，更改数据会触发钩子函数
                 * @param session
                 * @param context
                 */
            mounted(session, context) {
                this.query()
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
                console.info('submit流程: name:' + this.$options.name)
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
</style>