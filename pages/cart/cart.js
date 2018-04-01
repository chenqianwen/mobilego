import { Cart } from './cart-model.js'
var cart = new Cart();

Page({
  data: {
    // 选中商品的种类数量
    countsTypeSelected: 0,
    // 选中商品的数量
    countsSelected: 0,
    // 选中商品的总价
    totalPrice: 0,
    // 触摸的商品的开始横坐标
    startX: -1,
    // 想要删除的商品ID
    idToDelete: -1,
    cartData: [
      {
        id: 1,
        name: '优乐美',
        price: 9.8,
        majorImgUrl: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        counts: 1,
        isSelected: true
      },
      {
        id: 2,
        name: '香飘飘',
        price: 8.8,
        majorImgUrl: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        counts: 1,
        isSelected: true
      }
    ],
    /**
     * 编辑页面
     */
    isEdit: false
  },
  onLoad: function () {

  },
  onShow: function () {
    let cartData = cart.getCartDataFromLocal()
    let countsData = cart.getCartTotalCounts(true)
    this.setData({
      cartData: cartData,
      countsTypeSelected: countsData.countsType,
      totalPrice: this._calcSelectedTotalPrice(cartData).totalPrice,
      countsSelected: countsData.counts
    })
  },
  /**
   * 离开页面时，更新本地缓存
   */
  onHide: function () {
    cart.saveStorageSync(this.data.cartData);
  },
  /**
  * 切换选中状态
  */
  toggleSelectOne: function (event) {
    let id = cart.getDataSet(event, 'id');
    let isSelected = cart.getDataSet(event, 'selected');
    let productIndex = this._getProductIndexById(id);
    this.data.cartData[productIndex].isSelected = !isSelected;
    this._resetThisCartData();
  },
  /**
   * 修改商品数量
   */
  changeCounts: function (event) {
    let id = cart.getDataSet(event, 'id');
    let type = cart.getDataSet(event, 'type');
    let productIndex = this._getProductIndexById(id);
    let counts = 1;
    if (type == 'add') {
    } else if (type == 'cut') {
      // 如果数量为1则不减少
      if (this.data.cartData[productIndex].counts == 1) {
        return;
      }
      counts = -1;
    }
    //更新商品页面
    this.data.cartData[productIndex].counts += counts;
    this._resetThisCartData();
  },
  /**
   * 失去焦点
   */
  blur: function (event) {
    let id = cart.getDataSet(event, 'id');
    let productIndex = this._getProductIndexById(id);
    let counts = Number(event.detail.value);
    if (counts == 0) {
      counts = 1;
    }
    //更新商品页面
    this.data.cartData[productIndex].counts = counts;
    this._resetThisCartData();
  },
  /**
   * 监听数量输入
   */
  onInput: function (event) {
    let value = event.detail.value + '';
    console.log(value.slice(-1))
    if (value.slice(-1) == '.') {
      return value.slice(0, value.length - 1);
    }
    if (value > 200) {
      return 200;
    }
  },
  /**
   * 切换全选状态
   */
  toggleSelectAll: function (event) {
    let selectedAll = cart.getDataSet(event, 'selected');
    let isSelectedAll = selectedAll == 'true';
    for (let i = 0; i < this.data.cartData.length; i++) {
      this.data.cartData[i].isSelected = !isSelectedAll
    }
    this._resetThisCartData();
  },
  /**
   * 计算选中的商品金额
   * cartData：购物车数据
   */
  _calcSelectedTotalPrice(cartData) {
    let len = cartData.length;
    let totalPrice = 0;
    let countsSelected = 0;
    let countsTypeSelected = 0;
    let multiple = 100;
    for (let i = 0; i < len; i++) {
      //避免 0.05 + 0.01 = 0.060 000 000 000 000 005 的问题，乘以 100 *100
      if (cartData[i].isSelected) {
        let thisTotalPrice = cartData[i].counts * multiple * Number(cartData[i].price) * multiple;
        totalPrice += thisTotalPrice
        countsSelected += cartData[i].counts;
        countsTypeSelected++;
      }
    }
    totalPrice = totalPrice / (multiple * multiple);
    totalPrice = totalPrice.toFixed(2);
    return {
      countsSelected: countsSelected,
      countsTypeSelected: countsTypeSelected,
      totalPrice: totalPrice
    }
  },
  /**
   * 根据商品id得到 商品所在下标
   */
  _getProductIndexById: function (id) {
    let data = this.data.cartData;
    let len = data.length;
    for (let i = 0; i < len; i++) {
      if (data[i].id == id) {
        return i;
      }
    }
    return -1;
  },
  _resetThisCartData: function () {
    var newData = this._calcSelectedTotalPrice(this.data.cartData); /*重新计算总金额和商品总数*/
    console.log(newData)
    this.setData({
      countsSelected: newData.countsSelected,
      countsTypeSelected: newData.countsTypeSelected,
      totalPrice: newData.totalPrice,
      cartData: this.data.cartData
    });
  },
  /**
   * 编辑
   */
  toEdit: function (event) {
    let isEdit = cart.getDataSet(event, 'edit');
    this.setData({
      isEdit: !isEdit
    })
  },
  /**
   * 商品触摸开始
   */
  touchStart: function (event) {
    if (event.touches.length == 1) {
      let startX = event.touches[0].clientX;
      this.setData({
        startX: startX,
      })
    }
  },
  /**
   * 商品触摸结束
   */
  touchEnd: function (event) {
    if (event.changedTouches.length == 1) {
      let endX = event.changedTouches[0].clientX;
      let idToDelete = cart.getDataSet(event, 'id');
      let distance = this.data.startX - endX;
      // 如果移动距离小于-15,并且该商品显示删除，则恢复常态
      if (distance < -15 && idToDelete == this.data.idToDelete) {
        idToDelete = -1;
        this.setData({
          idToDelete: idToDelete
        })
      }
      // 如果移动距离大于15,则显示删除
      if (distance > 15) {
        this.setData({
          idToDelete: idToDelete
        })
      }
      console.log(distance)
    }
  },
  /**
   * 批量删除
   */
  deleteSelected: function () {
    let ids = [];
    let cartDataSelected = cart.getCartDataFromLocal(true);
    for (let i = 0; i < cartDataSelected.length; i++) {
      ids.push(cartDataSelected[i].id); 
    }
    let that = this;
    wx.showModal({
      content: '是否确认删除' + this.data.countsTypeSelected + '种商品？',
      confirmColor: '#FF0000',
      success: function (res) {
        if (res.confirm) {
          that._confirmDelete(ids);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },
  /**
   * 删除单个
   */
  deleteOne: function (event) {
    let id = cart.getDataSet(event, 'id');
    let that = this;
    wx.showModal({
      content: '是否确认删除此商品？',
      confirmColor: '#FF0000',
      success: function (res) {
        if (res.confirm) {
          that._confirmDelete([id]);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },
  /**
   * 确认删除
   */
  _confirmDelete(ids) {

    for (let i = 0; i < ids.length; i++) {
      let id = ids[i];
      let index = this._getProductIndexById(id);
      // 删除某一项商品
      this.data.cartData.splice(index, 1);
      this._resetThisCartData();
      this.setData({
        idToDelete: -1
      })
    }
    // cart.delete(id);  //内存中删除该商品
  },
  /**
   * 提交订单
   */
  submitOrder: function () {
    wx.navigateTo({
      url: '../order/order?totalPrice=' + this.data.totalPrice + '&from=cart'
    });
  },
})
