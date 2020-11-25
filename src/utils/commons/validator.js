/**
 * 判断是否有错误tip
 * @param node
 */
function hasNodeErrorTip(node) {
    return node && (node.innerErrorTip !== undefined)
}

let ValidatorConfig = {
    // 错误处理
    error(errorMsg, node) {
        // 错误提示，在组件内容封装了error tip的处理方式
        if(hasNodeErrorTip(node)) {
            node.innerErrorTip = errorMsg
            return
        }

        // 加入错误提示class，没有封装error tip的处理方式
        if(node.$el) {
            node.$el.classList.add('is-error')
            // 更新提示
            let inputNode = node.$el.querySelector('.fox-form-item__tip')
            if(!inputNode) {
                return
            }
            let errorNode = inputNode.querySelector('.fox-form-item__tip')
            if(!errorNode) {
                // 创建节点
                errorNode = window.document.createElement('div')
                // 加入错误提示class
                errorNode.classList.add('fox-form-item__tip')
                // 加入错误提示
                inputNode.appendChild(errorNode)
            }
            errorNode.innerText = errorMsg
        }
    },
    // 重置处理
    reset(node) {
        // 错误提示，在组件内容封装了error tip的处理方式
        if(hasNodeErrorTip(node)) {
            node.innerErrorTip = ''
            return
        }

        // 清空错误提示class
        if(node && node.$el) {
            node.$el.classList.remove('is-error')
            // 更新提示
            let errorNode = node.$el.querySelector('.fox-form-item__error')
            if(errorNode) {
                errorNode.parentNode.removeChild(errorNode)
            }
        }
    },
    // 成功处理
    success(node) {

    },
    // 装饰
    decorate(node, rule) {
        if(!node) {
            return
        }

        let flag = false
        if(typeof rule === 'string') {
            flag = (rule === 'require' || rule === 'required')
        }else{
            for(let i = 0; i < rule.length; i++) {
                if(typeof rule[i] == 'object' && (rule[i].require == true || rule[i].required == true)) {
                    flag = true
                }else if(rule[i] === 'require' || rule[i] === 'required') {
                    flag = true
                }
            }
        }

        if(flag) {
            if(node.isRequired != undefined) {
                node.isRequired = true
                return
            }

            if(node.$el) {
                node.$el.classList.add('is-required')
            }
        }else{
            if(node.isRequired != undefined) {
                node.isRequired = false
                return
            }

            if(node.$el) {
                node.$el.classList.remove('is-required')
            }
        }
    },
}

ValidatorConfig.install = function(Vue, fox) {
    // 安装校验器
    Vue.use(fox.validator, ValidatorConfig)
}
export default ValidatorConfig
