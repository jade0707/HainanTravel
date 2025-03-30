Page({
  data: {
    recommendations: [
      {
        id: 1,
        name: '三亚精选4日游',
        imageUrl: '/assets/images/sanya-route.jpg',
        price: 3299,
        tags: ['海滨度假', '亲子游', '美食'],
        features: [
          { icon: '/assets/icons/duration.png', text: '4天3晚' },
          { icon: '/assets/icons/hotel.png', text: '五星酒店' },
          { icon: '/assets/icons/food.png', text: '含早餐' },
          { icon: '/assets/icons/accessibility.png', text: '无障碍设施' }
        ],
        matchScore: 95,
        matchReasons: ['符合预算', '适合家庭', '含无障碍设施', '海滨度假']
      },
      {
        id: 2,
        name: '海南环岛6日游',
        imageUrl: '/assets/images/hainan-route.jpg',
        price: 4599,
        tags: ['深度游', '文化体验', '美食'],
        features: [
          { icon: '/assets/icons/duration.png', text: '6天5晚' },
          { icon: '/assets/icons/hotel.png', text: '四星酒店' },
          { icon: '/assets/icons/guide.png', text: '专业导游' },
          { icon: '/assets/icons/food.png', text: '含三餐' }
        ],
        matchScore: 88,
        matchReasons: ['文化体验', '深度游览', '含专业导游']
      }
    ]
  },

  onLoad(options) {
    // TODO: 根据上一页传来的筛选条件获取推荐结果
    this.loadRecommendations()
  },

  loadRecommendations() {
    wx.showLoading({
      title: '加载推荐中',
    })

    // TODO: 调用推荐API获取数据
    setTimeout(() => {
      wx.hideLoading()
    }, 1000)
  },

  onRecommendationTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/destination/detail?id=${id}&from=recommend`
    })
  },

  onReset() {
    wx.navigateBack()
  },

  onShareAppMessage() {
    return {
      title: '为您推荐的海南旅游行程',
      path: '/pages/recommend/index'
    }
  }
})