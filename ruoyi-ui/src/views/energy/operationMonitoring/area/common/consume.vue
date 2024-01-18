<!--能耗-->
<template>
    <div style="position: relative;" :style="{'height': pxToRem(animationConfig.height)+'px'}">
        <canvas
            id="animation"
            :width="pxToRem(animationConfig.width)"
            :height="pxToRem(animationConfig.height)"
            style="position: absolute;top: 0;left: 0;z-index: 3;transform: scale(0.8);"
        >
        </canvas>
        <canvas
            id="myCanvas"
            :width="pxToRem(canvasConfig.width)"
            :height="pxToRem(canvasConfig.height + 20)"
            style="position: absolute;top: 0;left: 0;z-index: 2;transform: scale(0.8);"
        ></canvas>
    </div>
</template>

<script>
export default {
    name: 'consume',
    props:{
        canvasConfig:{
            type:Object,
            default(){
                return {}
            }
        },
        animationConfig:{
            type:Object,
            default(){
                return {}
            }
        },
    },
    data(){
        return{
            ctx: null, //canvas对象
            Frame: null, //requestAnimationFrame 对象
            imgList:[],
            ctx2:null,//动画canvas实例
            staticImgList:[
                require("@/assets/images/energy/btn.png"),
                require("@/assets/images/energy/blueBtn.png"),
                require("@/assets/images/energy/greenBtn.png"),
                require("@/assets/images/energy/blueArrow.png"),
                require("@/assets/images/energy/greenArrow.png"),
            ],
        }
    },
    mounted() {
        this.drawDesigns()
    },
    methods:{
        drawDesigns(){
            let {triangleConfig,arcConfig:arcList,center:centerDrop,staticImg}= this.canvasConfig
            // 获取canvas上下文
            const canvas = document.querySelector("#myCanvas");
            const ctx = canvas.getContext("2d");
            //获取静态图 element
            //画静态图
            let images = this.staticImgList
            let imgList = [];
            images.forEach(e=>{
                let img = new Image();
                img.src = e
                imgList.push(img)
            })
            Promise.all(imgList.map((img, index) => {
                return loadImage(img);
            })).then((loadImgs) => {
                this.imgList = loadImgs
                console.log('promiseAll加载完毕',loadImgs)
                //绘制上下按钮
                this.drawbtn()
                //绘制左右按钮
                this.drawLRbtn()
            })
            triangleConfig.forEach((item,index)=>{
                let {endX,endY,colors,radius,startAngle,endAngle} = item
                //绘制渐变背景三角
                // 创建线性渐变
                const gradient = ctx.createLinearGradient(centerDrop.x,centerDrop.y, endX, endY);
                gradient.addColorStop(0, colors[0]);    // 起始颜色
                gradient.addColorStop(1, colors[1]);   // 终止颜色

                // 绘制三角形
                ctx.beginPath();
                ctx.moveTo(centerDrop.x,centerDrop.y);  // 扇形圆心
                ctx.arc(centerDrop.x,centerDrop.y, radius, startAngle, endAngle, true);  // 绘制扇形
                ctx.closePath();

                // 应用渐变
                ctx.fillStyle = gradient;
                ctx.fill();
            })


            //画三个圆

            arcList.forEach((item, index) => {
                let radius = this.pxToRem(item.radius)
                // 设置边框颜色
                ctx.strokeStyle = item.borderColor; // 设置边框颜色为蓝色
                ctx.lineWidth = 0.5; // 设置边框宽度
                // 执行函数
                ctx.beginPath();
                ctx.arc(centerDrop.x,centerDrop.y,radius,0,2*Math.PI);
                ctx.fillStyle = item.bgColor; // 设置圆的填充颜色为浅绿色
                ctx.fill(); // 填充圆
                ctx.stroke();// 绘制圆的边框
            });
            //画静态图
            // 声明一个空数组来存放图片对象
            const staticImgArray = [];
            staticImg.forEach((item,index)=>{
                const img = new Image();
                img.src = item.src;//蓝箭头
                staticImgArray.push(img);  // 将图片对象存入数组
                console.log('staticImg' + index, img);  // 输出图片对象
            })
            // 使用 map 方法同时进行图片加载和绘制
            staticImgArray.map((img, index) => {
                return loadImage(img).then((loadedImg) => {
                    const { x, y, width, height, isCenter } = staticImg[index];
                    const xPos = isCenter ? centerDrop.x - (width / 2) : x;
                    const yPos = isCenter ? centerDrop.y - (height / 2) : y;
                    this.ctx.drawImage(loadedImg, xPos, yPos, width, height);
                });
            });
            function loadImage(img) {
                return new Promise((resolve, reject) => {
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                });
            }
            this.ctx = ctx;

        },
        //绘制上下按钮
        drawbtn(){
            let {triangleConfig,arcConfig:arcList,center:centerDrop,staticImg,pipeConfig}= this.canvasConfig
            const centerX = centerDrop.x;
            const centerY = centerDrop.y;
            const radius = pipeConfig.radius;
            const ctx = this.ctx;
            ctx.beginPath();
            ctx.arc(centerX,centerY,radius,0,2*Math.PI);
            ctx.strokeStyle = pipeConfig.borderColor;
            ctx.fillStyle = pipeConfig.bgColor; // 设置圆的填充颜色为浅绿色
            ctx.fill(); // 填充圆
            ctx.stroke();// 绘制圆的边框

            // 计算指定角度范围内均匀分布的点的位置
            function calculatePoints(centerX, centerY, radius, startAngle, endAngle, numPoints) {
                const points = [];
                const angleStep = (endAngle - startAngle) / (numPoints + 1);
                for (let i = 1; i <= numPoints; i++) {
                    const angle = startAngle + angleStep * i;
                    const radians = angle * Math.PI / 180;
                    const x = centerX + radius * Math.cos(radians);
                    const y = centerY + radius * Math.sin(radians);
                    points.push({ x, y });
                }
                return points;
            }

            // 计算两个角度范围内均匀分布的6个点的位置
            const pointsTop = calculatePoints(centerX, centerY, radius, 210, 330, pipeConfig.topBtnList.length);
            const pointsBto = calculatePoints(centerX, centerY, radius, 30, 150, pipeConfig.btoBtnList.length);
            // 绘制这些点
            ctx.beginPath();
            //绘制顶部按钮
            pointsTop.forEach((point,index) => {
                ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
                ctx.fill();
                //绘制矩形
                const pointA =  { x:centerDrop.x,y:centerDrop.y}
                const pointB = { x:point.x,y:point.y}
                // 计算连线的斜率
                const slope = (pointB.y - pointA.y) / (pointB.x - pointA.x);
                // 计算垂直于连线的斜率
                const perpendicularSlope = -1 / slope;
                // 定义矩形的中心点坐标和宽高
                const centerX = point.x;
                const centerY = point.y;
                const width = 180;
                const height = 70;

                // 保存 Canvas 的初始状态
                ctx.save();

                // 将 Canvas 平移至矩形的中心点
                ctx.translate(centerX, centerY);

                // 旋转 Canvas 90 度（π/2 弧度），实现垂直对齐
                ctx.rotate(perpendicularSlope);

                //绘制蓝色按钮

                ctx.drawImage(this.imgList[0], -width / 2, -80, width, height);
                ctx.fillStyle = "#ffffff"
                // 定义文本内容和字体样式
                const text = pipeConfig.topBtnList[index].name;
                const fontSize = 30;
                ctx.font = `${fontSize}px Arial`;

                // 测量文本的宽度
                const textWidth = ctx.measureText(text).width;
                ctx.fillText(text,(width-textWidth)/2-(width/2),-36);
                // 恢复 Canvas 的初始状态
                ctx.restore();

            });
            //绘制底部按钮
            pointsBto.forEach((point,index) => {
                ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
                ctx.fill();


                //绘制矩形
                const pointA = { x:centerDrop.x,y:centerDrop.y}
                const pointB = { x:point.x,y:point.y}
                // 计算连线的斜率
                const slope = (pointB.y - pointA.y) / (pointB.x - pointA.x);
                // 计算垂直于连线的斜率
                const perpendicularSlope = -1 / slope;
                // 定义矩形的中心点坐标和宽高
                const centerX = point.x;
                const centerY = point.y;
                const width = 180;
                const height = 70;

                // 保存 Canvas 的初始状态
                ctx.save();

                // 将 Canvas 平移至矩形的中心点
                ctx.translate(centerX, centerY);

                // 旋转 Canvas 90 度（π/2 弧度），实现垂直对齐
                ctx.rotate(perpendicularSlope);

                //绘制蓝色按钮
                //绘制蓝色按钮
                const image = document.getElementById('btnImg')
                ctx.drawImage(this.imgList[0], -width / 2, 20, width, height);
                ctx.fillStyle = "#ffffff"
                // 定义文本内容和字体样式
                const text = pipeConfig.btoBtnList[index].name;
                const fontSize = 36;
                ctx.font = `${fontSize}px Arial`;

                // 测量文本的宽度
                const textWidth = ctx.measureText(text).width;
                ctx.fillStyle = "#ffffff"
                ctx.fillText(text,(width-textWidth)/2-(width/2),70);
                // 恢复 Canvas 的初始状态
                ctx.restore();

            });
            //在每个点的位置上画长度为180的两条线段和箭头
            ctx.lineWidth = 2;
            //绘制顶部箭头
            pointsTop.forEach((point, index) => {
                const dx = centerX - point.x;
                const dy = centerY - point.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const ratio = 180 / distance;
                const endX = point.x + dx * ratio;
                const endY = point.y + dy * ratio;

                // 计算两条线的偏移量
                const offsetX = 12 * dy / distance;
                const offsetY = 12 * dx / distance;
                //斜率
                const angle = Math.atan2(endY - point.y, endX - point.x);

                //根据进出判断绘制哪条线
                //进线
                if(pipeConfig.topBtnList[index].in){
                    // 绘制第一条线段
                    ctx.beginPath();
                    ctx.strokeStyle = '#0C55E7';
                    ctx.moveTo(point.x - offsetX, point.y + offsetY);
                    ctx.lineTo(endX - offsetX, endY + offsetY);
                    ctx.stroke();
                    // 在线的终点添加箭头
                    //顶部左侧线
                    ctx.beginPath();
                    ctx.strokeStyle = '#0C55E7';
                    ctx.moveTo(endX - offsetX, endY + offsetY);
                    ctx.lineTo(endX - offsetX - 20 * Math.cos(angle - Math.PI / 6), endY + offsetY - 20 * Math.sin(angle - Math.PI / 6));
                    ctx.stroke();

                    //绘制线上文字
                    // 计算出文字的起点坐标
                    const offsetX1 = 30 * Math.cos(angle + Math.PI / 2); // 以x2为基准，计算偏移量
                    const offsetY1 = 30 * Math.sin(angle + Math.PI / 2); // 以y2为基准，计算偏移量
                    const textX = endX - offsetX + offsetX1;
                    const textY = endY + offsetY + offsetY1;

                    // 在指定位置绘制文字
                    let textSize = 20;
                    ctx.save();
                    ctx.translate(textX, textY);
                    ctx.rotate(angle + 180 * Math.PI / 2); // // 逆时针旋转90度
                    ctx.fillStyle = "#0C55E7"
                    ctx.font = `${textSize}px Arial`;
                    // 测量文本的宽度
                    const text = pipeConfig.topBtnList[index].inDesc;
                    let textWidth = ctx.measureText(text).width;
                    //若是文字大于 线段长度,则缩减文字大小
                    if(textWidth > 180){
                        textSize = 16
                        ctx.font = `${textSize}px Arial`;
                        textWidth = ctx.measureText(text).width;
                    }
                    ctx.fillText(text, -((180 - textWidth) / 2)-textWidth,0);
                    ctx.restore();

                    //绘制线上流量值
                    // 计算出文字的起点坐标
                    const offsetValueX1 = 55 * Math.cos(angle + Math.PI / 2); // 以x2为基准，计算偏移量
                    const offsetValueY1 = 55 * Math.sin(angle + Math.PI / 2); // 以y2为基准，计算偏移量
                    const textValueX = endX - offsetX + offsetValueX1;
                    const textValueY = endY + offsetY + offsetValueY1;

                    // 在指定位置绘制文字
                    let textValueSize = 16;
                    ctx.save();
                    ctx.translate(textValueX, textValueY);
                    ctx.rotate(angle + 180 * Math.PI / 2); // // 逆时针旋转90度
                    ctx.fillStyle = "#0C55E7"
                    ctx.font = `${textValueSize}px Arial`;
                    // 测量文本的宽度
                    const textValue = pipeConfig.topBtnList[index].inValue;
                    let textValueWidth = ctx.measureText(textValue).width;
                    //若是文字大于 线段长度,则缩减文字大小
                    if(textValueWidth > 180){
                        textValueSize = 16
                        ctx.font = `${textValueSize}px Arial`;
                        textValueWidth = ctx.measureText(text).width;
                    }
                    ctx.fillText(textValue, -((180 - textValueWidth) / 2)-textValueWidth,0);
                    ctx.restore();
                }
                //出线
                if(pipeConfig.topBtnList[index].out){
                    // 绘制第二条线段
                    ctx.beginPath();
                    ctx.strokeStyle = '#07BB18';
                    ctx.moveTo(point.x + offsetX, point.y - offsetY);
                    ctx.lineTo(endX + offsetX, endY - offsetY);
                    ctx.stroke();
                    // 在线的起点添加箭头
                    //顶部右侧线
                    ctx.beginPath();
                    ctx.strokeStyle = '#07BB18';
                    ctx.moveTo(point.x + offsetX, point.y - offsetY);
                    ctx.lineTo(point.x + offsetX+ 20 * Math.cos(angle - Math.PI / 6), point.y - offsetY + 20 * Math.sin(angle - Math.PI / 6));
                    ctx.stroke();

                    //绘制线上文字
                    // 计算出文字的起点坐标
                    const offsetX1 = 30 * Math.cos(angle - Math.PI / 2); // 以x2为基准，计算偏移量
                    const offsetY1 = 30 * Math.sin(angle - Math.PI / 2); // 以y2为基准，计算偏移量
                    const textX = point.x + offsetX + offsetX1;
                    const textY = point.y - offsetY + offsetY1;

                    // 在指定位置绘制文字
                    let textSize = 20;
                    ctx.save();
                    ctx.translate(textX, textY);
                    ctx.rotate(angle + 180 * Math.PI / 2); // // 逆时针旋转90度
                    ctx.fillStyle = "#07BB18"
                    ctx.font = `${textSize}px Arial`;
                    // 测量文本的宽度
                    const text = pipeConfig.topBtnList[index].outDesc;
                    let textWidth = ctx.measureText(text).width;
                    //若是文字大于 线段长度,则缩减文字大小
                    if(textWidth > 180){
                        textSize = 16
                        ctx.font = `${textSize}px Arial`;
                        textWidth = ctx.measureText(text).width;
                    }
                    ctx.fillText(text, ((180 - textWidth) / 2),10);
                    ctx.restore();

                    //绘制线上流量值
                    // 计算出文字的起点坐标
                    const offsetValueX1 = 55 * Math.cos(angle - Math.PI / 2); // 以x2为基准，计算偏移量
                    const offsetValueY1 = 55 * Math.sin(angle - Math.PI / 2); // 以y2为基准，计算偏移量
                    const textValueX = point.x + offsetX + offsetValueX1;
                    const textValueY = point.y - offsetY + offsetValueY1;


                    // 在指定位置绘制文字
                    let textValueSize = 16;
                    ctx.save();
                    ctx.translate(textValueX, textValueY);
                    ctx.rotate(angle + 180 * Math.PI / 2); // // 逆时针旋转90度
                    ctx.fillStyle = "#07BB18"
                    ctx.font = `${textValueSize}px Arial`;
                    // 测量文本的宽度
                    const textValue = pipeConfig.topBtnList[index].outValue;
                    let textValueWidth = ctx.measureText(textValue).width;
                    //若是文字大于 线段长度,则缩减文字大小
                    if(textValueWidth > 180){
                        textValueSize = 16
                        ctx.font = `${textValueSize}px Arial`;
                        textValueWidth = ctx.measureText(text).width;
                    }
                    ctx.fillText(textValue, ((180 - textValueWidth) / 2),10);
                    ctx.restore();
                }
            });
            //绘制底部箭头
            pointsBto.forEach((point, index) => {
                const dx = centerX - point.x;
                const dy = centerY - point.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const ratio = 180 / distance;
                const endX = point.x + dx * ratio;
                const endY = point.y + dy * ratio;

                // 计算两条线的偏移量
                const offsetX = 12 * dy / distance;
                const offsetY = 12 * dx / distance;

                const angle = Math.atan2(endY - point.y, endX - point.x);

                //根据进出判断绘制哪条线
                //进线
                if(pipeConfig.btoBtnList[index].in){
                    // 绘制第一条线段
                    ctx.beginPath();
                    ctx.strokeStyle = '#0C55E7';
                    ctx.moveTo(point.x + offsetX, point.y - offsetY);
                    ctx.lineTo(endX + offsetX, endY - offsetY);
                    ctx.stroke();

                    //顶部右侧线
                    ctx.beginPath();
                    ctx.strokeStyle = '#0C55E7';
                    ctx.moveTo(endX + offsetX, endY - offsetY);
                    ctx.lineTo(endX + offsetX - 20 * Math.cos(angle + Math.PI / 6), endY - offsetY - 20 * Math.sin(angle + Math.PI / 6));
                    ctx.stroke();

                    //绘制线上文字
                    // 计算出文字的起点坐标
                    const offsetX1 = 30 * Math.cos(angle - Math.PI / 2); // 以x2为基准，计算偏移量
                    const offsetY1 = 30 * Math.sin(angle - Math.PI / 2); // 以y2为基准，计算偏移量
                    const textX = point.x + offsetX + offsetX1;
                    const textY = point.y - offsetY + offsetY1;

                    // 在指定位置绘制文字
                    let textSize = 20;
                    ctx.save();
                    ctx.translate(textX, textY);
                    ctx.rotate(angle + 180 * Math.PI / 2); // // 逆时针旋转90度
                    ctx.fillStyle = "#0C55E7"
                    ctx.font = `${textSize}px Arial`;
                    // 测量文本的宽度
                    const text = pipeConfig.btoBtnList[index].inDesc;
                    let textWidth = ctx.measureText(text).width;
                    //若是文字大于 线段长度,则缩减文字大小
                    if(textWidth > 180){
                        textSize = 16
                        ctx.font = `${textSize}px Arial`;
                        textWidth = ctx.measureText(text).width;
                    }
                    ctx.fillText(text, ((180 - textWidth) / 2),10);
                    ctx.restore();

                    //绘制线上流量值
                    // 计算出文字的起点坐标
                    const offsetValueX1 = 55 * Math.cos(angle - Math.PI / 2); // 以x2为基准，计算偏移量
                    const offsetValueY1 = 55 * Math.sin(angle - Math.PI / 2); // 以y2为基准，计算偏移量
                    const textValueX = point.x + offsetX + offsetValueX1;
                    const textValueY = point.y - offsetY + offsetValueY1;

                    // 在指定位置绘制文字
                    let textValueSize = 16;
                    ctx.save();
                    ctx.translate(textValueX, textValueY);
                    ctx.rotate(angle + 180 * Math.PI / 2); // // 逆时针旋转90度
                    ctx.fillStyle = "#0C55E7"
                    ctx.font = `${textValueSize}px Arial`;
                    // 测量文本的宽度
                    const textValue = pipeConfig.btoBtnList[index].inValue;
                    let textValueWidth = ctx.measureText(textValue).width;
                    //若是文字大于 线段长度,则缩减文字大小
                    if(textValueWidth > 180){
                        textValueSize = 16
                        ctx.font = `${textValueSize}px Arial`;
                        textValueWidth = ctx.measureText(textValue).width;
                    }
                    ctx.fillText(textValue, ((180 - textValueWidth) / 2),10);
                    ctx.restore();
                }
                if(pipeConfig.btoBtnList[index].out){
                    // 绘制第二条线段
                    ctx.beginPath();
                    ctx.strokeStyle = '#07BB18';
                    ctx.moveTo(point.x - offsetX, point.y + offsetY);
                    ctx.lineTo(endX - offsetX, endY + offsetY);
                    ctx.stroke();
                    // 在线的起点添加箭头
                    //顶部左侧线
                    ctx.beginPath();
                    ctx.strokeStyle = '#07BB18';
                    ctx.moveTo(point.x - offsetX, point.y + offsetY);
                    ctx.lineTo(point.x - offsetX+ 20 * Math.cos(angle + Math.PI / 6), point.y + offsetY+ 20 * Math.sin(angle + Math.PI / 6));
                    ctx.stroke();

                    //绘制线上文字
                    // 计算出文字的起点坐标
                    const offsetX1 = 30 * Math.cos(angle + Math.PI / 2); // 以x2为基准，计算偏移量
                    const offsetY1 = 30 * Math.sin(angle + Math.PI / 2); // 以y2为基准，计算偏移量
                    const textX = endX - offsetX + offsetX1;
                    const textY = endY + offsetY + offsetY1;

                    // 在指定位置绘制文字
                    let textSize = 20;
                    ctx.save();
                    ctx.translate(textX, textY);
                    ctx.rotate(angle + 180 * Math.PI / 2); // // 逆时针旋转90度
                    ctx.fillStyle = "#07BB18"
                    ctx.font = `${textSize}px Arial`;
                    // 测量文本的宽度
                    const text = pipeConfig.btoBtnList[index].outDesc;
                    let textWidth = ctx.measureText(text).width;
                    //若是文字大于 线段长度,则缩减文字大小
                    if(textWidth > 180){
                        textSize = 16
                        ctx.font = `${textSize}px Arial`;
                        textWidth = ctx.measureText(text).width;
                    }
                    ctx.fillText(text, -((180 - textWidth) / 2)-textWidth,0);
                    ctx.restore();

                    //绘制线上流量值
                    // 计算出文字的起点坐标
                    const offsetValueX1 = 55 * Math.cos(angle + Math.PI / 2); // 以x2为基准，计算偏移量
                    const offsetValueY1 = 55 * Math.sin(angle + Math.PI / 2); // 以y2为基准，计算偏移量
                    const textValueX = endX - offsetX + offsetValueX1;
                    const textValueY = endY + offsetY + offsetValueY1;

                    // 在指定位置绘制文字
                    let textValueSize = 16;
                    ctx.save();
                    ctx.translate(textValueX, textValueY);
                    ctx.rotate(angle + 180 * Math.PI / 2); // // 逆时针旋转90度
                    ctx.fillStyle = "#07BB18"
                    ctx.font = `${textValueSize}px Arial`;
                    // 测量文本的宽度
                    const textValue = pipeConfig.btoBtnList[index].outValue;
                    let textValueWidth = ctx.measureText(textValue).width;
                    //若是文字大于 线段长度,则缩减文字大小
                    if(textValueWidth > 180){
                        textValueSize = 16
                        ctx.font = `${textValueSize}px Arial`;
                        textValueWidth = ctx.measureText(textValue).width;
                    }
                    ctx.fillText(textValue, -((180 - textValueWidth) / 2)-textValueWidth,0);
                    ctx.restore();
                }
            });
            ctx.stroke();
            function loadImage(img) {
                return new Promise((resolve, reject) => {
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                });
            }
        },
        //绘制左右按钮
        drawLRbtn(){
            let {arcConfig,triangleConfig,center:centerDrop,staticImg,pipeConfig,mediumConfig}= this.canvasConfig
            const centerX = centerDrop.x;
            const centerY = centerDrop.y;
            const radius = mediumConfig.radius;
            const ctx = this.ctx;
            ctx.beginPath();
            ctx.arc(centerX,centerY,radius,0,2*Math.PI);
            ctx.strokeStyle = mediumConfig.borderColor;
            ctx.fillStyle = mediumConfig.bgColor; // 设置圆的填充颜色为浅绿色
            ctx.fill(); // 填充圆
            ctx.stroke();// 绘制圆的边框

            // 计算指定角度范围内均匀分布的点的位置
            function calculatePoints(centerX, centerY, radius, startAngle, endAngle, numPoints) {
                const points = [];
                const angleStep = (endAngle - startAngle) / (numPoints + 1);
                for (let i = 1; i <= numPoints; i++) {
                    const angle = startAngle + angleStep * i;
                    const radians = angle * Math.PI / 180;
                    const x = centerX + radius * Math.cos(radians);
                    const y = centerY + radius * Math.sin(radians);
                    points.push({ x, y });
                }
                return points;
            }

            // 计算两个角度范围内均匀分布的6个点的位置
            const pointsLeft = calculatePoints(centerX, centerY, radius, 150, 210, mediumConfig.leftBtnList.length);
            const pointsRight = calculatePoints(centerX, centerY, radius, -30, 30, mediumConfig.rightBtnList.length);
            console.log('左右点位', pointsLeft, pointsRight)

            // 计算两个角度范围内均匀分布的6个点的位置  内圈
            const pointsLeftInner = calculatePoints(centerX, centerY, arcConfig[2].radius, 150, 210, mediumConfig.leftBtnList.length);
            const pointsRightInner = calculatePoints(centerX, centerY, arcConfig[2].radius, -30, 30, mediumConfig.rightBtnList.length);


            //定义数据 用于存储动画路径
            let leftPoints = []
            let rightPoints = []
            //绘制左侧按钮
            pointsLeft.forEach((point,index) => {
                // 定义矩形按钮的中心点坐标和宽高
                const centerX = point.x;
                const centerY = point.y;
                const width = 210;
                const height = 62;

                // 保存 Canvas 的初始状态
                ctx.save();

                // 将 Canvas 平移至矩形的中心点
                ctx.translate(centerX, centerY);

                // // 旋转 Canvas 90 度（π/2 弧度），实现垂直对齐
                // ctx.rotate(perpendicularSlope);

                //绘制蓝色按钮
                ctx.drawImage(this.imgList[1], -width,-height/2, width, height);
                ctx.fillStyle = "#ffffff"
                // 定义文本内容和字体样式
                const text = mediumConfig.leftBtnList[index].name;
                const fontSize = 20;
                ctx.font = `${fontSize}px Arial`;

                // 测量文本的宽度
                const textWidth = ctx.measureText(text).width;
                ctx.fillText(text,-width + ((width - textWidth) / 2),6);
                // 恢复 Canvas 的初始状态
                ctx.restore();

                //绘制连接曲线
                // 调用函数获得路径点并绘制
                const points = getCurvePoints(point.x,point.y,pointsLeftInner[index].x,pointsLeftInner[index].y,60,mediumConfig.leftBtnList.length,index);

                leftPoints.push(points) //存储路径 用于动画
                points.forEach(pointzzz => {
                    ctx.beginPath();
                    ctx.fillStyle = "#878C92"
                    ctx.arc(pointzzz.x, pointzzz.y, 1, 0, Math.PI * 2);
                    ctx.fill();
                });


            });
            this.animationConfig.leftPoints = leftPoints
            //绘制右侧按钮
            pointsRight.forEach((point,index) => {
                // 定义矩形按钮的中心点坐标和宽高
                const centerX = point.x;
                const centerY = point.y;
                const width = 210;
                const height = 62;

                // 保存 Canvas 的初始状态
                ctx.save();

                // 将 Canvas 平移至矩形的中心点
                ctx.translate(centerX, centerY);

                //绘制绿色按钮
                ctx.drawImage(this.imgList[2], 0,-height/2, width, height);
                ctx.fillStyle = "#ffffff"
                // 定义文本内容和字体样式
                const text = mediumConfig.rightBtnList[index].name;
                const fontSize = 20;
                ctx.font = `${fontSize}px Arial`;

                // 测量文本的宽度
                const textWidth = ctx.measureText(text).width;
                ctx.fillText(text,(width - textWidth) / 2,6);
                // 恢复 Canvas 的初始状态
                ctx.restore();

                //绘制连接曲线
                // 调用函数获得路径点并绘制
                const points = getCurvePoints(point.x,point.y,pointsRightInner[index].x,pointsRightInner[index].y,60,mediumConfig.rightBtnList.length,index);

                rightPoints.push(points) //存储路径 用于动画
                console.log('调用函数并绘制右侧路径点',points)
                points.forEach(pointzzz => {
                    ctx.beginPath();
                    ctx.fillStyle = "#878C92"
                    ctx.arc(pointzzz.x, pointzzz.y, 1, 0, Math.PI * 2);
                    ctx.fill();
                });

            });
            this.animationConfig.rightPoints = rightPoints
            //绘制动画箭头
            this.drawAnimation()
            function getCurvePoints(startX, startY, endX, endY, pointCount, segmentCount, currentIndex) {
                const points = [];
                const asc  =(startX - endX > 1)? false : true;//线段方向  左右
                //贝塞尔曲线 求 P1StartX
                let P1StartX = asc ? startX+50 : startX-50
                for (let i = 0; i <= pointCount; i++) {
                    const t = i / pointCount;
                    const controlY = calculateControlY(currentIndex, segmentCount, t, startY, endY);
                    const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * P1StartX + t * t * endX;
                    const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;
                    points.push({ x, y });
                }
                return points;
            }

            function calculateControlY(currentIndex, segmentCount, t, startY, endY) {
                const segmentHeight = (endY - startY) / segmentCount;
                let controlY;
                if (segmentCount % 2 === 0) {
                    controlY = startY - segmentHeight * 1 - Math.sin(t * Math.PI) * segmentHeight * 1;
                } else {
                    if (currentIndex < Math.floor(segmentCount / 2)) {
                        controlY = startY - segmentHeight * 1 - Math.sin(t * Math.PI) * segmentHeight * 1;
                    } else if (currentIndex === Math.floor(segmentCount / 2)) {
                        controlY = startY;
                    } else {
                        controlY = startY - segmentHeight * 1 - Math.sin(t * Math.PI) * segmentHeight * 1;
                    }
                }
                return controlY;
            }
            //绘制左右曲线上的数值
            //绘制连接线上的数值   取第三个圈 与 中点的位置 书写数值,旋转+偏移
            // 计算两个角度范围内均匀分布的6个点的位置  三圈
            const pointsLeftIThird = calculatePoints(centerX, centerY, arcConfig[1].radius, 150, 210, mediumConfig.leftBtnList.length);
            const pointsRightThird = calculatePoints(centerX, centerY, arcConfig[1].radius, -30, 30, mediumConfig.rightBtnList.length);
            console.log('计算两个角度范围内均匀分布的6个点的位置  三圈',pointsRightThird)
            pointsLeftIThird.forEach((point,index)=>{
                const dx = centerX - point.x;
                const dy = centerY - point.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const ratio = 180 / distance;
                const endX = point.x + dx * ratio;
                const endY = point.y + dy * ratio;

                // 计算两条线的偏移量
                const offsetX = 12 * dy / distance;
                const offsetY = 12 * dx / distance;

                const angle = Math.atan2(endY - point.y, endX - point.x);
                //绘制线上流量值
                // 计算出文字的起点坐标
                const offsetValueX1 = 30 * Math.cos(angle + Math.PI / 2); // 以x2为基准，计算偏移量
                const offsetValueY1 = 30 * Math.sin(angle + Math.PI / 2); // 以y2为基准，计算偏移量
                const textValueX = endX - offsetX + offsetValueX1;
                const textValueY = endY + offsetY + offsetValueY1;

                // 在指定位置绘制文字
                let textValueSize = 18;
                ctx.save();
                ctx.translate(textValueX, textValueY);
                ctx.rotate(angle + 180 * Math.PI / 2); // // 逆时针旋转90度
                ctx.fillStyle = "#0C55E7"
                ctx.font = `${textValueSize}px Arial`;
                // 测量文本的宽度
                const textValue = mediumConfig.leftBtnList[index].Value;
                let textValueWidth = ctx.measureText(textValue).width;
                //若是文字大于 线段长度,则缩减文字大小
                if(textValueWidth > 180){
                    textValueSize = 16
                    ctx.font = `${textValueSize}px Arial`;
                    textValueWidth = ctx.measureText(textValue).width;
                }
                ctx.fillText(textValue, -arcConfig[1].radius-textValueWidth,-50);
                ctx.restore();
            })
            pointsRightThird.forEach((point,index)=>{
                const dx = centerX - point.x;
                const dy = centerY - point.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const ratio = 180 / distance;
                const endX = point.x + dx * ratio;
                const endY = point.y + dy * ratio;

                // 计算两条线的偏移量
                const offsetX = 0 * dy / distance;
                const offsetY = 0 * dx / distance;

                const angle = Math.atan2(endY - point.y, endX - point.x);
                //绘制线上流量值
                // 计算出文字的起点坐标
                const offsetValueX1 = 0 * Math.cos(angle + Math.PI / 2); // 以x2为基准，计算偏移量
                const offsetValueY1 = 0 * Math.sin(angle + Math.PI / 2); // 以y2为基准，计算偏移量
                const textValueX = endX - offsetX + offsetValueX1;
                const textValueY = endY + offsetY + offsetValueY1;
                // 在指定位置绘制文字
                let textValueSize = 18;
                ctx.save();
                ctx.translate(textValueX, textValueY);
                ctx.rotate(angle + 90 * Math.PI / 2); // // 逆时针旋转90度
                ctx.fillStyle = "#07BB18"
                ctx.font = `${textValueSize}px Arial`;
                // 测量文本的宽度
                const textValue = mediumConfig.rightBtnList[index].Value;
                console.log('右侧数值==',index,mediumConfig.rightBtnList[index].Value)
                let textValueWidth = ctx.measureText(textValue).width;
                //若是文字大于 线段长度,则缩减文字大小
                if(textValueWidth > 180){
                    textValueSize = 16
                    ctx.font = `${textValueSize}px Arial`;
                    textValueWidth = ctx.measureText(textValue).width;
                }
                ctx.fillText(textValue, arcConfig[1].radius,-0);
                ctx.restore();
            })
        },
        async loadImage(img) {
            return new Promise((resolve, reject) => {
                img.onload = () => resolve(img);
                img.onerror = reject;
            });
        },
        //canvas动画 绘制
        drawAnimation(){
            // 获取canvas上下文
            const canvas = document.querySelector("#animation");
            const ctx = canvas.getContext("2d");
            this.ctx2 = ctx;
            //开始箭头运动
            this.Frame = requestAnimationFrame(this.runAnimation.bind(this));
            let { rightPoints} = this.animationConfig
            let arr1 = _.cloneDeep(rightPoints)
            this.animationConfig.rightPoints =  arr1.map(e=>{
                return e.reverse()
            })
            function loadImage(img) {
                return new Promise((resolve, reject) => {
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                });
            }
        },
        runAnimation(){

            //绘制箭头
            this.drawArrowFun();
            if (this.animationConfig.moveNowCount < 61) {
                requestAnimationFrame(this.runAnimation.bind(this));
            } else {
                this.animationConfig.moveNowCount = 0
                this.animationConfig.lastPoints1 = [];
                this.animationConfig.lastPoints2 = [];
                requestAnimationFrame(this.runAnimation.bind(this));
                // 在某个时刻停止动画
                // cancelAnimationFrame(this.Frame);
            }
        },
        //运动箭头逻辑
        drawArrowFun(){
            let { leftPoints ,rightPoints ,moveNowCount,width,height,center,lastPoints1,lastPoints2} = this.animationConfig
            this.ctx2.clearRect(0, 0, this.pxToRem(width), this.pxToRem(height));
            for (let i = 0; i < leftPoints.length ; i++) {
                this.drawArrow(leftPoints[i][moveNowCount].x,leftPoints[i][moveNowCount].y,lastPoints1,this.imgList[3])
                this.animationConfig.lastPoints1 = [leftPoints[i][moveNowCount].x,leftPoints[i][moveNowCount].y]
            }
            for (let i = 0; i < rightPoints.length ; i++) {
                this.drawArrow(rightPoints[i][moveNowCount].x,rightPoints[i][moveNowCount].y,lastPoints2,this.imgList[4])
                this.animationConfig.lastPoints2 = [rightPoints[i][moveNowCount].x,rightPoints[i][moveNowCount].y]
            }
            this.animationConfig.moveNowCount += 1
        },
        drawArrow(x, y, lastPoints, img){
            console.log()
            this.ctx2.save();
            // 修改原点
            this.ctx2.translate(x, y);
            // 根据两点角度 旋转 图片角度
            // if (lastPoints.length) {
            //   this.ctx2.rotate(Math.atan2(y - lastPoints[1], x - lastPoints[0]) )
            // } else {
            //   this.ctx2.rotate(Math.atan2(y, x) - Math.atan2(0, -1))
            // }
            // 改变回中心点
            this.ctx2.translate(-x - this.pxToRem(16), -y - this.pxToRem(16));
            this.ctx2.drawImage(img, x, y, this.pxToRem(31), this.pxToRem(33));
            this.ctx2.restore();
        }
    }
}
</script>

<style scoped>

</style>
