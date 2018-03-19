// pages/preview/preview.js
const app = getApp();

const marked = require('../../utils/marked.min.js');

Page({
  // 页面的初始数据
  data: {
    md: null,
    htmlStr: ''
  },
  // 生命周期函数--监听页面显示
  onShow: function () {
    let htmlStr = marked(app.globalData.md.content);
    const preStart = /<(pre)([^>]*)>/g;
    const preEnd = /<\/pre>/g;
    // const tagReg = /<([^\/\W]+)("[^"]*"|'[^']*'|[^'">])*>/g;
    const tagReg = /<([^\/\W]+)([^>]*)>/g;
    htmlStr = htmlStr.replace(tagReg, '<$1 class="md-$1"$2>').replace(preStart, '<div$2>').replace(preEnd, '</div>');
    this.setData({
      md: app.globalData.md,
      htmlStr: htmlStr
    });
  },
  // 用户点击右上角分享
  onShareAppMessage: function () {
    return {
      title: 'MarkNote'
    }
  }
})