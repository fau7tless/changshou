<template>
    <fox-page>
        <!--footer bar必须在fox-content的面-->
        <fox-footer-bar align="right">  <!--align的值有left、center、right 默认为right-->
            <fox-button type="primary" size="small" round @click="onSubmit">提交</fox-button>
            <fox-button type="success" size="small" round @click="onCancel">取消</fox-button>
        </fox-footer-bar>
        <fox-content>
            <fox-group title="基础用法" class="my-group"  label-width="120px" column="2">
                <fox-cascader-item  v-model="value" :options="m_options" @change="handleChange">
                    click触发子菜单
                </fox-cascader-item>
                <fox-cascader-item  v-model="value" :options="m_options" :props="{ expandTrigger: 'hover' }" @change="handleChange">
                    hover触发子菜单
                </fox-cascader-item>
                <fox-cascader-item v-model="value2" :options="m_options2">禁用项</fox-cascader-item>
                <fox-cascader-item  v-model="value3" :options="m_options2" clearable>可清除</fox-cascader-item>
                <fox-cascader-item :options="m_options3" :show-all-levels="false">最后一级</fox-cascader-item>
            </fox-group>
            <fox-group title="多选" class="my-group"  label-width="120px" column="2">
                <fox-cascader-item
                        :options="m_options4"
                        :props="m_props4"
                        clearable>多选</fox-cascader-item>
                <fox-cascader-item
                        :options="m_options4"
                        :props="m_props4"
                        collapse-tags
                        clearable>多选(折叠)</fox-cascader-item>
            </fox-group>
            <fox-group title="可搜索" class="my-group"  label-width="120px" column="2">
                <fox-cascader-item
                        placeholder="试试搜索：指南"
                        :options="m_options3"
                        filterable>搜索</fox-cascader-item>
                <fox-cascader-item
                        placeholder="试试搜索：指南"
                        :options="m_options3" :props="{ multiple: true }"
                        filterable>搜索</fox-cascader-item>
            </fox-group>
            <fox-group title="数据源" class="my-group"  column="2">
                <fox-cascader-item v-model="value4" options="@cas.json">文件数据源</fox-cascader-item>
                <fox-cascader-item v-model="value5"  options="globle/DD/cascaderList">数字字典</fox-cascader-item>
            </fox-group>
            <fox-group title="异构" class="my-group"  column="2">
                <fox-cascader-item  v-model="value6" :options="m_options5" text-name="text" value-name="id" children-name="subs">异构数据源</fox-cascader-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'example_cascader-item',
    // 数据
    data: function() {
        return {
            value: [],
            value2: [],
            value3: [],
            value4: [],
            value5: [],
            value6: [],
            m_options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致',
                    }, {
                        value: 'fankui',
                        label: '反馈',
                    }, {
                        value: 'xiaolv',
                        label: '效率',
                    }, {
                        value: 'kekong',
                        label: '可控',
                    }],
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航',
                    }, {
                        value: 'dingbudaohang',
                        label: '顶部导航',
                    }],
                }],
            }, {
                value: 'zujian',
                label: '组件',
                children: [{
                    value: 'basic',
                    label: 'Basic',
                    children: [{
                        value: 'layout',
                        label: 'Layout 布局',
                    }, {
                        value: 'color',
                        label: 'Color 色彩',
                    }, {
                        value: 'typography',
                        label: 'Typography 字体',
                    }, {
                        value: 'icon',
                        label: 'Icon 图标',
                    }, {
                        value: 'button',
                        label: 'Button 按钮',
                    }],
                }, {
                    value: 'form',
                    label: 'Form',
                    children: [{
                        value: 'radio',
                        label: 'Radio 单选框',
                    }, {
                        value: 'checkbox',
                        label: 'Checkbox 多选框',
                    }, {
                        value: 'input',
                        label: 'Input 输入框',
                    }, {
                        value: 'input-number',
                        label: 'InputNumber 计数器',
                    }, {
                        value: 'select',
                        label: 'Select 选择器',
                    }, {
                        value: 'cascader',
                        label: 'Cascader 级联选择器',
                    }, {
                        value: 'switch',
                        label: 'Switch 开关',
                    }, {
                        value: 'slider',
                        label: 'Slider 滑块',
                    }, {
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器',
                    }, {
                        value: 'date-picker',
                        label: 'DatePicker 日期选择器',
                    }, {
                        value: 'datetime-picker',
                        label: 'DateTimePicker 日期时间选择器',
                    }, {
                        value: 'upload',
                        label: 'Upload 上传',
                    }, {
                        value: 'rate',
                        label: 'Rate 评分',
                    }, {
                        value: 'form',
                        label: 'Form 表单',
                    }],
                }, {
                    value: 'data',
                    label: 'Data',
                    children: [{
                        value: 'table',
                        label: 'Table 表格',
                    }, {
                        value: 'tag',
                        label: 'Tag 标签',
                    }, {
                        value: 'progress',
                        label: 'Progress 进度条',
                    }, {
                        value: 'tree',
                        label: 'Tree 树形控件',
                    }, {
                        value: 'pagination',
                        label: 'Pagination 分页',
                    }, {
                        value: 'badge',
                        label: 'Badge 标记',
                    }],
                }, {
                    value: 'notice',
                    label: 'Notice',
                    children: [{
                        value: 'alert',
                        label: 'Alert 警告',
                    }, {
                        value: 'loading',
                        label: 'Loading 加载',
                    }, {
                        value: 'message',
                        label: 'Message 消息提示',
                    }, {
                        value: 'message-box',
                        label: 'MessageBox 弹框',
                    }, {
                        value: 'notification',
                        label: 'Notification 通知',
                    }],
                }, {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [{
                        value: 'menu',
                        label: 'NavMenu 导航菜单',
                    }, {
                        value: 'tabs',
                        label: 'Tabs 标签页',
                    }, {
                        value: 'breadcrumb',
                        label: 'Breadcrumb 面包屑',
                    }, {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单',
                    }, {
                        value: 'steps',
                        label: 'Steps 步骤条',
                    }],
                }, {
                    value: 'others',
                    label: 'Others',
                    children: [{
                        value: 'dialog',
                        label: 'Dialog 对话框',
                    }, {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示',
                    }, {
                        value: 'popover',
                        label: 'Popover 弹出框',
                    }, {
                        value: 'card',
                        label: 'Card 卡片',
                    }, {
                        value: 'carousel',
                        label: 'Carousel 走马灯',
                    }, {
                        value: 'collapse',
                        label: 'Collapse 折叠面板',
                    }],
                }],
            }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                    value: 'axure',
                    label: 'Axure Components',
                }, {
                    value: 'sketch',
                    label: 'Sketch Templates',
                }, {
                    value: 'jiaohu',
                    label: '组件交互文档',
                }],
            }],
            value2: '',
            value3: '',
            m_options2: [{
                value: 'zhinan',
                label: '指南',
                disabled: true,
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致',
                    }, {
                        value: 'fankui',
                        label: '反馈',
                    }, {
                        value: 'xiaolv',
                        label: '效率',
                    }, {
                        value: 'kekong',
                        label: '可控',
                    }],
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航',
                    }, {
                        value: 'dingbudaohang',
                        label: '顶部导航',
                    }],
                }],
            }, {
                value: 'zujian',
                label: '组件',
                children: [{
                    value: 'basic',
                    label: 'Basic',
                    children: [{
                        value: 'layout',
                        label: 'Layout 布局',
                    }, {
                        value: 'color',
                        label: 'Color 色彩',
                    }, {
                        value: 'typography',
                        label: 'Typography 字体',
                    }, {
                        value: 'icon',
                        label: 'Icon 图标',
                    }, {
                        value: 'button',
                        label: 'Button 按钮',
                    }],
                }, {
                    value: 'form',
                    label: 'Form',
                    children: [{
                        value: 'radio',
                        label: 'Radio 单选框',
                    }, {
                        value: 'checkbox',
                        label: 'Checkbox 多选框',
                    }, {
                        value: 'input',
                        label: 'Input 输入框',
                    }, {
                        value: 'input-number',
                        label: 'InputNumber 计数器',
                    }, {
                        value: 'select',
                        label: 'Select 选择器',
                    }, {
                        value: 'cascader',
                        label: 'Cascader 级联选择器',
                    }, {
                        value: 'switch',
                        label: 'Switch 开关',
                    }, {
                        value: 'slider',
                        label: 'Slider 滑块',
                    }, {
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器',
                    }, {
                        value: 'date-picker',
                        label: 'DatePicker 日期选择器',
                    }, {
                        value: 'datetime-picker',
                        label: 'DateTimePicker 日期时间选择器',
                    }, {
                        value: 'upload',
                        label: 'Upload 上传',
                    }, {
                        value: 'rate',
                        label: 'Rate 评分',
                    }, {
                        value: 'form',
                        label: 'Form 表单',
                    }],
                }, {
                    value: 'data',
                    label: 'Data',
                    children: [{
                        value: 'table',
                        label: 'Table 表格',
                    }, {
                        value: 'tag',
                        label: 'Tag 标签',
                    }, {
                        value: 'progress',
                        label: 'Progress 进度条',
                    }, {
                        value: 'tree',
                        label: 'Tree 树形控件',
                    }, {
                        value: 'pagination',
                        label: 'Pagination 分页',
                    }, {
                        value: 'badge',
                        label: 'Badge 标记',
                    }],
                }, {
                    value: 'notice',
                    label: 'Notice',
                    children: [{
                        value: 'alert',
                        label: 'Alert 警告',
                    }, {
                        value: 'loading',
                        label: 'Loading 加载',
                    }, {
                        value: 'message',
                        label: 'Message 消息提示',
                    }, {
                        value: 'message-box',
                        label: 'MessageBox 弹框',
                    }, {
                        value: 'notification',
                        label: 'Notification 通知',
                    }],
                }, {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [{
                        value: 'menu',
                        label: 'NavMenu 导航菜单',
                    }, {
                        value: 'tabs',
                        label: 'Tabs 标签页',
                    }, {
                        value: 'breadcrumb',
                        label: 'Breadcrumb 面包屑',
                    }, {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单',
                    }, {
                        value: 'steps',
                        label: 'Steps 步骤条',
                    }],
                }, {
                    value: 'others',
                    label: 'Others',
                    children: [{
                        value: 'dialog',
                        label: 'Dialog 对话框',
                    }, {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示',
                    }, {
                        value: 'popover',
                        label: 'Popover 弹出框',
                    }, {
                        value: 'card',
                        label: 'Card 卡片',
                    }, {
                        value: 'carousel',
                        label: 'Carousel 走马灯',
                    }, {
                        value: 'collapse',
                        label: 'Collapse 折叠面板',
                    }],
                }],
            }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                    value: 'axure',
                    label: 'Axure Components',
                }, {
                    value: 'sketch',
                    label: 'Sketch Templates',
                }, {
                    value: 'jiaohu',
                    label: '组件交互文档',
                }],
            }],
            m_options3: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致',
                    }, {
                        value: 'fankui',
                        label: '反馈',
                    }, {
                        value: 'xiaolv',
                        label: '效率',
                    }, {
                        value: 'kekong',
                        label: '可控',
                    }],
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航',
                    }, {
                        value: 'dingbudaohang',
                        label: '顶部导航',
                    }],
                }],
            }, {
                value: 'zujian',
                label: '组件',
                children: [{
                    value: 'basic',
                    label: 'Basic',
                    children: [{
                        value: 'layout',
                        label: 'Layout 布局',
                    }, {
                        value: 'color',
                        label: 'Color 色彩',
                    }, {
                        value: 'typography',
                        label: 'Typography 字体',
                    }, {
                        value: 'icon',
                        label: 'Icon 图标',
                    }, {
                        value: 'button',
                        label: 'Button 按钮',
                    }],
                }, {
                    value: 'form',
                    label: 'Form',
                    children: [{
                        value: 'radio',
                        label: 'Radio 单选框',
                    }, {
                        value: 'checkbox',
                        label: 'Checkbox 多选框',
                    }, {
                        value: 'input',
                        label: 'Input 输入框',
                    }, {
                        value: 'input-number',
                        label: 'InputNumber 计数器',
                    }, {
                        value: 'select',
                        label: 'Select 选择器',
                    }, {
                        value: 'cascader',
                        label: 'Cascader 级联选择器',
                    }, {
                        value: 'switch',
                        label: 'Switch 开关',
                    }, {
                        value: 'slider',
                        label: 'Slider 滑块',
                    }, {
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器',
                    }, {
                        value: 'date-picker',
                        label: 'DatePicker 日期选择器',
                    }, {
                        value: 'datetime-picker',
                        label: 'DateTimePicker 日期时间选择器',
                    }, {
                        value: 'upload',
                        label: 'Upload 上传',
                    }, {
                        value: 'rate',
                        label: 'Rate 评分',
                    }, {
                        value: 'form',
                        label: 'Form 表单',
                    }],
                }, {
                    value: 'data',
                    label: 'Data',
                    children: [{
                        value: 'table',
                        label: 'Table 表格',
                    }, {
                        value: 'tag',
                        label: 'Tag 标签',
                    }, {
                        value: 'progress',
                        label: 'Progress 进度条',
                    }, {
                        value: 'tree',
                        label: 'Tree 树形控件',
                    }, {
                        value: 'pagination',
                        label: 'Pagination 分页',
                    }, {
                        value: 'badge',
                        label: 'Badge 标记',
                    }],
                }, {
                    value: 'notice',
                    label: 'Notice',
                    children: [{
                        value: 'alert',
                        label: 'Alert 警告',
                    }, {
                        value: 'loading',
                        label: 'Loading 加载',
                    }, {
                        value: 'message',
                        label: 'Message 消息提示',
                    }, {
                        value: 'message-box',
                        label: 'MessageBox 弹框',
                    }, {
                        value: 'notification',
                        label: 'Notification 通知',
                    }],
                }, {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [{
                        value: 'menu',
                        label: 'NavMenu 导航菜单',
                    }, {
                        value: 'tabs',
                        label: 'Tabs 标签页',
                    }, {
                        value: 'breadcrumb',
                        label: 'Breadcrumb 面包屑',
                    }, {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单',
                    }, {
                        value: 'steps',
                        label: 'Steps 步骤条',
                    }],
                }, {
                    value: 'others',
                    label: 'Others',
                    children: [{
                        value: 'dialog',
                        label: 'Dialog 对话框',
                    }, {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示',
                    }, {
                        value: 'popover',
                        label: 'Popover 弹出框',
                    }, {
                        value: 'card',
                        label: 'Card 卡片',
                    }, {
                        value: 'carousel',
                        label: 'Carousel 走马灯',
                    }, {
                        value: 'collapse',
                        label: 'Collapse 折叠面板',
                    }],
                }],
            }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                    value: 'axure',
                    label: 'Axure Components',
                }, {
                    value: 'sketch',
                    label: 'Sketch Templates',
                }, {
                    value: 'jiaohu',
                    label: '组件交互文档',
                }],
            }],
            m_props4: { multiple: true },
            m_options4: [{
                value: 1,
                label: '东南',
                children: [{
                    value: 2,
                    label: '上海',
                    children: [
                        { value: 3, label: '普陀' },
                        { value: 4, label: '黄埔' },
                        { value: 5, label: '徐汇' },
                    ],
                }, {
                    value: 7,
                    label: '江苏',
                    children: [
                        { value: 8, label: '南京' },
                        { value: 9, label: '苏州' },
                        { value: 10, label: '无锡' },
                    ],
                }, {
                    value: 12,
                    label: '浙江',
                    children: [
                        { value: 13, label: '杭州' },
                        { value: 14, label: '宁波' },
                        { value: 15, label: '嘉兴' },
                    ],
                }],
            }, {
                value: 17,
                label: '西北',
                children: [{
                    value: 18,
                    label: '陕西',
                    children: [
                        { value: 19, label: '西安' },
                        { value: 20, label: '延安' },
                    ],
                }, {
                    value: 21,
                    label: '新疆维吾尔族自治区',
                    children: [
                        { value: 22, label: '乌鲁木齐' },
                        { value: 23, label: '克拉玛依' },
                    ],
                }],
            }],
            m_options5: [{
                id: 1,
                text: '东南',
                subs: [{
                    id: 2,
                    text: '上海',
                    subs: [
                        { id: 3, text: '普陀' },
                        { id: 4, text: '黄埔' },
                        { id: 5, text: '徐汇' },
                    ],
                }, {
                    id: 7,
                    text: '江苏',
                    subs: [
                        { id: 8, text: '南京' },
                        { id: 9, text: '苏州' },
                        { id: 10, text: '无锡' },
                    ],
                }, {
                    id: 12,
                    text: '浙江',
                    subs: [
                        { id: 13, text: '杭州' },
                        { id: 14, text: '宁波' },
                        { id: 15, text: '嘉兴' },
                    ],
                }],
            }, {
                id: 17,
                text: '西北',
                subs: [{
                    id: 18,
                    text: '陕西',
                    subs: [
                        { id: 19, text: '西安' },
                        { id: 20, text: '延安' },
                    ],
                }, {
                    id: 21,
                    text: '新疆维吾尔族自治区',
                    subs: [
                        { id: 22, text: '乌鲁木齐' },
                        { id: 23, text: '克拉玛依' },
                    ],
                }],
            }],
        }
    },
    // watch
    watch: {
        value: function(newVal) {
            console.info('val=' + this.value)
        },
    },
    // 方法
    methods: {
        handleChange(value) {
            console.info(value)
        },
        onSubmit() {
            this.fox_submit()
        },
        onCancel() {
            fox.custom.closePage(this)
        },
    },
    // Fox流程
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
                console.info('submit流程: name:' + this.$options.name)
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
                fox.custom.closePage(this)
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

</style>