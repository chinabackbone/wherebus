// print object
function writeObj(obj){ 
	var description = ""; 
	for(var i in obj){ 
		var property=obj[i]; 
		description+=i+" = "+property+"\n"; 
	} 
	return description; 
}

// conversion longitude
function getLng(jingdu) {
    var jingdu = String(jingdu);
    var jd_d = jingdu.substring(0, 3);
    var jd_m = jingdu.substring(3, jingdu.length);
    var d = Number(jd_d);
    var m = Number(jd_m) / 60;
    var c = d + m;
    return c;
}

// conversion latitude
function getLat(weidu) {
    var weidu = String(weidu);
    var wd_d = weidu.substring(0, 2);
    var wd_m = weidu.substring(2, weidu.length);
    var d = Number(wd_d);
    var m = Number(wd_m) / 60;
    var c = d + m;
    return c;
}