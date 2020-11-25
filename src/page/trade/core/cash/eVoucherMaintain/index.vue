<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-content>
      <el-divider content-position="left">输入区</el-divider>
        <fox-group column="2">
          <fox-text-item require v-model="dzpzmc">电子凭证名称</fox-text-item>
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
                <fox-table-column prop="dzpzbh" label="电子凭证编号" width></fox-table-column>
                <fox-table-column prop="dzpzmc" label="电子凭证名称" width></fox-table-column>
                <fox-table-column prop="pzmblx" label="凭证模版类型" width></fox-table-column>
                <fox-table-column prop="pzzt" label="凭证状态" width></fox-table-column>
                <fox-table-column prop="cjgy" label="创建柜员" width></fox-table-column>
                <fox-table-column prop="cjrq" label="创建日期" width></fox-table-column>
            </fox-table-item>
        </fox-group>
        <fox-dialog title="修改电子凭证定义表" :visible.sync="isShowDialog" width="60%" top="5vh" center style="z-index:1000">
              <fox-group column="1">
                <fox-select-item require v-model="row.czlx" source="@opType.json" disabled>操作类型</fox-select-item>
                <fox-text-item require v-model="row.dzpzbh" disabled>电子凭证编号</fox-text-item>
                <fox-text-item require v-model="row.dzpzmc">电子凭证名称</fox-text-item>
                <fox-select-item require v-model="row.pzmblx" source="@voucherSoftType.json">凭证模版类型</fox-select-item>
                <fox-text-item require v-model="row.dzlogo">电子logo</fox-text-item>
                <fox-select-item require v-model="row.pzdx" source="@voucherSize.json">凭证大小</fox-select-item>
                <fox-text-item require v-model="row.pzqk">凭证区宽</fox-text-item>
                <fox-text-item require v-model="row.pzqg">凭证区高</fox-text-item>
                <fox-text-item require v-model="row.pzys">凭证样式</fox-text-item>
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
  name: "eVoucherMaintain",
  // 数据
  data: function() {
    var id = "";
    return {
        dzpzmc:'',
        dataurl: [
            {
                dzpzbh:'V001',
                dzpzmc:'通用凭证1',
                pzmblx:'1-数据模版(yupt)',
                pzzt:'',
                cjgy:'002913',
                cjrq:'20190723'
            },
             {
                dzpzbh:'V002',
                dzpzmc:'通用凭证2',
                pzmblx:'2-PDF模版(pdf)',
                pzzt:'',
                cjgy:'000666',
                cjrq:'20190814'
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
    }
  },
  // 加载后处理
  mounted: function() {}
};
</script>

<style scoped>
</style>