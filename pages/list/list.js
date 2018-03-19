// pages/list/list.js
const app = getApp();

Page({
  data: {
    loadFlag: true,
    mdList: null,
    md: null,
    renameFlag: false,
    newName: '' 
  },
  // 监听页面加载
  onLoad: function (options) {
    const mds = wx.getStorageSync('mds') || [];
    this.setData({
      mdList: mds
    });
  },
  // 监听页面初次渲染完成
  onReady: function () {
    const _this = this;
    setTimeout(function () {
      _this.setData({
        loadFlag: false
      });
    }, 1000);
  },
  // 监听页面显示
  onShow: function () {
    const mds = wx.getStorageSync('mds') || [];
    this.setData({
      mdList: mds
    });
  },
  // 用户点击右上角分享
  onShareAppMessage: function () {
    return {
      title: 'MarkNote'
    }
  },
  // 监听用户下拉动作刷新
  onPullDownRefresh: function () {
    const mds = wx.getStorageSync('mds') || [];
    this.setData({
      mdList: mds
    });
    wx.stopPullDownRefresh();
  },
  // 绑定事件
  // 添加新文件
  addNewMd: function () {
    const newDate = new Date();
    const newMd = {};
    newMd.name = 'New Document';
    const formatTime = function (date) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      return [year, month, day, hour, minute, second].map(formatNumber).join('');
    };
    const formatNumber = function (n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    };
    newMd.date = formatTime(newDate);
    newMd.content = '';
    app.globalData.md = newMd;
    wx.navigateTo({
      url: '/pages/edit/edit'
    });
  },
  // 打开文件
  openMd: function (e) {
    const key = e.currentTarget.dataset.key;
    const mds = this.data.mdList;
    mds.forEach(function (md) {
      if (md.date === key) {
        app.globalData.md = md;
        wx.navigateTo({
          url: '/pages/edit/edit',
        });
      }
    });
  },
  // 文件更多操作
  moreAction: function (e) {
    const _this = this;
    const key = e.currentTarget.dataset.key;
    const mds = this.data.mdList;
    mds.forEach(function (md) {
      if (md.date === key) {
        _this.setData({
          md: md,
          newName: md.name
        });
      }
    });
    wx.showActionSheet({
      itemList: [
        '文件重命名',
        '删除文件',
        // '下载文件到本地'
      ],
      success: function (res) {
        switch (res.tapIndex) {
          case 0: 
            _this.setData({
              renameFlag: true
            });
            break;
          case 1:
            const mds = wx.getStorageSync('mds') || [];
            let num = 0;
            wx.showModal({
              title: '删除文件',
              content: '文件删除后不可恢复，是否确认删除？',
              success: function (res) {
                if (res.confirm) {
                  wx.showLoading({
                    title: '正在删除',
                  });
                  for (let i = 0, len = mds.length; i < len; i++) {
                    if (mds[i].date === _this.data.md.date) {
                      num = i;
                    }
                  }
                  mds.splice(num, 1);
                  wx.setStorage({
                    key: 'mds',
                    data: mds,
                    success: function () {
                      wx.hideLoading();
                      _this.setData({
                        mdList: mds
                      });
                      wx.showToast({
                        title: '文件删除成功',
                        icon: 'success'
                      });
                    }
                  });
                }
              }
            });
            break;
          case 2:
            break;
          default: break;
        }
      }
    });
  },
  // 输入文件名
  inputMdName: function (e) {
    this.setData({
      newName: e.detail.value
    });
  },
  // 确定重命名
  renameConfirm: function () {
    const _this = this;
    if (this.data.newName == '') {
      wx.showModal({
        title: '文件保存出错',
        content: '保存的文件名不可为空，请重新输入',
        showCancel: false
      });
    } else {
      const mds = wx.getStorageSync('mds') || [];
      wx.showLoading({
        title: '正在保存',
      });
      for (let i = 0, len = mds.length; i < len; i++) {
        if (mds[i].date === _this.data.md.date) {
          mds[i].name = _this.data.newName;
        }
      }
      wx.setStorage({
        key: 'mds',
        data: mds,
        success: function () {
          wx.hideLoading();
          wx.showToast({
            title: '文件重命名成功',
            icon: 'success'
          });
          _this.setData({
            mdList: mds,
            renameFlag: false
          });
        }
      });
    }
  },
  // stopPropagation
  stopPropagation: function () {
    return false;
  },
  // 取消文件重命名
  renameCancel: function () {
    this.setData({
      renameFlag: false
    });
  }
})