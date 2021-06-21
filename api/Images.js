import {Http} from './Http'

class Images {
 static getImagesList(){
    return Http.request({
      url:'/contents/getImageList',
      method:'get',
      data:{}
    })
 }
}

export {
  Images
}