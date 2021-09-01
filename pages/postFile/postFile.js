// pages/postFile/postFile.js
const app = getApp()
const $api = app.globalData.api
const $storage = app.globalData.storage
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yearsList: [],
    postFileList: [],
    colorList: ['blue','orange','green','red']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPostFile()
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

  //获取归档数据/年
  getPostFile(){
    const that = this
    $api.Content.getPostFile().then(res => {
      console.log(res);
      that.setData({
        postFileList: res.data.list,
        yearsList:res.data.years.reverse()
      })
    }).catch(err => {
      console.log(err);
    })
  }
})