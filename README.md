# MarkNote
Markdown笔记微信小程序

-----

# 微信小程序笔记 #


----------

一些微信小程序开发的笔记。

**微信小程序配置**

- 每个小程序页面默认有四个文件`.wxml`、`.wxss`、`.js`、`.json`，为了方便开发者减少配置项，规定描述页面的这四个文件必须具有相同的路径与文件名：

	- `.js`文件必须调用`Page()`方法，即使js文件里没有任何代码，也需要在js里添加一个空的 `Page({})`，注意Page的P要大写；
	- `.json`文件，即使json文件里没有任何内容，也需要加入一个`{}`，作为默认代码；

- 快速创建页面文件，在`app.json`文件下pages数组里，添加一个页面的路径，如果这个路径指向的是 一个不存在的文件，那么MINA框架会自动创建这个页面的四个文件；

- `app.json`中pages数组的第一项代表小程序的初始页面；

**微信小程序常见问题**

- 微信小程序中使用`data-*`设置标签属性和`e.target.dateset`来获取属性值，设置时属性微信组件跟HTML标签一样不区分大小写，所以data的属性名都应该用小写设置；

- 微信小程序设置data对象的属性：

		Page({
			data: {
				// 属性值为一个对象
				obj: {
					a: 1,
					b: 2
				}
			},
			// 设置属性值
			setObj: fnction () {
				// 通过属性字符串修改数据
				const str = 'obj.a';
				this.setData({
					[str]: 3
				});
			}
 		})

**微信小程序数据传递**

- data，页面数据
- globalData，全局数据

**微信小程序页面相关**

- 让input输入框跟随键盘浮动，设置`cursor-spacing`属性就行；

- 微信小程序下拉刷新：
	
	- 需要在`app.json`的window选项中或页面配置中开启`enablePullDownRefresh: true`；

	- 不能看见刷新的三个点，通常是背景和那三个点的颜色没设置对造成的，在页面的`.json`文件中设置背景颜色，让背景颜色和三个点颜色有区分度；
	
	- 下拉刷新后停止，在成功刷新后调用`wx.stopPullDownRefresh()`方法；

- tabBar相关，出现tabBar不显示的问题：`app.json`中pages数组的第一项必须是tabBar的list数组的一员；
