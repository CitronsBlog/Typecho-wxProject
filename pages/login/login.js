// pages/login/login.js
const app = getApp()
const $api = app.globalData.api
const $storage = app.globalData.storage
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mail:undefined,
    password:undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  toBind(){
    wx.navigateTo({
      url: `/pages/bind/bind`
    })
  },

  mail(e){
    this.setData({
      mail: e.detail.value
    })
  },

  password(e){
    this.setData({
      password: e.detail.value
    })
  },

  login(){
    let rex = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if(!rex.test(this.data.mail)){
      wx.showToast({
        title: '邮箱格式错误',
        icon: 'error'
      })
      return
    }
    const that =this
    wx.request({
      url: 'https://api.citrons.cn/users/login',
      method: 'POST',
      data:{
        username: that.data.mail,
        password: that.data.password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res);
         if(res.data.code == 200){
           wx.showToast({
             title: '登录成功',
           })
           let user = $storage.User.get()
           user.name = res.data.data.name
           user.id = res.data.data.uid
           user.mail = that.data.mail
           $storage.User.set(user)
           $storage.Token.set(res.data.data.token)
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/me/me'
            })
          },800)
         }
       },
    }
  )
  }
})