<template>
    <!--page每个页面的root元素-->
    <fox-page group-header-width="120px">
        <!--footer bar必须在fox-content的面-->
        <fox-footer-bar align="right">  <!--align的值有left、center、right 默认为right-->
            <fox-button class="button-fox" type="primary" size="small" round>提交</fox-button>
        </fox-footer-bar>
        <!--page内容区域-->
        <fox-content>

            <fox-group no="1" title="基本信息" class="my-group" label-width="100px" column="2" style="width:100%"
                       :filter-events="filterEvents" >
                <fox-text-item placeholder="请输入内容" disabled>姓名</fox-text-item>
                <fox-select-item v-verify="['require']" placeholder="请选择" :source="m_items" v-model="options1" value-type="text" title="性别" label="性别"></fox-select-item>
                <fox-select-item v-verify="['require']" placeholder="请选择" :source="m_items1" v-model="value6" label="学历"></fox-select-item>
                <fox-text-item placeholder="请输入内容">证件类型</fox-text-item>
                <fox-text-item placeholder="请输入内容" clearable>出生日期</fox-text-item>
                <fox-text-item placeholder="请输入内容" >证件类号码</fox-text-item>
                <fox-text-item placeholder="请输入内容" clearable>公司</fox-text-item>
                <fox-text-item placeholder="请输入内容">邮箱</fox-text-item>
            </fox-group>
            <fox-group no="2" title="远程数据源" class="my-group" label-width="80px" column="1" style="width:100%">
                <fox-table-item content="globle/DD/table" page-index="1" :page-sizes="[5, 50, 100, 200]"
                                :page-size="5" :base-params="baseParams" :params="params">
                    <fox-table-column type="index" label="序号" width="180"></fox-table-column>
                    <fox-table-column prop="date" label="编码" width="180"></fox-table-column>
                    <fox-table-column prop="name" label="名称" width="180"></fox-table-column>
                    <fox-table-column prop="address" label="类型"></fox-table-column>
                    <fox-table-column prop="phone" label="作者"></fox-table-column>
                    <fox-table-column prop="phone" label="审核人"></fox-table-column>
                    <fox-table-column prop="phone" label="作者"></fox-table-column>
                    <fox-table-column prop="phone" label="阅读数"></fox-table-column>
                    <fox-table-column prop="phone" label="状态"></fox-table-column>
                    <fox-table-column prop="phone" label="时间"></fox-table-column>
                </fox-table-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
    export default {
        name: "index",
        //数据
        data:function(){
            return {
                m_items: [{
                    value: "5020010",
                    text: "男"
                },{
                    value: "5020020",
                    text: "女"
                },],
                m_items1: [{
                    value: "5020010",
                    text: "本科"
                },{
                    value: "5020020",
                    text: "专科"
                },],
                filterEvents:{
                    focus:false,
                    blur:false,
                },
                value7: [],
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                            value: 'cexiangdaohang',
                            label: '侧向导航'
                        }, {
                            value: 'dingbudaohang',
                            label: '顶部导航'
                        }]
                    }]
                }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                            value: 'layout',
                            label: 'Layout 布局'
                        }, {
                            value: 'color',
                            label: 'Color 色彩'
                        }, {
                            value: 'typography',
                            label: 'Typography 字体'
                        }, {
                            value: 'icon',
                            label: 'Icon 图标'
                        }, {
                            value: 'button',
                            label: 'Button 按钮'
                        }]
                    }, {
                        value: 'form',
                        label: 'Form',
                        children: [{
                            value: 'radio',
                            label: 'Radio 单选框'
                        }, {
                            value: 'checkbox',
                            label: 'Checkbox 多选框'
                        }, {
                            value: 'input',
                            label: 'Input 输入框'
                        }, {
                            value: 'input-number',
                            label: 'InputNumber 计数器'
                        }, {
                            value: 'select',
                            label: 'Select 选择器'
                        }, {
                            value: 'cascader',
                            label: 'Cascader 级联选择器'
                        }, {
                            value: 'switch',
                            label: 'Switch 开关'
                        }, {
                            value: 'slider',
                            label: 'Slider 滑块'
                        }, {
                            value: 'time-picker',
                            label: 'TimePicker 时间选择器'
                        }, {
                            value: 'date-picker',
                            label: 'DatePicker 日期选择器'
                        }, {
                            value: 'datetime-picker',
                            label: 'DateTimePicker 日期时间选择器'
                        }, {
                            value: 'upload',
                            label: 'Upload 上传'
                        }, {
                            value: 'rate',
                            label: 'Rate 评分'
                        }, {
                            value: 'form',
                            label: 'Form 表单'
                        }]
                    }, {
                        value: 'data',
                        label: 'Data',
                        children: [{
                            value: 'table',
                            label: 'Table 表格'
                        }, {
                            value: 'tag',
                            label: 'Tag 标签'
                        }, {
                            value: 'progress',
                            label: 'Progress 进度条'
                        }, {
                            value: 'tree',
                            label: 'Tree 树形控件'
                        }, {
                            value: 'pagination',
                            label: 'Pagination 分页'
                        }, {
                            value: 'badge',
                            label: 'Badge 标记'
                        }]
                    }, {
                        value: 'notice',
                        label: 'Notice',
                        children: [{
                            value: 'alert',
                            label: 'Alert 警告'
                        }, {
                            value: 'loading',
                            label: 'Loading 加载'
                        }, {
                            value: 'message',
                            label: 'Message 消息提示'
                        }, {
                            value: 'message-box',
                            label: 'MessageBox 弹框'
                        }, {
                            value: 'notification',
                            label: 'Notification 通知'
                        }]
                    }, {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [{
                            value: 'menu',
                            label: 'NavMenu 导航菜单'
                        }, {
                            value: 'tabs',
                            label: 'Tabs 标签页'
                        }, {
                            value: 'breadcrumb',
                            label: 'Breadcrumb 面包屑'
                        }, {
                            value: 'dropdown',
                            label: 'Dropdown 下拉菜单'
                        }, {
                            value: 'steps',
                            label: 'Steps 步骤条'
                        }]
                    }, {
                        value: 'others',
                        label: 'Others',
                        children: [{
                            value: 'dialog',
                            label: 'Dialog 对话框'
                        }, {
                            value: 'tooltip',
                            label: 'Tooltip 文字提示'
                        }, {
                            value: 'popover',
                            label: 'Popover 弹出框'
                        }, {
                            value: 'card',
                            label: 'Card 卡片'
                        }, {
                            value: 'carousel',
                            label: 'Carousel 走马灯'
                        }, {
                            value: 'collapse',
                            label: 'Collapse 折叠面板'
                        }]
                    }]
                }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                        value: 'axure',
                        label: 'Axure Components'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, {
                        value: 'jiaohu',
                        label: '组件交互文档'
                    }]
                }],
                optionsSelect:"",
                options1:[
                    {
                        label:"男",
                        value:"1"
                    },
                    {
                        label:"女",
                        value:"2"
                    },

                ],
                options2:[
                    {
                        label:"本科",
                        value:"1"
                    },
                    {
                        label:"硕士",
                        value:"2"
                    },
                    {
                        label:"博士",
                        value:"2"
                    },

                ],

                value:"",
                value2:"",
                value3:"",
                value4:"",
                value5:"",
                value6:"",
                tableData: [
                    {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                    },
                    {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄"
                    },
                    {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄"
                    },
                    {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄"
                    }
                ]
            }
        },
        //方法
        methods:{
            handleChange(value) {
                console.log(value);
            },
            onFocus(event){
                console.info("----------> focus");
            },
            onBlur(event){
                console.info("----------> blur");
            }
        },
        //加载后处理
        mounted:function(){

        }
    }
</script>

<style scoped>
.button-fox{
    margin-top: 9px;

}

</style>