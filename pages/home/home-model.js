import { Base } from '../../utils/base.js';

class Home extends Base {

  constructor() {
    super()
  }
  /**
   * 获取横幅轮播图
   */
  getBanner(callback) {
    var params = {
      url: '/product/wx/banner',
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
      url: '/product/wx/theme',
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(params)
  }
  /**
   * 通过主题ID获取商品信息
   * 如果返回值不为null,表示有新的数据
   * 如果返回值为null，表示没有新的数据，页面不需要改变
   * 如果返回值为空数组，表示该分类下面没有商品
   */
  getProductByThemeId(id, callback) {
    var params = {
      url: '/theme/' + id + '/product',
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(params)
  }
}

export { Home };
