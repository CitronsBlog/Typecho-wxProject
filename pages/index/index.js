// index.js
// 获取应用实例
const app = getApp()
const $api = app.globalData.api
const $storage = app.globalData.storage
Page({
  data: {
    background: ['https://citrons-1256634104.cos.ap-shanghai.myqcloud.com/wx/banner.png','https://citrons-1256634104.cos.ap-shanghai.myqcloud.com/wx/banner1.png','https://citrons-1256634104.cos.ap-shanghai.myqcloud.com/wx/banner2.png','https://citrons-1256634104.cos.ap-shanghai.myqcloud.com/wx/banner3.png','https://citrons-1256634104.cos.ap-shanghai.myqcloud.com/wx/banner4.png'],
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    interval: 3500,
    duration: 1000,
    pageNum:1,
    pageList:[],
    isLoading: false,
    //文章分类标签
    Category:[]

  },

  onLoad() {
    this.getCategory2()
  },
  onReachBottom: function() {
    this.getAllPage()

  },
onShow(){
  this.getAllPage()
},
getAllPage(){
  const that = this
  $api.Home.getList(this.data.pageNum).then(res => {
    let mid = undefined
    res.data.forEach(item => {
      mid = undefined
     item.mids.forEach(items => {
       that.data.Category.forEach(itemx => {
         if(itemx.mid == items){
           mid = itemx.name 
         }
       })
     })
     item.mids = mid
   })
   let datas = that.data.pageList.concat(res.data)
   let loding = false
   if(res.length == 0){
      loding = true
   }
   let num = that.data.pageNum+1
   that.setData({
     pageList:datas,
     isLoading: loding,
     pageNum:num
   });
  }).catch(err => {
    console.log(err);
    wx.showToast({
      title: '网络错误',
      icon: 'error'
   })
  })
},
getCategory2(){
  const that = this
  $api.Home.getCategory().then(res => {
    console.log(res);
    that.setData({
      Category: res.data
     })
  }).catch(err => {
    console.log(err);
    wx.showToast({
      title: '网络错误',
      icon: 'error'
    })
  })
},
    toDetails(e){
      let cid = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/content/content?cid=${cid}`
      })
    }
})
