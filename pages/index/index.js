const app = getApp()

Page({
  data: {
    banners: [
      {
        id: 1,
        imageUrl: '/assets/images/banner1.jpg',
        link: '/pages/destination/detail?id=1'
      },
      {
        id: 2,
        imageUrl: '/assets/images/banner2.jpg',
        link: '/pages/destination/detail?id=2'
      }
    ],
    hotDestinations: [],
    specialRoutes: [],
    searchKeyword: ''
  },

  onLoad: function() {
    this.loadHotDestinations()
    this.loadSpecialRoutes()
  },

  // 加载热门目的地
  loadHotDestinations: function() {
    // TODO: 从服务器获取数据
    this.setData({
      hotDestinations: [
        {
          id: 1,
          name: '三亚亚龙湾',
          imageUrl: '/assets/images/yalong-bay.jpg',
          price: 199
        },
        {
          id: 2,
          name: '蜈支洲岛',
          imageUrl: '/assets/images/wuzhizhou.jpg',
          price: 168
        }
      ]
    })
  },

  // 加载特色行程
  loadSpecialRoutes: function() {
    // TODO: 从服务器获取数据
    this.setData({
      specialRoutes: [
        {
          id: 1,
          name: '三亚双飞5日游',
          description: '含亚龙湾、蜈支洲岛等景点，含酒店住宿',
          imageUrl: '/assets/images/route1.jpg',
          duration: '5天4晚',
          price: 3999
        },
        {
          id: 2,
          name: '海口美食文化之旅',
          description: '打卡骑楼老街，品尝地道海南小吃',
          imageUrl: '/assets/images/route2.jpg',
          duration: '3天2晚',
          price: 1999
        }
      ]
    })
  },

  // 搜索输入
  onSearchInput: function(e) {
    this.setData({
      searchKeyword: e.detail.value
    })
  },

  // 执行搜索
  onSearch: function() {
    if (!this.data.searchKeyword.trim()) {
      return
    }
    // TODO: 实现搜索逻辑
    wx.showToast({
      title: '搜索功能开发中',
      icon: 'none'
    })
  },

  // Banner点击
  onBannerTap: function(e) {
    const id = e.currentTarget.dataset.id
    const banner = this.data.banners.find(item => item.id === id)
    if (banner && banner.link) {
      wx.navigateTo({
        url: banner.link
      })
    }
  },

  // 目的地点击
  onDestinationTap: function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/destination/detail?id=${id}`
    })
  },

  // 特色行程点击
  onRouteTap: function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/destination/detail?id=${id}&type=route`
    })
  },

  // 查看更多目的地
  onMoreDestinations: function() {
    wx.switchTab({
      url: '/pages/destination/detail'
    })
  },

  // 查看更多行程
  onMoreRoutes: function() {
    wx.navigateTo({
      url: '/pages/destination/detail?type=route'
    })
  }
})