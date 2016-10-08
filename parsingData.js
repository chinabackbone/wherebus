// 将服务器发来的数据分类
function parsingData(data) {
    var obj = new Array();
    var temp = new Array();

    obj["command"] = data.substr(13, 4);
    switch (obj["command"]) {
        case 'BP05':
            obj["device_id"] = data.substr(1, 12);
            obj["gpsData"] = data.substr(32, 62);
            obj["date"] = obj["gpsData"].substr(0, 6);
            obj["gps_isyouxiao"] = obj["gpsData"].substr(6, 1);
            obj["weidu"] = obj["gpsData"].substr(7, 9);
            obj["jingdu"] = obj["gpsData"].substr(17, 10);
            obj["speed"] = obj["gpsData"].substr(28, 5);
            obj["time_now"] = obj["gpsData"].substr(33, 6);
            obj["direction"] = obj["gpsData"].substr(39, 6);
            obj["io_status"] = obj["gpsData"].substr(45, 8);
            obj["acc"] = obj["io_status"].substr(1, 1);
            obj["gsm"] = obj["io_status"].substr(6, 2);
            obj["lichengbiaozhi"] = obj["gpsData"].substr(53, 1);
            obj["licheng_data"] = obj["gpsData"].substr(54, 8);
            temp = data.split("$");
            if (temp.length > 1) {
                var obd = temp[1].substr(0, temp[1].length - 1);
                obj["obd"] = obd;
            } else {
                obj["obd"] = "666";
            }
            break;
        case 'BO01':
            obj["device_id"] = data.substr(1, 12);
            obj["gpsData"] = data.substr(18, 60);
            obj["date"] = obj["gpsData"].substr(0, 6);
            obj["gps_isyouxiao"] = obj["gpsData"].substr(6, 1);
            obj["weidu"] = obj["gpsData"].substr(7, 9);
            obj["jingdu"] = obj["gpsData"].substr(17, 10);
            obj["speed"] = obj["gpsData"].substr(28, 5);
            obj["time_now"] = obj["gpsData"].substr(33, 6);
            obj["direction"] = obj["gpsData"].substr(39, 6);
            obj["io_status"] = obj["gpsData"].substr(45, 8);
            obj["acc"] = obj["io_status"].substr(1, 1);
            obj["gsm"] = obj["io_status"].substr(6, 2);
            obj["lichengbiaozhi"] = obj["gpsData"].substr(53, 1);
            obj["licheng_data"] = obj["gpsData"].substr(54, 8);
            temp = data.split("$");
            if (temp.length > 1) {
                var obd = temp[1].substr(0, temp[1].length - 1);
                obj["obd"] = obd;
            } else {
                obj["obd"] = "666";
            }
            break;
        case 'BP04':
            obj["device_id"] = data.substr(1, 12);
            obj["gpsData"] = data.substr(17, 62);
            obj["date"] = obj["gpsData"].substr(0, 6);
            obj["gps_isyouxiao"] = obj["gpsData"].substr(6, 1);
            obj["weidu"] = obj["gpsData"].substr(7, 9);
            obj["jingdu"] = obj["gpsData"].substr(17, 10);
            obj["speed"] = obj["gpsData"].substr(28, 5);
            obj["time_now"] = obj["gpsData"].substr(33, 6);
            obj["direction"] = obj["gpsData"].substr(39, 6);
            obj["io_status"] = obj["gpsData"].substr(45, 8);
            obj["acc"] = obj["io_status"].substr(1, 1);
            obj["gsm"] = obj["io_status"].substr(6, 2);
            obj["lichengbiaozhi"] = obj["gpsData"].substr(53, 1);
            obj["licheng_data"] = obj["gpsData"].substr(54, 8);
            temp = data.split("$");
            if (temp.length > 1) {
                var obd = temp[1].substr(0, temp[1].length - 1);
                obj["obd"] = obd;
            } else {
                obj["obd"] = "666";
            }
            break;
        case 'BR00':
            obj["device_id"] = data.substr(1, 12);
            obj["gpsData"] = data.substr(17, 62);
            obj["date"] = obj["gpsData"].substr(0, 6);
            obj["gps_isyouxiao"] = obj["gpsData"].substr(6, 1);
            obj["weidu"] = obj["gpsData"].substr(7, 9);
            obj["jingdu"] = obj["gpsData"].substr(17, 10);
            obj["speed"] = obj["gpsData"].substr(28, 5);
            obj["time_now"] = obj["gpsData"].substr(33, 6);
            obj["direction"] = obj["gpsData"].substr(39, 6);
            obj["io_status"] = obj["gpsData"].substr(45, 8);
            obj["acc"] = obj["io_status"].substr(1, 1);
            obj["gsm"] = obj["io_status"].substr(6, 2);
            obj["lichengbiaozhi"] = obj["gpsData"].substr(53, 1);
            obj["licheng_data"] = obj["gpsData"].substr(54, 8);
            temp = data.split("$");
            if (temp.length > 1) {
                var obd = temp[1].substr(0, temp[1].length - 1);
                obj["obd"] = obd;
            } else {
                obj["obd"] = "666";
            }
            break;
    }
    return obj;
}