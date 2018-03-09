import { Cart } from './cart-model.js'
var cart = new Cart();

Page({
  data: {
    // 选中商品的数量
    countsSelected: 0,
    cartData: [
      {
        id: 1,
        name: '优乐美',
        price: 9.8,
        mainImgUrls: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'],
        counts: 1,
        isSelected: true
      },
      {
        id: 2,
        name: '香飘飘',
        price: 8.8,
        mainImgUrls: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'],
        counts: 1,
        isSelected: true
      }
    ]
  },
  onLoad: function () {

  },
  onShow: function () {
    let cartData = cart.getCartDataFromLocal()
    let countsSelected = cart.getCartTotalCounts(true)
    this.setData({
      // cartData: cartData,
      countsSelected: countsSelected
    })
  },
  /**
   * 计算选中的商品金额
   * cartData：购物车数据
   */
  calcSelectedTotalPrice(cartData) {
    // cartData
  }
})
