const app = getApp()

Page({
  data: {
    destination: null,
    reviews: [],
    isCollected: false
  },

  onLoad: function(options) {
    const { id, type } = options
    this.loadDestinationDetail(id)
    this.loadReviews(id)
    this.checkCollectionStatus(id)
  },

  // 加载景点详情
  loadDestinationDetail: function(id) {
    // TODO: 从服务器获取数据
    this.setData({
      destination: {
        id: id,
        name: '三亚亚龙湾',
        price: 199,
        rating: 4.8,
        reviewCount: 2345,
        images: [
          '/assets/images/yalong-bay-1.jpg',
          '/assets/images/yalong-bay-2.jpg',
          '/assets/images/yalong-bay-3.jpg'
        ],
        description: '亚龙湾被称为"天下第一湾