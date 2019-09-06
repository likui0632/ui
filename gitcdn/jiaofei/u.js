
 /**
     * 获取当前时间
     * @param 
     * @author likui 
     * @return 返回当前的时间戳
     */
function time() {
  var tmp = Date.parse( new Date() ).toString();
  tmp = tmp.substr(0,10);
  return tmp;
}

 /**
     * 判断是否为空
     * @param 字符串
     * @author likui 
     * @return 空为ture
     */
function isNull(data){ 
	return (data == "" || data == undefined || data == null) ? true : false; 
}

function go_url(data) {
		window.location.href=data;
}


function json_array(data) {
	let arr = [];
	for(var key in data) {
		arr.push(data[key])
	}

	return arr;
}

function set_cache(key, value) {
	if(key == '') return false;
	localStorage.setItem(key, value);
}

function get_cache(key) {
	return localStorage.getItem(key);
}

function remove_cache(key) {
	localStorage.removeItem(key);
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i].trim();
		if(c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
function json_array(data) {
	let arr = [];
	for(var key in data) {
		arr.push(data[key])
	}

	return arr;
}

function kindexOf (data,val) {
	for(var i = 0; i < data.length; i++) {
		if(data[i] == val) return i;
	}
	return -1;
};
// 删除数组内容
function kremove(data,val) {
	var index = kindexOf(data,val);
	if(index > -1) {
		data.splice(index, 1);
	}
	
	return data;
};

function httpPost(URL, PARAMS) {
    var temp = document.createElement("form");
    temp.action = URL;
    temp.method = "post";
    temp.style.display = "none";

    for (var x in PARAMS) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = PARAMS[x];
        temp.appendChild(opt);
    }

    document.body.appendChild(temp);
    temp.submit();

    return temp;
}


function myrefresh()
{
	setTimeout('window.location.reload()',1000); //指定1秒刷新一次
      
}


/**
 * 获取参数
 */

function getUrlKey(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    }


/**
 * 封封微信的的request
 */
function get_http(arrry,that) {
						var data=arrry.data.map;
						var appurl=arrry.url;
						
				return new Promise(function (resolve, reject) {								
							that.$http.get(appurl, {
								params: data
							}).then(function(res) {
								resolve(res.data);
							});
				});
}



/**
 * 封封微信的的request
 */
function post_http(array,that) {
				var appurl=array.url;
				var data=array.data;
						
				return new Promise(function (resolve, reject) {	
					
							that.$http.post(appurl,data,{headers: that.headers}).then(function(res) {
							
								resolve(res.data);
							});
				});
}


function pay_http(array,that) {

										var appurl=array.url;
										var data=array.data;
 										const loading = that.$loading({
									          lock: true,
									          text: '订单生成中....',
									          spinner: 'el-icon-loading',
									          background: 'rgba(0, 0, 0, 0.7)'
									        });
									        
return new Promise(function (resolve, reject) {	
										
										that.$http.post(appurl,data,{headers: that.headers}).then(function(e) {
													var res = e.body;
											
													if(res.code=='1'){
								 							that.get_pay(res.data.oid);
								 							
								 					
								 							WeixinJSBridge.invoke(
														       'getBrandWCPayRequest',res.data.data,
														        function(_res){
														        			
														        			
																	
																            if(_res.err_msg === "get_brand_wcpay_request:ok" ) {
																            	   that.get_pay(res.data.oid);
																         		   resolve({
																         		   		oid:res.data.oid,
																         		   		msg:'ok'
																         		   });
																         		  
																            }else if(_res.err_msg === 'get_brand_wcpay_request:cancel'){
																            　　　　　			　that.$message({
																				          showClose: true,
																				          message: '用户取消',
																				          type: 'warning'
																		       		 });
																		       		resolve({
																         		   		oid:res.data.oid,
																         		   		msg:'用户取消'
																         		   });
																                      
																            　　　　　　}else if(_res.err_msg === 'get_brand_wcpay_request:fail'){
																            　　　　　　		　that.$message({
																				          showClose: true,
																				          message: '网络异常',
																				          type: 'warning'
																		      		  });
																                     resolve({
																         		   		oid:res.data.oid,
																         		   		msg:'网络异常'
																         		   });
																            　　　　　　}
																          
														        }
														       
														   );
								 						   loading.close();
								 					}else if(res.code=='2'){
								 						
								 						this.$message.error('已支付,请勿重复支付');
								 						loading.close();
								 						
								 					}else{
								 						
								 						this.$message.error('支付错误,网络超时');
								 						loading.close();
								 					}
											}, function(res) {
													
		
													
										});	
});
}