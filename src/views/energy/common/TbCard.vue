<template>
    <div class="divcard"
        :style="{ background: itemLS.iscol == 1 ? `linear-gradient(to bottom, ${gradientColor}, #F3FBFE )` : '' }"
        @click="handleCard(itemLS)">
        <div style="vertical-align: middle;">
            <img :src="itemLS.iscol == 1 ? require('../../../assets/operatMonit/red.png') : require('../../../assets/operatMonit/blue.png')"
                alt="" style="width: 30px;height: 30px;display: inline-block;">
            <span class="ca-title">
                {{ itemLS.card1 }}
            </span>
        </div>
        <el-row :gutter=10>
            <el-col :span="(itemLS.child.length % 2) ===0 ? '12' :'8' " v-for=" ( h, index ) in  itemLS.child " :key="index">
                <div style="height: 50%;margin: 15px  0 10px 30px;">
                    <div class="te-h">{{ h.label }}</div>
                    <div class="te-t">{{ h.value }}</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: "TbCard",
    props: ["itemLS"],
    data() {
        return {
            gradientColor: '#FFDCDC',
        }
    },
    methods: {
        handleCard(itemLS) {
            this.$emit("handleCard", itemLS);
        }
    }
}
</script>
<style lang="scss" scoped>
.divcard {
    border-radius: 7px;
    width: 100%;
    margin: 10px 0;
    border: 1px solid #ebeef5;
    padding: 20px;
    background: #FFFFFF;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);



    .te-h {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
    }

    .te-t {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
    }
}
</style>