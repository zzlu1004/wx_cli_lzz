import Message from './message'
import Store from './message'
import config from './config'

const message = new Message()
const store = new Store()

class Token {
  constructor() {
    this.tokenUrl = config.HTTP_BASE_URL + '/seller/account/login-minp'
  }
  /**
   * 获取token
   * @param {Function} callback 回调函数
   */
  getToken(callback) {
    //微信 login
    wx.login({
      success: res => {
        let data = {
          js_code: res.code
        }
        wx.request({
          method: 'POST',
          url: this.tokenUrl,
          data: data,
          header: {
            'Qm-From': 'wechat',
            'Content-type': 'application/json'
          },
          success: (res) => {
            if (res.data.status) {
              store.set('token', data.token)
              callback && callback();
            } else {
              message.info(res.data.message)
            }
          }
        })
      },
      fail(e) {
        message.info('网络异常，请稍后再试')
      }
    })
  }

  /**
   * 验证token是否失效
   * @param {Function} callback 回调函数
   */
  checkToken(callback) {
    let token = store.get('token')
    let that = this
    if (token) {
      wx.checkSession({
        success() {
          that._checkToken(callback)
        },
        fail(e) {
          // 重新获取token
          that.getToken(() => {
            callback && callback()
          })
        }
      })
    }else {
      this.getToken(() => {
        callback && callback()
      })
    }
  }


  /**
   * 验证token是否失效
   * @param {Function} callback 
   */
  _checkToken(callback) {
    wx.request({
      method: 'GET',
      url: this.checkTokenUrl,
      header: {
        'Qm-From': 'wechat',
        'Content-type': 'application/json',
        'Qm-User-Token': store.get('token')
      },
      success: (res) => {
        if (res.data.status) {
          callback && callback()
        } else {
          this.getToken(() => {
            callback && callback()
          })
        }
      }
    })
  }
}

export default Token