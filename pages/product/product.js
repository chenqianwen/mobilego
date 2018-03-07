import { Product } from 'product-model.js';
var product = new Product();

Page({
  data: {
    id: null,
    productData:[]
  },
  onLoad: function (options) {
    this.data.id = options.id
    console.log(options)
  },
  /**
   * 加载数据
   */
  loadData: function () {
    product.getProductDetails(this.data.id, (data) => {
      this.setData({
        productData: data
      })
    })
  }
})
