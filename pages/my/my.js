import { My } from './my-model.js';
var my = new My();

Page({
  data: {
    userInfo: null,
    loadingHidden: true,
    gridData: my.gridData
  },
  onLoad: function () {
    this._loadData();
  },
  /**
   * 加载数据
   */
  _loadData: function () {
    my.getOrderListCount((data) => {
      console.log(data)
    });
    my.getUserInfo((data) => {
      this.setData({
        userInfo: data
      })
    });
  },
  /**
   * 点击订单类别
   */
  onTapGrid: function (options) {
    let orderStatus = my.getDataSet(options,'status');
    console.log(1)
    wx.navigateTo({
      url: '../order-list/order-list?orderStatus=' + orderStatus
    })
  }
})
