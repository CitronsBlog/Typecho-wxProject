import {Http} from './Http'

class Video {
 static getVideoList(pageNum){
  return Http.request({
    url:'/video/getAllVideo',
    method:'get',
    data:{
      pageNum
    }
  })
}

}

export {
  Video
}