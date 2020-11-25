<template>
  <fox-page>
    <fox-footer-bar align="center">
      <fox-button type="primary" size="medium" @click="preview">预览</fox-button>
      <fox-button type="primary" size="medium" @click="save">提交</fox-button>
      <fox-button type="primary" size="medium" @click="close">取消</fox-button>
    </fox-footer-bar>
    <fox-content>
      <fox-group no="1" title="印模参数" label-width="100px" column="2" class="slot">
        <fox-select-item
          v-model="temp.operation"
          :source="m_operation"
          style="margin-right:40%;width:49.5%;"
          required
        >操作类型</fox-select-item>
        <fox-text-item v-model="temp.sealid" required style="width:49.5%;">印模编号</fox-text-item>
        <fox-text-item v-model="temp.sealname" required style="width:49.5%;" class="rightInput">印模名称</fox-text-item>
        <fox-text-item required v-model="temp.color" style="width:46%;" >印模颜色</fox-text-item>
        <fox-color-picker v-model="temp.color" color-format="rgb" size="medium"></fox-color-picker>
        
        <fox-select-item
          required
          v-model="temp.shapeType"
          :source="m_shapeType"
          style="width:49.5%;"
          class="rightInput"
        >印模形状</fox-select-item>
        <fox-group column="2" style="width:49.5%;">
          <fox-text-item required v-model="temp.width" style="width:50%;">宽度</fox-text-item>
          <fox-text-item required v-model="temp.height" style="width:50%;">高度</fox-text-item>
          <fox-group title="外圈设置" label-width="180px" style="width:100%;" id="outConfig">
            <div style="width:100%;border:1px solid pink;">
              <fox-text-item required v-model="temp.lineWidth">外圈宽度(MM)</fox-text-item>
              <fox-text-item required v-model="temp.padding">印章外圈内边距(MM)</fox-text-item>
              <fox-text-item required v-model="temp.startAngle">起始角度</fox-text-item>
              <fox-text-item required v-model="temp.text">外圈描述</fox-text-item>
            
              <fox-select-item required v-model="temp.fontFamily" :source="m_fontFamliy">字体</fox-select-item>
              <fox-text-item required v-model="temp.fontSize" :source="m_fontSize">字号</fox-text-item>
              <fox-select-item required v-model="temp.isBold" :soure="m_bool" :source="m_bool">是否加粗</fox-select-item>
            </div>
          </fox-group>
        </fox-group>
        <fox-group style="width: 49%;margin-top: 56px;" title="印模预览">
          <div style="width:500px;height:396px;border:1px solid pink;" >
            <!-- <img id="sealImg" src="../../../../static/img/seal.png" alt="印模预览"> -->
            <img id="sealImg" :src="imageCode" alt="印模预览" v-if="imageCode">
          </div>
        </fox-group>

        <fox-group id="tabChange">
          <div style="width:100%;">
            <fox-tabs type="card">
              <!-- 机构文字 -->
              <fox-tab-pane label="机构文字" v-model="tab1">
                <fox-group label-width="150px" column="2">
                  <fox-select-item required v-model="tab1.source" :source="m_sourceType">内容类型</fox-select-item>
                  <fox-text-item required v-model="tab1.y">纵向距离（MM）</fox-text-item>
                  <fox-text-item required v-model="tab1.text">内容</fox-text-item>

                  <fox-text-item required v-model="tab1.space">字体间距（MM）</fox-text-item>
                  <fox-divider content-position="left">字体设置</fox-divider>
                  <fox-group column="3" label-width="100px" style="width:100%">
                    <fox-select-item required v-model="tab1.fontFamily" style="width:33%" :source="m_fontFamliy">字体</fox-select-item>
                    <fox-text-item required v-model="tab1.fontSize" style="width:33%" :source="m_fontSize">字号</fox-text-item>
                    <fox-select-item required v-model="tab1.isBold" style="width:33%" :source="m_bool">是否加粗</fox-select-item>
                  </fox-group>
                </fox-group>
              </fox-tab-pane>
              <!-- 印章名称 -->
              <fox-tab-pane label="印章名称" v-model="tab2">
                <fox-group label-width="150px" column="2">
                  <fox-select-item required v-model="tab2.source" :source="m_sourceType">内容类型</fox-select-item>
                  <fox-text-item required v-model="tab2.y">纵向距离（MM）</fox-text-item>
                  <fox-text-item required v-model="tab2.text">内容</fox-text-item>

                  <fox-text-item required v-model="tab2.space">字体间距（MM）</fox-text-item>
                  <fox-divider content-position="left">字体设置</fox-divider>
                  <fox-group column="3" label-width="100px" style="width:100%">
                    <fox-select-item required v-model="tab2.fontFamily" style="width:33%" :source="m_fontFamliy">字体</fox-select-item>
                    <fox-text-item required v-model="tab2.fontSize" style="width:33%" :source="m_fontSize">字号</fox-text-item>
                    <fox-select-item required v-model="tab2.isBold" style="width:33%" :source="m_bool">是否加粗</fox-select-item>
                  </fox-group>
                </fox-group>
              </fox-tab-pane>
              <!-- 验证码 -->
              <fox-tab-pane label="验证码" v-model="tab3">
                <fox-group label-width="150px" column="2">
                  <fox-select-item required v-model="tab3.source" :source="m_sourceType">内容类型</fox-select-item>
                  <fox-text-item required v-model="tab3.y">纵向距离（MM）</fox-text-item>
                  <fox-text-item required v-model="tab3.text">内容</fox-text-item>

                  <fox-text-item required v-model="tab3.space">字体间距（MM）</fox-text-item>
                  <fox-divider content-position="left">字体设置</fox-divider>
                  <fox-group column="3" label-width="100px" style="width:100%">
                    <fox-select-item required v-model="tab3.fontFamily" style="width:33%" :source="m_fontFamliy">字体</fox-select-item>
                    <fox-text-item required v-model="tab3.fontSize" style="width:33%" :source="m_fontSize">字号</fox-text-item>
                    <fox-select-item required v-model="tab3.isBold" style="width:33%" :source="m_bool">是否加粗</fox-select-item>
                  </fox-group>
                </fox-group>
              </fox-tab-pane>
            </fox-tabs>
          </div>
        </fox-group>
      </fox-group>
    </fox-content>
  </fox-page>
