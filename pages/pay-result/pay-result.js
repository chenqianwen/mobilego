
Page({
  data: {
    payResult: null,
    orderId: null
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      payResult: options.payResult,
      orderId: options.orderId,
      from: options.from
    });
  },
  viewOrder: function () {
    if (this.data.from == 'my') {
      wx.redirectTo({
        url: '../order/order?from=order&id=' + this.data.id
      });
    } else {
      //返回上一级
      wx.navigateBack({
        delta: 1
      })
    }
  }
}
)