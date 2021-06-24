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
    lastPlayList: [], //播放历史列表
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
    indexCurrent: null, //当前播放视频
    pageNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideo()
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
    if (next) {
      $api.Video.getVideoList(this.data.pageNum).then(res => {
        let data = this.data.videoList
        if(res.data.length > 0){
          let list = data.concat(res.data)
          that.setData({
            videoList: list
          });
          
        }
      }).catch(err => {
        console.log(err);
        wx.showToast({
          title: '请求失败',
          icon: 'error'
        })
      })
    } else {
      $api.Video.getVideoList(this.data.pageNum).then(res => {
        that.setData({
          videoList: res.data
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
    this.setData({
      allHight
    })
  },

  //下滑事件向播放列表中添加一个视频 
  addPlayList(e) {
    let videoList = this.data.videoList
    let playList = this.data.playList
    //第一次进入的时候 播放列表会有三个在队列 那么 播放的视频是第一个  

    let lastPlayList = this.data.lastPlayList
    // 如果e是undefined则是首次加载
    if (e === undefined) {
      playList.push(videoList[0])
      playList.push(videoList[1])
      playList.push(videoList[2])
      videoList.splice(0, 3)
      // lastPlayList = playList
      playList.forEach(item => {
        lastPlayList.push(item)
      })

      // let index = 0
      // if(this.data.indexCurrent != null){
      //   let index = 2
      // }
      this.setData({
        playList,
        lastPlayList,
        indexCurrent: 0
      })
      //默认播放第一个视频
      var videoContext = wx.createVideoContext("video_" + this.data.lastPlayList[0].id, this) //这里对应的视频id
      videoContext.play()
    } else {
      // console.log(playList.indexOf(lastPlayList[e]));
      /**
       * 切换到第二个的时候 也就是位于中间的时候 不会做任何处理 
       * 
       * 当切换到了播放列表的最后一个 下标为2 的时候 在 playList列表中查询 当前播放视频所在的位置 
       * 
       * 如果位于组后一个 则从videoList数组中拿出两个合并到palylist 然后 删除lastPlayList的第1个元素 并将playList[n+1]（也就是下一个视频）push到lastplaylist中，并将播放视频下表设置为2 
       * 
       * 如果 videolist的长度小于2的时候 执行getViode方法获取更多的视频并合并到videoList 然后再执行上述操作
       * 
       * 如果切换后下标为0 先查询当前元素是否位于playList的第一个 如果是 则直降当前播放视频设置为0 否则将lastList[2]删掉 并将 playList[n-1]unshift进lastList 并将播放视频下表设置为2 
       * 
       * 
       */
      // console.log(e);
      // this.setData({

      // })
      let index = this.data.playList.indexOf(this.data.lastPlayList[e])
      if (e == 1) {
        console.log('我没有执行什么');
        let indexVideoContext = wx.createVideoContext('video_' + this.data.lastPlayList[1].id, this) //这里对应的视频id
        indexVideoContext.play()
        let lastVideoContext = wx.createVideoContext('video_' + this.data.lastPlayList[0].id, this) //这里对应的视频id
        lastVideoContext.pause()
        let lastVideoContext2 = wx.createVideoContext('video_' + this.data.lastPlayList[2].id, this) //这里对应的视频id
        lastVideoContext2.pause()
        return
      } else if (e == 2) {

        if (index + 1 >= this.data.playList.length) {
          if(this.data.videoList.length <= 0){
            this.setData({
              indexCurrent:2,
            })
            let indexVideoContext = wx.createVideoContext('video_' + this.data.lastPlayList[2].id, this) //这里对应的视频id
          indexVideoContext.play()
          let lastVideoContext = wx.createVideoContext('video_' + this.data.lastPlayList[0].id, this) //这里对应的视频id
          lastVideoContext.pause()
          let lastVideoContext2 = wx.createVideoContext('video_' + this.data.lastPlayList[1].id, this) //这里对应的视频id
          lastVideoContext2.pause()
            wx.showToast({
              title: '暂无更多视频',
              icon: 'error'
            })
          }else{
            this.data.playList.push(this.data.videoList[0])
          // this.data.playList.push(this.data.videoList[1])
          //  this.setData({
          //   playList
          //  })
          this.data.videoList.splice(0, 1)
          this.data.lastPlayList.splice(0, 1)
          this.data.lastPlayList.push(this.data.playList[index + 1])

          this.setData({
            playList,
            videoList,
            lastPlayList,
            indexCurrent: 1
          })
          let indexVideoContext = wx.createVideoContext('video_' + this.data.lastPlayList[1].id, this) //这里对应的视频id
          indexVideoContext.play()
          let lastVideoContext = wx.createVideoContext('video_' + this.data.lastPlayList[0].id, this) //这里对应的视频id
          lastVideoContext.pause()
          let lastVideoContext2 = wx.createVideoContext('video_' + this.data.lastPlayList[2].id, this) //这里对应的视频id
          lastVideoContext2.pause()
          }
        } else {
          console.log('下滑');
          this.data.lastPlayList.shift()
          this.data.lastPlayList.push(this.data.playList[index + 1])
          this.setData({
            lastPlayList,
            indexCurrent: 1
          })
          let indexVideoContext = wx.createVideoContext('video_' + this.data.lastPlayList[1].id, this) //这里对应的视频id
          indexVideoContext.play()
          let lastVideoContext = wx.createVideoContext('video_' + this.data.lastPlayList[0].id, this) //这里对应的视频id
          lastVideoContext.pause()
          let lastVideoContext2 = wx.createVideoContext('video_' + this.data.lastPlayList[2].id, this) //这里对应的视频id
          lastVideoContext2.pause()
          //  let indexVideoContext = wx.createVideoContext('video_1', this) //这里对应的视频id
          // indexVideoContext.play()
        }
      } else if (e == 0) {
        // let last = 
        if (index == 0) {
          console.log('我没有执行什么');
          this.setData({
            indexCurrent: 0
          })
          let indexVideoContext = wx.createVideoContext('video_' + this.data.lastPlayList[0].id, this) //这里对应的视频id
          indexVideoContext.play()
          let lastVideoContext = wx.createVideoContext('video_' + this.data.lastPlayList[1].id, this) //这里对应的视频id
          lastVideoContext.pause()
          let lastVideoContext2 = wx.createVideoContext('video_' + this.data.lastPlayList[2].id, this) //这里对应的视频id
          lastVideoContext2.pause()
          return
        } else {
          console.log('上滑');
          this.data.lastPlayList.pop()
          this.data.lastPlayList.unshift(this.data.playList[index - 1])
          this.setData({
            lastPlayList,
            indexCurrent: 1
          })
          let indexVideoContext = wx.createVideoContext('video_' + this.data.lastPlayList[1].id, this) //这里对应的视频id
          indexVideoContext.play()
          let lastVideoContext = wx.createVideoContext('video_' + this.data.lastPlayList[0].id, this) //这里对应的视频id
          lastVideoContext.pause()
          let lastVideoContext2 = wx.createVideoContext('video_' + this.data.lastPlayList[2].id, this) //这里对应的视频id
          lastVideoContext2.pause()
        }
      }
    }

  },

  // swiper切换事件
  changeSwiper(e) {
    //如果视频列表数量小于等于2则重新获取视频列表
    if (this.data.videoList.length <= 2) {
      this.getVideo(true)
    }
    // console.log('切换',e);
    let isTouch = e.detail.source
    let index = e.detail.current
    //如果是用户触摸切换则暂停上一个视频 播放当前视频
    if (isTouch == 'touch') {
      //创建切换前视频的前后文
      this.setData({
        indexCurrent: index
      })
      //预加载视频
      // if(this.data.playList.length+1 > index){
      this.addPlayList(index)
      // }

    }

  },
  waitting(e) {
    // console.log(e);
    // wx.showLoading({
    //   title: '加载中',
    // })

  },
  update() {
    // wx.hideLoading({
    //   success: (res) => {},
    // })
  },
  videoError(e) {
    this.setData({
      videoList: [],
      playList: []
    })
    this.getVideo()
    wx.showToast({
      title: '重新加载',
      icon: 'success'
    })
  }
})