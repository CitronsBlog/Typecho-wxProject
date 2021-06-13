class Http{
  // 远程API
  static request ({url = '',method = 'GET',data = {},header = {}}) {
    if(!url.startsWith('http://') && !url.startsWith('https://')){
    // url = 'https://localhost:3000' + url
    url = 'https://api.citrons.cn' + url
    }
    // header.appkey = 'f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM'
    return new Promise((resolve,reject) => {
      wx.request({
        url,
        method,
        data,
        header,
        success: res => {
          if(res.statusCode.toString().startsWith('2')){
            res = res.data
            if(parseInt(res.code) === 200){
              resolve(res.data)
            }else{
              reject(res.msg)
            }
            
          }else{
            reject('请求失败')
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })

  }
}
export {
  Http
}