import { Home } from 'home-model.js';
var home = new Home();


//获取应用实例
const app = getApp()

Page({
  data: {
    // 横幅图数据
    bannerData: [
      {
        productId: '1',
        productName: '优乐美0',
        productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        productId: '2',
        productName: '优乐美0',
        productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
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
        themeId: 1,
        themeName: '热门畅销',
        productData: [
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
        themeId: 2,
        themeName: '每日推荐',
        productData: [{
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
      }
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
    // 获得bannar信息
    home.getBanner((data) => {
      this.setData({
        bannerData: data
      })
    })
    // 获取主题商品信息
    home.getTheme((data) => {
      this._renderTab(data.length)
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
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  onClick: function (e) {
    console.log(`ComponentId:${e.detail.componentId},you selected:${e.detail.key}`);
    const idx = e.detail.key;
    this.setData({
      activeKey: idx
    });
  }

})
