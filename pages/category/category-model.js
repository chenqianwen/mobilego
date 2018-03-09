import { Base } from '../../utils/base.js'

class Category extends Base {
  constructor() {
    super();
  }
  /**
   * 获取所有分类
   */
  getCategory(callback) {
    var params = {
      url: '/category',
      sCallback: function (data) {
        callback && callback(data)
      }
    };
    this.request(params);
  }
  /**
   * 获取分类下的商品
   */
  getProductsByCategory(id, callback) {
    var params = {
      url: '/product/category/' + id,
      sCallback: function (data) {
        callback && callback(data)
      }
    };
    this.request(params);
  }
}

export { Category };