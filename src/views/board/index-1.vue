<template>
    <!--一级看板2-->
    <div class="i-container">
        <div style="position: absolute; top: 0; width: 100%; height: 9%">
            <div
                style="width: 10%; height: 100%; cursor: pointer; float: left"
                @click="linkTo('Board/index-2')"
            ></div>
            <div
                style="width: 50%; height: 100%; margin: 0 auto; cursor: pointer"
                @click="linkTo('Index')"
            ></div>
            <div
                style="width: 10%; height: 100%; cursor: pointer; float: right"
                @click="linkTo('Board/index-2')"
            ></div>
        </div>
        <div class="i-content">
            <div class="left flex flex-direction justify-around">
                <!--安全管理-->
                <safe style="height: 32%; width: 100%"></safe>
                <!--质量管理-->
                <quality style="height: 32%"></quality>
                <!--智能管理-->
                <monitor style="height: 32%"></monitor>
            </div>
            <div class="center">
                <!--跳动方块-->
<!--                <div class="jumps cs" @click="linkToV3">-->
<!--                    <img src="@/assets/images/boardFinal/jump1.png" alt class="jump1" />-->
<!--                    <img src="@/assets/images/boardFinal/jump2.png" alt class="jump2" />-->
<!--                    <img src="@/assets/images/boardFinal/jump3.png" alt class="jump3" />-->
<!--                    <img src="@/assets/images/boardFinal/jump4.png" alt class="jump4" />-->
<!--                    <img src="@/assets/images/boardFinal/jump5.png" alt class="jump5" />-->
<!--                    <img src="@/assets/images/boardFinal/jump6.png" alt class="jump6" />-->
<!--                    <img src="@/assets/images/boardFinal/jump7.png" alt class="jump7" />-->
<!--                    <img src="@/assets/images/boardFinal/jump8.png" alt class="jump8" />-->
<!--                </div>-->
                <!--底部按钮-->
                <div class="foot flex">
                    <div
                        class="box flex flex-direction align-center self-start cs"
                    >
                        <img src="@/assets/images/boardFinal/btn1.png" alt class="img" />
                        <div class="name">生产管理</div>
                    </div>
                    <div
                        class="box flex flex-direction align-center self-center cs"
                    >
                        <img src="@/assets/images/boardFinal/btn2.png" alt class="img" />
                        <div class="name">进出厂管理</div>
                    </div>
                    <div
                        class="box flex flex-direction align-center self-end"
                    >
                        <img src="@/assets/images/boardFinal/btn3.png" alt class="img" />
                        <div class="name">智能监控</div>
                    </div>
                    <div
                        class="box flex flex-direction align-center self-end cs"
                    >
                        <img src="@/assets/images/boardFinal/btn4.png" alt class="img" />
                        <div class="name">罐区管理</div>
                    </div>
                    <div
                        class="box flex flex-direction align-center self-center cs"
                    >
                        <img src="@/assets/images/boardFinal/btn5.png" alt class="img" />
                        <div class="name">设备管理</div>
                    </div>
                    <div
                        class="box flex flex-direction align-center self-start cs"
                    >
                        <img src="@/assets/images/boardFinal/btn6.png" alt class="img" />
                        <div class="name">智慧能源</div>
                    </div>
                </div>
            </div>
            <div class="right">
                <!--生产管理-->
                <Produce style="height: 32%"></Produce>
                <!--设备管理-->
                <Equipment style="height: 32%"></Equipment>
                <!--智慧能源-->
                <Energy style="height: 34%"></Energy>
            </div>
        </div>
    </div>
</template>

<script>
import Safe from "@/views/board/common/safe";
import Monitor from "@/views/board/common/monitor";
import Quality from "@/views/board/common/quality";
import Produce from "@/views/board/common/produce";
import Equipment from "@/views/board/common/equipment";
import Energy from "@/views/board/common/energy";

export default {
    name: "index-1",
    data() {
        return {
            mainScale: 1,
        };
    },
    components: { Safe, Monitor, Quality, Produce, Equipment, Energy },
    mounted() {
        var self = this;
        function handleResize() {
            var width = window.innerWidth;
            var height = window.innerHeight;
            self.mainScale = width / 1920;
        }
        // 初始化时调用一次处理函数
        handleResize();
        // 添加 resize 事件监听器
        window.addEventListener("resize", handleResize);
    },
    created() {},
    methods: {
        //页面数据接口
        linkToV3() {
            this.$router.push({
                path: "/boardFinalv3",
            });
        },
        linkTo(name) {
            this.$router.push({
                name: name,
            })
        },
    },
};
</script>

