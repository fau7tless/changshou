<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-content>
      <el-divider content-position="left">输入区</el-divider>
        <fox-group column="3">
          <fox-text-item require v-model="frdm">法人代码</fox-text-item> 
          <fox-text-item require v-model="jgm" maxlength="6">机构码</fox-text-item> 
          <fox-text-item require v-model="yzmc">印章名称</fox-text-item> 
        </fox-group>
        <fox-button-row class style="text-align:center">
            <fox-button type="primary" style="width:6rem" size="medium" icon="el-icon-search" @click="query">查询</fox-button>
            <fox-button type="primary" style="width:6rem" size="medium" @click="cancel">取消</fox-button>
        </fox-button-row>
        <br/>
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
                <fox-table-column prop="yzmc" label="印章名称" width></fox-table-column>
                <fox-table-column prop="yhwz" label="银行文字" width></fox-table-column>
                <fox-table-column prop="jgwz" label="机构文字" width></fox-table-column>
                <fox-table-column prop="zt" label="状态" width></fox-table-column>
            </fox-table-item>
        </fox-group>
        <fox-dialog title="添加电子印章机构文字定义" :visible.sync="isShowDialog" width="60%" top="5vh" center style="z-index:1000">
              <el-container style="width:100%">
                <el-aside style="width:45%">
                  <fox-group column="1">
                    <fox-select-item require v-model="row.czlx" source="@opType.json" disabled>操作类型</fox-select-item>
                    <fox-text-item require v-model="row.jgm" disabled>机构码</fox-text-item>
                    <fox-text-item require v-model="row.jgwz">机构名称</fox-text-item>
                    <fox-select-item require v-model="row.dzyz" source="@voucherSoftType.json">电子印章</fox-select-item>
                    <fox-text-item require v-model="row.dzlogo">银行文字</fox-text-item>
                    <fox-text-item require v-model="row.pzdx">机构文字</fox-text-item>
                  </fox-group>
                </el-aside>
                <el-aside style="width:54%">
                  <div style="margin:0 2rem">
                      <img :src="imgUrl" style="margin:0;width:99%">
                  </div>
                </el-aside>
              </el-container>
              <span slot="footer" class="dialog-footer">
                  <fox-button type="primary" @click="showInfo">预览</fox-button>
                <fox-button type="primary" @click="commit">提交</fox-button>
                <fox-button @click="isShowDialog = false">取 消</fox-button>
              </span>
            </fox-dialog>
    </fox-content>
    
  </fox-page>
</template>

<script>
export default {
  name: "eVoucherOrgNameMaintain",
  // 数据
  data: function() {
    var id = "";
    return {
        frdm:'',
        jgm:'',
        yzmc:'',
        dataurl: [
            {
                mbbh:'001',
                yzmc:'全局',
                yhwz:'浙江有限公司',
                jgwz:'天津分行',
                zt:'1-启用'
            },
            {
                mbbh:'001',
                yzmc:'业务专用章',
                yhwz:'苏州有限公司',
                jgwz:'常熟总行',
                zt:'0-停用'
            },
        ],
        searchParams: {},
        row: {
        },
        isShowDialog:false,
        imgUrl:""
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
    //预览
    showInfo(){
        this.imgUrl = '../../../../../../static/img/seal.png'
    }
  },
  // 加载后处理
  mounted: function() {}
};
</script>

<style scoped>
</style>