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

  //下滑事件向播放列表中添加一个视频 
  addPlayList(e) {
    let videoList = this.data.videoList
    let playList = this.data.playList
    // 如果e是undefined则是首次加载
    if(e === undefined){
      playList.push(videoList[0])
      playList.push(videoList[1])
      videoList.splice(0,2)
      //默认播放第一个视频
      var videoContext = wx.createVideoContext("video_0", this) //这里对应的视频id
        videoContext.play()
      this.setData({
        playList,
        indexCurrent: 0
      })
    }else{
      //由切换事件触发的添加视频的动作校验播放视频列表的长度是否大于当前播放列表数量+2 大于则新增两个视频
      if(e + 2  > playList.length){
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

  // swiper切换事件
  changeSwiper(e){
    // console.log('切换',e);
    //创建切换前视频的前后文
    var lastVideoContext = wx.createVideoContext('video_'+this.data.indexCurrent, this) //这里对应的视频id
    lastVideoContext.pause()
    let isTouch = e.detail.source
    let index = e.detail.current
    //如果是用户触摸切换则暂停上一个视频 播放当前视频
    if(isTouch == 'touch'){
      var indexVideoContext = wx.createVideoContext('video_'+index, this) //这里对应的视频id
      indexVideoContext.play()
      this.setData({
        indexCurrent: index
      })
      //预加载视频
      if(this.data.playList.length+1 > index){
        this.addPlayList(index)
      }
      //如果视频列表数量小于等于2则重新获取视频列表
      if(this.data.videoList.length <= 2){
        this.getVideo(true)
      }
    }

  },
  waitting(){
    wx.showLoading({
      title: '加载中',
    })

  },
  update(){
    wx.hideLoading({
      success: (res) => {},
    })
  }
})