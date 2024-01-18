<template>
    <div class="detail-head-container">
        <el-row>
            <el-col :span="24" class="card-box mt10">
                <div class="medium m20 bold">
                    {{ options.title }}
                </div>
                <el-card class="box-card">
                    <div class="topboxheader">
                        <svg-icon :icon-class="options.icon" class="el-input__icon input-icon big m20" />
                        <div class="large bold">{{ options.name}}</div>
                        <div class="svg-icon2" v-if="options.hasOwnProperty('status')">
                            <type-box :text="options.status" :status="options.statusNum"></type-box>
                        </div>
                    </div>
                    <el-descriptions title="" :column="options.column" style="margin-left: 30px;">
                        <el-descriptions-item v-for="(item, key) in options.params" :label="key" :key="item.id">{{ item
                        }}</el-descriptions-item>
                        <el-descriptions-item label="盘点进度" v-if="iSprogress">
                            <div class="elprogress">
                                <el-progress :percentage="options.user" :stroke-width="13"
                                    :color="ColorType(options.user)"></el-progress>
                            </div>
                        </el-descriptions-item>
                    </el-descriptions>

                    <el-divider v-if="tabs.length>0" class="w-100"></el-divider>
                    <el-tabs class="mt20 " v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.name" :name="item.idx"
                            class="small bold">
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'detailHead',
    props: {
        iSprogress: {
            type: Boolean,
            default() {
                return false
            }
        },
        options: {
            type: Object,
            default() {
                return {
                    title: '设备档案（详细信息）',
                    icon: 'device',
                    name: '六缸蒸汽机',
                    status: '在役',
                    statusNum: 1,
                    column: 3,
                    user: '12',
                    params: {
                        创建人: "admin",
                        更新人: "暂无",
                        在役时长: "1年6月12日12小时12分00秒",
                        创建时间: "2023年06月12日06时15分20秒",
                        更新时间: "暂无",
                        维修次数: "2",
                    }
                }
            }
        },
        tabs: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            activeName: '0'
        }
    },
    methods: {
        handleClick(tab, event) {
            this.$emit('currentTab', this.activeName)
        },
        ColorType(row) {
            if (row < 40) {
                return "#F56C6C";
            } else if (row >= 40 && row < 70) {
                return "#1890FF";
            } else {
                return "#67C23A";
            }
        },
    }
}
</script>

<style scoped lang="scss">
@import '~@/assets/styles/index.scss';

.detail-head-container {
    width: 100%;
    position: relative;
}

.topboxheader {
    position: relative;
    display: flex;
    align-items: center;
}

::v-deep .el-tabs__item {
    font-size: $normal
}

.elprogress {
    width: 80%;
    height: 30px;
    margin-top: 2px
}
</style>
