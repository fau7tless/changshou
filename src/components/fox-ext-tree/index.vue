<template>
    <div>
        <fox-tree class="el-tree-x" :style="styleObj" :node-key="nodeKey" :render-content="renderContent"
                  :highlight-current="highlightCurrent"
                  :current-node-key="currentNodeKey" :default-expand-all="defaultExpandAll"
                  :expand-on-click-node="expandOnClickNode"
                  :auto-expand-parent="autoExpandParent" :indent="indent" :default-expanded-keys="defaultExpandedKeys"
                  :show-checkbox="showCheckbox"
                  :check-strictly="checkStrictly" :default-checked-keys="defaultCheckedKeys"
                  :filter-node-method="filterNodeMethod"
                  :accordion="accordion" @node-click="nodeClick" @check-change="checkChange"
                  @current-change="currentChange" @node-expand="nodeExpand" @node-collapse="nodeCollapse"
                  :data="data" :props="props"></fox-tree>
    </div>
</template>

<script>
    export default {
        name: 'fox-ext-tree',
        props: {
            /** 请求类型 */
            requestType: {
                type: String,
                default: 'GET',
            },
            jsonData: {
                type: String,
                default: 'data',
            },
            expandLevel: {
                type: Number,
                default: 2,
            },
            lazy: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            let me = this
            return {
                orginalData: [],
                data: [{
                    id: 0,
                    label: '',
                    children: [],
                }],
                props: {
                    children: 'children',
                    label: this.dataLabel || 'label',
                    isLeaf: 'isLeaf',
                },
                styleObj: {
                    height: (this.height - 2) + 'px',
                    overflow: 'auto',
                },
            }
        },
        methods: {
            filter: function (value) {
                return this.$children[0].filter(value)
            },
            getNode: function (key) {
                return this.$children[0].getNode(key)
            },
            getCheckedNodes: function (leafOnly) {
                return this.$children[0].getCheckedNodes(leafOnly)
            },
            getCheckedKeys: function (leafOnly) {
                return this.$children[0].getCheckedKeys(leafOnly)
            },
            getHalfCheckedNodes: function () {
                return this.$children[0].getHalfCheckedNodes()
            },
            setCheckedNodes: function (nodes, leafOnly) {
                this.$children[0].setCheckedNodes(nodes, leafOnly)
            },
            setCheckedKeys: function (keys, leafOnly) {
                this.$children[0].setCheckedKeys(keys, leafOnly)
            },
            setChecked: function (data, checked, deep) {
                this.$children[0].setChecked(data, checked, deep)
            },
            load: function (node, resolve) {
                let clickData = node.data || {}
                let dataId = this.dataId
                let dataPid = this.dataPid
                let me = this
                if (clickData[me.props.children] && clickData[me.props.children].length > 0) {
                    return resolve(clickData[me.props.children])
                }
                if (clickData[me.props.isLeaf]) {
                    return resolve([])
                }
                let params = {}
                if (clickData[dataId]) {
                    // 加载非根节点
                    params[dataId] = clickData[dataId]
                    params = yufp.extend(true, me.dataParams, params)
                    yufp.service.request({
                        url: me.dataUrl,
                        method: me.requestType,
                        data: params,
                        callback: function (code, message, response) {
                            let data = me.getObjectKey(response, me.jsonData) || []
                            let nodeArray = []
                            for (let i = 0; i < data.length; i++) {
                                data[i].id = data[i][me.dataId]
                                data[i].label = data[i][me.dataLabel]
                                data[i].pid = data[i][me.dataPid]
                                nodeArray.push(data[i])
                            }
                            return resolve(nodeArray)
                        },
                    })
                } else {
                    // 加载根节点
                    if (yufp.type(me.dataRoot) == 'object') {
                        return resolve([me.dataRoot])
                    }
                    params[dataId] = me.dataRoot
                    params = yufp.extend(true, me.dataParams, params)
                    yufp.service.request({
                        url: me.dataUrl,
                        method: me.requestType,
                        data: params,
                        callback: function (code, message, response) {
                            let data = me.getObjectKey(response, me.jsonData) || []
                            let nodeArray = []
                            for (let i = 0; i < data.length; i++) {
                                data[i].id = data[i][me.dataId]
                                data[i].label = data[i][me.dataLabel]
                                data[i].pid = data[i][me.dataPid]
                                nodeArray.push(data[i])
                            }
                            return resolve(nodeArray)
                        },
                    })
                }
            },
            refresh: function (params) { // 懒加载模式下刷新，处理过程与load方法中加载根节点一致
                let me = this
                if (me.lazy) {
                    let store = me.$children[0].store
                    let rootNode = store.root
                    let theChildren = rootNode.childNodes
                    theChildren.splice(0, theChildren.length)
                    if (yufp.type(me.dataRoot) == 'object') {
                        rootNode.doCreateChildren([me.dataRoot])
                        store._initDefaultCheckedNodes()
                        return
                    }
                    params = params || {}
                    params[me.dataId] = me.dataRoot
                    params = yufp.extend(true, me.dataParams, params)
                    yufp.service.request({
                        url: me.dataUrl,
                        method: me.requestType,
                        data: params,
                        callback: function (code, message, response) {
                            let data = me.getObjectKey(response, me.jsonData) || []
                            let nodeArray = []
                            for (let i = 0; i < data.length; i++) {
                                data[i].id = data[i][me.dataId]
                                data[i].label = data[i][me.dataLabel]
                                data[i].pid = data[i][me.dataPid]
                                nodeArray.push(data[i])
                            }
                            rootNode.doCreateChildren(nodeArray)
                            store._initDefaultCheckedNodes()
                        },
                    })
                }
            },
            // 触发事件类型、私有方法
            nodeClick: function (nodeData, node, self) {
                this.$emit('node-click', nodeData, node, self)
            },
            checkChange: function (nodeData, checked, indeterminate) {
                this.$emit('check-change', nodeData, checked, indeterminate)
            },
            currentChange: function (nodeData, node, self) {
                this.$emit('current-change', nodeData, node, self)
            },
            nodeExpand: function (nodeData, node, instance) {
                this.$emit('node-expand', nodeData, node, instance)
            },
            nodeCollapse: function (nodeData, node, self) {
                this.$emit('node-collapse', nodeData, node, self)
            },
            asyncData: function (params) {
                let me = this
                yufp.service.request({
                    url: me.dataUrl,
                    method: me.requestType,
                    data: params,
                    callback: function (code, message, response) {
                        let data = me.getObjectKey(response, me.jsonData) || []
                        return data
                    },
                })
            },
            remoteData: function () {
                let me = this
                let param = {}
                param[me.dataId] = yufp.type(me.dataRoot) == 'object' ? me.dataRoot[me.dataId] : me.dataRoot
                param = yufp.extend({}, me.dataParams, param)
                yufp.service.request({
                    url: me.dataUrl,
                    method: me.requestType,
                    data: param,
                    callback: function (code, message, response) {
                        let data = me.getObjectKey(response, me.jsonData) || []

                        me.orginalData = data
                        me.$emit('get-tree-datas', me.orginalData)
                        data = me.genTreeData(data)
                        me.data = me.rootVisible ? data : data[0].children
                        setTimeout(function () {
                            // 默认展开根节点
                            me.expandNode(me.$children[0].root.childNodes, 1)
                        }, 1)
                    },
                })
            },
            getObjectKey: function (obj, ns) {
                if (!ns) {
                    return obj
                }
                let keys = ns.split('.')
                for (let i = 0, len = keys.length; i < len; i++) {
                    if (!obj) {
                        break
                    }
                    obj = obj[keys[i]]
                }
                return obj
            },
            genTreeData: function (data) {
                let me = this
                let attr = {
                    id: me.dataId,
                    label: me.dataLabel,
                    pid: me.dataPid,
                    root: me.dataRoot,
                }
                return yufp.util.genTree(data, attr)
            },
            /**
             * [expandNode 展开当前数据的子节点]
             * @param  {[type]} data  [待展开的节点数组]
             * @param  {[type]} level [当前层级]
             * @return {[type]}       [description]
             */
            expandNode: function (data, level) {
                let me = this
                if (data) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i]) {
                            if (level < me.expandLevel) {
                                me.expandNode(data[i].childNodes, level + 1)
                                data[i].expanded = true
                            }
                        }
                    }
                }
            },
        },

        mounted: function () {
            if (!this.lazy) {
                this.remoteData()
            }
        },
        watch: {
            dataUrl(val) {
                if (!this.lazy) {
                    this.remoteData()
                }
            },
            dataParams(val) {
                if (!this.lazy) {
                    this.remoteData()
                }
            },
        },
    }
</script>

<style scoped>

</style>