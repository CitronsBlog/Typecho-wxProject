// app.js
//引入api
import api from './api/index'
// import utils from './utils/index'
import storage from './storage/index'

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    this.globalData = {
      //在这里导入
      api,
      // utils,
      storage
    }
  },
  globalData: {
    userInfo: null
  }
})
