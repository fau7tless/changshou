<template>
    <fox-page>
        <fox-content>
            <fox-row style="width: 100%" :gutter="20">
                <fox-col :span="5">
                    <fox-group no="1" title="菜单树" class="my-group" label-width="100px" style="width:100%">
                        <fox-item>
                            <fox-button type="primary" @click="creatNode">新增</fox-button>
                            <fox-button type="danger" @click="menuDelete">删除</fox-button>
                        </fox-item>
                        <fox-tree
                                class="menutree"
                                :data="treeData"
                                :props="m_defaultProps"
                                node-key="upMenuId"
                                :default-expanded-keys="['0',]"
                                :accordion="true"
                                :default-expand-all="false"
                                :filter-node-method="filterNode"
                                @node-click="handleNodeClick"
                                ref="tree1"
                                :style="menuTreeStyle"
                        >
                        </fox-tree>
                    </fox-group>
                </fox-col>
                <fox-col :span="6">
                    <fox-group no="2" title="子节点维护" class="my-group" label-width="100px" column="1" style="width:100%">
                        <fox-text-item v-verify="['require']" placeholder="请输入菜单名称" v-model="menuInfo.menuName"
                                       @blur="convertingPinyin()">
                            菜单名称
                        </fox-text-item>
                        <fox-text-item v-verify="['require']" placeholder="菜单拼音" v-model="menuInfo.menuPinyin">
                            菜单拼音
                        </fox-text-item>
                        <fox-text-item placeholder="请输入菜单代码" v-model="menuInfo.menuCode">菜单代码</fox-text-item>
                        <fox-text-item placeholder="请从业务功能列表选择" v-model="menuInfo.funcName" :readonly="true"
                                       @focus="upServicefun">业务功能
                        </fox-text-item>
                        <fox-text-item placeholder="请从业务功能列表选择" :span="2" v-model="menuInfo.modName"
                                       :readonly="true">模块名称
                        </fox-text-item>

                        <fox-text-item v-verify="['require']" placeholder="请输入序号" v-model="menuInfo.menuOrder">排序
                        </fox-text-item>
                        <fox-text-item placeholder="请输入图标" v-model="menuInfo.menuIcon"
                                       @focus="m_iconSelectDialog.show = true" :readonly="true">图标
                        </fox-text-item>
                        <fox-text-item v-verify="['require']" placeholder="请输入上级节点" v-model="menuInfo.upMenuName"
                                       @focus="upNode" :readonly="true">上级节点
                        </fox-text-item>
                        <fox-text-item placeholder="请输入内容" type="textarea"
                                       :rows="5" span="2" label="说明" v-model="menuInfo.menuTip">
                        </fox-text-item>
                        <fox-item style="text-align: center">
                            <fox-button type="primary" @click="menuSave()">保存
                            </fox-button>
                            <fox-button class="btnWidth" type="info" @click="resetModel">重置</fox-button>
                        </fox-item>
                    </fox-group>
                </fox-col>
                <fox-col :span="13">
                    <fox-group no="2" title="联动操作区" class="my-group" label-width="100px" style="width:100%" column="4">
                        <fox-tabs v-model="m_activeName" type="card">
                            <fox-tab-pane label="业务功能列表" name="first">
                                <fox-group class="my-group" label-width="100px" style="width:100%">
                                    <fox-group class="my-group" label-width="100px" style="width:100%" column="3">
                                        <fox-select-item placeholder="请输入控制操作名称" :source="oprateName"
                                                         v-model="m_searchInput.modId"></fox-select-item>
                                        <fox-text-item placeholder="搜索功能名称关键字"
                                                       v-model="m_searchInput.funcName"></fox-text-item>
                                        <fox-item>
                                            <fox-button type="primary" @click="search">搜索</fox-button>
                                            <fox-button type="danger" @click="clear">重置</fox-button>
                                        </fox-item>
                                    </fox-group>
                                    <fox-table-item ref="rightTable"
                                                    auto-refresh="false"
                                                    :content="dataUrl"
                                                    :page-sizes="[10, 50, 100, 200]"
                                                    :page-size="10"
                                                    :params="m_searchInput"
                                                    @row-click="funcRowClick" style="margin-top: 0px">
                                        <fox-table-column prop="funcName" label="功能名称"
                                                          width="180"></fox-table-column>
                                        <fox-table-column prop="funcUrl" label="url链接"></fox-table-column>
                                        <!-- <fox-table-column prop="last_chg_name" label="最后"></fox-table-column> -->
                                    </fox-table-item>
                                </fox-group>
                            </fox-tab-pane>
                            <fox-tab-pane label="上层菜单" name="second">
                                <fox-group class="my-group" label-width="100px" style="width:100%">
                                    <fox-tree
                                            class="menutree righttree"
                                            :data="treeData"
                                            :props="m_defaultProps"
                                            :default-expand-all="false"
                                            :filter-node-method="filterNode"
                                            @node-click="upMenuClick"
                                            ref="tree2"
                                    ></fox-tree>
                                </fox-group>
                            </fox-tab-pane>
                        </fox-tabs>
                    </fox-group>
                </fox-col>
            </fox-row>

            <fox-dialog title="选择图标" :visible.sync="m_iconSelectDialog.show">
                <i v-for="(item,i) in elIcons" :key="i" :class="item" @click="selectThisIcon" :name="item"></i>
            </fox-dialog>
        </fox-content>
    </fox-page>
