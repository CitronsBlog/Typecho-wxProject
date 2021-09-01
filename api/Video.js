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

static getVideoStatus(){
  return Http.request({
    url:'/temp/getVideoPower',
    method:'get'
  })
}
}

export {
  Video
}