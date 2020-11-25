<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-content>
      <el-divider content-position="left">输入区</el-divider>
        <fox-group column="2">
          <fox-text-item require v-model="jgm">机构码</fox-text-item>
        </fox-group>
        <fox-button-row class style="text-align:center">
            <fox-button type="primary" style="width:6rem" size="medium" icon="el-icon-search" @click="query">查询</fox-button>
            <fox-button type="primary" style="width:6rem" size="medium" @click="cancel">取消</fox-button>
        </fox-button-row>
        <br/>
        <el-divider content-position="left">输出区</el-divider>
        <fox-group no="2" label-width="80px">
            <fox-table-item
                ref="table"
                :content="dataurl"
                page-index="1"
                :page-sizes="[10, 50, 100, 200]"
                :page-size="10"
                width="100%"
                @row-click="rowClick"
                :params="searchParams"
                highlight-current-row
                height="300px"
            >
                <fox-table-column prop="jgm" label="机构码" width></fox-table-column>
                <fox-table-column prop="jgmc" label="机构名称" width></fox-table-column>
                <fox-table-column prop="zt" label="状态" width :formatter="showStatus"></fox-table-column>
            </fox-table-item>
        </fox-group>
        <fox-dialog title="电子印章启用网点" :visible.sync="isShowDialog" width="60%" top="10vh" center style="z-index:1000">
              <fox-group column="1">
                <fox-select-item require v-model="row.czlx" source="@opType.json" disabled>操作类型</fox-select-item>
                <fox-text-item require v-model="row.jgm">机构码</fox-text-item>
                <fox-select-item require v-model="row.zt" source="@eVoucher.json">状态</fox-select-item>
                <fox-text-item require v-model="row.jgmc">机构名称</fox-text-item>
            </fox-group>
              <span slot="footer" class="dialog-footer">
                <fox-button type="primary" @click="commit">提交</fox-button>
                <fox-button @click="isShowDialog = false">取 消</fox-button>
              </span>
            </fox-dialog>
    </fox-content>
    
  </fox-page>
</template>

<script>
export default {
  name: "templateMaintain",
  // 数据
  data: function() {
    var id = "";
    return {
        mblx:'',
        jym:'',
        dataurl: [
            {
                jgm:'002913',
                jgmc:'苏州分行',
                zt:'0',
                czlx:''
            },
            {
                jgm:'008809',
                jgmc:'上海分行',
                zt:'1',
                czlx:''
            },
        ],
        searchParams: {},
        row: {
        },
        isShowDialog:false,
    };
  },
  // 方法
  methods: {
    query(){

    },
    cancel(){
      fox.custom.closePage(this);
    },
    rowClick(row, column, event) {
        this.row = row;
        this.row.czlx = '2'
        this.isShowDialog = true;
    },
    commit(){
        this.$message('修改成功')
        this.isShowDialog = false;
    },
    showStatus(row,column){
      let val = row[column.property]
      return (val=='1'?"1-启用":'0-停用')
    }
  },
  // 加载后处理
  mounted: function() {}
};
</script>

<style scoped>
</style>