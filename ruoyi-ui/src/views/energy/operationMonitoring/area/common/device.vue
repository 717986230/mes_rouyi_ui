<template>
    <div style="position: relative;" :style="{'height': pxToRem(deviceConfig.height)+'px'}">
        <!--设备图-->
        <canvas
            id="deviceCanvas"
            :width="pxToRem(deviceConfig.width)"
            :height="pxToRem(deviceConfig.height)"
            style="position: absolute;top: 0;left: 0;z-index: 1;"
        />
        <!--动画图-->
        <canvas
            id="deviceCanvasAnimation"
            :width="pxToRem(deviceConfig.width)"
            :height="pxToRem(deviceConfig.height)"
            style="position: absolute;top: 0;left: 0;z-index: 2;"
        />
    </div>
</template>

<script>
export default {
    name: 'device',
    data(){
        return{
            ctx:null,
            ctx2:null,
            //设备canvas配置
            deviceConfig:{
                //宽
                width:1300,
                //高
                height:731,
                //中心点
                center:{
                    x:650,
                    y:365.5
                },
                //图片类
                imageInfo:[
                    {
                        name:'背景连接线',
                        img:0,
                        position:[40.6,108],
                        size:[1217,504]
                    },
                    {
                        name:'压缩机1',
                        img:1,
                        position:[190,150],
                        size:[154,120]
                    },
                    {
                        name:'压缩机2',
                        img:1,
                        position:[190,300],
                        size:[154,120]
                    },
                    {
                        name:'压缩机3',
                        img:1,
                        position:[190,450],
                        size:[154,120]
                    },
                    {
                        name:'锅炉1',
                        img:2,
                        position:[475,58],
                        size:[162,100]
                    },
                    {
                        name:'锅炉2',
                        img:2,
                        position:[475,226],
                        size:[162,100]
                    },
                    {
                        name:'锅炉3',
                        img:2,
                        position:[475,395],
                        size:[162,100]
                    },
                    {
                        name:'锅炉4',
                        img:2,
                        position:[475,563],
                        size:[162,100]
                    },
                    {
                        name:'泵1',
                        img:3,
                        position:[754,54],
                        size:[108,110]
                    },
                    {
                        name:'泵2',
                        img:3,
                        position:[754,222],
                        size:[108,110]
                    },
                    {
                        name:'泵3',
                        img:3,
                        position:[754,390],
                        size:[108,110]
                    },
                    {
                        name:'泵4',
                        img:3,
                        position:[754,557],
                        size:[108,110]
                    },
                    {
                        name:'汽轮机1',
                        img:4,
                        position:[990,307],
                        size:[181,110]
                    },
                ],
                //箭头动画
                arrows:[
                    [
                        { x: 41, y: 375 },
                        { x: 131, y: 375 },
                    ],
                    [
                        { x: 659, y: 108 },
                        { x: 754, y: 108 },
                    ],
                    [
                        { x: 659, y: 280 },
                        { x: 754, y: 280 },
                    ],
                    [
                        { x: 659, y: 443 },
                        { x: 754, y: 443 },
                    ],
                    [
                        { x: 659, y: 611 },
                        { x: 754, y: 611 },
                    ],
                    [
                        { x: 1197, y: 373 },
                        { x: 1277, y: 373 },
                    ]
                ],
                //开关项
                switchs:[
                    {
                        name:'压缩机1开关项',
                        position:[246,271],
                        size:[56,28],
                        swicth:false,
                    },
                    {
                        name:'压缩机2开关项',
                        position:[246,420],
                        size:[56,28],
                        swicth:true
                    },
                    {
                        name:'压缩机3开关项',
                        position:[246,571],
                        size:[56,28],
                        swicth:false
                    },
                    {
                        name:'锅炉1开关项',
                        position:[545,168],
                        size:[56,28],
                        swicth:true
                    },
                    {
                        name:'锅炉2开关项',
                        position:[545,335],
                        size:[56,28],
                        swicth:false
                    },
                    {
                        name:'锅炉3开关项',
                        position:[545,502],
                        size:[56,28],
                        swicth:false
                    },
                    {
                        name:'锅炉4开关项',
                        position:[545,670],
                        size:[56,28],
                        swicth:true
                    },
                    {
                        name:'泵1开关项',
                        position:[790,168],
                        size:[56,28],
                        swicth:false
                    },
                    {
                        name:'泵2开关项',
                        position:[790,335],
                        size:[56,28],
                        swicth:true
                    },
                    {
                        name:'泵3开关项',
                        position:[790,502],
                        size:[56,28],
                        swicth:true
                    },
                    {
                        name:'泵4开关项',
                        position:[790,670],
                        size:[56,28],
                        swicth:false
                    },
                    {
                        name:'汽轮机1开关项',
                        position:[1067,420],
                        size:[56,28],
                        swicth:true
                    },
                ]
            },
            //图片资源
            images:[
                require("@/assets/images/energy/bgLine.png"),
                require("@/assets/images/energy/ysj.png"),
                require("@/assets/images/energy/qlj.png"),
                require("@/assets/images/energy/b.png"),
                require("@/assets/images/energy/gl.png"),
                require("@/assets/images/energy/blueArrow.png"),
                require("@/assets/images/energy/on.png"),
                require("@/assets/images/energy/off.png"),
            ],
            //图片dom列表
            imgList:[],
            paths:{
                allDrop:[],
                oldDrop:[],
                moveTotalCount: Math.floor(3000 / 34), //icon需要移动总次数
                moveNowCount: 0, //icon当前移动次数
            },
            Frame:null,
        }
    },
    mounted() {
        this.drawDesigns()//绘制canvas
        this.getAllDrop()//拿箭头运动的点
    },
    methods:{
        drawDesigns(){
            console.log('设备canvas 绘制')
            let {imageInfo,arrows,switchs,width,height,center}= this.deviceConfig
            let images = this.images
            // 获取canvas上下文
            const canvas = document.querySelector("#deviceCanvas");
            const ctx = canvas.getContext("2d");
            this.ctx = ctx
            // 获取canvas上下文
            const canvas2 = document.querySelector("#deviceCanvasAnimation");
            const ctx2 = canvas2.getContext("2d");
            this.ctx2 = ctx2

            //画静态图
            let imgList = [];
            images.forEach(e=>{
                let img = new Image();
                img.src = e
                imgList.push(img)
            })

            console.log('等待两张图片加载完成后再进行绘制',imgList)
            // 等待两张图片加载完成后再进行绘制
            Promise.all(imgList.map((img, index) => {
                return loadImage(img);
            })).then((loadImgs) => {
                this.imgList = loadImgs
                console.log('Promise.all执行完成',loadImgs)
                //绘制静态图
                imageInfo.forEach(staticImg=>{
                    let x = staticImg.position[0];
                    let y = staticImg.position[1];
                    let width = staticImg.size[0];
                    let height = staticImg.size[1];
                    this.ctx.drawImage(loadImgs[staticImg.img], x,y, width, height);
                })
                //绘制动画
                this.Frame = requestAnimationFrame(this.drawAnimate.bind(this));
                //绘制开关项目
                switchs.forEach(staticImg=>{
                    let { swicth } = staticImg
                    let x = staticImg.position[0];
                    let y = staticImg.position[1];
                    let width = staticImg.size[0];
                    let height = staticImg.size[1];
                    this.ctx.drawImage( swicth? loadImgs[6]: loadImgs[7], x,y, width, height);
                })
            });
            function loadImage(img) {
                return new Promise((resolve, reject) => {
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                });
            }
            this.ctx = ctx;
        },
        drawAnimate(){
            //画折线
            this.drawLine();
            if (this.paths.moveNowCount < this.paths.moveTotalCount) {
                requestAnimationFrame(this.drawAnimate.bind(this));
            } else {
                this.paths.moveNowCount = 0;
                requestAnimationFrame(this.drawAnimate.bind(this));
                // 在某个时刻停止动画
                // cancelAnimationFrame(this.Frame);
            }
        },
        //画折线a
        drawLine() {
            let {imageInfo,arrows,switchs,width,height,center}= this.deviceConfig
            this.ctx2.clearRect(0, 0, this.pxToRem(width), this.pxToRem(height));

            let all = this.paths.allDrop;
            let moveNowCount = this.paths.moveNowCount;
            for (let i = 0; i < all.length; i++) {
                this.drawMeteor(
                    this.pxToRem(all[i][moveNowCount].x),
                    this.pxToRem(all[i][moveNowCount].y),
                    this.paths.oldDrop[i],
                    this.imgList[5]
                );
                this.paths.oldDrop[i] = [
                    all[i][moveNowCount].x,
                    all[i][moveNowCount].y,
                ];
            }
            this.paths.moveNowCount += 1;
        },
        //画动画效果
        drawMeteor(x, y, oldDrop, img) {
            this.ctx2.save();
            // 修改原点
            this.ctx2.translate(x, y);
            // 根据两点角度 旋转 图片角度
            // if (oldDrop.length) {
            //   this.ctx2.rotate(Math.atan2(y - oldDrop[1], x - oldDrop[0]) - Math.atan2(0, -1))
            // } else {
            //   this.ctx2.rotate(Math.atan2(y, x) - Math.atan2(0, -1))
            // }
            // 改变回中心点
            this.ctx2.translate(-x - this.pxToRem(20), -y - this.pxToRem(16.5));
            this.ctx2.drawImage(img, x-this.pxToRem(20), y, this.pxToRem(40), this.pxToRem(33));
            this.ctx2.restore();
        },
        // 拿箭头运动的点
        getAllDrop() {
            let linesList = this.deviceConfig.arrows;
            //先算距离
            for (let i = 0; i < linesList.length; i++) {
                linesList[i].changdu = 0;
                for (let j = 0; j < linesList[i].length; j++) {
                    linesList[i][j].cishu = 0;
                    linesList[i][j].changdu = 0;
                    if (j == linesList[i].length - 1) {
                        break;
                    }
                    let p = Math.sqrt(
                        Math.pow(linesList[i][j + 1].x - linesList[i][j].x, 2) +
                        Math.pow(linesList[i][j + 1].y - linesList[i][j].y, 2)
                    );
                    linesList[i][j].changdu = p;
                    linesList[i].changdu += p;
                }
            }
            //算每一段的次数
            for (let i = 0; i < linesList.length; i++) {
                for (let j = 0; j < linesList[i].length; j++) {
                    linesList[i][j].cishu = Math.round(
                        this.paths.moveTotalCount *
                        (linesList[i][j].changdu / linesList[i].changdu)
                    );
                }
            }
            //算所有点
            let allDrop = [];
            let oldDrop = [];
            for (let i = 0; i < linesList.length; i++) {
                allDrop[i] = [];
                oldDrop[i] = [];
                for (let j = 0; j < linesList[i].length - 1; j++) {
                    let points = this.getPointsOnLine(
                        linesList[i][j].x,
                        linesList[i][j].y,
                        linesList[i][j + 1].x,
                        linesList[i][j + 1].y,
                        linesList[i][j].cishu
                    );
                    allDrop[i] = allDrop[i].concat(points);
                }
            }
            let allCount = this.paths.moveTotalCount;
            allDrop.forEach((item) => {
                if (item.length < allCount) {
                    item.splice(
                        -1,
                        0,
                        item.slice(2 * item.length - allCount, item.length)
                    );
                } else if (item.length > allCount) {
                    item.splice(-1, item.length - allCount);
                }
            });

            this.paths.allDrop = allDrop;
            this.paths.oldDrop = oldDrop;
        },
        // 已知点A(x1, y1)和点B(x2, y2)，以及需要在AB线段上取n个等距离点，求这些点的坐标数组
        getPointsOnLine(x1, y1, x2, y2, n) {
            const AB = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)); // 计算AB线段长度
            const d = AB / (n - 1); // 计算相邻两个点之间的距离
            const points = [{x: x1, y: y1}]; // 初始化点集，第一个点是A
            for (let i = 2; i <= n; i++) {
                const Px = x1 + ((i - 1) * (x2 - x1) * d) / AB; // 计算第i个点的横坐标
                const Py = y1 + ((i - 1) * (y2 - y1) * d) / AB; // 计算第i个点的纵坐标
                points.push({x: Px, y: Py}); // 将第i个点添加到点集中
            }
            return points; // 返回点集
        },
    }
}
</script>

<style scoped>

</style>
