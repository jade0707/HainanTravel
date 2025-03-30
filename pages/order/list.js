const app = getApp()

Page({
  data: {
    currentStatus: 'all',
    orders: []
  },

  onLoad: function() {
    this.loadOrders()
  },

  onShow: function() {
    this.loadOrders()
  },

  // 切换订单状态
  switchStatus: function(e) {
    const status = e.currentTarget.dataset.status
    this.setData({ currentStatus: status })
    this.loadOrders()
  },

  // 加载订单列表
  loadOrders: function() {
    // TODO: 从服务器获取数据
    const mockOrders = [
      {
        id: 1,
        orderNo: 'HN202305200001',
        status: 'unpaid',
        statusText: '待付款',
        destinationName: '三亚亚龙湾',
        imageUrl: '/assets/images/yalong-bay-1.jpg',
        travelDate: '2023-06-01',
        adultCount: 2,
        childCount: 1,
        totalPrice: 597,
        hasReview: false
      },
      {
        id: 2,
        orderNo: 'HN202305190001',
        status: 'unconfirmed',
        statusText: '待确认',
        destinationName: '蜈支洲岛',
        imageUrl: '/assets/images/wuzhizhou-1.jpg',
        travelDate: '2023-06-05',
        adultCount: 2,
        childCount: 0,
        totalPrice: 336,
        hasReview: false
      }
    ]

    let filteredOrders = mockOrders
    if (this.data.currentStatus !== 'all') {
      filteredOrders = mockOrders.filter(order => order.status === this.data.currentStatus)
    }

    this.setData({ orders: filteredOrders })
  },

  // 查看订单详情
  onOrderDetail: function(e) {
    const orderId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/order/detail?id=${orderId}`
    })
  },

  // 取消订单
  onCancelOrder: function(e) {
    const orderId = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要取消该订单吗？',
      success: (res) => {
        if (res.confirm) {
          // TODO: 调用取消订单接口
          wx.showToast({
            title: '订单已取消',
            icon: 'success'
          })
          this.loadOrders()
        }
      }
    })
  },

  // 支付订单
  onPayOrder: function(e) {
    const orderId = e.currentTarget.dataset.id
    const order = this.data.orders.find(item => item.id === orderId)
    
    // TODO: 调用微信支付接口
    wx.showLoading({
      title: '正在支付'
    })

    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '支付成功',
        icon: 'success'
      })
      this.loadOrders()
    }, 1500)
  },

  // 确认订单
  onConfirmOrder: function(e) {
    const orderId = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确认已完成出行？',
      success: (res) => {
        if (res.confirm) {
          // TODO: 调用确认订单接口
          wx.showToast({
            title: '确认成功',
            icon: 'success'
          })
          this.loadOrders()
        }
      }
    })
  },

  // 写评价
  onWriteReview: function(e) {
    const orderId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/order/review?id=${orderId}`
    })
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    this.loadOrders()
    wx.stopPullDownRefresh()
  }
})