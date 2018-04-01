import { Cart } from '../cart/cart-model.js';
import { Order } from '../order/order-model.js'
var cart = new Cart();
var order = new Order();

Page({
  data: {
    products: [],
    totalPrice: 0,
    // 订单id
    orderId: null,
    // 订单状态
    orderStatus: 0,
    // 订单基本信息
    orderBaseInfo: null
  },
  /**
   * 页面初始化从购物车获取选中的数据
   */
  onLoad: function (options) {
    let from = options.from
    if (from == 'cart') {
      this._orderFromCart(options);
    } else {
      let orderId = options.orderId
      this.__orderFromServer(orderId);
    }
  },
  /**
   * 从购物车获取订单数据
   */
  _orderFromCart: function (options) {
    let totalPrice = options.totalPrice;
    let dataFrom = options.dataFrom;
    let productsSelected = cart.getCartDataFromLocal(true);
    this.setData({
      products: productsSelected,
      totalPrice: totalPrice
    })
  },
  /**
   * 从服务器获取订单数据
   */
  _orderFromServer: function (orderId) {
    if (orderId) {
      order.getOrderDataFromServer(orderId, (data) => {
        console.log(data)
        this.setData({
          // products: data.products,// 获取真实商品数据
          orderId: data.id,
          orderStatus: data.orderStatus,
          orderBaseInfo: {
            createdDate: data.createdDate,
            orderId: data.id
          }
        });
      })
    }
  },
  /**
   * 显示页面时
   * 如果该订单已经生成，则从服务器获取订单信息
   */
  onShow: function () {
    this._orderFromServer(this.data.orderId);
  },
  /**
   * 支付
   */
  pay: function () {
    if (this.data.orderStatus == 0) {
      this._firstTimePay();
    } else {
      this._oneMoresTimePay();
    }
  },
  /**
   * 第一次支付
   */
  _firstTimePay: function () {
    let orderInfo = [],
      procuctInfo = this.data.products;
    for (let i = 0; i < procuctInfo.length; i++) {
      orderInfo.push({
        productId: procuctInfo[i].id,
        counts: procuctInfo[i].counts
      });
    }

    let that = this;
    //支付分两步，第一步是生成，然后根据订单号支付
    order.doOrder(orderInfo, (data) => {
      console.log(data)
      //订单生成成功
      if (data.isCanPay == 0) {
        //更新订单状态
        let orderId = data.id;
        // that.data.orderNumber = orderNumber;
        // that.data.fromCartFlag = false;
        that.setData({
          orderId: orderId
        })
        //开始支付
        that._doPay(orderId);
      } else {
        that._orderFail(data);  // 下单失败
      }
    });
  },
  /**
   * 再次支付
   */
  _oneMoresTimePay: function () {
    this._doPay(this.data.orderId);
  },
  /*
  * 开始支付
  * params:
  * id - {int}订单id
  */
  _doPay: function (orderId) {
    let payResult = false;
    var that = this;
    if (!order.enablePay) {
      wx.showModal({
        title: '支付提示',
        content: '本产品仅用于演示，支付系统已屏蔽',
        showCancel: true,
        cancelText: '取消支付',
        confirmText: '确认支付',
        success: function (res) {
          if (res.confirm) {
            order.doPay(orderId);
            wx.navigateTo({
              url: '../pay-result/pay-result?orderId=' + orderId + '&payResult=true' + '&from=order'
            });
          } else if (res.cancel) {
            wx.navigateTo({
              url: '../pay-result/pay-result?orderId=' + orderId + '&payResult=false' + '&from=order'
            });
          }
        }
      });
      // this.deleteProducts(); //将已经下单的商品从购物车删除
      return;
    }

    order.doPay(id, (statusCode) => {
      if (statusCode != 0) {
        //将已经下单的商品从购物车删除.
        that.deleteProducts();

        var flag = statusCode == 2;
        wx.navigateTo({
          url: '../pay-result/pay-result?id=' + id + '&flag=' + flag + '&from=order'
        });
      }
    });
  },
  _orderFail: function () {
    wx.showModal({
      title: '下单失败',
      showCancel: false,
      success: function (res) {

      }
    });
  },
  /**
   * 将已经下单的商品从购物车删除
   */
  deleteProducts: function () {
    var ids = [], arr = this.data.productsArr;
    for (let i = 0; i < arr.length; i++) {
      ids.push(arr[i].id);
    }
    cart.delete(ids);
  },
})
