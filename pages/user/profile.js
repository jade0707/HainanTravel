const app = getApp()

Page({
  data: {
    isLoggedIn: false,
    userInfo: null,
    stats: {
      orderCount: 0,
      collectionCount: 0,
      couponCount: 0
    }
  },

  onShow: function() {
    this.setData({
      isLoggedIn: app.globalData.isLoggedIn,
      userInfo: app.globalData.userInfo
    })
    if (this.data.isLoggedIn) {
      this.loadUserStats()
    }
  },

  // 加载用户统计数据
  loadUserStats: function() {
    // TODO: 从服务器获取数据
    this.setData({
      stats: {
        orderCount: 5,
        collectionCount: 8,
        couponCount: 3
      }
    })
  },

  // 登录
  onLogin: function() {
    app.login().then(() => {
      app.getUserInfo().then(() => {
        this.setData({
          isLoggedIn: true,
          userInfo: app.globalData.userInfo
        })
        this.loadUserStats()
      })
    }).catch(err => {
      console.error('登录失败：', err)
      wx.showToast({
        title: '登录失败，请重试',
        icon: 'none'
      })
    })
  },

  // 退出登录
  onLogout: function() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          app.logout()
          this.setData({
            isLoggedIn: false,
            userInfo: null,
            stats: {
              orderCount: 0,
              collectionCount: 0,
              couponCount: 0
            }
          })
        }
      }
    })
  },

  // 页面跳转函数
  onNavigateToOrders: function() {
    this.checkLoginAndNavigate('/pages/order/list')
  },

  onNavigateToCollections: function() {
    this.checkLoginAndNavigate('/pages/user/collections')
  },

  onNavigateToCoupons: function() {
    this.checkLoginAndNavigate('/pages/user/coupons')
  },

  onNavigateToProfile: function() {
    this.checkLoginAndNavigate('/pages/user/info')
  },

  onNavigateToAddress: function() {
    this.checkLoginAndNavigate('/pages/user/address')
  },

  onNavigateToSettings: function() {
    wx.navigateTo({
      url: '/pages/user/settings'
    })
  },

  onNavigateToHelp: function() {
    wx.navigateTo({
      url: '/pages/user/help'
    })
  },

  // 检查登录状态并跳转
  checkLoginAndNavigate: function(url) {
    if (!this.data.isLoggedIn) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({ url })
  }
})