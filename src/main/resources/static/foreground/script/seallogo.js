
var KX_cfg_data = { cnnic_dn : '', cnnic_lang : 'zh_cn' };

KX_cfg_data.cnnic_sn = "e13010711010038449j2p4000000";
KX_cfg_data.cnnic_u1 = "https://ss.knet.cn/verifyseal.dll" + "?sn=" + KX_cfg_data.cnnic_sn + "&ct=df" + "&a=1&pa=" + Math.random();
KX_cfg_data.cnnic_u2 = "http://rr.knet.cn/static/images/logo/cnnic_en.png";

KX_cfg_data.parameterNew = null;
KX_cfg_data.scheme = 0;
KX_cfg_data.imgUrl = KX_cfg_data.cnnic_u2;
KX_cfg_data.container = document.getElementById("KXYZ");
if(KX_cfg_data.scheme == 1){
	if(KX_cfg_data.imgUrl.indexOf("https")== -1){
		KX_cfg_data.imgUrl = KX_cfg_data.imgUrl.replace("http","https");
	}
}

var str = '<span style="display:inline-block;position:relative;width:auto;"><a href="javascript:if(confirm('http://kxlogo.knet.cn/\' + KX_cfg_data.cnnic_u1 + \'  \n\n该文件无法用 Teleport Ultra 下载, 因为 它是一个域或路径外部被设置为它的启始地址的地址。  \n\n你想在服务器上打开它?'))window.location='http://kxlogo.knet.cn/\' + KX_cfg_data.cnnic_u1 + \''" tppabs="http://kxlogo.knet.cn/' + KX_cfg_data.cnnic_u1 + '" id="kx_verify" tabindex="-1" target="_blank" kx_type="鍥炬爣寮�" style="display:inline-block;"><img src="' + KX_cfg_data.imgUrl + '" tppabs="http://kxlogo.knet.cn/' + KX_cfg_data.imgUrl + '"  style="border:none;" oncontextmenu="return false;" alt="&#x53EF;&#x4FE1;&#x7F51;&#x7AD9;" /></a></span>';

if( KX_cfg_data.parameterNew == "1"){
	document.getElementById("ss").innerHTML = str;
} else if(KX_cfg_data.container){
	KX_cfg_data.container.innerHTML = str;
} else{
	document.write(str);
}