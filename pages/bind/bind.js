// pages/bind/bind.js
const app = getApp()
const $api = app.globalData.api
const $storage = app.globalData.storage
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 昵称
    NickName: undefined,
    //邮箱
    mail: undefined,
    //邮箱格式是否正确
    isMailTrue: true,
    //密码
    password: undefined

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
   * 下面三个是键盘输入事件
   */

  NickName(e){
    this.setData({
      NickName: e.detail.value
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
  bind(){
    let rex =  /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    //密码至少包英文和数字，长度 6-12
    let password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
    if(!rex.test(this.data.mail)){
      console.log(1);
      wx.showToast({
        title: '邮箱格式错误',
        icon:'error'
      })
      return
    }
    if(!password.test(this.data.password)){
      wx.showToast({
        title: '密码格式错误',
        icon:'error'
      })
      return
    }
    let userInfo = $storage.User.get()
      const that = this
      wx.login({
        success (res) {
          if(res.code){
            wx.request({
              url: 'https://api.citrons.cn/users/register',
              method: 'POST',
              data:{
                code:res.code,
                username: that.data.NickName,
                mail: that.data.mail,
                password: that.data.password,
                avatar: userInfo.avatarUrl
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success(res) {
                console.log(res);
                 if(res.data.code == 200){
                   wx.showToast({
                     title: '注册成功',
                   })
                  setTimeout(() => {
                    wx.redirectTo({
                      url: '/pages/login/login'
                    })
                  },800)
                 }
               },
            }
            )
          }else{
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
   

  }
})