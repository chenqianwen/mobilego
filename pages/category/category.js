//logs.js
const util = require('../../utils/util.js')
import { Category } from 'category-model.js'
var category = new Category()

Page({
  data: {
    // 选中的分类的ID
    categorySelectedId: 0,
    // 分类数据
    categoryData: [
      {
        id: 1,
        name: '小食'
      },
      {
        id: 2,
        name: '饮品'
      },
      {
        id: 3,
        name: '点心'
      },
      {
        id: 4,
        name: '干货'
      },
      {
        id: 5,
        name: "坚果"
      },
      {
        id: 6,
        name: "辣条"
      },
      {
        id: 7,
        name: "海鲜炒饭"
      },
      {
        id: 8,
        name: "蛋糕批发"
      },
      {
        id: 9,
        name: "奶茶"
      },
      {
        id: 10,
        name: "咖啡"
      },
      {
        id: 11,
        name: "面包"
      },
      {
        id: 12,
        name: "瓜子"
      },
      {
        id: 13,
        name: "花生"
      },
      {
        id: 14,
        name: "糯米"
      },
      {
        id: 15,
        name: "粑粑"
      },
      {
        id: 16,
        name: "海苔"
      },
      {
        id: 17,
        name: "鱼干"
      },
      {
        id: 18,
        name: "豆腐"
      }
    ],
    // 某个分类的商品数据
    categoryProductsData: {
      categoryName: '小食',
      categoryImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      productList: [
        {
          productId: 1,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          productName: '鸡翅'
        },
        {
          productId: 2,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          productName: '鸡胸'
        },
        {
          productId: 3,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          productName: '鸡皮'
        },
        {
          productId: 4,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          productName: '鸡嘴'
        },
        {
          productId: 5,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          productName: '鸡根'
        },
        {
          productId: 6,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          productName: '鸡毛'
        },
        {
          productId: 7,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          productName: '鸡腿'
        },
        {
          productId: 8,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          productName: '鸡里脊'
        },
        {
          productId: 9,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          productName: '鸡蛋'
        },
        {
          productId: 10,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          productName: '鸡骨肉'
        },
        {
          productId: 11,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          productName: '鸡脆骨'
        },
        {
          productId: 12,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          productName: '鸡软肋'
        },
        {
          productId: 13,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          productName: '鸡脚'
        },
        {
          productId: 14,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          productName: '翅尖'
        },
        {
          productId: 15,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          productName: '鸡肚子'
        }
      ]
    }

  },
  onLoad: function () {
    this._loadData()
  },
  /**
   * 加载数据
   */
  _loadData: function () {
    category.getCategory((data) => {
      this.setData({
        categoryData: data
      });
      let firstCategoryId = data[0].id;
      category.getProductsByCategory(firstCategoryId, (data) => {
        this.setData({
          categoryProductsData: data,
          categorySelectedId: firstCategoryId
        })
      })
    })
  },
  /**
   * 切换类别
   */
  switchCategory: function (e) {
    let id = category.getDataSet(e, 'id')
    this.setData({
      categorySelectedId: id
    })
    category.getProductsByCategory(id, (data) => {
      this.setData({
        categoryProductsData: data
      })
    })
  },
  /**
   * 点击商品
   */
  onProductTap: function (event) {
    let id = category.getDataSet(event, 'id')
    let name = category.getDataSet(event, 'name')
    console.log(event)
    wx.navigateTo({
      url: '../product/product?id=' + id + '&name=' + name
    })
  },

})
