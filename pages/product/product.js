import { Product } from 'product-model.js';
var product = new Product();

Page({
  data: {
    // 横幅图数据
    productData: [
      { id: '1', url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg' },
      { id: '2', url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg' }
    ],
    // 轮播图是否显示点
    indicatorDots: true,
    // 轮播图是否自动播放
    autoplay: true,
    // 自动切换时间间隔
    interval: 5000,
    // 滑动动画时长
    duration: 1000,
    id: null,
    titleName: '',
    productData:[]
  },
  onLoad: function (options) {
    this.data.id = options.id
    this.data.titleName = options.name
    console.log(JSON.stringify(options))
    this.loadData()
  },
  /**
   * 页面渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.titleName
    })
  },
  /**
   * 加载数据
   */
  loadData: function () {
    product.getProductDetail(this.data.id, (data) => {
      this.setData({
        productData: data
      })
    })
  }
})
