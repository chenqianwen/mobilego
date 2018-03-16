//logs.js
const util = require('../../utils/util.js')
import { Category } from 'category-model.js'
var category = new Category()

Page({
  data: {
    // 选中的分类的序号
    categorySelectedIndex: 0,
    // 分类数据
    categoryData: [
      {
        id: 1,
        index: 0,
        name: '小食'
      },
      {
        id: 2,
        index: 1,
        name: '饮品'
      },
      {
        id: 3,
        index: 2,
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
      title: '小食',
      topImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      procucts: [
        {
          id: 1,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '鸡翅'
        },
        {
          id: 2,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '鸡胸'
        },
        {
          id: 3,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '鸡皮'
        },
        {
          id: 4,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '鸡嘴'
        },
        {
          id: 5,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '鸡根'
        },
        {
          id: 6,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '鸡毛'
        },
        {
          id: 7,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '鸡腿'
        },
        {
          id: 8,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '鸡里脊'
        },
        {
          id: 9,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '鸡蛋'
        },
        {
          id: 10,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '鸡骨肉'
        },
        {
          id: 11,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '鸡脆骨'
        },
        {
          id: 12,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '鸡软肋'
        },
        {
          id: 13,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '鸡脚'
        },
        {
          id: 14,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '翅尖'
        },
        {
          id: 15,
          productImgUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '鸡肚子'
        }
      ]
    }

  },
  onLoad: function () {
    this.loadData()
  },
  /**
   * 加载数据
   */
  loadData: function () {
    category.getCategory((data) => {
      this.setData({
        categoryData: data
      });
      category.getProductsByCategory(data[0].id, (data) => {
        this.setData({
          categoryProductsData: data
        })
      })
    })
  },
  /**
   * 切换类别
   */
  switchCategory: function (e) {
    let id = category.getDataSet(e, 'id')
    let index = category.getDataSet(e, 'index')
    this.setData({
      categorySelectedIndex: index
    })
    category.getProductsByCategory(id, (data) => {
      console.log(data)
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
