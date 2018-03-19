// pages/aboutme/aboutme.js
const app = getApp();

Page({
  // 页面的初始数据
  data: {
    userInfo: {}
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      });
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        });
      }
    }
  },
  // 用户点击右上角分享
  onShareAppMessage: function () {
    return {
      title: 'MarkNote'
    }
  },
  goMd: function () {
    wx.navigateTo({
      url: '/pages/md/md',
    });
  },
  goApplets: function () {
    wx.navigateTo({
      url: '/pages/applets/applets',
    });
  }
})