// pages/md/md.js
Page({
  data: {
    mdArr: [
      '# 一级标题',
      '## 二级标题',
      '*斜体文字*',
      '**加粗文字**',
      '> 引用文本',
      '- 无序列表',
      '- 无序列表',
      '1. 有序列表',
      '2. 有序列表',
      '--- 下划线',
      '`code` 行内代码',
      '```',
      '代码块',
      '```',
      '[urlName](url) 链接',
      '![imgName](imgUrl) 图片',
      '空行另起一段内容'
    ]
  },
  // 用户点击右上角分享
  onShareAppMessage: function () {
    return {
      title: 'MarkNote'
    }
  }
})