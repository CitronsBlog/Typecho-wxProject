import {Http} from './Http'

class Search {
 static searchByWord(word){
  return Http.request({
    url:'/contents/searchPost',
    method:'get',
    data:{
      word: word
    }
  })
}

}

export {
  Search
}