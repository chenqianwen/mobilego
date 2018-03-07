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
      url: '/banner',
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(params)
  }
  /**
   * 获取热门商品信息
   */
  getHotProducts(callback) {
    var params = {
      url: '/products/hot',
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(params)
  }
}

export {Home};
