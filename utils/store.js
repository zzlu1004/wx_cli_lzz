class Store {
  constructor() {

  }

  // 设置storage
  set(key, value) {
    wx.setStorageSync(key, value)
  }

  // 读取指定key的storage
  get(key) {
    return wx.getStorageSync(key)
  }

  // 移除指定key的storage
  remove(key) {
    wx.removeStorageSync(key)
  }

  // 清空所有的storage
  clear() {
    wx.clearStorageSync()
  }

  // 设置缓存时效
  setByTime(key,value){
    let date = Date.parse(new Date())
    let valueWithTime = {value,date}
    if(value && value.length > 0){
      wx.setStorageSync(key, valueWithTime)
    }
  }
  /*
    * 获取应对缓存
    * @param {Number} time 有效时间 为秒级
  */ 
  getByTime(key,time){
    let data = wx.getStorageSync(key)
    // 获取当前时间
    let dateNow = Date.parse(new Date())
    // 获取存入时间
    let dateSet = data.date
    // 判断如果当前时间减设置缓存时的时间 是否大于 有效时间；如果是，则返回null,否则返回之前本地所存储的数据
    if ((dateNow - dateSet) > (time * 1000)){
      wx.removeStorageSync(key)
      return null
    }else{
      return data.value
    }
  }
}


export default Store