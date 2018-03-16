import { Product } from 'product-model.js';
import { Cart } from '../cart/cart-model.js';
var product = new Product();
var cart = new Cart();

Page({
  data: {
    loadingHidden: false,
    // 商品数据
    productData: {
      id: '1',
      name: '优乐美',
      description: '优乐美 香醇奶茶，红豆味儿，2018新款上市。冲水即可，方便美味。',
      price: 0.9,
      mainImgUrls: [
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      ],
      detailImgUrl: [
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      ]
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
    console.log(options)
    this.data.id = options.id
    this.data.titleName = options.name
    this._loadData()
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
  _loadData: function (callback) {
    // 获取商品详情信息，显示购物车商品总数量
    product.getProductDetail(this.data.id, (data) => {
      this.setData({
        productData: data,
        cartTotalCounts: cart.getCartTotalCounts(false).counts,
        loadingHidden: true
      })
      callback && callback();
    })
  },
  /**
   * 点击主图
   */
  onImageTap: function (event) {
    wx.previewImage({
      // 需要预览的图片http链接列表
      urls: this.data.productData.mainImgUrls
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
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    })
  },
  /**
   * 查看购物车
   */
  onCartTap: function (event) {
    console.log(1);
    wx.navigateTo({
      url: '/pages/cart/cart-product'
    })
  },
  /*下拉刷新页面*/
  onPullDownRefresh: function () {
    //在标题栏中显示加载
    wx.showNavigationBarLoading() 
    this._loadData(() => {
       //完成停止加载
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    });
  },
})
