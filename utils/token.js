import { Config } from 'config.js';

class Token {

  constructor() {
    this.tokenParamName = Config.tokenParamName;
    this.tokenGetUrl = Config.restUrl + 'token/user';
    this.tokenVerifyUrl = Config.restUrl + 'token/verify';
  }
  /**
   * 验证token
   */
  verify() {
    let token = wx.getStorageSync(this.tokenParamName);
    if (!token) {
      this.getTokenFromServer();
    } else {
      this.verifyTokenFromServer();
    }
  }
  /**
   * 获取token
   */
  getTokenFromServer(callBack) {
    let that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: that.tokenGetUrl,
            method: 'POST',
            data: {
              code: res.code
            },
            success: function (res) {
              wx.setStorageSync('token', res.data.token);
              callBack && callBack(res.data.token);
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
  /**
   * 检验token
   */
  veirfyTokenFromServer(token) {
    var that = this;
    wx.request({
      url: that.tokenVerifyUrl,
      method: 'POST',
      data: {
        token: token
      },
      success: function (res) {
        var valid = res.data.isValid;
        if (!valid) {
          that.getTokenFromServer();
        }
      }
    })
  }
}
export { Token };