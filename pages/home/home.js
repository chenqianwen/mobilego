import { Home } from 'home-model.js';
var home = new Home();


//获取应用实例
const app = getApp()

Page({
  data: {
    // 横幅图数据
    bannerData: [
      {
        id: '1',
        name: '优乐美0',
        majorImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        id: '2',
        name: '优乐美0',
        majorImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      }
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
      { title: '每日推荐', content: '内容一' },
      { title: '热门畅销', content: '内容二' },
      { title: '今日折扣', content: '内容三' }
    ],
    // tabs: ["选项一", "选项二", "选项三"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    // 主题商品数据
    themeData: [
      {
        themeName: '每日推荐', themeId: '1', productList:
        [
          {
            productId: 1,
            productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            productPrice: 2.2
          },
          {
            productId: 2,
            productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
            productPrice: 1.9
          },
          {
            productId: 1,
            productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            productPrice: 2.2
          },
          {
            productId: 2,
            productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
            productPrice: 1.9
          }
        ]
      },
      {
        themeName: '热门畅销', themeId: '2', productList: [{
          productId: 1,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          productPrice: 2.2
        },
        {
          productId: 2,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
          productPrice: 1.9
        }
        ]
      },
      { themeName: '今日折扣', themeId: '3' },
    ]
  },
  /**
   * 监听页面加载
   */
  onLoad: function () {
    this._loadData()
  },
  /**
   * 加载数据
   */
  _loadData: function () {
    // 获得bannar信息
    home.getBanner((data) => {
      this.setData({
        bannerData: data
      })
    })
    // 获取主题商品信息
    home.getTheme((data) => {
      this.setData({
        themeData: data
      })
    })
  },
  /**
   * 渲染tab栏样式
   */
  _renderTab(length) {
    var that = this;
    var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / length * that.data.activeIndex
        });
      }
    });
  },
  /**
   * 点击商品
   */
  onProductTap: function (event) {
    let id = home.getDataSet(event, 'id')
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
  /**
   * 点击主题分类
   */
  tabClick: function (event) {
    let id = home.getDataSet(event, 'id')
    let index = home.getDataSet(event, 'index')
    this.setData({
      sliderOffset: event.currentTarget.offsetLeft,
      activeIndex: index
    });
  },
  /**
   * 
   */
  getProduct: function (id, index) {
    home.getProductByThemeId(id, index, (data) => {
      this.data.productData.length

    })
  }

})
