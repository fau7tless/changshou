/**
 * 获取root domain
 * @param instance
 */
export function getRootDomain(vm){
    const $Domain = Symbol.for('Domain')
    if(vm.$children == undefined || vm.$children.length == 0){
        return undefined
    }
    // 获取domain
    let domain = vm.$children[0].$data && vm.$children[0].$data[$Domain]
    return domain
}