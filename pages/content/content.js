// pages/content/content.js
// const md = require('./demo.md');
const app = getApp();
const $api = app.globalData.api
const $storage = app.globalData.storage
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
    userIp: undefined,
    text: '',
    parent: 0,
    isLogin:false
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
    this.verification()
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
      url: `https://api.citrons.cn/contents/getPage?cid=${that.data.cid}`,
      // url: `http://localhost:3000/contents/getPage?cid=${that.data.cid}`,
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

  wx.request({
    url: 'https://pv.sohu.com/cityjson?ie=utf-8',
    success(res){
        var m = JSON.parse(res.data.match(/.*(\{[^\}]+\}).*/)[1] || '{}')
        console.log('ip =>', m.cip, m)
        that.setData({
          userIp: m.cip
        })
    },
    fail(err){
      console.log(err);
      that.setData({
        userIp: '0.0.0.0'
      })
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
},

input(e){
  console.log();
  let text = e.detail.value
  this.setData({
    text
  })
},

// 提交评论
postComment(){
  if(!isLogin){
    wx.showToast({
      title: '请先登录',
    })
  }else{
    const that = this
    let userinfo = $storage.User.get()
    let cid = that.data.cid, // 文章id
        author = userinfo.nickName, //评论用户名称
        authorId = userinfo.id, //评论用户id
        mail = userinfo.mail, //评论用户邮箱
        ip = that.data.userIp,//评论用户ip
        agent = undefined, //评论用户UA
        text = that.data.text,//text
        parent = that.data.parent; //parent

   if(this.data.text != ""){
    $api.Content.postComment({
      cid,
      author,
      authorId,
      mail,
      ip,
      agent,
      text,
      parent
    }).then(res => {
      console.log('成功',res);
      if(res.code == 200){
        that.setData({
          text: ""
        })
        wx.showToast({
          title: res.msg
        })
      }
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: '评论失败',
        icon: 'error'
      })
    })
   }else{
     wx.showToast({
       title: '内容不能为空',
       icon: 'error'
     })
   }
  }
}
})