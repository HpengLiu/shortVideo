let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    // url_config = "http://192.168.1.200/"
		url_config = "https://cjl.jzbang.vip/"
		// url_config = "http://demo.fendouyuan.cn/api/"
}else{
    // 生产环境
 url_config = "https://cjl.jzbang.vip/"
 // url_config = "http://demo.fendouyuan.cn/api/"
	
}

export default url_config