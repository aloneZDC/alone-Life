//获取应用实例
var app = getApp()
Page({
  data: {
    weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    showday: ['今天', '明天', ''],
    city: '', //城市
    district: '', //区域
    now: '',
    forecast: '',//七日天气预报
    quality: '' //空气质量
  },
  onLoad: function () {
    var that = this;
    var date = new Date();
    //设置数组第三个是周几
    that.setData({
      'showday[2]': this.data.weekday[(date.getDay() + 2) % 7],
    });
  },
  onShow: function () {
    var that = this;
    var date = new Date();
    //设置数组第三个是周几
    //发出请求
    var param = {
      key: "609c0a4333444326ac0594bbd3d635b7",
      location: "深圳"
    };
    wx.request({
      url: "https://free-api.heweather.com/s6/weather",
      data: param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        app.globalData.weatherData = res.data.HeWeather6[0].status == "unknown city" ? "" : res.data.HeWeather6[0];
        var weatherData = app.globalData.weatherData ? app.globalData.weatherData.now : "暂无该城市天气信息";
        var dress = app.globalData.weatherData ? res.data.HeWeather6[0].lifestyle[1] : { txt: "暂无该城市天气信息" };
        that.getAir();
        that.setData({
          dress: dress, //生活指数 
          now: weatherData, //今天天气情况数组 
          forecast: app.globalData.weatherData.daily_forecast
        });
      }
    })
  },
  //获取当前空气质量情况
  getAir: function (e) {
    var that = this;
    var param = {
      key: "609c0a4333444326ac0594bbd3d635b7",
      location: "深圳"
    };
    wx.request({
      url:"https://free-api.heweather.com/s6/air/now",
      data: param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        app.globalData.air = res.data.HeWeather6[0].status == "unknown city" ? "" : res.data.HeWeather6[0].air_now_city;
        that.setData({
          quality: app.globalData.air
        });
      }
    })
  },

});