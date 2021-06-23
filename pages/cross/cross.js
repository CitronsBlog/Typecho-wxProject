// pages/cross/cross.js
const app = getApp()
const $api = app.globalData.api
const $storage = app.globalData.storage
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid: 258,  //时光机的cid
    crossList: [],
    colorList: ['blue','orange','green','red']
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
    this.getCrossList()
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

  getCrossList(){
    const that = this
   $api.Cross.getCrossList(this.data.cid).then(res => {
    that.setData({
      crossList:res.data
    });
   }).catch(err => {
     console.log(err);
     wx.showToast({
       title: '请求失败',
       icon: 'error'
     })
   })
  },
})