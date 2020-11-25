<template>
  <!--page每个页面的root元素 设置group item的最小宽度，可让column自适应-->
  <fox-page group-title-width="120px" :min-item-width="260" ref="page">
    <!--footer bar必须在fox-content的面-->
    <fox-footer-bar align="right">
      <!--align的值有left、center、right 默认为right-->
      <fox-button icon="iconfont icon-jinggaotishi" type="primary" size="small" @click="onSubmit">提交</fox-button>
      <fox-button size="small">取消</fox-button>
    </fox-footer-bar>
    <!--page内容区域-->
    <fox-content>
      <fox-group title="四列+跨列" column="4">
        <fox-text-item placeholder="请输入内容">普通</fox-text-item>
        <fox-text-item placeholder="请输入内容" v-model="val" disabled="true">禁用</fox-text-item>
        <fox-text-item placeholder="请输入内容" clearable>可清空</fox-text-item>
        <fox-text-item placeholder="请输入内容" show-password>密码</fox-text-item>
        <fox-text-item placeholder="请输入内容" suffix-icon="el-icon-date" span="2">属性Icon</fox-text-item>
        <fox-text-item placeholder="请输入内容" prefix-icon="el-icon-search">属性Icon</fox-text-item>
      </fox-group>

      <fox-group title="三列+跨列+校验" class="my-group" column="3">
        <fox-text-item v-verify="'require'" v-model="value" placeholder="请输入内容">必输</fox-text-item>
        <fox-text-item v-verify="['require','email']" v-model="value2" placeholder="请输入内容">邮件</fox-text-item>
        <fox-text-item
          v-verify="['require','url']"
          v-model="value3"
          placeholder="请输入内容"
          clearable
        >URL</fox-text-item>
        <fox-text-item
          v-verify="['require','number']"
          v-model="value4"
          type="number"
          placeholder="请输入内容"
        >数字</fox-text-item>
        <fox-text-item
          v-verify="[{'require':true},{range:[5,10]}]"
          v-model="value5"
          placeholder="请输入内容"
          span="2"
        >5~10之间</fox-text-item>
      </fox-group>

      <fox-group title="二列+行" column="2">
        <fox-text-item placeholder="请输入内容" disabled>禁用</fox-text-item>
        <fox-text-item placeholder="请输入内容" type="textarea" :rows="5" span="2"></fox-text-item>
      </fox-group>

      <fox-group title="1列+slot" column="2">
        <fox-item label="slot item">
          <div class="my-items">
            <fox-text-item placeholder="请输入内容"></fox-text-item>
            <fox-text-item placeholder="请输入内容"></fox-text-item>
          </div>
        </fox-item>
      </fox-group>
    </fox-content>
  </fox-page>
</template>

<script>
import { PageMixin } from '@/utils/custom/page-mixin'

