<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-content>
      <fox-group class="input-block" title="查询条件" column="3">
        <fox-text-item class="query_option" v-model="search.roleId">角色编号</fox-text-item>
        <fox-text-item class="query_option" v-model="search.roleName">角色名称</fox-text-item>
        <fox-item  >
          <fox-button plain  @click="query">查询</fox-button>
          <fox-button plain  @click="clean">清空查询条件</fox-button>
        </fox-item>
      </fox-group>
      <fox-group no="2" class="btn_line" style="width:100%">
        <fox-button-group style="margin-top:10px">
          <fox-button plain  @click="SetRoles">设置映射角色</fox-button>
          <fox-button plain  @click="ViewPost">查看已配置角色的岗位</fox-button>
        </fox-button-group>
        <fox-button-group style="margin-top:10px">
          <fox-button plain  @click="add" icon="el-icon-plus">新增</fox-button>
          <fox-button plain  @click="update" icon="el-icon-edit">修改</fox-button>
          <fox-button plain  @click="del" icon="el-icon-delete">删除</fox-button>
        </fox-button-group>
        <fox-table-item
          ref="list"
          :content="data_url"
          @row-click="rowClick"
          highlight-current-row
          style="margin-top:10px"
          page-index="1"
          :params="search"
          :page-sizes="[5, 50, 100, 200]"
          :page-size="5" border>
          <!-- <fox-table-column type="selection" width="55"></fox-table-column> -->
          <fox-table-column prop="roleId" label="角色编号" width=""></fox-table-column>
          <fox-table-column prop="roleName" label="角色名称" width=""></fox-table-column>
          <fox-table-column prop="roleDescription" label="角色描述信息" width=""></fox-table-column>
          <fox-table-column prop="lastChgDt" label="最后修改日期" width=""></fox-table-column>
          <fox-table-column prop="lastChgUsr" label="最后修改柜员" width=""></fox-table-column>
        </fox-table-item>
      </fox-group>
    </fox-content>
  </fox-page>
</template>
<script>
  export default {
    name: 'roleManage',
    // 数据
    data: function() {
      return {
        search: {
          roleId: null,
          roleName: null
        },
        // dataTable: [],
        data_url : '/'+backend.oca+'/api/adminsmrole/index',
        row: '',
      }
    },
    // 方法
    methods: {
      rowClick(row) {
        this.row = row
      },
      query() {
            let that = this;
            that.$refs.list.refresh();
        // let that = this
        // fox.service.request({
        //   app: backend.oca,
        //   path: 'api/adminsmrole/index',
        //   data: (this.$data.search.roleId != '' ? this.$data.search : null),
        // }).then((response) => {
        //   if (response.code === 0) {
        //     let data
        //     if (fox.type(response.data) === 'array') {
        //       that.dataTable = response.data
        //       data = JSON.stringify(response.data)
        //       console.log(response.data)
        //     }
        //     // 信息框
        //     // fox.layer.open(`成功:${data}`)
        //   } else {
        //     fox.layer.open(`失败:${response.message}`)
        //   }
        // }, (error) => {
        //   fox.layer.open(`请求异常:${error.message}`)
        // })
      },
      SetRoles() {
        // if (this.row === '' || this.row === null) {
        //     this.$alert('必须先选中一条数据')
        // } else {
        fox.custom.appendPage(this, '/foundation/teller/rolemanager/rolegroupmapping', '设置映射角色', {}, this.$data.row)
        // }
      },
      ViewPost() {
        // if (this.row === '' || this.row === null) {
        //     this.$alert('必须先选中一条数据')
        // } else {
        fox.custom.appendPage(this, '/foundation/teller/rolemanager/roledutytmapping', '查看已配置角色的岗位', {}, this.$data.row)
        // }
      },
      add() {
        let params = {
          btnType: 'add',
        }
        fox.custom.appendPage(this, '/foundation/teller/rolemanager/edit', '新增', params, this.$data, {}, this.query)
      },
      update() {
        // if(this.row === '' || this.row === null){
        //     this.$alert('必须先选中一条数据')
        // }else{
        let params = {
          btnType: 'update',
        };
        fox.custom.appendPage(this, '/foundation/teller/rolemanager/edit', '修改', params, this.$data.row, {}, this.query)
        // }
      },
      del() {
         if (this.row === '' || this.row === null) {
            this.$alert('必须先选中一条数据')
        } else {
            this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                fox.service.request({
                    app: backend.oca,
                    path: 'api/adminsmrole/delete',
                    data: this.$data.row,
                })
                .then((response) => {
                    console.log(this.$data.search);
                    if (response.code === 0) {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        // 信息框
                        // fox.layer.open(`成功:${data}`)
                    } else {
                        fox.layer.open(`失败:${response.message}`)
                    }
                    this.query()
                }, (error) => {
                    fox.layer.open(`请求异常:${error.message}`)
                })
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
            }
       },
      cancel() {
        fox.custom.closePage(this)
      },
      clean(){
        this.search.roleId = null;
        this.search.roleName = null;
        }
    },
    mounted: function() {
      this.query()
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
          console.primary('pre submit流程')
          // 触发submit函数调用(必须执行context.resolve或context.reject)
          context.resolve()
        },
        /**
         * 提交处理
         * @param context
         * @param args
         */
        submit(context) {
          console.primary('submit流程: name:' + this.$options.name)
          // 触发post submit函数调用(必须执行context.resolve或context.reject)
          context.resolve()
        },
        /**
         * 提交后处理
         * @param context
         * @param params
         */
        postSubmit(context) {
          console.primary('post submit流程')
        },
        /**
         * 提交取消处理
         * @param context
         * @param args
         */
        cancelSubmit(context, error) {
          console.primary(JSON.stringify(error))
        },
      }
    },
  }
</script>
<style scoped>
.btn_line{
  margin-top:-10px
}
</style>
