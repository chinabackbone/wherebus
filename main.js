// 与服务器连接
$(function Connection() {
    try {
        ws = new WebSocket("ws://122.114.50.17:8882");
        ws.onopen = function(event) {
			// console.log('open:'+writeObj(event));
			// var data = '{"type":"join","group":"' + groupname + '","sb_id":"' + sb_id + '"}';
			// ws.send(data);
        };
        ws.onmessage = function(event) {
            console.log(event.data);
            var data = event.data;
            if (!(data.indexOf("Hello") > -1 || data.indexOf("login") > -1)) {
            	var obj = parsingData(data);
                var jingdu = getLng(obj["jingdu"]);
                var weidu = getLat(obj["weidu"]);
                GPSToBaidu(jingdu, weidu, obj);
            }
        };
        ws.onclose = function(event) {
            console.log("已经与服务器断开连接,当前连接状态：" + this.readyState);
        };
        ws.onerror = function(event) {
            console.log("WebSocket异常！");
        };
    } catch (e) {
        console.log(e);
    }
});

function onClick() {
    var mask = $('#mask');
    var weuiActionsheet = $('#weui_actionsheet');
    weuiActionsheet.addClass('weui_actionsheet_toggle');
    mask.show()
        .focus()//加focus是为了触发一次页面的重排(reflow or layout thrashing),使mask的transition动画得以正常触发
        .addClass('weui_fade_toggle').one('click', function () {
        hideActionSheet(weuiActionsheet, mask);
    });
    $('#actionsheet_cancel').one('click', function () {
        hideActionSheet(weuiActionsheet, mask);
    });
    mask.unbind('transitionend').unbind('webkitTransitionEnd');

    
}

function hideActionSheet(weuiActionsheet, mask) {
    weuiActionsheet.removeClass('weui_actionsheet_toggle');
    mask.removeClass('weui_fade_toggle');
    mask.on('transitionend', function () {
        mask.hide();
    }).on('webkitTransitionEnd', function () {
        mask.hide();
    })
}

function check(car_id_number) {
    var mask = $('#mask');
    var weuiActionsheet = $('#weui_actionsheet');
    hideActionSheet(weuiActionsheet, mask);
    map.centerAndZoom(point[car_id_number], map.getZoom());
}