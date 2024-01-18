<template>
<!--入库管理详细信息-->
    <div class="f-container">
        <!--标题头-->
        <detail-head :options="options" :tabs="tabs" @currentTab="currentTab = $event"></detail-head>
        <!--基础信息内容-->
        <basic :basicData="basicData"></basic>
    </div>
</template>

<script>
import detailHead from '@/views/equipment/common/detailHead';
import basic from './common/basic'
export default {
    name: 'detail',
    components: { detailHead, basic},
    data(){
        return{
            options: {
                title: '入库管理（详细信息）',
                icon: 'car',
                name: '入库单号1',
                column: 2,
                params: {
                    创建人: "admin",
                    更新人: "暂无",
                    创建时间: "2023年12月28日15时33分02秒",
                    更新时间: "暂无",
                }
            },
            tabs: [],
            basicData: {
                InType: "采购入库",
                InDate: "2023-12-29",
                InPerson: "admin",
                AssociatedDocument: "采购单号1、申领单号1、调拨单号1",
                recodeList:[
                    {
                        id:'456',
                        spareName:'备件名称',
                        spareCode:'备件编号',
                        model:'D50-2',
                        SpareType:'备件类型',
                        spareUnit:'个',
                        inNum:'200',
                        warehouse:'北区仓库1',
                        position:'4-5架',
                        manufacturer:'卫星化工',
                        supplier:'华北献强',
                    },
                    {
                        id:'4567',
                        spareName:'备件名称',
                        spareCode:'备件编号',
                        model:'D50-3',
                        SpareType:'备件类型',
                        spareUnit:'吨',
                        inNum:'200',
                        warehouse:'北区仓库1',
                        position:'4-5架',
                        manufacturer:'卫星化工',
                        supplier:'华北献强',
                    },
                    {
                        id:'4568',
                        spareName:'备件名称',
                        spareCode:'备件编号',
                        model:'D50-4',
                        SpareType:'备件类型',
                        spareUnit:'架',
                        inNum:'200',
                        warehouse:'北区仓库1',
                        position:'4-5架',
                        manufacturer:'卫星化工',
                        supplier:'华北献强',
                    },
                ],

            },
        }
    },
    methods:{

    }
}
</script>

<style scoped>

</style>