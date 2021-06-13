const STORAGE_NAME = 'category'
class Category {
  static set (data) {
    wx.setStorageSync(STORAGE_NAME, {
      expirex: Date.now() + 3600 * 1000,
      value: data,
    })

  }
  static get () {
    const result = wx.getStorageSync(STORAGE_NAME) || {}
    if(Object.keys(result).length === 0){
      return []
    }
    if(result.expirex < Date.now()){
      Category.remove()
      return []
    }
    return result.value
  }
  static remove () {
    wx.removeStorageSync(STORAGE_NAME)
  }
}

export {
  Category
}