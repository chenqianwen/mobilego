import { Config } from 'config.js';
import { Token } from 'token.js';

class Base {
  constructor() {
    this.baseRestUrl = Config.restUrl;
    this.enablePay = Config.enablePay;
  }

  /**
   * 请求封装
   * noRefetch: 
   *  true: 401时不需要重新请求。不做未授权重试机制。
   *  false: 401时重新请求
   */
  request(params, noRefetch) {
    var that = this
    var tokenParamName = Config.tokenParamName
    // 设置请求url
    var url = this.baseRestUrl + params.url;
    // 设置默认的请求方式为GET
    if (!params.type) {
      params.type = 'GET';
    }
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'content-type': 'application/json',
        tokenParamName: wx.getStorageSync(tokenParamName)
      },
      success: function (res) {
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        let httpStatus = res.statusCode.toString();
        let startChar = httpStatus.charAt(0);
        if (startChar == '2') {
          params.sCallback && params.sCallback(res.data);
        } else {
          if (httpStatus == '401') {
            if (!noRefetch) {
              that._refetch(params);
            }
          }
          params.eCallback && params.eCallback(res.data);
        }

      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
  /**
   * 重取
   * 如果失败。不需要再次重取。
   */
  _refetch(params) {
    let token = new Token();
    token.getTokenFromServer((token) => {
      this.request(params,true);
    })
  }
  /**
   * 点击事件中获取key对应的值
   */
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  }
}

export { Base };