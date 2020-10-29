// components/tabs/tabs.js
// const regeneratorRuntime = require('regenerator-runtime')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //标签数组
    list: [{
        id: "1",
        name: "直播"
      },
      {
        id: "2",
        name: "推荐"
      },
      {
        id: "3",
        name: "热门"
      },
      {
        id: "4",
        name: "追番"
      },
      {
        id: "5",
        name: "影视"
      },
      {
        id: "6",
        name: "抗击肺炎"
      },
      {
        id: "7",
        name: "学习区"
      },
      {
        id: "8",
        name: "新时代"
      },
    ],
    offsetLeft: "", //scroll-left位置
    viewWidth: "", //scroll-view视图宽度
    active: 0, //活动标签
    lineStyle: "", //活动下划线样式
  },


  //获取元素属性方法
  getRect(e) {
    return new Promise(function(resolve, reject) {
      wx.createSelectorQuery().select(e).boundingClientRect(res => {
        resolve(res)
      }).exec()
    })
  },

  //初始化项目
  initItem(e, selector) {
    return new Promise((resolve, reject) => {
      e.forEach((item, index) => {
        this.getRect(selector + index).then(res => {
          item.offsetLeft = res.left
          item.itemWidth = res.width
        })
      })
      resolve(e)
    })
  },
  //选中item
  getItem(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      active: index,
      offsetLeft: this.data.list[index].offsetLeft - this.data.viewWidth / 2 + this.data.list[index].itemWidth / 2,
      lineStyle: `width: ${this.data.list[index].itemWidth}px;
            transform: translateX(${this.data.list[index].offsetLeft}px);`
    })
  },
  //滑动item
  switchTab(e){
    let index = e.detail.current
    this.setData({
      active: index,
      offsetLeft: this.data.list[index].offsetLeft - this.data.viewWidth / 2 + this.data.list[index].itemWidth / 2,
      lineStyle: `width: ${this.data.list[index].itemWidth}px;
            transform: translateX(${this.data.list[index].offsetLeft}px);`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // //获取scroll-view视图宽度
    // this.getRect("#horizontal").then(res => {
    //   this.data.viewWidth = res.width
    // })
    // //修改标签数组信息（加入offsetLeft,width）
    // this.initItem(this.data.list)
    // //获取活动的tab标签
    // this.getRect(".activeCur").then(res => {
    //   //下划线设置宽度和位置
    //   this.setData({
    //     lineStyle: `width: ${res.width}px;
    //         transform: translateX(${res.left}px);`
    //   })
    // })
    //上面的代码中都使用了promise进行回调，但存在问题。使用了Promise.all进行了解决
    Promise.all([this.getRect("#horizontal"), this.initItem(this.data.list, "#item-")])
      .then(([nav, list]) => {
        this.data.viewWidth = nav.width
        this.data.list=list
        this.data.lineStyle = `width: ${list[this.data.active].itemWidth}px;transform: translateX(${list[this.data.active].offsetLeft}px);`
        this.setData({
          offsetLeft: list[this.data.active].offsetLeft - this.data.viewWidth / 2 + list[this.data.active].itemWidth / 2,
          lineStyle:this.data.lineStyle
        })
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})