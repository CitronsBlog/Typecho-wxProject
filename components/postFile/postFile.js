// components/postFile/postFile.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type: Array,
      value: ''
    }
  },
  options: {
    styleIsolation: 'apply-shared'
  },

  /**
   * 组件的初始数据
   */
  data: {
    colorList: ['blue','orange','green','red']
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  created(){
    console.log(this.list);
  }
})
