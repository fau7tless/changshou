<template>
<fox-page>
  <fox-footer-bar align="center">
     <fox-button @click="onSubmit">打印</fox-button>
     <fox-button @click="onCancel">取消</fox-button>
  </fox-footer-bar>  
  <fox-content style="height:600px">
    <pdf
        v-for="i in numPages"
        :key="i"
        :src="src"
        :page="i"
    ></pdf>
  </fox-content>
</fox-page>
</template>

<script>
import pdf from 'vue-pdf'

export default {
    // 名称
    name: 'example_pdf',
    // 注册组件
    components: { pdf },
    // 数据
    data() {
        return {
            pdfFile: '/poc/static/pdf/yusys.pdf',
            numPages: 0,
            src: '',
        }
    },
    // 方法
    methods: {
        async handlePDF() {
            this.src = pdf.createLoadingTask(this.pdfFile)
            this.numPages = await pdf.createLoadingTask(this.pdfFile).promise.then((pdf) => pdf.numPages)
        },
        // 取消处理
        onCancel() {
            this.$confirm('是否取消打印?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                // 返回code：1代表授权操作取消
                fox.custom.closePageWithResult(this, 1, {})
            }) 
        },
        // 提交处理
        onSubmit() {
            this.fox_submit({ foreAuthType: 'noAuth' })
        },
        getPdf() {
            // http://170.100.136.136:8080/icsp-app-paperless/api/btopSealDef/createPdf
            const args = { app: backend.paperless, url: 'api/btopSealDef/createPdf', data: {} }
            return fox.custom.promise(args).then((res) => {
                pdf4Base64({ id: '20', data: res.data.base64 })
            })
        },
    },
    // Fox流程
    fox_flow() {
        return {
            // 界面渲染后，更改数据会触发钩子函数
            mounted(session, context) {
                // 获取同步数据
                this.handlePDF()
                // let syncData = fox.custom.getSyncData(this)
                // if(syncData && syncData.path) {
                //     this.pdfFile = syncData.path
                //     this.handlePDF()
                // }
            },

            // 提交处理
            submit(context) {
                console.info('打印处理')
                context.resolve()
            },

            // 提交后处理
            postSubmit(context) {
                // 返回code：1代表授权操作成功
                this.$message.success('打印成功')
                fox.custom.closePageWithResult(this, 0, {})
            },

            // 提交取消处理
            cancelSubmit(context, error) {
                console.info(JSON.stringify(error)) 
                if(error.pass === true) {
                    // 返回code：2代表授权操作出现错误
                    fox.custom.closePageWithResult(this, 2, {})
                }
            },
        }
    },

}
</script>

<style scoped>

</style>