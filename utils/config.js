class Config {
  constructor() {

  }
}
// 后端的接口地址
// Config.restUrl = 'http://2f0x179685.imwork.net:33156/api';
Config.restUrl = 'http://localhost:8010/api';
// 请求头中存放token的参数名
Config.tokenParamName = 'token';
//是否启用支付
Config.enablePay = false;

export { Config };