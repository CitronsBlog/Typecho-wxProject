// pages/content/content.js
// const md = require('./demo.md');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		isLoading: true,					// 判断是否尚在加载中
    article: {},						// 内容数据
    postInfo: {},
    cid: undefined,
    commentList: [],   // 评论列表

	},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.cid
    this.setData({
      cid:id
    })       
    this.addViews() 
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
    const that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      // url: `https://api.citrons.cn/contents/getPage?cid=${that.data.cid}`,
      url: `http://localhost:3000/contents/getPage?cid=${that.data.cid}`,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          postInfo:res.data.data,
          isLoading: false
        });
        wx.hideLoading({
          success: (res) => {},
        })
        that.getPageComment()
      }
    })
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

  //获取文章评论
 getPageComment(){
   const that = this
  wx.request({
    url: `https://api.citrons.cn/contents/getCommentList?cid=${that.data.cid}`,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      // console.log(res);
      that.setData({
        commentList:res.data.data
      });
      // wx.hideLoading({
      //   success: (res) => {},
      // })
    }
  })
 },

//增加浏览量
addViews(){
  const that = this
  wx.request({
    url: 'https://api.citrons.cn/contents/addViews',
    method: 'POST',
    data:{
      cid:that.data.cid
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success(res) {
      console.log(res);
     },
  }
  )
}
})