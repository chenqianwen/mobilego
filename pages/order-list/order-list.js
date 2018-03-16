//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    orderTitleList: [
      { 'name': '全部' },
      { 'name': '待付款' },
      { 'name': '待评价' },
      { 'name': '已完成' }
    ],
    // tabs: ["选项一", "选项二", "选项三"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function () {
    this._renderTab(this.data.orderTitleList.length);
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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
})
