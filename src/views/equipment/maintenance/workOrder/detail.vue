<template>
    <!--设备履历-->
    <div class="f-container">
        <!--标题头-->
        <detail-head :options="options" ></detail-head>
        <!--基础信息内容-->
        <basic :basicData="basicData"></basic>
        <el-row class="foot-btn flex justify-center align-center">
            <el-col :span="24" class="flex justify-center align-center">
                <el-button @click="onCancel()">
                    关闭
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import detailHead from '../../common/detailHead';
import basic from './common/basic';
export default {
    name: 'detail',
    components: {  detailHead,basic },
    data() {
        return {
            options: {
                title: '报修工单（详细信息）',
                icon: 'device',
                name: '六缸蒸汽机',
                status: '审核通过',
                statusNum: 1,
                column: 2,
                params: {
                    报修人: "admin",
                    审核人: "暂无",
                    报修时间: "2021年11月12日08小时15分50秒",
                    审核通过时间: "2022年12月29日11时11分00秒",
                }
            },
            basicData: {
                DeviceName: "6缸起动机",
                DeviceNumber: "D001",
                ProductionTime: "2021-01-01",
                PhoneNumber: "13245678900",
                ResponsiblePerson: "张三",
                Manufacturer: "制造商A",
                PurchaseTime: "2020-12-01",
                StorageLocation: "存放位置1",
                DeviceType: "1",
                DeviceTypeName:"重要设备",
                CurrentStatus: "在役",
                CurrentStatusId: "1",
                Remarks: "备注信息",
                parents: '起重机',
                parentsId: 1,
                dept: '开发部',
                model: "z-6-1002",
                area: '',
                areaID: '1710940819244048384',
                startTime: '2023-01-01',
                demandId: 1,
                demand: '需求1',
                demandDept: '',
                demandDeptId: '',
                supplier: '供应商111',
                ServiceLife: '7',
                price: 25000,
                currentStatus:'运行',
                downTime:'2021年11月12日08小时15分50秒',
                reamrk:'暂无备注',
                desc:'运行异响',
                accessor: [
                    {
                        url: 'http://192.168.8.59:10300/statics/2023/12/27/立罐3_20231227155738A001.png',
                        pictureName: '立罐3.png',
                        pictureType: 0,
                        imgSize: 15953,
                    }
                ],
            },
        }
    },
    computed: {
        deviceId() {
            return this.$route.query.id
        }

    }
}
</script>

<style lang="scss" scoped>
.f-container {}

.content {
    padding-bottom: 80px;
}

.foot-btn {
    z-index: 2;
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    box-shadow: 0 0 10px #a0a8a0;
}
</style>