<style lang="scss" scoped>
.i-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-x: hidden;
    background: url("~@/assets/images/board/title-bg.png")
    no-repeat center 0,
    url("~@/assets/images/imgAdapter/index1-bg-1920-2.jpg") no-repeat center;
    background-size: 96%, 100%;
    background-color: #020a58;
    .i-content {
        height: 92%;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;

        .left {
            width: 27%;
            height: 100%;
            //background-color: pink;
        }

        .center {
            width: 41%;
            height: 100%;
            //background: url("~@/assets/images/boardFinal/line-bg.png") no-repeat center
            //70%;
            //background-size: 80%;
            position: relative;

            .jumps {
                width: 100%;
                height: 60%;
                position: absolute;
                left: 0;
                top: 30px;
                transform: scale(1);

                .jump1 {
                    width: 75px;
                    height: 73px;
                    position: absolute;
                    top: 50px;
                    left: 180px;
                    animation: jump 5000ms linear infinite;
                }

                .jump2 {
                    width: 70px;
                    height: 70px;
                    position: absolute;
                    top: 0;
                    right: 160px;
                    animation: jump 6000ms linear infinite;
                }

                .jump3 {
                    width: 37px;
                    height: 37px;
                    position: absolute;
                    top: 200px;
                    left: 180px;
                    animation: jump 7000ms linear infinite;
                }

                .jump4 {
                    width: 80px;
                    height: 86px;
                    position: absolute;
                    top: 180px;
                    right: 160px;
                    animation: jump 9000ms linear infinite;
                }

                .jump5 {
                    width: 105px;
                    height: 108px;
                    position: absolute;
                    top: 300px;
                    left: 140px;
                    animation: jump 18000ms linear infinite;
                }

                .jump6 {
                    width: 75px;
                    height: 73px;
                    position: absolute;
                    top: 260px;
                    right: 40px;
                    animation: jump 10000ms linear infinite;
                }

                .jump7 {
                    width: 34px;
                    height: 41px;
                    position: absolute;
                    top: 170px;
                    left: 60px;
                    animation: jump 12000ms linear infinite;
                }

                .jump8 {
                    width: 56px;
                    height: 68px;
                    position: absolute;
                    top: 360px;
                    right: 80px;
                    animation: jump 8000ms linear infinite;
                }
            }

            .foot {
                width: 100%;
                height: 250px;
                position: absolute;
                left: 0;
                bottom: 30px;

                .box {
                    width: calc(100% / 6);

                    .img {
                        width: 157px;
                        height: 150px;
                    }

                    .name {
                        font-size: 21px;
                        font-weight: 400;
                        color: #d3dde8;
                    }
                }
            }

            @keyframes jump {
                0% {
                    translate: 0 20px;
                }
                50% {
                    translate: 0 0;
                }
                100% {
                    translate: 0 20px;
                }
            }
        }

        .right {
            width: 27%;
            height: 100%;
        }
    }
}
@media (min-aspect-ratio: 1920/1080) and (max-aspect-ratio: 1920/1080) {
    .i-container {
        background: url("~@/assets/images/board/title-bg.png")
        no-repeat center 0,
        url("~@/assets/images/imgAdapter/index1-bg-1920-2.jpg") no-repeat center;
        background-size: 96%, 100%;
        background-color: #020a58;
        .i-content {
            .center {
                //background: url("~@/assets/images/boardFinal/line-bg.png") no-repeat
                //center 70%;
                //background-size: 80%;
            }
        }
    }
}
@media (min-aspect-ratio: 2560/1664) and (max-aspect-ratio: 2560/1600) {
    .i-container {
        background: url("~@/assets/images/board/title-bg.png")
        no-repeat center 0,
        url("~@/assets/images/imgAdapter/index1-bg-2560-2.jpg") no-repeat center;
        background-size: 96%, 100%;
        background-color: #020a58;
        .i-content {
            .center {
                //background: url("~@/assets/images/boardFinal/line-bg2560.png") no-repeat
                //center 76%;
                //background-size: 84%;
            }
        }
    }
}
@media (min-aspect-ratio: 4/3) and (max-aspect-ratio: 4/3) {
    .i-container {
        background: url("~@/assets/images/board/title-bg.png")
        no-repeat center 0,
        url("~@/assets/images/imgAdapter/index1-bg-2496-2.jpg") no-repeat center;
        background-size: 96%, 100%;
        background-color: #020a58;
        .i-content {
            .center {
                //background: url("~@/assets/images/boardFinal/line-bg2496.png") no-repeat
                //center 80%;
                //background-size: 80%;
            }
        }
    }
}
</style>
