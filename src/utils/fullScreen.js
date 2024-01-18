
//js控制进入全屏（点击按钮）
export function fullScreen() {
    var el = document.documentElement,
        rfs =
            el.requestFullScreen ||
            el.webkitRequestFullScreen ||
            el.mozRequestFullScreen ||
            el.msRequestFullScreen,
        wscript;
    if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
        return;
    }
}
//js控制关闭全屏全屏（
export function exitFullScreen() {
    var el = document
    var cfs = el.cancelFullScreen || el.mozCancelFullScreen || el.msExitFullscreen || el.webkitExitFullscreen ||
            el.exitFullscreen,
        wscript;
    if (cfs) {
        cfs.call(el);
        return;
    } else if (typeof window.ActiveXObject !== "undefined") {
        wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    } else {
        alert('浏览器不支持全屏API或已被禁用')
    }
}
