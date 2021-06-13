const STORAGE_NAME = 'foximao_Token'
class Token {
  static set (data) {
    wx.setStorageSync(STORAGE_NAME, {
      //Token有效期为一个月
      expirex: Date.now() + 30*24*60*60 * 1000,
      value: data,
    })

  }
  static get () {
    const result = wx.getStorageSync(STORAGE_NAME) || {}
    if(Object.keys(result).length === 0){
      return []
    }
    //如果过期了 则返回false
    if(result.expirex < Date.now()){
      Token.remove()
      return false
    }
    return result
  }

  static remove () {
    wx.removeStorageSync(STORAGE_NAME)
  }
}

export {
  Token
}