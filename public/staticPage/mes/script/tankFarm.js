var dom = document.querySelector(el) //获取div
var canvas = document.createElement("canvas") //新建canvas元素
var height = dom.clientHeight === 0? 300 : dom.clientHeight //默认高度
var width = dom.clientWidth === 0 || dom.clientWidth>200?120:dom.clientWidth //默认宽度
canvas.height = height; //设置高宽
canvas.width = width;
dom.appendChild(canvas) //div添加canvas元素
var ctx = canvas.getContext("2d") //获取上下文

var R = Math.floor((width-6)/2);
var r = Math.round(R * 1 / 2)

var min = 0
var max = 20

function drawOuterLine(){
    ctx.beginPath() //开始绘制
    //上半个圆形
    ctx.arc(R, r, R, 0, Math.PI,true); //以（R,r)为圆心，以r为半径，从x轴开始旋转PI弧度,逆时针方向
    //下半个圆形
    var theta = Math.acos(r * 1.0 / R)
    ctx.arc(R, height-R, R, theta+Math.PI, -theta, true);  //以（R,height-R)为圆心，以R为半径,从左上角开始到右上角，逆时针旋转
    ctx.closePath() //闭合曲线
    ctx.stroke() //绘制图形
}


function drawBasic () {
    var lingrad = ctx.createLinearGradient(0,0,width,height); //生成一个线性的渐变
    lingrad.addColorStop(0, "mediumvioletred"); //紫罗兰红
    lingrad.addColorStop(0.2, "darkorange"); //暗桔色
    lingrad.addColorStop(0.4, "gold"); //金色
    lingrad.addColorStop(0.6, "limegreen"); //暗绿
    lingrad.addColorStop(0.8, "navy"); //海军蓝
    lingrad.addColorStop(1, "purple"); //紫色
    ctx.fillStyle=lingrad //填充样式
    ctx.fill("evenodd") //填充方式
}

function getYByValue(value) {
        //刻度线总高度
        var scale_height = height - R - r
        //0刻度线所在位置
        var zero_scale_y = height - R
       //每上升一度所表示的像素高度
        var dy_dtem = scale_height/(this.max-this.min)
       //根据输入的值返回刻度所在的高度
        return zero_scale_y - dy_dtem*value
}
    
function drawScale (){
    for (var i = this.min; i<= this.max ;i++){ //按每一个温度画刻度线
        var y = getYByValue(i) //调用上一个步骤写的通过温度获取高度
        ctx.beginPath();  //开始绘制
        ctx.moveTo( R+r, y) //移动到某一个气温刻度水银柱的最右边。
        if (i % 10 == 0){ //如果是10，20，30，40度的刻度
            ctx.lineWidth = 2; //线条加粗
            ctx.lineTo( R+r-r*2/3, y) //画2/3*r长度的线条
            //ctx.font = "15px bold"; //添加字体样式
            ctx.fillText(i, R+r, y+6) //在刻度边上写下温度字
            ctx.stroke()
        } else {//如果不是10，20，30，40度的刻度
            ctx.lineWidth = 1;
            if (i % 5 == 0) { //如果是5的刻度，
                ctx.lineTo(R + r - r / 2, y) //画1/2*r长度的线条
            }else { //普通刻度
                ctx.lineTo(R + r - r / 3, y) //画1/3*r长度的线条，最短
            }
            ctx.stroke()
        }
    }
}
    
function setValue (value){
    drawOuterLine() //重新画边界线
    drawBasic() //重新填入底色
    ctx.clearRect(0,0,200,getYByValue(value)) //清除这个值以上的区域
    drawOuterLine() //因为被清除，所以重新画边界线
    drawScale() //画上刻度线
}

function tankFarmBar(el){
    var dom = document.querySelector(el)
    var canvas = document.createElement("canvas")
    var height = dom.clientHeight === 0? 300 : dom.clientHeight
    var width = dom.clientWidth === 0 || dom.clientWidth>200?120:dom.clientWidth
    canvas.height = height;
    canvas.width = width;
    dom.appendChild(canvas)

    var R = Math.floor((width-6)/2);
    var r = Math.round(R*1/2)
    var ctx = canvas.getContext("2d")

    this.min = 0 
    this.max = 30 //最高液位
    //画骨架
    this.drawOuterLine = function () {
        ctx.beginPath()

        ctx.moveTo(r, height - R+2);
        ctx.lineTo(R + r, height - R + 2);
        ctx.lineTo(R + r, r);
        ctx.lineTo(r, r);
        ctx.closePath();
        ctx.stroke();
    }
    //画底色
    this.drawBasic = function () {
        var lingrad = ctx.createLinearGradient(0,0,width,height);
        lingrad.addColorStop(0, "black");
        lingrad.addColorStop(1, "white");
        ctx.fillStyle = lingrad;
        ctx.fill("evenodd");
    }
    //根据数值获取y坐标
    this.getYByValue = function (value) {
        //刻度线总高度
        var scale_height = height - R - r
        //0刻度线所在位置
        var zero_scale_y = height - R
        var dy_dtem = scale_height/(this.max-this.min)
        return zero_scale_y - dy_dtem*value
    }
    //画刻度线
    this.drawScale = function(){
        for (var i = this.min; i<= this.max ;i++){ //画刻度线
            var y = this.getYByValue(i)
            ctx.beginPath();
            ctx.moveTo( R+r, y)
            if (i % 10 == 0){
                ctx.lineWidth = 2;
                ctx.lineTo( R+r-r*2/3, y)
                ctx.font = "15px bold";
                ctx.fillText(i, R+r+5, y+6)
                ctx.stroke()
            } else {
                ctx.lineWidth = 1;
                if (i % 5 == 0) {
                    ctx.lineTo(R + r - r / 2, y)
                }else {
                    ctx.lineTo(R + r - r / 3, y)
                }
                ctx.stroke()
            }
        }
    }
    this.setValue = function(value){
        this.drawOuterLine()
        this.drawBasic()
        ctx.clearRect(0,0,200,this.getYByValue(value))
        this.drawOuterLine()
        this.drawScale()
    }
    this.drawOuterLine()
    this.drawBasic()
    this.drawScale()
}

