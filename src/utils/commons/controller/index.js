import NormalFlow from './flows/normal-flow'
import AuthFlow from './flows/auth-flow'
import CheckFlow from './flows/check-flow'

let flows = [NormalFlow, AuthFlow, CheckFlow]

//Flow配置
class FlowConfig{}

//安装配置
FlowConfig.install = function(Vue, fox, foxFlowController){
    foxFlowController.install(Vue, fox, flows)
}
export default FlowConfig