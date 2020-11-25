/**
 * model信息观察者
 */
class ModelObserver{

    /**
     * 获取root domain
     * @param instance
     */
    getRootDomain(instance){
        const $Domain = Symbol.for("$Domain");
        if( instance.$children == undefined || instance.$children.length == 0){
            return undefined
        }
        //获取domain
        let domain = instance.$children[0].$data && instance.$children[0].$data[$Domain]
        return domain
    }

    /**
     * 获取items
     * @param domain
     */
    getModelItems(domain){
        const getModelItems = Symbol.for("getModelItems");
        return domain[getModelItems]()
    }

    /**
     * 获取所有的model items
     * @param vm
     * @param rootName
     */
    getAllModelItems(vm, rootName){
        let vmItems = [];
        let loadViewModel = Symbol.for("loadViewModel")
        let route = {
            root:rootName
        }
        let vmLayers = vm.$router[loadViewModel](route)
        for(let layers of vmLayers){
            for(let vm of layers.nodes){
                //获取实例
                let instance = vm.instance
                if(!instance){
                    return []
                }
                //获取domain
                let domain = this.getRootDomain(instance)
                if(!domain){
                    continue
                }
                //获取model items
                let items = this.getModelItems(domain)
                //加入列表
                vmItems = [...vmItems, ...items]
            }
        }
        return vmItems;

    }


    /**
     * 查找model信息
     * @param vm
     * @param callback
     */
    look(vm, rootName) {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                let vmItems = this.getAllModelItems(vm, rootName)
                //可能没加载完成，再查找一次
                if(vmItems.length == 0){
                    setTimeout(()=>{
                        vmItems = this.getAllModelItems(vm, rootName)
                        resolve(vmItems)
                    },500)
                    return
                }else{
                    resolve(vmItems)
                }
            },100)
        })
    }
}

export default ModelObserver