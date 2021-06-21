// pages/images/index.js
const app = getApp()
const $api = app.globalData.api
const $storage = app.globalData.storage
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:[],
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    interval: 3500,
    duration: 1000,
    current:0,
    isView: false,
    viewListImage:[]
  },

  /**
   * 
   * 接收外部样式
   * 
   */
  options: {
    styleIsolation: 'apply-shared'
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
    this.getImagesList()
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
  //获取图片列表
  getImagesList(){
    const that = this
   $api.Images.getImagesList().then(res => {
    let data = []
    res.forEach(item => {
      data = []
      let rex = /\[1]\:[\s\S]*/gmi
      // item.text = rex.exec(item.text)
      let link = ''
      link = rex.exec(item.text)
      let links = link[0].split('\r')
      console.log(links);
      links.forEach(items => {
        let datas = items.split("]: ")
        data.push(datas[1])
      })
      item.text = data
    })
    // console.log(data);
    that.setData({
      imageList:res
    });
    console.log(res);
   }).catch(err => {
     console.log(err);
     wx.showToast({
       title: '请求失败',
       icon: 'error'
     })
   })
  },

  //查找预览图片列表
  viewImage(e){
    console.log(e.currentTarget.dataset.content);
    let content = e.currentTarget.dataset.content
    let id = e.currentTarget.dataset.id
    this.data.imageList.forEach(item => {
      item.text.forEach(ele => {
        if(ele.indexOf(content) != -1){
          this.setData({
            viewListImage: item.text,
            current: id,
            isView: true
          })
        }
      })
    })

  },

  //关闭预览
  closeView(){
    this.setData({
      viewListImage: [],
            current: 0,
            isView: false
    })
  }
})