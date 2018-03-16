import { Base } from '../../utils/base.js';

class My extends Base {
  constructor() {
    super();
    this.gridData = [
      {
        imgUrl: '../../images/my/order_all.png',
        name: '全部订单',
        status: '0',
        counts: 1
      },
      {
        imgUrl: '../../images/my/order_wait.png',
        status: '1',
        name: '待付款'
      },
      {
        imgUrl: '../../images/my/order_comment.png',
        status: '3',
        name: '待评价'
      },
      {
        imgUrl: '../../images/my/order_finish.png',
        status: '2',
        name: '已完成'
      }
    ];
  }

  /**
   * 获取用户信息
   */
  getUserInfo(callback) {
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo;
        callback(userInfo);
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
    })
  }

  /**
   * 获取每个订单分类的数量
   */
  getOrderListCount(callback) {
    let params = {
      url: '/order/list/count',
      sCallback: callback
    }
    this.request(params);
  }
}
export { My };