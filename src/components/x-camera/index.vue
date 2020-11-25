<template>
   <fox-item>
     <div class="my-camera">
        <div class="my-camera-div" :style="mCameraDivStyle">
          <video v-show="videoVisible" ref="video" :width="mVideoWidth" :height="mVideoHeight" controls ></video>
        </div>
       <el-carousel ref="carousel" class="my-camera-carousel" :autoplay="false"
                    arrow="always" :height="mImageAreaHeight"
                    :loop="false" type="card">
         <template v-for="(item, index) in items">
           <el-carousel-item :key="`carousel-${index}`">
             <div class="my-image-card">
               <el-image
                   :style="mImageStyle"
                   :src="item"
                   fit="fill">
               </el-image>
             </div>
           </el-carousel-item>
         </template>
       </el-carousel>
       <fox-button-row align="center" class="my-buttons-bar">
         <fox-button @click="onOpen">打开</fox-button>
         <fox-button @click="onTakePhoto">拍照</fox-button>
         <fox-button @click="onClear">清空</fox-button>
       </fox-button-row>
     </div>
   </fox-item>
</template>

<script>
export default {
    // 名称
    name: 'fox-x-camera',
    // 属性
    props: {
        // image width
        imageWidth: {
            type: [Number],
            required: false,
            default: 750,
        },
        // image height
        imageHeight: {
            type: [Number],
            required: false,
            default: 500,
        },
        // image area height
        imageAreaHeight: {
            type: [Number],
            required: false,
            default: 170,
        },
        // image type
        imageType: {
            type: [String],
            required: false,
            default: 'image/png',
        },
        // 值
        value: {
            required: false
        },
    },
    // model
    model: {
       prop:'value',
       event:'change'
    },
    // 数据
    data() {
        return{
            // 图片items
            items: [],
            // 是否显示
            videoVisible: false,
        }
    },
    computed: {
        // video width
        mVideoWidth() {
            let w = this.imageWidth
            if(w > 600) {
                w = 600
            }
            return `${w}`
        },
        // video height
        mVideoHeight() {
            let h = this.imageHeight
            if(h > 400) {
                h = 400
            }
            return `${h}`
        },
        // image area height
        mImageAreaHeight() {
            let h = this.imageAreaHeight
            return `${h}px`
        },
        // image style
        mImageStyle() {
            let style = {
                width: '180px',
                height: '120px',
            }
            return style
        },
        mCameraDivStyle() {
            let style = {
                height: `${this.mVideoHeight}px`,
            }
            return style
        },

    },
    // 方法
    methods: {
        // 获取图片
        takePhoto(video) {
            let canvas = document.createElement('canvas')
            canvas.width = this.mVideoWidth
            canvas.height = this.mVideoHeight
            let context = canvas.getContext('2d')
            context.drawImage(video, 0, 0, this.imageWidth, this.imageHeight)
            let base64 = canvas.toDataURL(this.imageType)
            return base64
        },
        // 访问用户媒体设备的兼容方法
        openUserCamera(constraints, success, error) {
            if (navigator.mediaDevices.getUserMedia) {
                // 最新的标准API
                navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error)
            } else if (navigator.webkitGetUserMedia) {
                // webkit核心浏览器
                navigator.webkitGetUserMedia(constraints, success, error)
            } else if (navigator.mozGetUserMedia) {
                // firfox浏览器
                navigator.mozGetUserMedia(constraints, success, error)
            } else if (navigator.getUserMedia) {
                // 旧版API
                navigator.getUserMedia(constraints, success, error)
            }
        },
        // 打开设备
        onOpen() {
            // 参数
            let constraints = {
                video: { width: this.imageWidth, height: this.imageHeight },
            }
            this.openUserCamera(constraints, (stream) => {
                // 兼容webkit核心浏览器
                let { video } = this.$refs
                // 将视频流设置为video元素的源
                video.srcObject = stream
                video.controls = false
                video.play()
                this.videoVisible = true
            }, (error) => {
                console.log(`访问用户媒体设备失败${error.name}, ${error.message}`)
            })
        },
        // 拍照
        onTakePhoto() {
            let { video } = this.$refs
            let base64 = this.takePhoto(video)
            this.items.push(base64)
            this.$emit('change', this.items)
            setTimeout(() => {
                let pos = this.items.length - 1
                this.$refs.carousel.setActiveItem(pos)
            }, 10)
        },
        // 清空
        onClear() {
            this.items = []
             this.$emit('change', this.items)
        },

    },
}
</script>

<style scoped>
.my-camera{
  width: 100%;
  height: 100%;
}

.my-camera-div{
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

.my-camera-carousel{
  width: 100%;
  background-color: #d3dce6;
  margin-top: 20px;
}

.my-image-card{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
}

.my-buttons-bar{
  margin-top: 20px;
}
</style>