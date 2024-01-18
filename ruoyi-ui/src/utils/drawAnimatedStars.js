export function drawAnimatedStars(domID) {
    console.log('绘制canvas', domID)
    console.log('绘制canvas', document.querySelector(domID))
    var canvas = document.createElement('canvas');
    canvas.className = 'rainCanvas'
    var ctx = canvas.getContext("2d");//获取canvas上下文
    canvas.width = document.querySelector(domID).clientWidth;
    canvas.height = document.querySelector(domID).clientHeight;

    var stars = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createRandomStars() {
        stars = [];
        for (var i = 0; i < 30; i++) {
            var x = Math.random() * canvas.width;
            var y = Math.random() * canvas.height;
            var size = Math.random() * 10 + 1;
            var color = getRandomColor();
            var offset = Math.random() * 1000;
            stars.push({x: x, y: y, size: size, color: color, offset: offset});
        }
    }

    function getRandomColor() {
        let colorList = ['#00ffff', '#00cccc', '#ffffff', '#00ccff'];
        return colorList[Math.floor(Math.random() * colorList.length)];
    }

    function drawBreathingStar(x, y, size, color, offset) {
        ctx.save();

        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.closePath();

        ctx.fillStyle = color;
        ctx.shadowBlur = size;
        ctx.shadowColor = color;
        ctx.globalAlpha = Math.abs(Math.sin((Date.now() + offset) * 0.0005));
        ctx.fill();

        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < stars.length; i++) {
            var star = stars[i];
            drawBreathingStar(star.x, star.y, star.size, star.color, star.offset);
        }

        requestAnimationFrame(animate);
    }

    resizeCanvas();
    createRandomStars();
    setInterval(createRandomStars, 10000);

    animate();
    window.addEventListener("resize", resizeCanvas);
    document.querySelector(domID).appendChild(canvas);
    document.querySelector(`.rainCanvas`).style.position = 'absolute'
    document.querySelector(`.rainCanvas`).style.top = '0px'
    document.querySelector(`.rainCanvas`).style.left = '0px'
    document.querySelector(`.rainCanvas`).style.zIndex = 0
    document.querySelector(`.rainCanvas`).style.pointerEvents = 'none'
}

