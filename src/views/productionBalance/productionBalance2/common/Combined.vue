<!--综合页签-->
<template>
    <div class="c-container">
        <el-row class="h-100">
            <el-col :span="6" class="h-100">
                <el-card class="h-100">
                    <el-card v-for="(item,index) in card">
                        <div slot="header">
                            <span>{{ item.title }}</span>
                        </div>
                        <el-row v-for="(item2,index2) in item.list">
                            <el-col :span="12" >
                                {{item2.key}}:
                            </el-col>
                            <el-col :span="12">
                                {{item2.val}}
                            </el-col>
                        </el-row>
                    </el-card>
                </el-card>
            </el-col>
            <el-col :span="18" class="h-100">
                <el-card class="h-100">
                    <el-card >
                        <div slot="header">
                            <span>指标</span>
                        </div>
                       <el-table :data="tableList">
                           <el-table-column label="名称" align="center" key="name" prop="name"/>
                           <el-table-column label="值" align="center" key="val" prop="val"/>
                           <el-table-column label="范围" align="center" key="range" prop="range"/>
                       </el-table>
                    </el-card>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'Combined',
    data() {
        return {
            card:[
                {
                    title:'指标',
                    list:[
                        {
                            key:'指标总数',
                            val:'-'
                        },
                        {
                            key:'合格数',
                            val:'-'
                        },
                        {
                            key:'合格率',
                            val:'-'
                        },
                    ]
                },
                {
                    title:'综合',
                    list:[
                        {
                            key:'移动数',
                            val:'-'
                        },
                        {
                            key:'节点数',
                            val:'-'
                        },
                        {
                            key:'节点量数',
                            val:'-'
                        },
                    ]
                },
                {
                    title:'边界节点',
                    list:[
                        {
                            key:'进厂总量',
                            val:'0(t)',
                        },
                        {
                            key:'出场总量',
                            val:'0(t)'
                        },
                        {
                            key:'互供付',
                            val:'0(t)'
                        },
                        {
                            key:'互供收',
                            val:'0(t)'
                        },
                    ]
                },
                {
                    title:'库存',
                    list:[
                        {
                            key:'期初量',
                            val:'-'
                        },
                        {
                            key:'变化量',
                            val:'-'
                        },
                        {
                            key:'期末量',
                            val:'-'
                        },
                    ]
                },
            ],
            tableList:[
            ]
        };
    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style lang="scss" scoped>
.c-container{
    width: 100%;
    height: 100%;
}
</style>
