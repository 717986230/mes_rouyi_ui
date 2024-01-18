<template>
  <div class="e-container flex flex-direction align-center justify-between">
    <title-bar :isLeft="false" title="智慧能源"></title-bar>
    <div class="content">
      <type-list :data-list="typeList"></type-list>
      <div class="bottom flex justify-around" style="height: 66%">
        <pic-chart
          style="width: 40%; height: 100%"
          :data-list="numList"
          :total="total"
        ></pic-chart>
        <num-list
          style="width: 60%; height: 100%"
          :data-list="numList"
        ></num-list>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from "@/views/board/common/titleBar";
import TypeList from "@/views/board/common/eneryType";
import PicChart from "@/views/board/common/enerycharts";
import NumList from "@/views/board/common/eneryList";

export default {
  name: "energy",
  components: { TitleBar, TypeList, PicChart, NumList },

  data() {
    return {
      KBSYenergyList: [], //智慧能源
      typeList: [
        {
          name: "1号空压机",
          status: 1,
          type: "运行",
        },
        {
          name: "2号空压机",
          status: 0,
          type: "未运行",
        },
        {
          name: "3号空压机",
          status: 1,
          type: "运行",
        },
        {
          name: "4号空压机",
          status: 1,
          type: "运行",
        },
        {
          name: "5号空压机",
          status: 0,
          type: "未运行",
        },
        {
          name: "6号空压机",
          status: 1,
          type: "运行",
        },
      ],
      total: 0,
      numList: [
        {
          name: "装置",
          value: 456,
          color: "#2674F5",
          itemStyle: { normal: { color: "#2674F5" } },
        },
        {
          name: "罐区",
          value: 125,
          color: "#08FFEB",
          itemStyle: { normal: { color: "#08FFEB" } },
        },
        {
          name: "仓库",
          value: 189,
          color: "#FEF508",
          itemStyle: { normal: { color: "#FEF508" } },
        },
        {
          name: "装卸台",
          value: 80,
          color: "#AA08FE",
          itemStyle: { normal: { color: "#AA08FE" } },
        },
        {
          name: "其他",
          value: 1205,
          color: "#FE9308",
          itemStyle: { normal: { color: "#FE9308" } },
        },
      ],
      timeId: null,
    };
  },
  created() {
    this.getDate();
    this.timeId = setInterval(() => {
      this.getDate();
    }, 30000);
  },
  beforeDestroy() {
    clearInterval(this.timeId);
  },
  mounted() {},
  methods: {
    getDate() {
      this.$api
        .KYJdetail({
          name: "",
        })
        .then((res) => {
          if (res.code == 200) {
            let data = res.data;

            // 遍历 typeList 数组
            for (const item of this.typeList) {
              // 根据名称查找匹配的数据对象
              const match = data.find((d) => d['名称'] === item.name);
              // 如果找到匹配的对象
              if (match) {
                // 提取空压机运行状态
                const status = match["空压机运行"];
                const type = match["空压机运行"] ==1 ? "运行" : '未运行'
                // 更新 typeList 对应项的 status 属性
                item.status = status;
                item.type = type
              }
            }
          }
        });
      this.$api.KBSYenergy().then((res) => {
        if (res.code == 200) {
          this.KBSYenergyList = res.data;
          this.total = res.data.countEnergy;
          this.numList = this.numList.map((item) => {
            const foundItem = res.data.electricityQuantityVOS.find(
              (e) => e.name == item.name
            );
            return {
              value: item.value,
              color: item.color,
              itemStyle: item.itemStyle,
              ...foundItem,
            };
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.e-container {
  width: 100%;
  height: 100%;
  .content {
    height: calc(100% - 50px);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .bottom {
    }
  }
}
</style>