</template>

<script>
export default {
    name: 'example_seal-item',
    // 数据
    data: function() {
        return {
            temp: {
                operation: '',
                sealid: '',
                sealname: '',
                color: '',
                width: '',
                height: '',
                lineWidth: '',
                padding: '',
                startAngle: '',
                text: '',
                fontFamily: '',
                fontSize: '',
                isBold: '',
            },
            tab1: {},

            tab2: {},
            m_operation: [
                { text: '新增', value: 'add' },
                { text: '修改', value: 'update' },
            ],
            tab3: {},
            m_shapeType: [
                { text: '圆形', value: '1' },
                { text: '椭圆', value: '2' },
            ],
            m_fontFamliy: [
                { text: '宋体', value: '宋体' },
                { text: '黑体', value: '黑体' },
                { text: '楷体', value: '楷体' },
            ],
            m_fontSize: [
                { text: '16', value: '16' },
                { text: '18', value: '18' },
            ],
            m_bool: [
                { text: '是', value: 'true' },
                { text: '否', value: 'false' },
            ],
            m_sourceType: [
                { text: '测试1', value: '1' },
                { text: '测试2', value: '2' },
                { text: '测试3', value: '3' },
            ],
            imageCode: '',
        }
    },
    computed: {
        font() {
            return [this.temp.fontFamily, this.temp.fontSize, this.temp.isBold].join(
                ',',
            )
        },
        shape() {
            return [this.temp.width, this.temp.height].join(',')
        },
    },
    // 方法
    methods: {
        resetTemp() {
            this.temp = {
                operation: '',
                sealid: '',
                sealname: '',
                color: '',
                width: '',
                height: '',
                lineWidth: '',
                padding: '',
                startAngle: '',
                text: '',
                fontFamily: '',
                fontSize: '',
                isBold: '',
            }
            this.tab1 = {}
            this.tab2 = {}
            this.tab3 = {}
        },
        check() {
          
        },
        preview() {
            const temp = {}
            temp.font = this.font
            temp.shape = this.shape
            temp.color = this.temp.color ? this.temp.color.slice(4, -1) : ''
            const list = [
                { i: 'tab1', type: '机构名称' },
                { i: 'tab2', type: '印章名称' },
                { i: 'tab3', type: '验证码' },
            ]
            for (const { i, type } of list) {
                this[i].font = [
                    this[i].fontFamily,
                    this[i].fontSize,
                    this[i].isBold,
                ].join(',')
                this[i].type = type
            }
            
            temp.items = [this.tab1, this.tab2, this.tab3]
            console.log(temp)
            // http://170.100.136.136:8080/icsp-app-paperless/api/btopSealDef/createSeal
            const args = { app: backend.paperless, url: 'api/btopSealDef/createSeal', data: temp }
            fox.custom.promise(args).then((res) => {
                this.imageCode = `data:image/png;base64,${res.data.base64}`
            })
        },
        save() {
            this.fox_submit()
        },
        close() {
            fox.layer.confirm('是否退出', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                callback: (action) => {
                    if (action == 'confirm') {
                        // 关闭当前页面
                        fox.custom.closePageWithResult(this, 0, { name: '江成' })
                    }
                },
            })
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
            beforeDestroy(session) {},

            /**
       * 消息
       * @param type
       * @param data
       * 
       * 
       * 
       */
            onMessage(type, data) {
                if(type == 'data') {
                    let { row, operation } = data
                    this.resetTemp()
                    if(operation == 'add') return
                    console.log(111)
                    let sealData = {}
                    if(row.sealdata) sealData = JSON.parse(row.sealdata)
                    const { sealname, sealid } = r
                    let {
                        color, font, items, lineWidth, padding, shape, shapeType, source, space, startAngle, text, 
                    } = sealData
                    const temp = {
                        operation,
                        sealid,
                        sealname,
                        color: `rgb(${color})`,
                        width: shape.split(',')[0],
                        height: shape.split(',')[1],
                        lineWidth,
                        padding,
                        startAngle,
                        text,
                        fontFamily: font.split(',')[0],
                        fontSize: font.split(',')[1],
                        isBold: font.split(',')[2],
                    }
                    this.temp = temp
                    this.$set(this, 'temp', temp) 
                    const [tab1, tab2, tab3] = items
                    tab1.fontFamily = tab1.font.split(',')
                    
                    // this.$set(this, 'temp', temp)
                    // this.temp.operation = operation
                    // this.temp.sealid = sealid
                    // this.temp.sealname = sealname
                    // this.temp.shapeType = shapeType
                    // this.temp.width = shape.split(',')[0]
                    // this.temp.height = shape.split(',')[1]
                    // thistemp.lineWidth = lineWidth
                }
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
                fox.layer.alert('保存成功', '提示', {
                    confirmButtonText: '确定',
                    callback: (action) => {
                        fox.custom.closePage(this)
                    },
                })
            },

            /**
       * 提交取消处理
       * @param context
       * @param args
       */
            cancelSubmit(context, error) {
                // console.info(JSON.stringify(error))
                // fox.layer.alert('是否退出', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     callback: (action) => {
                //         fox.custom.closePage(this)
                //     },
                // })
            },
        }
    },
}
</script>

<style scoped>
#tabChange {
  width: 97.3%;
  border: 1px solid pink;
  padding-right: 20px;
}
#outConfig .fox-group-item {
  width: 95% !important;
  margin: 18px 0;
}
#sealImg {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.slot {
  overflow: auto;
  height: 60vh;
}
.rightInput {
  margin-right: 1%;
}
</style>
