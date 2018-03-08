import { Home } from 'home-model.js';
var home = new Home();

//获取应用实例
const app = getApp()

Page({
  data: {
    // 横幅图数据
    bannerData: [
      {id: '1',url:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'},
      {id: '2',url:'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'}
    ],
    // 轮播图是否显示点
    indicatorDots: true,
    // 轮播图是否自动播放
    autoplay: true,
    // 自动切换时间间隔
    interval: 5000,
    // 滑动动画时长
    duration: 1000,
    // 推荐菜单
    tabs: [
      { title: '热门食品', content: '内容一' },
      { title: '每日推荐', content: '内容二' },
      { title: '今日折扣', content: '内容三' }
    ],
    // 热门商品数据
    hotProductsData: [
      { name: '香飘飘', url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',price:'2.2' },
      { name: '优乐美', url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg', price: '1.9' },
    ]
  },
  /**
   * 监听页面加载
   */
  onLoad: function () {
    this.loadData()
  },
  /**
   * 加载数据
   */
  loadData: function () {
    var that = this;
    // 获得bannar信息
    home.getBanner((data) => {
      that.setData({
        bannerData: data
      })
    })
    // 获取热门商品信息
    home.getHotProducts((data) => {
      that.setData({
        hotProductsData: data
      })
    })
  },
  onProductTap: function (event) {
    let id = home.getDataSet(event,'id')
    let name = home.getDataSet(event, 'name')
    wx.navigateTo({
      url: '../product/product?id=' + id + '&name=' + name
    })
  },
  /**
   * 复杂的用callback函数
   * 简单的用箭头函数
   * (res)=>{console.log(res)}
   */
  callback: function (res) {
    console.log(res)
  },
  onClick: function (e) {
    console.log(`ComponentId:${e.detail.componentId},you selected:${e.detail.key}`);
    const idx = e.detail.key;
    this.setData({
      activeKey: idx
    });
  }
  
})
