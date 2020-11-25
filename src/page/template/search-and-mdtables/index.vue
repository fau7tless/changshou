<template>
  <!--page每个页面的root元素-->
  <fox-page group-header-width="120px">
    <!--page内容区域-->
    <fox-content>
      <fox-group class="my-group" label-width="80px" column="2" style="width:100%">
        <!-- ---------------左----------------------- -->
        <fox-group title="数据源信息" class="my-group" label-width="80px" column="2" style="width:59.6%">
          <fox-text-item placeholder="数据源名称" v-model="search.databaseName"></fox-text-item>
          <fox-item>
            <fox-button class="button1" type="default" icon="el-icon-search" @click="query">查询</fox-button>
            <fox-button class="button1" type="default" icon="el-icon-plus" @click="addDataSource">添加</fox-button>
            <fox-button
              class="button1"
              type="default"
              icon="el-icon-caret-right"
              @click="loading"
            >载入源</fox-button>
            <fox-button class="button1" type="default" icon="el-icon-more" @click="open">打开源</fox-button>
          </fox-item>
          <!-- -----------------左表格------------------------------ -->
          <fox-table-item
            border
            @row-click="rowClick"
            :content="dataTable"
            highlight-current-row
            page-index="1"
            style="margin-top:10px"
            :page-sizes="[5, 50, 100, 200]"
            :page-size="5"
            tool-layout="total, sizes, jumper"
          >
            <fox-table-column label="数据库名称" width="95" prop="databaseName"></fox-table-column>
            <fox-table-column prop="databaseType" label="数据库类型" width="95"></fox-table-column>
            <fox-table-column prop="url" label="数据库Url" width="290"></fox-table-column>
            <fox-table-column prop="loading" label="能否载入" width="80"></fox-table-column>
            <fox-table-column label="操作" width="168">
              <template slot-scope="scope">
                <fox-button @click="infoFn(scope.row)" icon="el-icon-info" size="mini"></fox-button>
                <fox-button @click="modifyFn(scope.row)" icon="el-icon-edit" size="mini"></fox-button>
                <fox-button @click="deleteFn(scope.row)" icon="el-icon-delete" size="mini"></fox-button>
              </template>
            </fox-table-column>
          </fox-table-item>
        </fox-group>

        <!-- -------------右 ------------------>
        <fox-group
          no
          title="表空间信息"
          class="my-group"
          label-width="80px"
          column="3"
          style="width:40%"
        >
          <fox-text-item placeholder="表名" span="2" v-model="search.tableName"></fox-text-item>
          <fox-button type="default" icon="el-icon-search" @click="rightQuery">查询</fox-button>
          <!----------------------- 右表格----------------------------  -->
          <fox-table-item
            border
            @row-click="rowClick"
            :content="loadTable"
            highlight-current-row
            page-index="1"
            :page-sizes="[5, 50, 100, 200]"
            :page-size="5"
            tool-layout="total, sizes, jumper"
          >
            <fox-table-column prop="tableName" label="表名" width="80"></fox-table-column>
            <fox-table-column prop="engine" label="引擎" width="80"></fox-table-column>
            <fox-table-column prop="tableComment" label="备注"></fox-table-column>
            <fox-table-column prop="createTime" label="创建时间" width="80"></fox-table-column>
            <fox-table-column label="操作" width="80">
              <template slot-scope="scope">
                <fox-button @click="configData(scope.row)" icon="el-icon-share" size="mini"></fox-button>
              </template>
            </fox-table-column>
          </fox-table-item>
        </fox-group>
      </fox-group>
    </fox-content>
  </fox-page>
