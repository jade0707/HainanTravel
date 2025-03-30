Page({
  data: {
    // 基础条件
    budget: 2000,
    durationOptions: ['2-3天', '4-5天', '6-7天', '7天以上'],
    durationIndex: 0,
    seasonOptions: ['春季', '夏季', '秋季', '冬季'],
    seasonIndex: 0,
    travelTypes: [
      { label: '自由行', value: 'free' },
      { label: '跟团游', value: 'group' },
      { label: '半自助', value: 'semi' }
    ],
    selectedTravelType: 'free',

    // 目的地特征
    climateOptions: [
      { label: '热带气候', value: 'tropical' },
      { label: '温和气候', value: 'mild' },
      { label: '海洋性气候', value: 'oceanic' }
    ],
    selectedClimate: [],

    geographyOptions: [
      { label: '海滨', value: 'beach' },
      { label: '山地', value: 'mountain' },
      { label: '热带雨林', value: 'rainforest' },
      { label: '城市', value: 'city' }
    ],
    selectedGeography: [],

    cultureOptions: [
      { label: '黎族文化', value: 'li' },
      { label: '海南美食', value: 'food' },
      { label: '渔村文化', value: 'fishing' },
      { label: '现代都市', value: 'modern' }
    ],
    selectedCulture: [],

    // 特殊需求
    needAccessibility: false,
    dietaryOptions: [
      { label: '素食', value: 'vegetarian' },
      { label: '清真', value: 'halal' },
      { label: '无糖', value: 'sugar_free' },
      { label: '无麸质', value: 'gluten_free' }
    ],
    selectedDietary: [],
    familyFriendly: false,
    petFriendly: false
  },

  onBudgetChange(e) {
    this.setData({ budget: e.detail.value })
  },

  onDurationChange(e) {
    this.setData({ durationIndex: e.detail.value })
  },

  onSeasonChange(e) {
    this.setData({ seasonIndex: e.detail.value })
  },

  onTravelTypeChange(e) {
    this.setData({ selectedTravelType: e.detail.value })
  },

  onClimateChange(e) {
    this.setData({ selectedClimate: e.detail.value })
  },

  onGeographyChange(e) {
    this.setData({ selectedGeography: e.detail.value })
  },

  onCultureChange(e) {
    this.setData({ selectedCulture: e.detail.value })
  },

  onAccessibilityChange(e) {
    this.setData({ needAccessibility: e.detail.value })
  },

  onDietaryChange(e) {
    this.setData({ selectedDietary: e.detail.value })
  },

  onFamilyFriendlyChange(e) {
    this.setData({ familyFriendly: e.detail.value })
  },

  onPetFriendlyChange(e) {
    this.setData({ petFriendly: e.detail.value })
  },

  onSubmit() {
    const formData = {
      budget: this.data.budget,
      duration: this.data.durationOptions[this.data.durationIndex],
      season: this.data.seasonOptions[this.data.seasonIndex],
      travelType: this.data.selectedTravelType,
      climate: this.data.selectedClimate,
      geography: this.data.selectedGeography,
      culture: this.data.selectedCulture,
      needAccessibility: this.data.needAccessibility,
      dietary: this.data.selectedDietary,
      familyFriendly: this.data.familyFriendly,
      petFriendly: this.data.petFriendly
    }

    // TODO: 调用推荐算法API
    wx.showLoading({
      title: '正在为您推荐',
    })

    // 模拟API调用
    setTimeout(() => {
      wx.hideLoading()
      wx.navigateTo({
        url: '/pages/recommend/result'
      })
    }, 2000)
  }
})