const STORAGE_NAME = 'foximao_User'
class User {
  static set (data) {
    wx.setStorageSync(STORAGE_NAME, {
      value: data,
    })

  }
  static get () {
    const result = wx.getStorageSync(STORAGE_NAME) || {}
    if(Object.keys(result).length === 0){
      return []
    }
    return result.value
  }

  static remove () {
    wx.removeStorageSync(STORAGE_NAME)
  }
}

export {
  User
}