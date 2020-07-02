import urlConfig from './config.js'

const request = {}
const headers = {}

request.globalRequest = (url, method, data) => {
	/*     权限判断 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分
	    1 == 不通过access_token校验的接口
	    2 == 文件下载接口列表
	    3 == 验证码登录 */
	console.log(method + "请求：" + urlConfig + url,data);
	return uni.request({
		url: urlConfig + url,
		sslVerify:false,
		method,
		data: data,
		dataType: 'json',
		withCredentials: true
	}).then(res => {
		console.log("返回数据",res[1]);
		if(res==undefined){
			throw "返回数据为 undefinded";
		}
		if (res[1].statusCode == 200) {
			return res[1]
		} else {
			throw res[1].data
		}
	}).catch(parmas => {
		switch (parmas.code) {
			case 401:
				uni.clearStorageSync()
				break
			default:
				//console.log("发生异常",parmas);
				// return Promise.reject()
			 break
		}
	})
}

export default request
