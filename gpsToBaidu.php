<?php 

$data['from'] = $_GET['from'];
$data['to'] = $_GET['to'];
$data['x'] = $_GET['x'];
$data['y'] = $_GET['y'];
$url = 'http://api.map.baidu.com/ag/coord/convert';
$httpstr = http($url, $data, 'GET', array("Content-type: text/html; charset=utf-8"));
$request = json_decode($httpstr);
$x = $request->x;
$y = $request->y;
$x = base64_decode($x);
$y = base64_decode($y);
$result['busgps_x'] = $x;
$result['busgps_y'] = $y; 
echo json_encode($result);

function http($url, $params, $method = 'GET', $header = array(), $multi = false) {
	$opts = array(
		CURLOPT_TIMEOUT        => 30,
		CURLOPT_RETURNTRANSFER => 1,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_HTTPHEADER     => $header
	);
	/* 根据请求类型设置特定参数 */
	switch(strtoupper($method)){
		case 'GET':
			$opts[CURLOPT_URL] = $url . '?' . http_build_query($params);
			break;
		case 'POST':
			//判断是否传输文件
			$params = $multi ? $params : http_build_query($params);
			$opts[CURLOPT_URL] = $url;
			$opts[CURLOPT_POST] = 1;
			$opts[CURLOPT_POSTFIELDS] = $params;
			break;
		default:
			throw new Exception('不支持的请求方式！');
	}
	/* 初始化并执行curl请求 */
	$ch = curl_init();
	curl_setopt_array($ch, $opts);
	$data  = curl_exec($ch);
	$error = curl_error($ch);
	curl_close($ch);
	if($error) throw new Exception('请求发生错误：' . $error);
	return  $data;
}