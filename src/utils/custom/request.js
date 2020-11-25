export default function({ url, data, ...args }) {
    return new Promise((resolve, reject) => {
        fox.service.request({ 
            ...args,
            id: url,
            path: url,
            data,
        }).then((res) => {
            if (res.code == 0) return resolve(res)
            return resolve(res)
        }, (err) => resolve(err))
    })
}