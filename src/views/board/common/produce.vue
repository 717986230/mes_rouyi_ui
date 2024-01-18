<template>
  <!--生产管理-->
  <div class="p-container flex flex-direction align-center justify-between">
    <title-bar :isLeft="false" title="罐区管理"></title-bar>
    <div class="top flex">
      <div class="total flex justify-start align-center">
        <p-total :total="be.classesProduction"></p-total>
      </div>
      <div class="list">
        <p-list :pieList="pieList"></p-list>
      </div>
    </div>
    <div class="foot flex justify-around">
      <!--      <p-box :imgId="1" :rotate="60" style="width: 30%;height: 100%"></p-box>-->
      <!--      <p-box :imgId="2" :rotate="120" style="width: 30%;height: 100%"></p-box>-->
      <!--      <p-box :imgId="3" :rotate="150" style="width: 30%;height: 100%"></p-box>-->
      <p-box
        v-for="(item, index) in pieList"
        :key="index"
        :total="item.classesProduction"
        :hourOutput="item.hourProduction"
        :colorArr="item.colorArr"
        :name="item.productName+'占比'"
        style="width: 30%; height: 100%"
      ></p-box>
      <!--      <p-box :total="187"  :hourOutput="19" :colorArr="['rgba(4,81,229,1)','rgba(4,81,229,0)']" name="总装当班产量" style="width: 30%;height: 100%"></p-box>-->
      <!--      <p-box :total="188"  :hourOutput="20" :colorArr="['rgba(4,220,215,1)','rgba(4,220,215,0)']" name="涂装当班产量" style="width: 30%;height: 100%"></p-box>-->
      <!--      <p-box :total="189"  :hourOutput="21" :colorArr="['rgba(223,218,10,1)','rgba(223,218,10,0)']" name="美装当班产量" style="width: 30%;height: 100%"></p-box>-->
    </div>
  </div>
</template>

<script>
import TitleBar from "@/views/board/common/titleBar";
import pTotal from "@/views/board/common/produceTotal";
import pList from "@/views/board/common/produceList";
import pBox from "@/views/board/common/produceCharts";
export default {
  name: "produce",
  components: { TitleBar, pTotal, pList, pBox },
  data() {
    return {
      be: {
        classesProduction: 0,
      }, //总装生产量
      nu: {}, //美装节拍
      pa: {}, //涂装节拍
      to: {}, //总装节拍
      pieList: [
        {
          currentBeat: "136780",
          classesProduction: 0,
          hourProduction: 0,
          colorArr: ["rgba(4,81,229,1)", "rgba(4,81,229,0)"],
          productName: "原料罐存",
            img: require("@/assets/images/board/icon (30).png"),
            color:'rgba(4,81,229,1)',
        },
        {
          currentBeat: "89750",
          classesProduction: 0,
          hourProduction: 0,
          colorArr: ["rgba(4,220,215,1)", "rgba(4,220,215,0)"],
          productName: "半成品罐存",
            img: require("@/assets/images/board/icon (30).png"),
            color:'rgba(4,220,215,1)',
        },
        {
          currentBeat: "110035",
          classesProduction: 0,
          hourProduction: 0,
          colorArr: ["rgba(223,218,10,1)", "rgba(223,218,10,0)"],
          productName: "产成品罐存",
            img: require("@/assets/images/board/icon (30).png"),
            color:'rgba(223,218,10,1)',
        },
      ],
      timeId: null,
    };
  },
  created() {
    this.getDate();
    this.timeId = setInterval(() => {
      this.getDate();
    }, 15000);
  },
  mounted() {},
  beforeDestroy() {
    clearInterval(this.timeId);
  },
  methods: {
    getDate() {
      this.$api.KBSYnumberAndBeay().then((res) => {
        if (res.code === 200) {
          let data = res.data;
          this.be = data.numberProduceMainEentity; //美装节拍
          let nbe = data.beautifulProduceMainEentity; //美装节拍
          let nu = data.numberProduceMainEentity; //当班
          let pa = data.paintingProduceMainEentity; //涂装节拍
          let to = data.totalProduceMainEentity; //总装节拍
          this.pieList = [
            {
              area: "总装",
              ...to,
              productName: "总装当班产量",
              img: require("@/assets/images/board/icon (30).png"),
              color: "#0290FF",
              colorArr: ["rgba(4,81,229,1)", "rgba(4,81,229,0)"],
            },
            {
              area: "涂装",
              img: require("@/assets/images/board/icon (30).png"),
              color: "#00FFFF",
              ...pa,
              productName: "涂装当班产量",
              colorArr: ["rgba(4,220,215,1)", "rgba(4,220,215,0)"],
            },

            {
              area: "美装",
              color: "#FFF11E",
              img: require("@/assets/images/board/icon (30).png"),
              ...nbe,
              productName: "美装当班产量",
              colorArr: ["rgba(223,218,10,1)", "rgba(223,218,10,0)"],
            },
          ];
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.p-container {
  .top {
    height: 55%;
    width: 100%;
    .total {
      width: 50%;
      height: 100%;
    }
    .list {
      width: 50%;
      height: 100%;
    }
  }
  .foot {
    height: 30%;
    width: 100%;
  }
}
</style>
