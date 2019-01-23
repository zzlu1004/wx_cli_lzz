import Request from '../../utils/request'
class IndexModel extends Request {
  constructor() {
    super()
  }
  /**
   * 获取数据
   * @param {Function} sCallback 成功的回调
   */
  getData(sCallback) {
    let params = {
      url: '/url/demo',
      method: 'GET',
      success: res => {
        sCallback && sCallback(res)
      }
    }
    this.ajax(params)
  }
}

export default IndexModel
