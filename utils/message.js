class Message {
  constructor() {

  }
  // 正确提示
  success(message) {
    wx.showToast({
      title: message || '成功',
      icon: 'success',
      mask: true
    })
  }

  // 错误提示
  error(message) {
    wx.showToast({
      title: message || '失败',
      image: '/static/images/error.png'
    })
  }

  // 没有图标的普通提示
  info(message,time) {
    wx.showToast({
      title: message || '提示',
      icon: 'none',
      duration:time || 1000
    })
  }

  // 显示loading
  showLoading(message) {
    wx.showLoading({
      title: message || '加载中',
      mask: true
    })
  }

  // 隐藏loading
  hideLoading() {
    wx.hideLoading()
  }
}


export default Message