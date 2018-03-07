import {Config} from 'config.js'

class Base {
  constructor () {
    this.baseRestUrl = Config.restUrl;
  }

  /**
   * 请求封装
   */
  request(params) {
    var that = this
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
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        params.sCallback && params.sCallback(res.data);
      },
      fail: function (err) {

      }
    })
  }
  /**
   * 点击事件中获取key对应的值
   */
  getDataSet (event,key) {
    return event.currentTarget.dataset[key];
  }
}

export {Base};