</template>
<script>
export default {
  name: "databaseTable",
  data: function() {
    return {
      search: {
        databaseName: null,
        username: null
      },
      dataTable: [
        {
          id: "",
          databaseName: "",
          databaseType: "",
          url: "",
          driverClassName: "",
          username: "",
          password: "",
          loading: ""
        }
      ],
      loadTable: [
        {
          engine: "",
          createTime: "",
          tableComment: "",
          tableName: ""
        }
      ],
      row: "",
      baseName: null,
      type: null,
      tableNames: []
    };
  },
  //-------------------方法----------------------
  methods: {
    rowClick(row) {
      this.row = row;
    },
    // ----------------左查询--------------------------
    query() {
      let that = this;
      fox.service
        .request({
          app: backend.generatorService,
          path: "api/configDatabase/index",
          data: this.$data.search.databaseName != "" ? this.$data.search : null
        })
        .then(
          response => {
            if (response.code == 0) {
              let data;
              if (fox.type(response.data) == "array") {
                that.dataTable = response.data;
                data = JSON.stringify(response.data);
              }
              // 信息框
              //  fox.layer.open(`成功:${data}`);
            } else {
              fox.layer.open(`失败:${response.message}`);
            }
          },
          error => {
            fox.layer.open(`请求异常:${error.message}`);
          }
        );
    },
    // ------------------添加---------------------
    addDataSource() {
      let params = {
        btnType: "addDataSource"
      };
      fox.custom.appendPage(
        this,
        "/template/search-and-mdtables/addDataSource",
        "新增",
        params,
        this.$data,
        {},
        this.query
      );
    },
    // -------------------载入源---------------------
    loading() {
      if (this.row == "" || this.row == null) {
        this.$alert("必须先选中一条数据");
      } else if (this.row.loading == 1) {
        this.$alert("请勿重复载入");
      } else {
        let that = {};
        fox.extend(true, that, this);
        fox.service
          .request({
            app: backend.generatorService,
            path: "api/configDatabase/loading",
            data: this.row
          })
          .then(
            response => {
              if (response.code == 0) {
                let data = this.row;
                if (response.params[0].responseCode == 200) {
                  data.loading = "1";
                }
                // 信息框
                fox.layer.message(response.params[0].responseMes);
                this.modifyFn(row);
                this.query();
              } else {
                fox.layer.message(`失败:${response.message}`);
              }
            },
            error => {
              fox.layer.message(`请求异常:${error.message}`);
              console.log(error.message);
            }
          );
      }
    },
    // --------------------打开源----------------
    open() {
      let that = this;

      fox.service
        .request({
          app: backend.generatorService,
          path: "api/generator/getCurrentDatabaseTables",
          data: {
            dataSourceKey: this.row.databaseName
          }
        })
        .then(
          response => {
            if (response.code == 0) {
              let data;
              if (fox.type(response.data.loadingKey) == "array") {
                data = JSON.stringify(response.data);
              }
              // 信息框
              this.loadTable = response.data;
              this.baseName = this.row.databaseName;
              this.type = this.row.databaseType;
              for (let a = 0; a < this.loadTable.length; a++) {
                this.tableNames.push(this.loadTable[a].tableName);
              }
            } else {
              fox.layer.open(`失败:${response.message}`);
            }
          },
          error => {
            fox.layer.open(`请求异常:${error.message}`);
          }
        );
    },
    // --------------------详情------------------
    infoFn(row) {
      let params = {
        btnType: "detail"
      };
      fox.custom.appendPage(
        this,
        "/template/search-and-mdtables/addDataSource",
        "详情",
        params,
        this.$data.row,
        {},
        this.query
      );
    },
    // --------------------修改--------------------
    modifyFn(row) {
      this.row = row;
      let params = {
        btnType: "edit"
      };
      fox.custom.appendPage(
        this,
        "/template/search-and-mdtables/addDataSource",
        "修改",
        params,
        this.$data.row,
        {},
        this.query
      );
    },
    // -------------------删除--------------
    deleteFn(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // ----------------------右查询-----------
    rightQuery() {
      let that = this;
      fox.service
        .request({
          app: backend.generatorService,
          path: "api/generator/getCurrentDatabaseTables",
          data: this.$data.search.tableName != "" ? this.$data.search : null
        })
        .then(
          response => {
            if (response.code == 0) {
              let data;
              if (fox.type(response.data) == "array") {
                that.loadTable = response.data;
                data = JSON.stringify(response.data);
              }
              // 信息框
              //fox.layer.open(`成功:${data}`);
            } else {
              fox.layer.open(`失败:${response.message}`);
            }
          },
          error => {
            fox.layer.open(`请求异常:${error.message}`);
          }
        );
    },
    // ------------------------右操作-----------
    configData(jjj) {
      this.row = jjj;
      let params = {
        databaseName: this.baseName,
        dataSourceType: this.type,
        tableNames: this.tableNames
      };
      fox.custom.appendPage(
        this,
        "/template/search-and-mdtables/configDatabase",
        "数据库数据源配置表(config_database)",
        params,
        jjj,
        {},
        this.search
      );
    }
  },

  //加载后处理
  mounted: function() {}
};
</script>

<style scoped>
.button-block {
  float: right;
  width: 200px;
  margin-top: -10px;
}
.button-group-margin {
  margin: 0 0 10px 0;
}

.button1 {
  min-width: 60px !important;
  width: 80px !important;
  height: 34px;
  font-size: 12px;
  margin: 0 0 4px 0;
}
</style>
