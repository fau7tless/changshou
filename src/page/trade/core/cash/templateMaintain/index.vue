<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-content>
      <el-divider content-position="left">输入区</el-divider>
        <fox-group column="2">
          <fox-select-item require v-model="mblx" source="@modelType.json">模版类型</fox-select-item>
          <fox-text-item require v-model="jym">交易码</fox-text-item>
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
                <fox-table-column prop="mbbh" label="模版编号" width></fox-table-column>
                <fox-table-column prop="qdlx" label="渠道类型" width></fox-table-column>
                <fox-table-column prop="jym" label="交易码" width></fox-table-column>
                <fox-table-column prop="pzms" label="凭证描述" width></fox-table-column>
                <fox-table-column prop="pzmblj" label="凭证模版路径" width></fox-table-column>
            </fox-table-item>
        </fox-group>
        <fox-dialog title="修改电子凭证数据模版定义表" :visible.sync="isShowDialog" width="60%" top="10vh" center style="z-index:1000">
              <fox-group column="1">
                <fox-select-item require v-model="row.czlx" source="@opType.json" disabled>操作类型</fox-select-item>
                <fox-text-item require v-model="row.mbbh" disabled>模版编号</fox-text-item>
                <fox-select-item require v-model="row.qdlx" source="@modelType.json">渠道代码</fox-select-item>
                <fox-text-item require v-model="row.jym">交易码</fox-text-item>
                <fox-select-item require v-model="row.mblx" source="@modelType.json">模版类型</fox-select-item>
                <fox-text-item require v-model="row.pzms">描述</fox-text-item>
                <fox-text-item require v-model="row.pzmblj">电子凭证路径</fox-text-item>
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
                mbbh:'T0001',
                qdlx:'01-柜面',
                jym:'002913',
                pzms:'现金缴费单',
                pzmblj:''
            },
             {
                mbbh:'T0002',
                qdlx:'01-超柜',
                jym:'123123',
                pzms:'打印',
                pzmblj:''
            }
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
    }
  },
  // 加载后处理
  mounted: function() {}
};
</script>

<style scoped>
</style>