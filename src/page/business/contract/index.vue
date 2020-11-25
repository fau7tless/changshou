<template>
  <!--page每个页面的root元素-->
  <fox-page group-header-width="120px">
    <!--footer bar必须在fox-content的前面-->

    <fox-footer-bar align="center">
      <!--align的值有left、center、right 默认为right-->
      <fox-badge v-model="operationNum">
        <fox-button class="button-fox" type="primary" style="margin-right:20px" @click="submit">待提交</fox-button>
      </fox-badge>
      <fox-badge>
        <fox-button class="button-fox" type="danger">取消</fox-button>
      </fox-badge>
    </fox-footer-bar>
    <!--page内容区域-->
    <fox-content>
      <fox-group
        no="1"
        title="基本信息"
        class="my-group"
        label-width="100px"
        column="2"
        style="width:100%"
        :filter-events="filterEvents"
      >
        <fox-text-item placeholder="请输入账/卡号">账/卡号</fox-text-item>
        <fox-text-item placeholder="请输入客户号">客户号</fox-text-item>
        <fox-text-item placeholder="请输入户名" clearable>户名</fox-text-item>

        <fox-select-item placeholder="请选择证件类型" :source="m_idType">证件类型</fox-select-item>
        <fox-text-item placeholder="请输入证件类号码">证件类号码</fox-text-item>
        <fox-text-item placeholder="请输入密码" show-password>密码</fox-text-item>
      </fox-group>

      <fox-table
        :data="tableData"
        @expand-change="expand"
        :expand-row-keys="expands"
        row-key="type"
        @cell-click="changeOperation"
      >
        <fox-table-column type="expand">
          <template slot-scope="props">
            <fox-group
              no="3"
              title="签约信息"
              class="my-group"
              label-width="100px"
              column="2"
              style="width:100%"
              v-if="props.row.type=='3'"
            >
              <fox-text-item placeholder="请输入账/卡号" v-model="props.row.limit">转账限额</fox-text-item>
            </fox-group>
            <!-- <fox-group no="4" title="签约号码" class="my-group" 
                                label-width="100px" column="2" style="width:100%" v-if="props.row.type=='2'">
                                <fox-text-item placeholder="请输入金额" v-model="props.row.limit"  >通知起点金额</fox-text-item>
                                <fox-table-item :conntent="numberData1" style="width:50%">
                                    <fox-table-column prop="index" label="序号" width="180"></fox-table-column>
                                    <fox-table-column prop="phoneNumber" label="手机号码" width="180"></fox-table-column>
                                    <fox-table-column prop="phoneNumber" label="手机号码" width="180"></fox-table-column>
                                </fox-table-item>
                               
            </fox-group>-->
            <fox-group
              no="4"
              title="签约信息"
              class="my-group"
              label-width="100px"
              column="1"
              style="width:100%"
              v-if="props.row.type=='2'"
            >
              <fox-form
                ref="form"
                v-if="props.row.type=='2'"
                label-width="140px"
                style="width:100%"
              >
                <fox-row>

                  <fox-col :span="13">
                    <fox-form-item label="通知起点金额">
                      <fox-input v-model="props.row.limit"></fox-input>
                    </fox-form-item>
                  </fox-col>
                  <fox-col :span="13">
                    <fox-form-item label="签约手机号">
                      <div v-for="(item,index) in props.row.phoneList" :key="index">
                        <fox-input
                          v-model="item.phone"
                          class="phoneInput"
                          :style="`width:${inputWidth}`"
                        ></fox-input>
                        <fox-button
                          :type="index==props.row.phoneList.length-1?'info':'danger'"
                          size="medium"
                          @click="handle(index,props.row)"
                        >{{index==props.row.phoneList.length-1?"增加":"删除"}}</fox-button>
                      </div>
                    </fox-form-item>
                  </fox-col>

                </fox-row>
              </fox-form>
            </fox-group>
            <fox-button-row style="text-align:center" v-show="['2','3'].includes(expands[0])">
              <fox-button type="success" size="medium" @click="preSubmit">预提交</fox-button>
              <fox-button type="danger" size="medium" @click="cancel">取消</fox-button>
            </fox-button-row>
          </template>
        </fox-table-column>
        <fox-table-column prop="name" label="签约项" width="180"></fox-table-column>
        <fox-table-column prop="status" label="当前状态" width="180">
          <template slot-scope="scope">
            <i :class="scope.row.status|statusFilter"></i>
            {{statusList[scope.row.status]?statusList[scope.row.status]:'未知'}}
          </template>
        </fox-table-column>
        <fox-table-column prop="isOperation" label width="180">
          <template slot-scope="props">
            <span>
              <i :class="props.row.isOperation|operationFilter"></i>
              {{operationList[props.row.isOperation]?operationList[props.row.isOperation]:''}}
            </span>
          </template>
        </fox-table-column>
        <fox-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <fox-button type="success" size="medium" @click="query(scope.row)" round>查询</fox-button>
            <fox-button type="info" size="medium" @click="sign(scope.row)" round>签约</fox-button>
            <fox-button type="warning" size="medium" @click="update(scope.row)" round>修改</fox-button>
            <fox-button type="danger" size="medium" @click="delet(scope.row)" round>解约</fox-button>
          </template>
        </fox-table-column>
      </fox-table>
    </fox-content>
  </fox-page>