</template>

<script>
    import { foxUI } from '@/assets/libs/fox-libs'
    import pinyin from 'js-pinyin'

    export default {
        // 数据
        data: function () {
            return {
                menuHeight: 200,
                m_activeName: 'first',
                dataUrl: '/' + backend.oca + '/api/adminsmbusifunc/queryfunc',
                m_defaultProps: {
                    children: 'children',
                    label: 'menuName',
                },
                m_searchInput: {
                    funcName: '',
                    modId: '',
                    contrUrl: '',
                },
                m_iconSelectDialog: {
                    show: false,
                },
                tableData: [],
                data: [],
                searchContent: {},
                menuInfo: {
                    funcId: '',
                    funcName: '',
                    lastChgDt: '',
                    lastChgUsr: '',
                    menuCode: '',
                    menuPinyin: '',
                    menuIcon: '',
                    menuId: '',
                    menuName: '',
                    menuOrder: '',
                    menuTip: '',
                    modId: '',
                    modName: '',
                    sysId: '',
                    upMenuId: '0',
                    upMenuName: '',
                },
                treeData: [],
                treeSecondData: [],
                oprateName: [],
                moduleList: [],
                elIcons: ['el-icon-edit', 'el-icon-share', 'el-icon-delete', 'el-icon-s-tools', 'el-icon-setting', 'el-icon-user-solid', 'el-icon-user', 'el-icon-phone', 'el-icon-more', 'el-icon-warning', 'el-icon-question', 'el-icon-info', 'el-icon-remove', 'el-icon-circle-plus', 'el-icon-success', 'el-icon-error', 'el-icon-help', 'el-icon-s-help', 'el-icon-picture', 'el-icon-camera-solid', 'el-icon-camera', 'el-icon-video-camera-solid', 'el-icon-message-solid', 'el-icon-bell', 'el-icon-s-cooperation', 'el-icon-s-promotion', 'el-icon-s-open', 'el-icon-s-marketing', 'el-icon-s-flag', 'el-icon-s-comment', 'el-icon-s-grid', 'el-icon-menu', 'el-icon-folder', 'el-icon-folder-opened', 'el-icon-folder-add', 'el-icon-tickets', 'el-icon-document-copy', 'el-icon-document-checked', 'el-icon-takeaway-box', 'el-icon-scissors', 'el-icon-umbrella', 'el-icon-headset', 'el-icon-brush', 'el-icon-coordinate', 'el-icon-magic-stick', 'el-icon-reading', 'el-icon-data-line', 'el-icon-data-board', 'el-icon-data-analysis', 'el-icon-collection-tag', 'el-icon-film', 'el-icon-suitcase', 'el-icon-receiving', 'el-icon-collection', 'el-icon-files', 'el-icon-house', 'el-icon-present', 'el-icon-box', 'el-icon-bank-card', 'el-icon-money', 'el-icon-discount', 'el-icon-wallet', 'el-icon-price-tag', 'el-icon-news', 'el-icon-guide', 'el-icon-thumb', 'el-icon-cpu', 'el-icon-link', 'el-icon-connection', 'el-icon-open', 'el-icon-turn-off', 'el-icon-set-up', 'el-icon-chat-round', 'el-icon-chat-square', 'el-icon-chat-dot-round', 'el-icon-chat-dot-square', 'el-icon-chat-line-square', 'el-icon-message', 'el-icon-postcard', 'el-icon-position', 'el-icon-microphone', 'el-icon-close-notification', 'el-icon-bangzhu', 'el-icon-time', 'el-icon-odometer', 'el-icon-crop', 'el-icon-aim', 'el-icon-switch-button', 'el-icon-full-screen', 'el-icon-copy-document', 'el-icon-medal-1', 'el-icon-medal', 'el-icon-trophy', 'el-icon-trophy-1', 'el-icon-dashboard-aid-kit', 'el-icon-discover'],
            }
        },
        // 方法
        methods: {
            convertingPinyin() {
                if (this.menuInfo.menuName != undefined && this.menuInfo.menuName != '') {
                    this.menuInfo.menuPinyin = pinyin.getFullChars(this.menuInfo.menuName)
                } else {
                    this.menuInfo.menuPinyin = ''
                }
            },
            // 重置值
            resetModel() {
                for (let kk in this.menuInfo) {
                    this.menuInfo[kk] = ''
                }
                this.queryTree();
            },
            // 请求菜单树信息列表
            queryTree() {
                this.$refs.rightTable.refresh()
                let that = this
                fox.service.request({
                    id: '1',
                    path: 'api/adminsmmenu/menutreequery',
                    app: backend.oca,
                    name: '树状图信息列表',
                    data: {
                        lazy: true,
                        sysId: backend.sysId,
                    },
                    callback: function (code, message, data) {
                        if (code == 0) {
                            if (fox.type(data) == 'array') {
                                that.treeData = that.totreeTemp(data)
                            }
                        } else {
                            that.$message.error('服务器返回信息错误，获取数据失败')
                        }
                    },
                })
            },
            // 查询模块列表下拉
            queryModuleList() {
                let that = this;
                fox.service.request({
                    app: backend.oca,
                    path: 'api/adminsmfuncmod/querymod',
                    name: '模块信息列表',
                    type: 'post',
                    // appHead: { pageSize: 999 },
                    data: {},
                    callback: function (code, message, data) {
                        if (code === 0) {
                            if (fox.type(data) == 'array') {
                                for (let i = 0; i < data.length; i++) {
                                    let obj = {
                                        value: data[i].modId,
                                        text: data[i].modName,
                                    }
                                    that.oprateName.push(obj);
                                }
                            }
                        } else {
                            that.$message.error('服务器返回信息错误，获取数据失败')
                        }
                    },
                })
            },
            // 选中树节点
            handleNodeClick(node) {
                let that = this
                fox.service.request({
                    app: backend.oca,
                    path: 'api/adminsmmenu/menuinfoquery',
                    data: {
                        menuId: node.menuId,
                    },
                    callback: function (code, message, data) {
                        if (code == 0) {
                            if (fox.type(data) == 'object') {
                                let dataTemp = data
                                that.resetModel()
                                fox.extend(true, that.menuInfo, data)
                                for (let i = 0; i < that.oprateName.length; i++) {
                                    if (that.oprateName[i].value == data.modId) {
                                        that.menuInfo.modName = that.oprateName[i].text
                                    }
                                }
                            }
                        } else {
                            that.$message.error('服务器返回信息错误，获取数据失败')
                        }
                    }
                    ,
                })
            },
            // 功能表格选择事件
            funcRowClick(row) {
                let that = this
                that.menuInfo.modId = row.modId
                that.menuInfo.funcName = row.funcName
                that.menuInfo.funcId = row.func_id
                for (let i = 0; i < this.oprateName.length; i++) {
                    if (this.oprateName[i].value == row.modId) {
                        that.menuInfo.modName = this.oprateName[i].text
                    }
                }
            },
            filterNode(value, data) {
                if (!value) return true
                return data.label.indexOf(value) !== -1
            },
            search() {
                this.$refs.rightTable.refresh()
            },
            upNode() {
                this.m_activeName = 'second'
            },
            upServicefun() {
                this.m_activeName = 'first'
            },
            upMenuClick(node) {
                this.menuInfo.upMenuName = node.menuName
                this.menuInfo.upMenuId = node.menuId
            },
            clear() {
                this.m_searchInput.modId = ''
                this.m_searchInput.funcName = ''
                this.$refs.rightTable.refresh()
            },
            creatNode(node) {
                let that = this
                if (this.menuInfo.upMenuId == '') {
                    this.$message.error('请在上层菜单中选择上级节点')
                    this.m_activeName = 'second'
                    return
                }
                let upMenuId = that.menuInfo.menuId
                let upMenuName = that.menuInfo.menuName
                that.resetModel()
                this.menuInfo.sysId = backend.sysId
                that.menuInfo.upMenuId = upMenuId
                that.menuInfo.upMenuName = upMenuName
            },
            menuSave() {
                let that = this
                if (that.menuInfo.upMenuId == '') {
                    that.$message.error('请在上层菜单中选择上级节点')
                    that.m_activeName = 'second'
                    return
                }
                let menuId = that.menuInfo.menuId
                let path = 'api/adminsmmenu/createmenu'// 新增操作
                if (menuId != undefined && menuId != '') {
                    path = 'api/adminsmmenu/editmenu/'// 修改操作
                }
                fox.service.request({
                    id: '1',
                    app: backend.oca,
                    path: path,
                    data: that.menuInfo,
                    callback: function (code, message, data,params) {
                        if (code == 0) {
                            // if (fox.type(data) == 'object') {
                                that.menuInfo = {}
                                that.queryTree()
                                that.$message({
                                    message: '保存成功！',
                                    type: 'success',
                                })
                            // }
                        } else {
                            that.$message.error('保存成功失败，原因：' + message)
                        }
                    },
                })
            },
            // 删除菜单
            menuDelete() {
                let that = this
                if (this.menuInfo.menuId == '') {
                    this.$message({
                        message: '请先选择一个菜单树节点！',
                        type: 'error',
                    })
                } else {
                    fox.service.request({
                        app: backend.oca,
                        path: 'api/adminsmmenu/deletemenu/' + that.menuInfo.menuId,
                        name: '删除子节点维护信息',
                        type: 'post',
                        data: {},
                        callback: function (code, message, data) {
                            if (code == 0) {
                                that.queryTree()
                                that.resetModel()
                                that.$message({
                                    message: '删除成功！',
                                    type: 'success',
                                })
                            } else {
                                // fox.layer.open("登录失败"+message);
                                that.$message.error('删除失败，原因：' + message)
                            }
                        },
                    })
                }
            },
            totreeTemp(list) {
                let data = list
                let result = []
                if (!Array.isArray(data)) {
                    return result
                }
                data.forEach((item) => {
                    delete item.children
                })
                let map = {}
                data.forEach((item) => {
                    map[item.menuId] = item
                })
                data.forEach((item) => {
                    let parent = map[item.upMenuId]
                    if (parent) {
                        (parent.children || (parent.children = [])).push(item)
                    } else if (item.upMenuId == '') {
                        result.push(item)
                    } else {
                        result.push(item)
                    }
                })
                return result
            },
            selectThisIcon(e) {
                let { className } = e.target
                this.menuInfo.menuIcon = className
                this.m_iconSelectDialog.show = false
            },
        },
        // 计算
        computed: {
            menuTreeStyle() {
                return {
                    height: `${this.menuHeight}px`,
                }
            }
            ,
        },
        // 加载后处理
        mounted() {
            let height = foxUI.getClientHeight()
            this.menuHeight = height - 250
            let that = this
            // 刷新左边菜单树
            that.queryTree()
            // 刷新模块列表下拉
            that.queryModuleList()
        },
        fox_flow() {
            return {
                /**
                 *  界面渲染后，更改数据会触发钩子函数
                 * @param session
                 * @param context
                 */
                mounted(session, context) {

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
        }
        ,
    }
</script>

<style scoped>
    .menutree {
        height: 600px;
        width: 100%;
    }

    .righttree {
        height: 400px;
    }

    i {
        width: 30px;
        height: 30px;
        font-size: 30px;
        cursor: pointer;
    }

    i:hover {
        background-color: #97a8be;
        color: #2b2b2b;
    }
</style>