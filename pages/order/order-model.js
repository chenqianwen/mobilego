import { Base } from '../../utils/base.js';

class Order extends Base {
  constructor() {
    super();
    this.storageOrderKey = 'newOrder';
    this.commonStatus = 0;
    this.waitingStatus = 1;
    this.playedStatus = 2;
  }
  /**
   * 保存／更新缓存
   */
  saveStorageSync(orderData) {
    wx.setStorageSync(this.storageOrderKey, orderData);
  }
  /**
   * 通过id查询订单
   */
  getOrderDataFromServer(id, callback) {
    let params = {
      url: '/order/' + id,
      sCallback: callback
    }
    this.request(params);
  }
  /**
   * 下订单
   */
  doOrder(param, callback) {
    var that = this;
    var allParams = {
      url: '/order',
      type: 'POST',
      data: param ,
      sCallback: function (data) {
        that.saveStorageSync(data);
        callback && callback(data);
      },
      eCallback: function () {
      }
    };
    this.request(allParams);
  }
  /*
   * 拉起微信支付
   * params:
   * orderNumber - {int} 订单id
   * return：
   * callback - {obj} 回调方法 ，返回参数 可能值 
   * 0:商品缺货等原因导致订单不能支付; 
   * 1: 支付失败或者支付取消； 
   * 2:支付成功；
   * */
  doPay(orderNumber, callback) {
    var params = {
      url: '/order/pay/' + orderNumber,
      sCallback: callback
    }
    this.request(params);
    return;
    var allParams = {
      url: 'pay/pre_order',
      type: 'post',
      data: { id: orderNumber },
      sCallback: function (data) {
        var timeStamp = data.timeStamp;
        if (timeStamp) { //可以支付
          wx.requestPayment({
            'timeStamp': timeStamp.toString(),
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': data.signType,
            'paySign': data.paySign,
            success: function () {
              callback && callback(2);
            },
            fail: function () {
              callback && callback(1);
            }
          });
        } else {
          callback && callback(0);
        }
      }
    };
    this.request(allParams);
  }
}

export { Order };