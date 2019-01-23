import config from './config'
import Token from './token'
import Store from './store'
const store = new Store()
const token = new Token()

class Request {
  constructor() {
    this.baseRequestUrl = config.HTTP_BASE_URL
    this._getTokenCount = 1 // 记录循环次数
  }
  /**
   * 请求接口方法
   * @param {Object} params 请求的参数
   */
  ajax(params) {
    let url = this.baseRequestUrl + params.url
    let data = params.data || {}
    wx.request({
      url: url,
      method: params.method,
      data: data,
      header: {
        'Qm-From': 'wechat',
        'content-type': 'application/json',
        'Qm-User-Token': store.get('token') || '',
      },
      success: res => {
        if (res.data.status) {
          params.success && params.success(res.data.data)
        } else {
          if (res.data.code == '3000000901') {
            // token失效重新登录
            if (this._getTokenCount < 3) {
              this._refetch(params)
              this._getTokenCount++
            }
          } 
          else {
            if (params.fail) {
              params.fail(res.data)
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'none'
              })
            }
          }
        }
      },
      fail: err => {
        if (params.fail) {
          params.fail(err)
        } else {
          wx.showToast({
            title: err.errMsg,
            icon: 'none'
          })
        }
      }
    })
  }
  _refetch(params) {
    token.getToken(() => {
      this.ajax(params);
    });
  }
}

export default Request