export default {
    name: 'example_group',
    // 混入
    mixins: [PageMixin],
    // 数据
    data: function() {
        return {
            val: '禁用状态',
            value7: [],
            options: [
                {
                    value: 'zhinan',
                    label: '指南',
                    children: [
                        {
                            value: 'shejiyuanze',
                            label: '设计原则',
                            children: [
                                {
                                    value: 'yizhi',
                                    label: '一致',
                                },
                                {
                                    value: 'fankui',
                                    label: '反馈',
                                },
                                {
                                    value: 'xiaolv',
                                    label: '效率',
                                },
                                {
                                    value: 'kekong',
                                    label: '可控',
                                },
                            ],
                        },
                        {
                            value: 'daohang',
                            label: '导航',
                            children: [
                                {
                                    value: 'cexiangdaohang',
                                    label: '侧向导航',
                                },
                                {
                                    value: 'dingbudaohang',
                                    label: '顶部导航',
                                },
                            ],
                        },
                    ],
                },
                {
                    value: 'zujian',
                    label: '组件',
                    children: [
                        {
                            value: 'basic',
                            label: 'Basic',
                            children: [
                                {
                                    value: 'layout',
                                    label: 'Layout 布局',
                                },
                                {
                                    value: 'color',
                                    label: 'Color 色彩',
                                },
                                {
                                    value: 'typography',
                                    label: 'Typography 字体',
                                },
                                {
                                    value: 'icon',
                                    label: 'Icon 图标',
                                },
                                {
                                    value: 'button',
                                    label: 'Button 按钮',
                                },
                            ],
                        },
                        {
                            value: 'form',
                            label: 'Form',
                            children: [
                                {
                                    value: 'radio',
                                    label: 'Radio 单选框',
                                },
                                {
                                    value: 'checkbox',
                                    label: 'Checkbox 多选框',
                                },
                                {
                                    value: 'input',
                                    label: 'Input 输入框',
                                },
                                {
                                    value: 'input-number',
                                    label: 'InputNumber 计数器',
                                },
                                {
                                    value: 'select',
                                    label: 'Select 选择器',
                                },
                                {
                                    value: 'cascader',
                                    label: 'Cascader 级联选择器',
                                },
                                {
                                    value: 'switch',
                                    label: 'Switch 开关',
                                },
                                {
                                    value: 'slider',
                                    label: 'Slider 滑块',
                                },
                                {
                                    value: 'time-picker',
                                    label: 'TimePicker 时间选择器',
                                },
                                {
                                    value: 'date-picker',
                                    label: 'DatePicker 日期选择器',
                                },
                                {
                                    value: 'datetime-picker',
                                    label: 'DateTimePicker 日期时间选择器',
                                },
                                {
                                    value: 'upload',
                                    label: 'Upload 上传',
                                },
                                {
                                    value: 'rate',
                                    label: 'Rate 评分',
                                },
                                {
                                    value: 'form',
                                    label: 'Form 表单',
                                },
                            ],
                        },
                        {
                            value: 'data',
                            label: 'Data',
                            children: [
                                {
                                    value: 'table',
                                    label: 'Table 表格',
                                },
                                {
                                    value: 'tag',
                                    label: 'Tag 标签',
                                },
                                {
                                    value: 'progress',
                                    label: 'Progress 进度条',
                                },
                                {
                                    value: 'tree',
                                    label: 'Tree 树形控件',
                                },
                                {
                                    value: 'pagination',
                                    label: 'Pagination 分页',
                                },
                                {
                                    value: 'badge',
                                    label: 'Badge 标记',
                                },
                            ],
                        },
                        {
                            value: 'notice',
                            label: 'Notice',
                            children: [
                                {
                                    value: 'alert',
                                    label: 'Alert 警告',
                                },
                                {
                                    value: 'loading',
                                    label: 'Loading 加载',
                                },
                                {
                                    value: 'message',
                                    label: 'Message 消息提示',
                                },
                                {
                                    value: 'message-box',
                                    label: 'MessageBox 弹框',
                                },
                                {
                                    value: 'notification',
                                    label: 'Notification 通知',
                                },
                            ],
                        },
                        {
                            value: 'navigation',
                            label: 'Navigation',
                            children: [
                                {
                                    value: 'menu',
                                    label: 'NavMenu 导航菜单',
                                },
                                {
                                    value: 'tabs',
                                    label: 'Tabs 标签页',
                                },
                                {
                                    value: 'breadcrumb',
                                    label: 'Breadcrumb 面包屑',
                                },
                                {
                                    value: 'dropdown',
                                    label: 'Dropdown 下拉菜单',
                                },
                                {
                                    value: 'steps',
                                    label: 'Steps 步骤条',
                                },
                            ],
                        },
                        {
                            value: 'others',
                            label: 'Others',
                            children: [
                                {
                                    value: 'dialog',
                                    label: 'Dialog 对话框',
                                },
                                {
                                    value: 'tooltip',
                                    label: 'Tooltip 文字提示',
                                },
                                {
                                    value: 'popover',
                                    label: 'Popover 弹出框',
                                },
                                {
                                    value: 'card',
                                    label: 'Card 卡片',
                                },
                                {
                                    value: 'carousel',
                                    label: 'Carousel 走马灯',
                                },
                                {
                                    value: 'collapse',
                                    label: 'Collapse 折叠面板',
                                },
                            ],
                        },
                    ],
                },
                {
                    value: 'ziyuan',
                    label: '资源',
                    children: [
                        {
                            value: 'axure',
                            label: 'Axure Components',
                        },
                        {
                            value: 'sketch',
                            label: 'Sketch Templates',
                        },
                        {
                            value: 'jiaohu',
                            label: '组件交互文档',
                        },
                    ],
                },
            ],

            value: '',
            value2: '',
            value3: '',
            value4: '',
            value5: '',
            value6: '',
        }
    },
    computed: {},
    // 方法
    methods: {
    // 提交处理
        onSubmit() {
            this.publicName = '哈哈'
            this.sayHello()
            // 触发submit流程
            this.fox_submit()
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
                //  //插入子任务1
                //  context.insert((subContext)=>{
                //      //子任务0
                //      fox.service.request({
                //          name:"dd/task_1",
                //          callback:(code, message, data)=>{
                //              subContext.resolve()
                //          }
                //      })
                //  })
                //
                // //插入子任务2
                //  context.insert((subContext)=>{
                //      //子任务0
                //      fox.service.request({
                //          name:"dd/task_2",
                //          callback:(code, message, data)=>{
                //              subContext.resolve()
                //          }
                //      })
                //  })
                //
                //  //插入子任务3
                //  context.insert((subContext)=>{
                //      //子任务0
                //      fox.service.request({
                //          name:"dd/task_3",
                //          callback:(code, message, data)=>{
                //              subContext.resolve()
                //          }
                //      })
                //  })
                //
                //  //子任务0
                //  fox.service.request({
                //      name:"dd/task_0",
                //      callback:(code, message, data)=>{
                //          context.resolve()
                //      }
                //  })

                context.resolve()
            },

            /**
       * 销毁处理
       */
            beforeDestroy(session) {},

            /**
       * 消息
       * @param type
       * @param data
       */
            onMessage(type, data) {},

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
                this.publicName = '哈哈'
                this.sayHello()

                console.info('submit流程')
                this.request({
                    id: 'id',
                    name: 'tt/tt/dd',
                    data: {},
                    callback: (code, message, data) => {
                        console.info('code === ' + code)
                    },
                })

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
    },
}
</script>

<style scoped>
.my-items {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>