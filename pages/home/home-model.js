import {Base} from '../../utils/base.js';

class Home extends Base{

  constructor(){
    super()
  }
  /**
   * 获取横幅轮播图
   */
  getBanner (callback) {
    var params = {
      url: '/product/banner',
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(params)
  }
  /**
   * 获取主题商品信息
   */
  getTheme(callback) {
    var params = {
      url: '/product/theme',
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(params)
  }
}

export {Home};
