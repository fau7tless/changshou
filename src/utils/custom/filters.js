/**
 *  公共过滤器
 */
export default {
    dateFormat(date) {
        if (!date) return date
        if (date.length === 14) {
            return date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2) + ' ' + date.substr(8, 2) + ':' + date.substr(10, 2) + ':' + date.substr(12, 2)
        } else if (date.length === 8) {
            return date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2)
        } else if (date.length === 6) {
            return date.substr(0, 2) + ':' + date.substr(2, 2) + ':' + date.substr(4, 2)
        } else {
            return date
        }
    },
}