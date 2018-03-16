import { Base } from '../../utils/base.js'

class Cart extends Base {

  constructor() {
    super();
    this.storageCartKey = 'cart';
  }
  /**
   * 保存/更新缓存数据
   */
  saveStorageSync(cartData) {
    wx.setStorageSync(this.storageCartKey, cartData);
  }
  /**
   * 加入购物车：
   * 该商品不存在：增添一条数据，数量为填写的counts
   * 该商品存在：该商品的数量+counts
   */
  add(product, counts) {
    let cartData = this.getCartDataFromLocal()
    let thatOneInfo = this.isHasThatOne(product.id, cartData)
    // 如果不存在：：
    if (thatOneInfo.index == -1) {
      product.counts = counts;
      // 商品状态设置为true
      product.isSelected = true
      cartData.push(product)
    } else {
      cartData[thatOneInfo.index].counts += counts;
    }
    console.log(cartData)
    wx.setStorageSync(this.storageCartKey, cartData)
  }
  /**
   * 从缓存中获取购物车数据
   * flag:
   *  true: 获取选择的商品数据
   *  false: 获取所有的商品数据
   */
  getCartDataFromLocal(flag) {
    let res = wx.getStorageSync(this.storageCartKey);
    if (!res) {
      res = [];
    }
    if (flag) {
      let resSelected = []
      for (let i = 0; i < res.length; i++) {
          if(res[i].isSelected){
            resSelected.push(res[i]);
          }
      }
      res = resSelected
    }
    return res;
  }
  /**
   * 获取购物车商品总数量和商品类别属性数量
   * {
   *  counts: 0,
   *  countsType: 0
   * }
   * flag: 
   *  true获取选中的商品数量
   *  flase获取全部的商品数量
   */
  getCartTotalCounts(flag) {
    let cartData = this.getCartDataFromLocal();
    let counts = 0;
    let countsType = 0;
    for (let i = 0; i < cartData.length; i++) {
      if (flag) {
        if (cartData[i].isSelected) {
          counts += cartData[i].counts;
          countsType++;
        }
      } else {
        counts += cartData[i].counts;
        countsType++;
      }
    }
    return {
      counts: counts,
      countsType: countsType
    };
  }
  /**
   * 购物车数据中是否存在该商品，并返回商品数据和商品在购物车中的序号
   * 返回数据：
   * {
      index: -1,// 该商品在购物车中的序号
      data: null// 该商品的数据
    },
   */
  isHasThatOne(id, cartData) {
    let item = null;
    let result = {
      index: -1,
      data: null
    };
    for (let i = 0; i < cartData.length; i++) {
      let item = cartData[i]
      if (id == item.id) {
        result.index = i;
        result.data = item;
        return result;
      }
    }
    return result;
  }
}

export { Cart };