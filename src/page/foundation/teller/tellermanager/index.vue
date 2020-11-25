<template>
    <!--page每个页面的root元素-->
    <fox-page group-header-width="120px">
        <!--page内容区域-->

        <fox-content>
            <fox-group class="wrapper">
                <fox-group class="wrapper_left">
                    <fox-tree class="filter-tree" style="width:95%" :data="setTreeData" @node-click="handeleNodeClick"
                              node-key="orgId" :props="defaultProps" default-expand-all :filter-node-method="filterNode"
                              ref="tree"></fox-tree>
                </fox-group>
                <fox-group class="wrapper_right">
                    <fox-group class="query_father" column="2">
                        <fox-select-item v-model="search.orgId" source="@f07006.json">所属机构</fox-select-item>
                        <fox-text-item v-model="search.userId">柜员代号</fox-text-item>
                        <fox-select-item v-model="search.userSts" source="@f07001.json">柜员状态</fox-select-item>
                        <fox-item align="right">
                            <fox-button icon="el-icon-search" @click="userQuery">查询</fox-button>
                            <fox-button icon="el-icon-refresh" @click="userRefresh">清空条件</fox-button>
                        </fox-item>
                    </fox-group>
                    <fox-group style="margin-top:0px">
                        <fox-button icon="el-icon-plus" @click="add">新增</fox-button>
                        <fox-button icon="el-icon-edit" @click="update">修改</fox-button>
                        <fox-button icon="el-icon-unlock" @click="startUse">启用</fox-button>
                        <fox-button icon="el-icon-lock" @click="stopUse">停用</fox-button>
                        <!-- <fox-button icon="el-icon-delete" @click="remove">注销</fox-button> -->
                        <fox-button icon="el-icon-check" @click="change">调动</fox-button>
                    </fox-group>
                    <fox-group style="margin-top:10px">
                        <fox-button icon="el-icon-printer" @click="post">岗位配置</fox-button>
                        <fox-button icon="el-icon-document" @click="log">维护记录</fox-button>
                        <fox-button icon="el-icon-view" @click="rightsView">交易权限视图</fox-button>
                        <fox-button icon="el-icon-s-home" @click="doRelatives">亲属关系维护</fox-button>
                        <fox-button icon="el-icon-refresh" @click="sync">同步柜员信息</fox-button>
                    </fox-group>
                    <fox-group style="margin-top:15px;width:100%">
                        <!-- //userTable -->
                        <fox-table-item
                                ref="list"
                                id="fx_table_01"
                                :content="user_url"
                                page-index="1"
                                :params="search"
                                :page-sizes="[5, 10, 20, 30]"
                                :page-size="5"
                                @row-click="rowClick"
                                @select="select"
                                @select-all="selectAll"
                                @selection-change="handleSelectionChange"
                        >
                            <!-- highlight-current-row :page-size="5" :show-header="true" :show-tool="true" :ignore-empty-column="false" -->
                            <!--  @current-change="currentChange" @selection-change="selectionChange" -->
                            <fox-table-column @click="rowClick" type="selection" width="55"></fox-table-column>
                            <fox-table-column fixed prop="userId" label="柜员编号"></fox-table-column>
                            <fox-table-column prop="userName" label="柜员名称"></fox-table-column>
                            <fox-table-column prop="orgId" :formatter="format" label="所属机构"></fox-table-column>
                            <fox-table-column prop="userSts" :formatter="format" label="状态"></fox-table-column>
                            <fox-table-column prop="userSex" :formatter="format" label="性别"
                                              width="80"></fox-table-column>
                            <fox-table-column prop="userLevel" label="用户级别"></fox-table-column>
                        </fox-table-item>
                    </fox-group>
                </fox-group>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
    export default {
        name: "index",
        //数据
        data: function () {
            return {
                search: {
                    userId: null,
                    orgId: null,
                    userSts: null,
                    postId: null
                },
                user_url: '/' + backend.oca + '/api/adminsmuser/index',
                dataTable: [],
                userTable: [],
                row: '',
                rows: [],
                rowId: [],
                multipleSelection:[],
                status_value: '',
                date_value: '',
                treeTable: [],
                statuType: [{
                    value: "5020010",
                    text: "状态一"
                }, {
                    value: "5020020",
                    text: "状态二"
                },],
                valueType: [{
                    value: "5020010",
                    text: "类型一"
                }, {
                    value: "5020020",
                    text: "类型二"
                },],
                defaultProps: {
                    children: 'children',
                    label: 'orgChiName',
                },
            }
        },
        //方法
        methods: {
            format(row, column) {
                let map = {
                    orgId: 'f07006.json',
                    userSex: 'ftest002.json',
                    userSts: 'ftest001.json'
                }
                let {property} = column
                return fox.custom.mapping(this, map[property], row[property])
            },
            rowClick(row) {
                this.row = row
                this.rows.push(row)
                this.rowId.push(row.userId)
                this.rowId = Array.from(new Set([...this.rowId]))
                this.toggleSelection(row)
            },
            // 切换选中状态
            toggleSelection(row) {
                if (row) {
                    this.$refs.list.toggleRowSelection(row);
                } else {
                    this.$refs.list.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            select(selection, row) {
                this.row = row
                this.rows.push(row)
                this.rowId.push(row.userId)
                this.rowId = Array.from(new Set([...this.rowId]))
            },
            selectAll(selection) {
                this.rowId = []
                for (let row of selection) {
                    this.rowId.push(row.userId)
                    this.rows.push(row)
                }
                console.log(this.rowId)
            },
            query() {
                let that = this
                fox.service.request({
                    path: '/icsp-app-sso/api/btopTellerOrginfo/index',
                    data: {
                        search: {
                            orgId: '0100',
                        }
                    },
                }).then((response) => {
                    if (response.code == 0) {
                        let data
                        if (fox.type(response.data) == 'array') {
                            that.treeTable = response.data
                            data = JSON.stringify(response.data)
                            console.log(response.data)
                        }
                        // 信息框
                        // fox.layer.open(`成功:${data}`)
                    } else {
                        fox.layer.open(`失败:${response.message}`)
                    }
                }, (error) => {
                    fox.layer.open(`请求异常:${error.message}`)
                })
            },
            userQuery() {
                let that = this
                that.$refs.list.refresh();
                // fox.service.request({
                //     app: backend.oca,
                //     path: 'api/adminsmuser/index',
                //     data: (this.$data.search.userId != '' ? this.$data.search : null),
                // }).then((response) => {
                //     if (response.code == 0) {
                //         let data
                //         if (fox.type(response.data) == 'array') {
                //             that.userTable = response.data
                //             data = JSON.stringify(response.data)
                //         }
                //         // 信息框
                //         // fox.layer.open(`成功`)
                //     } else {
                //         fox.layer.open(`失败:${response.message}`)
                //     }
                // }, (error) => {
                //     fox.layer.open(`请求异常:${error.message}`)
                // })
            },
            add() {
                let params = {
                    btnType: 'add',
                    idIsShow: false
                }
                fox.custom.appendPage(this, '/admin/sm/user/doTellerInfo', '柜员新增', params, this.$data, {}, this.userQuery)
            },
            userRefresh() {
                this.search.userId = null,
                this.search.orgId = null,
                this.search.userSts = null,
                this.userQuery()
            },
            update() {
                if (this.row == '' || this.row == null) {
                    this.$alert('必须先选中一条数据')
                } else {
                    let params = {
                        btnType: 'update',
                        idIsShow: true
                    }
                    fox.custom.appendPage(this, '/admin/sm/user/doTellerInfo', '柜员修改', params, this.$data.row, {}, this.userQuery)
                }
            },
            startUse() {
                if(this.rows.length === 0){
                    this.$alert('必须先选中一条数据')
                }else {
                    for(let row of this.rows){
                        console.log("rowUserSts: "+row.userSts)
                        if (row.userSts === 'A') {
                            this.$alert('请勿重复启用')
                            this.$refs.list.clearSelection()
                            this.clearRow()
                            return
                        }
                    }
                    let str = this.$data.rowId.join(',')
                    fox.service.request({
                        app: backend.oca,
                        path: 'api/adminsmuser/usebatch',
                        data: {"userId": str}
                    })
                        .then((response) => {
                            console.log(this.$data.search);
                            if (response.code == 0) {
                                this.$message({
                                    type: "success",
                                    message: "启用成功!"
                                });
                            } else {
                                fox.layer.open(`失败:${response.message}`)
                            }
                            this.userQuery()
                        }, (error) => {
                            fox.layer.open(`请求异常:${error.message}`)
                        })
                }
                this.clearRow()
            },
            clearRow(){
                this.rowId = []
                this.rows = []
            },
            stopUse() {
                if(this.rows.length === 0){
                    this.$alert('必须先选中一条数据')
                }else {
                    for(let row of this.rows){
                        console.log("rowUserSts: "+row.userSts)
                        if (row.userSts === 'I') {
                            this.$alert('请勿重复禁用')
                            this.$refs.list.clearSelection()
                            this.clearRow()
                            return
                        }
                    }
                    let str = this.$data.rowId.join(',')
                    fox.service.request({
                        app: backend.oca,
                        path: 'api/adminsmuser/unusebatch',
                        data: {"userId": str},
                    })
                    .then((response) => {
                        console.log(this.$data.search);
                        if (response.code == 0) {
                            this.$message({
                                type: "success",
                                message: "禁用成功!"
                            });
                        } else {
                            fox.layer.open(`失败:${response.message}`)
                        }
                        this.userQuery()
                    }, (error) => {
                        fox.layer.open(`请求异常:${error.message}`)
                    })
                }
                this.clearRow()
            },
            change() {
                if (this.row == '' || this.row == null) {
                    this.$alert('必须先选中一条数据')
                } else {
                    fox.custom.appendPage(this, '/admin/sm/user/tellerTransfer', '柜员调动', {}, this.$data.row, {}, this.userQuery)
                }
            },
            post() {
                if (this.row == '' || this.row == null) {
                    this.$alert('必须先选中一条数据')
                } else {
                    fox.custom.appendPage(this, '/admin/sm/user/tellerPost', '柜员岗位配置', {}, this.$data.row)
                }
            },
            // search() {
            // },
            // clearForm() {
            // },
            log() {

            },
            rightsView() {

            },
            doRelatives() {

            },
            sync() {

            },
            filterNode(value, data) {
                if (!value) return true
                return data.orgChiName.indexOf(value) !== -1
            },
            handeleNodeClick(node) {
                this.node = node
                let that = this
                fox.service.request({
                    path: 'api/btopTellerOrginfo/show',
                    data: this.$data.node,
                }).then((response) => {
                    if (response.code == 0) {
                        let data
                        if (fox.type(response.data) == 'object') {
                            that.dataTable = response.data
                            data = JSON.stringify(response.data)
                            console.log(response.data)
                            console.log(that.dataTable)
                        }
                        // 信息框
                        // fox.layer.open(`成功:${data}`)
                    } else {
                        fox.layer.open(`失败:${response.message}`)
                    }
                }, (error) => {
                    fox.layer.open(`请求异常:${error.message}`)
                })
            },
        },
        //加载后处理
        mounted: function () {
            this.query();
            this.userQuery();
        },
        computed: {
            setTreeData() {
                let cloneData = []
                fox.extend(true, cloneData, this.treeTable) // 对源数据深度克隆
                return cloneData.filter((father) => { // 循环所有项，并添加children属性
                    let branchArr = cloneData.filter((child) => father.orgId == child.parentOrgId) // 返回每一项的子级数组
                    branchArr.length > 0 ? father.children = branchArr : '' // 给父级添加一个children属性，并赋值
                    return father.parentOrgId == '0100' // 返回第一层
                })
            },
        },
    }
</script>

<style scoped>
    .button-group-margin {
        margin: 0 0 10px 0;
    }

    .fx_input span {
        color: #667188;
        font-size: 14px;
        margin-right: 10px
    }

    .wrapper {
        display: flex;
        width: 100%
    }

    .wrapper_left {
        /* min-width:219px */
        width: 20%
    }

    .wrapper_right {
        width: 80%
    }
</style>