</template>

<script>
export default {
    name: 'contract',
    // 数据
    data: function() {
        return {
            m_idType: [
                { value: '0100', text: '个人身份证' },
                { value: '0200', text: '临时身份证' },
                { value: '0300', text: '户口簿' },
                { value: '0400', text: '护照' },
                { value: '0500', text: '军官证' },
            ],
            filterEvents: {
                focus: false,
                blur: false,
            },
            inputWidth: '82%',
            statusList: ['未签约', '已签约'],
            operationList: ['', '待提交', '取消提交'],
            expands: [],
            flag: false,
            numberData1: [],
            operationNum: 0,
            tableData: [
                {
                    type: '1',
                    name: '网上银行',
                    status: '0',
                    isOperation: '',
                },
                {
                    type: '2',
                    name: '短信签约',
                    status: '1',
                    phoneList: [{}],
                    isOperation: '',
                },
                {
                    type: '3',
                    name: 'ATM转账',
                    status: '2',
                    isOperation: '',
                },
                {
                    type: '4',
                    name: '支付宝',
                    status: '0',
                    isOperation: '',
                },
            ],
            test: '',
            baseParams: {},
            params: {},
        }
    },
    filters: {
        statusFilter(val) {
            switch (val) {
            case '0':
                return 'el-icon-warning warning'
            case '1':
                return 'el-icon-success success'
            default:
                return 'el-icon-question unknown'
            }
        },
        operationFilter(val) {
            switch (val) {
            case 2:
                return 'el-icon-circle-close warning'
            case 1:
                return 'el-icon-circle-check success'
            default:
                return ''
            }
        },
    },
    watch: {
        flag: {
            immediate: true,
            handler(val) {
                this.inputWidth = val ? '82%' : '88%'
            },
        },
    },

    // 方法
    methods: {
        dotPosition() {
            const el = document.getElementsByTagName('sup')
            el[0].style.top = '10px'
            el[0].style.right = '30px'
        },
        handle(index, row) {
            console.log(index)
            console.log(row)
            if (row.phoneList.length - 1 == index) {
                row.phoneList.push({})
            } else {
                row.phoneList.splice(index, 1)
            }
        },
        changeOperation(row, column, cell, event) {
            if (column.property == 'isOperation' && row.isOperation) {
                // this.$set(row, 'isOperation', row.isOperation == 1 ? 2 : 1)
                row.isOperation = row.isOperation == 1 ? 2 : 1
                this.operationNum += row.isOperation == 1 ? 1 : -1
            }
        },
        submit() {
            this.$confirm()
        },
        preSubmit() {
            this.tableData.find((item) => item.type == this.expands[0]).isOperation = 1
            this.operationNum += 1
            this.expands = []
        },
        cancel() {
            this.tableData.find((item) => item.type == this.expands[0]).isOperation = 2
            this.expands = []
        },
        expand(row, expandRows) {
            console.log(this.flag)
            if (this.expands.includes(row.type)) {
                return this.expands.pop()
            }
            this.expands = []
            return this.expands.push(row.type)
        },
        query(row) {
            this.expand(row)
        },
        update(row) {
            this.expand(row)
        },
        sign(row) {
            this.expand(row)
        },
        delet(row) {
            this.expand(row)
        },
    },
    fox_flow() {
        return {
            /**
       *  界面渲染后，更改数据会触发钩子函数
       * @param session
       * @param context
       */
            mounted(session, context) {
                this.dotPosition()
                context.resolve()
            },

            /**
       * 销毁处理
       */
            beforeDestroy(session) {},

            /**
       * 消息
       * @param type
       * @param data
       */
            onMessage(type, data) {
                if (type == 'customerShow') {
                    this.flag = data
                }
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
.button-fox {
  margin-top: 9px;
}
.warning {
  color: orange;
}
.unknown {
  color: rgb(124, 94, 94);
}
.success {
  color: green;
}
.el-input {
  margin-bottom: 10px;
}
.el-badge__content .el-badge__content--undefined .is-fixed {
  position: absolute;
  top: 0;
  right: 10px;
}
sup {
  position: absolute;
  top: 0;
  right: 10px;
}
</style>