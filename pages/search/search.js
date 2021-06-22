// pages/search/search.js
const app = getApp()
const $api = app.globalData.api
const $storage = app.globalData.storage
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:undefined,
    postList: []
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

  input(e){
    let value = e.detail.value
    this.setData({
      value
    })
  },

  search(){
    if(this.data.value !== undefined && this.data.value != null && this.data.value != ""){
      const that = this
      $api.Search.searchByWord(this.data.value).then(res => {
        // console.log(res);
       that.setData({
         postList:res
       });
       if(res.length == 0){
        wx.showToast({
          title: '好像啥也没有',
          icon: 'error'
        })
       }
      }).catch(err => {
        console.log(err);
        wx.showToast({
          title: '请求失败',
          icon: 'error'
        })
      })
    }
  },

  toContent(e){
    // console.log(e.currentTarget.dataset.id);
    let cid = e.currentTarget.dataset.id 
    wx.navigateTo({
      url: `/pages/content/content?cid=${cid}`
    })
  }
})