import { Base } from '../../utils/base.js';

class Product extends Base {

  constructor() {
    super()
  }
  /**
   * 获取商品详情
   */
  getProductDetail(id, callback) {
    var params = {
      url: '/product/wx/' + id + '/detail/',
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(params)
  }
}

export { Product };
