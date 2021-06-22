// pages/video/video.js
const app = getApp()
const $api = app.globalData.api
const $storage = app.globalData.storage
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 3500,
    duration: 500,
    current: 0,
    videoList: [], //总列表
    playList: [], //当前播放列表
    statusBarHight: undefined, //用户设备状态栏的高度
    meunHeight: undefined, //胶囊的高度
    menuPosition: undefined, //胶囊所处位置
    allHight: undefined, //总高度
    loop: true,
    // 触屏起始点x 
    touchStartX: 0,
    // 触屏起始点y
    touchStartY: 0,
    indexCurrent:null, //当前播放视频
    pageNum: 1
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
    this.getStatusBar()
    this.getMenuButtonBoundingClientRect()
    this.getHight()
    this.getVideo()
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
    console.log('没了');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getVideo(next) {
    const that = this
    if(next){
      $api.Video.getVideoList(this.data.pageNum).then(res => {
        console.log('重新',res);
        let data = this.data.videoList
        let list = data.concat(res)
        that.setData({
          videoList: list
        });
      }).catch(err => {
        console.log(err);
        wx.showToast({
          title: '请求失败',
          icon: 'error'
        })
      })
    }else{
      $api.Video.getVideoList(this.data.pageNum).then(res => {
        console.log(res);
        that.setData({
          videoList: res
        });
        
      that.addPlayList()
        if (res.length == 0) {
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

  // 获取状态栏高度
  getStatusBar() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          statusBarHight: res.statusBarHeight * 2
        })
      }
    })
  },

  // 获取胶囊位置
  getMenuButtonBoundingClientRect() {
    let data = wx.getMenuButtonBoundingClientRect()
    this.setData({
      meunHeight: data.height * 2,
      menuPosition: data.bottom * 2,
    })
  },

  // 计算距顶高度
  getHight() {
    let hight = this.data.statusBarHight
    let hight1 = this.data.menuPosition
    let allHight = hight + hight1 + 20
    console.log(typeof allHight);
    this.setData({
      allHight
    })
  },
  /**  
   * 触摸开始  
   **/
  touchStart(e) {
    console.log("触摸开始")
    this.data.touchStartX = e.touches[0].clientX;
    this.data.touchStartY = e.touches[0].clientY;
  },

  /**  
   * 触摸结束
   * 自己看需求改 上下左右都给你写了  
   **/
  touchEnd(e) {
    console.log("触摸结束")
    let deltaX = e.changedTouches[0].clientX - this.data.touchStartX;
    let deltaY = e.changedTouches[0].clientY - this.data.touchStartY;
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX >= 0) {
        console.log("左滑")
      } else {
        console.log("右滑")
      }
    } else if (Math.abs(deltaY) > 20 && Math.abs(deltaX) < Math.abs(deltaY)) {
      if (deltaY < 0) {
        console.log("上滑")
        console.log(e);
        //获取被切换视频的ID
        let lastindex = e.currentTarget.id
        //获取当前视频id
        let indexCurrent = "video_" + (Number(e.currentTarget.dataset.index) + 1)
        var lastVideoContext = wx.createVideoContext(lastindex, this) //这里对应的视频id
        lastVideoContext.pause()
        var indexVideoContext = wx.createVideoContext(indexCurrent, this) //这里对应的视频id
        indexVideoContext.play()
        console.log(lastindex,indexCurrent);
        this.addPlayList(e)
        if(this.data.videoList.length == 2){
          this.getVideo(true)
        }
      } else {
        console.log("下滑")
         //获取被切换视频的ID
         console.log(e);
         let lastindex = e.currentTarget.id
         //获取当前视频id
         let indexCurrent = "video_" + (Number(e.currentTarget.dataset.index)-1)
         var lastVideoContext = wx.createVideoContext(lastindex, this) //这里对应的视频id
         lastVideoContext.pause()
         var indexVideoContext = wx.createVideoContext(indexCurrent, this) //这里对应的视频id
         indexVideoContext.play()
         console.log(lastindex,indexCurrent);
      }
    } else {
      console.log("可能是误触！")
      console.log(e);
    }
  },

  //下滑事件向播放列表中添加一个视频 
  addPlayList(e) {
    let videoList = this.data.videoList
    let playList = this.data.playList
    if(e === undefined){
      playList.push(videoList[0])
      playList.push(videoList[1])
      videoList.splice(0,2)
      console.log(playList);
      var videoContext = wx.createVideoContext("video_0", this) //这里对应的视频id
      console.log(videoContext);
        videoContext.play()
      this.setData({
        playList,
        indexCurrent: 0
      })
    }else{
      let index = e.currentTarget.dataset.index
      if(index + 2  == playList.length){
      //   playList.push(videoList[0])
      // videoList.splice(0,1)
      playList.push(videoList[0])
      playList.push(videoList[1])
      videoList.splice(0,2)
      console.log(playList);
      this.setData({
        playList
      })
      }
    }
    
  },
})