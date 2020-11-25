/**
 * 业务工具类
 * created by sunyu 2017-12-05
 */
/**
 * download 下载
 * @param vm
 * @param url
 
 */
export function download(vm, url) {
    if (url) {
        if (url.indexOf('http') <= -1) {
            // 当不包含http时拼接gateway地址
            url = fox.http.getRequestUrl({
                app: '',
                path: url,
            })
        }
    } else {
        fox.layer.message('必须设置请求url')
    }
    // url添加token
    // url = this.addTokenInfo(url);
    // 模拟a标签进行下载
    let a = document.createElement('a')
    a.href = url
    a.click()
}

export async function pdf4Base64(params) {
    let args = {
        id: params.id, // 需要添加pdf的标签id
        data: params.data, // pdf base64数据
        scale: params.scale || 1.5, // 缩放比例
        rotate: params.rotate || 0, // 旋转角度(顺时针)
        canvasClass: params.canvasClass || 'canvasClass', // canvas类名
    }
    let pdfNode = document.getElementById(args.id)
    let div = document.createElement('div')
    div.id = 'div_canvas'
    div.style.textAlign = 'center'
    div.style.height = '100%'
    div.style.overflow = 'auto'
    let data = window.atob(args.data) // base64数据处理
    let arr = new Uint8Array(new ArrayBuffer(data.length)) // 格式转换
    for (let i in data) {
        arr[i] = data.charCodeAt(i)
    }
   
    let pdf = await PDFJS.getDocument({ data: arr })
    let pages = pdf.numPages
    for (let i = 1; i <= pages; i++) {
        let canvas = document.createElement('canvas')
        let page = await pdf.getPage(i)
        let viewport = page.getViewport(args.scale, args.rotate) // 缩放比例，旋转角度
        let context = canvas.getContext('2d') // 2d 指定二维画图，固定值
        canvas.height = viewport.height
        canvas.width = viewport.width
        let renderContent = {
            canvasContext: context,
            viewport: viewport,
        }
        await page.render(renderContent)
        canvas.className = args.canvasClass // 对canvas 指定类，便于样式调整
        div.appendChild(canvas)
    }
    pdfNode.appendChild(div)
}
