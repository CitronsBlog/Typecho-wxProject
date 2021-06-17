import {Http} from './Http'

class Tool {
 static getFileList(id){
    return Http.request({
      url:'/tool/getFileList',
      method:'get',
      data:{
        uid: id
      }
    })
 }
 static getMarkdown(id){
  return Http.request({
    url:'/tool/getDetail',
    method:'get',
    data:{
      id: id
    }
  })
}
static deleteMarkdown(id){
  return Http.request({
    url:'/tool/deleteMarkdown',
    method:'get',
    data:{
      id: id
    }
  })
}
}

export {
  Tool
}