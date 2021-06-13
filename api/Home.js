import {Http} from './Http'

class Home {
 static getList(pageNum){
    return Http.request({
      url:'/contents/getAllContentsByPage',
      method:'POST',
      data:{
        pageNum:pageNum
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      }
    })
 }

 static getCategory(){
  return Http.request({
    url:'/contents/getCategory',
    method:'get',
    data:{},
    header:{
      'content-type': 'application/json' // 默认值
    }
  })
 }
}

export {
  Home
}