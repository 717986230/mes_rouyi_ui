<template>
	<!-- 物料罐 -->
	<div class="app-container">
		<el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="100px">
			<el-form-item label="工厂:" prop="mesFctrId" style="margin-left: -50px;">
				<el-select v-model="queryParams.mesFctrId" placeholder="请选择工厂" clearable>
					<el-option v-for="dict in factoryList" :key="dict.value" :label="dict.label" :value="dict.value" />
				</el-select>
			</el-form-item>
			<el-form-item label="物料罐类型:" prop="mtrlTankType">
				<el-select v-model="queryParams.mtrlTankType" placeholder="请选择物料罐类型" clearable>
					<el-option v-for="dict in dict.type.mtrl_tank_type" :key="dict.value" :label="dict.label"
						:value="dict.value" />
				</el-select>
			</el-form-item>
			<el-form-item label="界区:" prop="nodeAreaId">
				<el-select v-model="queryParams.nodeAreaId" placeholder="请选择界区" clearable>
					<el-option v-for="dict in mtrlOption" :key="dict.value" :label="dict.label" :value="dict.value" />
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
				<el-button size="mini" @click="resetQuery">重置</el-button>
			</el-form-item>
		</el-form>
		<el-row :gutter="10" class="mb8" type="flex" justify="end">
			<el-col :span="1.5">
				<el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleSave">保存</el-button>
			</el-col>
		</el-row>
		<el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
			<el-table-column fixed="left" type="selection" width="50" align="center" />
			<el-table-column label="编号" sortable width="80" align="center" prop="number" v-if="columns[0].visible" />
			<el-table-column label="是否新增（可编辑）" sortable width="200" align="center" :show-overflow-tooltip="true"
				v-if="columns[1].visible">
				<template slot-scope="scope">
					<el-checkbox disabled :true-label="1" :false-label="0" v-model="scope.row.isAdd"></el-checkbox>
				</template>
			</el-table-column>
			<el-table-column label="界区" sortable align="center" prop="nodeAreaName" :show-overflow-tooltip="true"
				v-if="columns[2].visible" />
			<el-table-column label="物料" align="center" prop="mtrlName" :show-overflow-tooltip="true"
				v-if="columns[3].visible" />
			<el-table-column label="启用标识" sortable width="100" align="center" v-if="columns[4].visible">
				<template slot-scope="scope">
					<el-checkbox disabled :true-label="1" :false-label="0" v-model="scope.row.useFlag"></el-checkbox>
				</template>
			</el-table-column>
			<el-table-column label="精度（可编辑）" sortable width="150" align="center" prop="pres" v-if="columns[5].visible">
				<template slot-scope="scope">
                    <input-and-text @input='scope.row.pres = $event' :value="scope.row.pres"></input-and-text>
<!--					<span v-if="!scope.row.isEditingPrecision" @click="startEditing_P(scope.row)">{{ scope.row.pres-->
<!--					}}</span>-->
<!--					<el-input v-else v-model="scope.row.pres" @blur="finishEditing_P(scope.row)"-->
<!--						size="small"></el-input>-->
				</template>
			</el-table-column>

			<el-table-column label="顺序（可编辑）" sortable width="150" align="center" prop="displayOrder"
				v-if="columns[6].visible">
				<template slot-scope="scope">
                    <input-and-text @input='scope.row.displayOrder = $event' :value="scope.row.displayOrder"></input-and-text>
<!--					<span v-if="!scope.row.isEditingPrecisionOrder" @click="startEditing_O(scope.row)">{{-->
<!--						scope.row.displayOrder }}</span>-->
<!--					<el-input v-else v-model="scope.row.displayOrder" @blur="finishEditing_O(scope.row)"-->
<!--						size="small"></el-input>-->
				</template>
			</el-table-column>
		</el-table>
		<pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
			@pagination="getList" />
	</div>
</template>
<script>
import inputAndText from '../../../../components/InputAndText'
const _ = require('lodash')
export default {
	name: "MaterialTank",
	dicts: ['mtrl_tank_type'],
	components: {},
	data() {
		return {
			factoryList: [],//工厂
			mtrlOption: [],//界区
			// 遮罩层
			loading: true,
			// 总条数
			total: 0,
			userList: [],
			// 查询参数
			queryParams: {
				"isAsc": "",
				"mesFctrId": "",
				"mtrlTankType": "3",
				"nodeAreaId": "",
				"orderByColumn": "",
				"pageNum": 1,
				"pageSize": 10,
				"reasonable": true
			},
			// 列信息
			columns: [
				{ key: 0, label: `编号`, visible: true },
				{ key: 1, label: `是否新增（可编辑）`, visible: true },
				{ key: 2, label: `界区`, visible: true },
				{ key: 3, label: `物料`, visible: true },
				{ key: 4, label: `启用标识`, visible: true },
				{ key: 5, label: `精度（可编辑）`, visible: true },
				{ key: 6, label: `顺序（可编辑）`, visible: true }
			],
		};
	},
	watch: {},
	created() {
		this.getList();
		this.getOther()
	},
	methods: {
		/** 查询列表 */
		getList() {
			this.loading = true;
			this.$api.i_mtrlTankList(this.queryParams).then(response => {
				this.newSave = _.cloneDeep(response.rows)
				this.userList = _.cloneDeep(response.rows)
				this.total = response.total;
			}
			);
			this.loading = false;
		},
		getOther() {
			//工厂
			this.$api.i_MESFactoryAllList().then(res => {
				this.factoryList = res.data.map(e => {
					return {
						label: e.mesFctrName,
						value: e.mesFctrId
					}
				})

			})
			//界区类型
			this.$api.i_nodeAreaList({ "nodeAreaType": "3" }).then(res => {
				this.mtrlOption = res.data.map(e => {
					return {
						label: e.name,
						value: e.id,
					}
				})
			})
		},
		// 多选框选中数据
		handleSelectionChange(selection) {
			this.ids = selection.map(item => item.mtrlTankId);
			this.single = selection.length != 1;
			this.multiple = !selection.length;
		},
		/** 搜索按钮操作 */
		handleQuery() {
			this.queryParams.pageNum = 1;
			this.getList();
		},
		/** 重置按钮操作 */
		resetQuery() {
			this.resetForm("queryForm");
			this.handleQuery();
		},
		//精度输入框 点击
		startEditing_P(row) {
			row.isEditingPrecision = true;
		},
		//精度输出框 输入完成
		finishEditing_P(row) {
			row.isEditingPrecision = false;
		},
		//精度输入框 点击
		startEditing_O(row) {
			row.isEditingPrecisionOrder = true;
		},
		//精度输出框 输入完成
		finishEditing_O(row) {
			row.isEditingPrecisionOrder = false;
		},
		//数据保存
		handleSave() {
			const isEqual = _.isEqual(this.userList, this.newSave);
			if (isEqual) {
				this.$message.success("数据未发生改变")
			} else {
                //_.differenceWith函数可以使用自定义的比较函数来比较对象数组之间的差异。它接受一个数组和一个比较函数，并返回一个新数组，其中包含在第一个数组中存在，但在其他数组中不存在的元素。
                const diff = _.differenceWith(this.userList, this.newSave,_.isEqual);
                let params = diff.map(e=>{
                    let {id,isAdd,pres,useFlag,displayOrder } = e
                    return {
                        id,isAdd,pres,useFlag,displayOrder
                    }
                })
				this.$api.i_mtrlTanksave(params).then(res => {
					if (res.code == 200) {
						this.$message({
							message: '数据保存成功',
							type: 'success'
						});
					}
				})
				this.$message.success("数据改变")
			}
		}
	}
};
</script>
