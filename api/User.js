import {Http} from './Http'
class User {
  static login (userInfo) {
   return Http.request('login',{
    userInfo
   })
  }
  static login2 (code) {
   const  appId =  "wxb0770a010492a23c"
   const  appSecret = "e8d61882729562236dd695af554e9598"
   return Http.request2({
     url: '/api/token/user',
     method: 'POST',
     data: {
      appId,
      appSecret,
      code
     }
   })

  }
  //远程api
  // static get2 () {
  //   return Http.request2({
  //     url:'/api/swiper?type=1'
  //   }).then(res => res.map(item => item.img))
  //  }
}
export {
  User
}