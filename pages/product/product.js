import { Product } from 'product-model.js';
import { Cart } from '../cart/cart-model.js';
var product = new Product();
var cart = new Cart();

Page({
  data: {
    // 横幅图数据
    productData: {
      id: '1',
      name: '优乐美',
      price: 0.9,
      mainImgUrls: [
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      ],
      detailImgUrl: []
    },
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
    cartTotalCounts: 0,
  },
  onLoad: function (options) {
    this.data.id = options.id
    this.data.titleName = options.name
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
    // 获取商品详情信息，显示购物车商品总数量
    product.getProductDetail(this.data.id, (data) => {
      this.setData({
        productData: data,
        cartTotalCounts: cart.getCartTotalCounts(false)
      })
    })
  },
  /**
   * 添加到购物车
   */
  addToCart: function () {
    let tempObj = {};
    let keys = ['id', 'name', 'mainImgUrls', 'price'];
    for (let key in this.data.productData) {
      if (keys.indexOf(key) >= 0) {
        tempObj[key] = this.data.productData[key];
      }
    }
    cart.add(tempObj, 1);
    let totalCounts = this.data.cartTotalCounts + 1;
    this.setData({
      cartTotalCounts: totalCounts
    });
  }
})
