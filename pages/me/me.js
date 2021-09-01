// pages/me/me.js
const app = getApp()
const $api = app.globalData.api
const $storage = app.globalData.storage
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否存在授权信息
    auth: false,
    // 用户信息
    userInfo: {},
    //用户是否登录
    isLogin: false

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
    let userInfo = $storage.User.get()
    if(userInfo.length == 0){
      this.setData({
        auth:false
      })
    }else{
      this.setData({
        auth:true,
        userInfo
      })
    }
    this.verification()
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取用户基本信息
  getUserProfile(){
    let userInfo = $storage.User.get()
    if(userInfo.length == 0){
      const that = this
      // console.log('未获取用户信息');
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res.userInfo);
          let data = res.userInfo
          $storage.User.set(data)
          that.setData({
            userInfo:data,
            auth:true
          })
          // this.setData({
          //   userInfo: res.userInfo,
          //   hasUserInfo: true
          // })
        }
      })
    }else{
      wx.showToast({
        title: '已登录',
      })
    }
  },
  
  login(){
    wx.navigateTo({
      url: `/pages/login/login`
    })
  },
    //校验是否存在Token及是否过期
  verification() {
    let token = $storage.Token.get()
    if(token.length == 0){
      this.setData({
        isLogin: false
      })
    }else{
      let nowDate = new Date().getTime()
      if(token.expirex > nowDate){
        this.setData({
          isLogin: true
        })
      }else{
        wx.showToast({
          title: '登录状态过期，请重新登录',
          icon: 'error'
        })
        $storage.Token.remove()
        this.setData({
          isLogin: false
        })
      }
      // console.log(token.expirex);

    }
  },
  toUpdate() {
    wx.navigateTo({
      url: `/pages/update/update`
    })
  },
  toAbout(){
    wx.navigateTo({
      url: `/pages/about/about`
    })
  },
  toMarkdown(){
    if(this.data.isLogin){
      wx.navigateTo({
        url: `/pages/tool/tool`
      })
    }else{
      wx.showToast({
        title: '用户未登录',
        icon: 'error'
      })
    }
   
  },

  toImages(){
    if(this.data.isLogin){
      wx.navigateTo({
        url: `/pages/images/index`
      })
    }else{
      wx.showToast({
        title: '用户未登录',
        icon: 'error'
      })
    }
  },

  toVideo(){
    if(this.data.isLogin){
      wx.navigateTo({
        url: `/pages/video/video`
      })
    }else{
      wx.showToast({
        title: '用户未登录',
        icon: 'error'
      })
    }
  },

  toFile() {
    wx.navigateTo({
      url: `/pages/postFile/postFile`
    })
  }

})