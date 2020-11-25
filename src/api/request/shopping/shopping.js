export function water(params) {
    // http://170.100.136.136:8080/icsp-app-csnsh/api/csnsh/send10001
    const args = { app: backend.csnsh, url: 'api/csnsh/send10001', data: params }
    return fox.custom.promise(args)
}
export function transfer(params) {
    const args = { app: backend.csnsh, url: 'api/csnsh/send10002', data: params }
    return fox.custom.promise(args)
}
export function cashIn(params) {
    const args = { app: backend.csnsh, url: 'api/csnsh/send10003', data: params }
    return fox.custom.promise(args)
}