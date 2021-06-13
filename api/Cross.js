import {Http} from './Http'

class Cross {
 static getCrossList(id){
    return Http.request({
      url:'/contents/getCrossList',
      method:'get',
      data:{
        cid: id
      }
    })
 }
}

export {
  Cross
}