// pages/markdown/markdown.js
const app = getApp()
const $api = app.globalData.api
const $storage = app.globalData.storage
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: undefined,
    text:undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.setData({
      id
    })
  },
  options: {
    styleIsolation: 'apply-shared'
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
this.getMarkdownDetail()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getMarkdownDetail(){
    const that = this
    $api.Tool.getMarkdown(this.data.id).then(res => {
      console.log(res);
      wx.setNavigationBarTitle({
        title: res[0].fieldname 
      })
     that.setData({
      text:res[0].text
     });
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: '请求失败',
        icon: 'error'
      })
    })
  }
})