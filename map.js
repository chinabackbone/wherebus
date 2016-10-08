var map = new BMap.Map("container"); // 创建Map实例
var point = [
    new BMap.Point(116.404, 39.915), 
    new BMap.Point(116.404, 39.915), 
    new BMap.Point(116.404, 39.915),
    new BMap.Point(116.404, 39.915),
    new BMap.Point(116.404, 39.915),
    new BMap.Point(116.404, 39.915)
]; // 创建点坐标

var car_ids = [
    '006028262445',
    '006028262446',
    '006028262447',
    '006028262448',
    '006028262449',
    '006028262440',
];

map.centerAndZoom(point[0], 15); // 初始化地图，设置中心点坐标和地图级别
map.enableScrollWheelZoom();

var car_flag = ['true', 'true', 'true', 'true', 'true', 'true']; // 是否新建覆盖物
var acc_first = []; // acc状态是否改变
var car_marker = [];

var ctrl = new BMapLib.TrafficControl({
    showPanel: false //是否显示路况提示面板
});
map.addControl(ctrl);
ctrl.setAnchor(BMAP_ANCHOR_BOTTOM_LEFT);
ctrl.setOffset(new BMap.Size(10, 50));
ctrl.show();

var opts = {
    width: 80,     // 信息窗口宽度
    height: 80,     // 信息窗口高度
}
var infoWindow = [
    new BMap.InfoWindow("<p> 司机姓名：</p><p>司机电话：</p><p>车牌号：</p>", opts), 
    new BMap.InfoWindow("", opts), 
    new BMap.InfoWindow("", opts), 
    new BMap.InfoWindow("", opts), 
    new BMap.InfoWindow("", opts), 
    new BMap.InfoWindow("", opts)
];

// 初始化地图
$(function initMap() {
    for (var i = 0; i < car_ids.length; i++) {
        if (localStorage[car_ids[i]] != undefined) {
            console.log('initMap:' + car_ids[i]);
            ls = localStorage[car_ids[i]];
            var json = eval("(" + ls + ")");
            point[i] = new BMap.Point(json.x, json.y); // 创建点坐标
            var myIcon = new BMap.Icon("bus_off.png", new BMap.Size(21, 45));
            car_marker[i] = new BMap.Marker(point[i], {
                icon: myIcon
            });
            map.addOverlay(car_marker[i]);
            map.centerAndZoom(point[i], map.getZoom());
            
            car_marker[i].addEventListener("click", function() {
                map.openInfoWindow(infoWindow[i], point[i]); //开启信息窗口
            });
            //flag = false;
        } else {
            point[i] = new BMap.Point(116.404, 39.915); // 创建点坐标
        }
    }
    map.centerAndZoom(point[0], 15); // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom();
});

// gps转换为baidu坐标
function GPSToBaidu(x, y, obj) {
    var url = "gpsToBaidu.php?from=0&to=4&x=" + x + "&y=" + y;
    $.ajax({
        type: "get",
        url: url,
        dataType: "json",
        success: function(data) {

            switch (obj['device_id']) {
                case '006028262445':
                    console.log('checkMarker:' + obj['device_id']);
                    point[0] = new BMap.Point(data.busgps_x, data.busgps_y); // 创建点坐标
                    if (obj['acc'] != acc_first[0]) {
                        acc_first[0] = obj['acc'];
                        car_flag[0] = true;
                        dqlc_flag = true;
                    }
                    if (car_flag[0]) {
                        map.removeOverlay(car_marker[0]);
                        if (obj['acc'] == 1) {
                            myIcon = new BMap.Icon("bus_on.png", new BMap.Size(21, 45));
                        } else {
                            myIcon = new BMap.Icon("bus_on_r.png", new BMap.Size(21, 45));
                        }
                        car_marker[0] = new BMap.Marker(point[0], {
                            icon: myIcon
                        });
                        map.addOverlay(car_marker[0]);
                        map.centerAndZoom(point[0], map.getZoom());
                        car_flag[0] = false;
                    } else {
                        car_marker[0].setPosition(point[0]);
                    }
                    // 覆盖物添加方向
                    car_marker[0].setRotation(Number(obj['fx']));

                    car_marker[0].addEventListener("click", function() {
                        map.openInfoWindow(infoWindow[0], point[0]); //开启信息窗口
                    });

                    // h5保存数据
                    ls = "{id:'" + obj['device_id'] + "',x:'" + data.busgps_x + "',y:'" + data.busgps_y + "'}";
                    localStorage[obj['device_id']] = ls;
                    break;
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
        }
    });
}