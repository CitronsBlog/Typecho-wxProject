// pages/tool/tool.js
const app = getApp()
const $api = app.globalData.api
const $storage = app.globalData.storage
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: 1,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = $storage.Token.get()
    if(token.length == 0){
      wx.showToast({
        title: '需登录使用',
        icon: "error"
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      },2000)
    }
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
this.getFileList()
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
  chooseFile(){
    const that = this
    wx.chooseMessageFile({
      count: 10,
      type: 'file',
      success (res) {
        let tempFilePaths = res.tempFiles
        
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFiles);
        let data = res.tempFiles[0]
        let user = $storage.User.get()
        wx.uploadFile({
          url: 'https://api.citrons.cn/tool/uploadFile', //仅为示例，非真实的接口地址
          filePath: data.path,
          name: data.name,
          formData: {
            'uid': user.id
          },
          success (res){
            that.getFileList()
          },
          fail(err){
            console.log(err);
          }
        })
      }
    })
  },
  getFileList(){
    const that = this
   $api.Tool.getFileList(this.data.uid).then(res => {
     console.log(res);
    that.setData({
      list:res.data
    });
   }).catch(err => {
     console.log(err);
     wx.showToast({
       title: '请求失败',
       icon: 'error'
     })
   })
  },
  toDetial(e){
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/markdown/markdown?id=${id}`
    })
  },
  delete(e){
    let id = e.currentTarget.dataset.id
    const that = this
    $api.Tool.deleteMarkdown(id).then(res => {
    //   console.log(res);
    //  that.setData({
    //    list:res
    //  });
    let arr = []
    this.data.list.forEach(item => {
      if(item.id != id){
        arr.push(item)
      }
    })
    that.setData({
      list: arr
    })
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: '请求失败',
        icon: 'error'
      })
    })
  }

})