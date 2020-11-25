let userMapping = {
    userId: 'userId',
    loginCode: 'loginCode',
    userName: 'userName',
    userCode: 'userCode',
    loginType: 'loginType',
    userAvatar: 'userAvatar',
    orgName: 'orgName',
}

export function setUserInfo(value) {
    let userInfo = {}
    for (let key in userMapping) {
        userInfo[key] = value[userMapping[key]]
    }
    fox.sessionStorage.put('global_user', userInfo)
}

function getUserInfo() {
    return fox.sessionStorage.get('global_user')
}

function setUserInfoItem(key, value) {
    let userInfo = getUserInfo()
    userInfo[key] = value
    fox.sessionStorage.put('global_user', userInfo)
}

export let userInfo = {
    get user() {
        return getUserInfo()
    }
}
