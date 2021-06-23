import {Http} from './Http'

class Content {
 static postComment(data){
    return Http.request({
      url:'/contents/addComment',
      method:'post',
      header:{
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data:{
        ...data
      }
    })
 }
}

export {
  Content
}