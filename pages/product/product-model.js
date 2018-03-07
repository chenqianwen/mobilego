import { Base } from '../../utils/base.js';

class Product extends Base {

  constructor() {
    super()
  }
  /**
   * 获取商品详情
   */
  getProductDetails(callback) {
    var params = {
      url: '/product/detail',
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(params)
  }
}

export { Product };
