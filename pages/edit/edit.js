// pages/edit/edit.js
const app = getApp();

Page({
  // 页面的初始数据
  data: {
    md: null,
    saveFlag: false,
    newName: ''
  },
  // 监听页面显示
  onShow: function () {
    this.setData({
      md: app.globalData.md,
      newName: app.globalData.md.name
    });
  },
  // 监听页面卸载
  onUnload: function () {
    const _this = this;
    const mds = wx.getStorageSync('mds') || [];
    let mdFlag = true;
    let contentFlag = false;
    for (let i = 0, len = mds.length; i < len; i++) {
      if (mds[i].date === _this.data.md.date) {
        mdFlag = false;
        if (_this.data.md.content !== mds[i].content) {
          contentFlag = true
        }
      }
    }
    if (mdFlag || contentFlag) {
      wx.showModal({
        title: '文件保存提醒',
        content: '您有修改的内容未保存，是否保存修改？如果点击确认，保存后需要在列表页下拉刷新以更新内容！',
        success: function (res) {
          if (res.confirm) {
            for (let i = 0, len = mds.length; i < len; i++) {
              if (mds[i].date === _this.data.md.date) {
                mds[i] = _this.data.md;
              }
            }
            if (mdFlag) {
              mds.unshift(_this.data.md);
            }
            wx.setStorageSync('mds', mds);
          }
        }
      });
    }
  },
  // 用户点击右上角分享
  onShareAppMessage: function () {
    return {
      title: 'MarkNote'
    }
  },
  // 绑定事件
  // 弹出更多操作
  moreAction: function () {
    const _this = this;
    wx.showActionSheet({
      itemList: [
       '文件预览',
       '保存文件',
      //  '下载文件到本地'
      ],
      success: function (res) {
        switch (res.tapIndex) {
          case 0:
            app.globalData.md = _this.data.md;
            wx.navigateTo({
              url: '/pages/preview/preview'
            });
            break;
          case 1:
            _this.setData({
              saveFlag: true
            });
            break;
          case 2:
            break;
          default: break;
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    });
  },
  // 输入更改文件名
  inputMdName: function (e) {
    this.setData({
      newName: e.detail.value
    });
  },
  // 输入更改文件内容
  inputMdContent: function (e) {
    const mdContent = 'md.content';
    this.setData({
      [mdContent]: e.detail.value
    });
  },
  // 确认保存
  saveConfirm: function (e) {
    const _this = this;
    if (_this.data.newName === '') {
      wx.showModal({
        title: '文件保存出错',
        content: '保存的文件名不可为空，请重新输入',
        showCancel: false
      });
    } else {
      const mds = wx.getStorageSync('mds') || [];
      let flag = true;
      _this.setData({
        saveFlag: false
      });
      wx.showLoading({
        title: '正在保存',
      });
      for (let i = 0, len = mds.length; i < len; i++)  {
        if (mds[i].date === _this.data.md.date) {
          const mdName = 'md.name';
          flag = false;
          mds[i] = _this.data.md;
          mds[i].name = _this.data.newName;
          _this.setData({
            [mdName]: _this.data.newName
          });
        }
      }
      if (flag) {
        mds.unshift(_this.data.md);
      }
      wx.setStorage({
        key: 'mds',
        data: mds,
        success: function () {
          wx.hideLoading();
          wx.showToast({
            title: '文件保存成功',
            icon: 'success'
          });
        }
      });
    }
  },
  // stopPropagation
  stopPropagation: function () {
    return false;
  },
  // 取消保存
  saveCancel: function (e) {
    this.setData({
      saveFlag: false
    });
  }
})