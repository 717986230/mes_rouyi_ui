<template>
	<!-- 侧线虚拟罐 -->
	<div class="app-container">
		<el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="80px">
			<el-form-item label="罐:" style="margin-left: -50px;" prop="tankName">
				<el-input v-model="queryParams.tankName" placeholder="请输入罐" clearable @keyup.enter.native="handleQuery" />
			</el-form-item>
			<el-form-item label="侧线:" prop="sdlnName">
				<el-input v-model="queryParams.sdlnName" placeholder="请输入侧线" clearable @keyup.enter.native="handleQuery" />
			</el-form-item>
			<el-form-item label="物料:" prop="mtrlName">
				<el-input v-model="queryParams.mtrlName" placeholder="请输入物料" clearable @keyup.enter.native="handleQuery" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
				<el-button size="mini" @click="resetQuery">重置</el-button>
			</el-form-item>
		</el-form>
		<el-row :gutter="10" class="mb8">
			<el-col :span="1.5">
				<el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
			</el-col>
			<el-col :span="1.5">
				<el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single"
					@click="handleUpdate">修改</el-button>
			</el-col>
			<el-col :span="1.5">
				<el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple"
					@click="handleDelete">删除</el-button>
			</el-col>
			<el-col :span="1.5">
				<el-button type="info" plain icon="el-icon-upload2" size="mini" @click="handleImport">导入</el-button>
			</el-col>
			<el-col :span="1.5">
				<el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
			</el-col>
			<right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
		</el-row>
		<el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
			<el-table-column fixed="left" type="selection" width="50" align="center" />
			<el-table-column label="罐" sortable align="center" key="tankName" prop="tankName" v-if="columns[0].visible" />
			<el-table-column label="侧线" sortable align="center" key="nodeName" prop="nodeName" :show-overflow-tooltip="true"
				v-if="columns[1].visible" />
			<el-table-column label="物料" sortable align="center" key="mtrlName" prop="mtrlName" :show-overflow-tooltip="true"
				v-if="columns[2].visible" />
		</el-table>
		<pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
			@pagination="getList" />
		<!-- 添加或修改用户配置对话框 -->
		<el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-row type="flex" justify="center">
					<el-col :span="20">
						<el-form-item label="罐:" prop="tankId">
							<el-select v-model="form.tankId" placeholder="请选择罐" style="width: 100%">
								<el-option v-for="dict in GType" :key="dict.value" :label="dict.label"
									:value="dict.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :span="20">
						<el-form-item label="侧线:" prop="sdlnId">
							<el-select v-model="form.sdlnId" placeholder="请选择侧线" style="width: 100%">
								<el-option v-for="dict in shadInle" :key="dict.value" :label="dict.label"
									:value="dict.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :span="20">
						<el-form-item label="物料:" prop="mtrlId">
							<el-select v-model="form.mtrlId" placeholder="请选择物料" style="width: 100%">
								<el-option v-for="dict in WLtype" :key="dict.value" :label="dict.label"
									:value="dict.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitForm">确 定</el-button>
				<el-button @click="cancel">取 消</el-button>
			</div>
		</el-dialog>
		<!-- 导入弹窗 -->
		<el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
			<el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
				:action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
				:on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				<div class="el-upload__tip text-center" slot="tip">
					<div class="el-upload__tip" slot="tip">
						<el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
					</div>
					<span>仅允许导入xls、xlsx格式文件。</span>
					<el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;"
						@click="importTemplate">下载模板</el-link>
				</div>
			</el-upload>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitFileForm">确 定</el-button>
				<el-button @click="upload.open = false">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
	name: "SidelineVirtualTank",
	data() {
		return {
			// 列信息
			GType: [],
			WLtype: [],
			// 遮罩层
			loading: true,
			// 选中数组
			ids: [],
			// 非单个禁用
			single: true,
			// 非多个禁用
			multiple: true,
			// 显示搜索条件
			showSearch: true,
			// 总条数
			total: 0,
			// 用户表格数据
			dataList: null,
			// 弹出层标题
			title: "",

			// 是否显示弹出层
			open: false,

			// 默认密码
			initPassword: undefined,
			// 日期范围
			dateRange: [],
			// 表单参数
			form: {},

			// 用户导入参数
			upload: {
				// 是否显示弹出层（用户导入）
				open: false,
				// 弹出层标题（用户导入）
				title: "",
				// 是否禁用上传
				isUploading: false,
				// 是否更新已经存在的用户数据
				updateSupport: 0,
				// 设置上传的请求头部
				headers: { Authorization: "Bearer " + getToken() },
				// 上传的地址
				url: process.env.VUE_APP_BASE_API + "/mes/sdlnVtank/import"
			},
			// 查询参数
			queryParams: {
				"id": undefined,
				"isAsc": "",
				"mtrlName": "",
				"orderByColumn": "",
				"pageNum": 1,
				"pageSize": 10,
				"reasonable": true,
				"sdlnName": "",
				"tankName": ""
			},
			shadInle: [],//侧线
			// 表单校验
			rules: {
				tankId: [
					{ required: true, message: "罐未选择", trigger: "change" }
				],
				sdlnId: [
					{ required: true, message: "侧线未选择", trigger: "change" }
				],
				mtrlId: [
					{ required: true, message: "物料未选择", trigger: "change" }
				],
			},
			// 列信息
			columns: [
				{ key: 0, label: `罐`, visible: true },
				{ key: 1, label: `侧线`, visible: true },
				{ key: 2, label: `物料`, visible: true },
			],
		};
	},
	watch: {},
	created() {
		this.getOther();
		this.getList();
	},
	mounted() {
		this.reset(); //防止弹窗表单验证出问题
	},
	methods: {
		getOther() {
			//侧线类型
			this.$api.i_sideLineALLList({
				"mesFctrId": "",
				"nodeName": "",
				"unitId": ""
			}).then(res => {
				this.shadInle = res.data.map(e => {
					return {
						value: e.id,
						label: e.nodeName
					}
				})
			})
			//罐类型
			this.$api.i_tankAllList({
				tankAreaId: ""
			}).then(res => {
				this.GType = res.data.map(e => {
					return {
						value: e.id,
						label: e.name
					}
				})
			})
			//物料类型
			this.$api.i_mtrAllList().then(res => {
				this.WLtype = res.data.map(e => {
					return {
						value: e.id,
						label: e.name
					}
				})
			})
			//侧线类型
		},
		/** 查询列表 */
		getList() {
			this.loading = true;
			this.$api.i_sdlnVtankList(this.queryParams).then(response => {
				this.dataList = response.rows;
				this.total = response.total;
			}
			);
			this.loading = false;

		},
		// 取消按钮
		cancel() {
			this.open = false;
			this.reset();
		},
		// 表单重置
		reset() {
			this.form = {
				"id": undefined,
				"mtrlId": undefined,
				"sdlnId": undefined,
				"tankId": undefined
			};
			this.resetForm("form");
		},
		/** 搜索按钮操作 */
		handleQuery() {
			this.queryParams.pageNum = 1;
			this.getList();
		},
		/** 重置按钮操作 */
		resetQuery() {
			this.dateRange = [];
			this.resetForm("queryForm");
			this.handleQuery();
		},
		// 多选框选中数据
		handleSelectionChange(selection) {
			this.ids = selection.map(item => item.id);
			this.single = selection.length != 1;
			this.multiple = !selection.length;
		},
		/** 新增按钮操作 */
		handleAdd() {
			this.reset();
			this.open = true;
			this.title = "添加信息";
		},
		/** 修改按钮操作 */
		handleUpdate(row) {
			this.reset();
			const userId = row.id || this.ids[0];
			this.$api.i_unitById({ id: userId }).then(response => {
				this.form = response.data;
				this.open = true;
				this.title = "修改信息";
			});
		},
		/** 提交按钮 */
		submitForm: function () {
			this.$refs["form"].validate(valid => {
				if (valid) {
					if (this.form.id != undefined) {
						this.$api.i_sdlnVtankSU({
							"id": this.form.id,
							"mtrlId": this.form.mtrlId,
							"sdlnId": this.form.sdlnId,
							"tankId": this.form.tankId,
						}).then(response => {
							this.$modal.msgSuccess("修改成功");
							this.open = false;
							this.getList();
						});
					} else {
						this.$api.i_sdlnVtankSU(this.form).then(response => {
							this.$modal.msgSuccess("新增成功");
							this.open = false;
							this.getList();
						});
					}
				}
			});
		},
		/** 删除按钮操作 */
		handleDelete(row) {
			const userIds = row.id || this.ids[0];
			this.$modal.confirm('是否确认删除"' + userIds + '"的数据项？').then(() => {
				return this.$api.i_sdlnVtankDel({ id: userIds });
			}).then(() => {
				this.getList();
				this.$modal.msgSuccess("删除成功");
			}).catch(() => { });
		},
		/** 导出按钮操作 */
		handleExport() {
			this.download('mes/sdlnVtank/export', {
				...this.queryParams
			}, `侧线虚拟罐_${new Date().getTime()}.xlsx`)
		},
		/** 导入按钮操作 */
		handleImport() {
			this.upload.title = "用户导入";
			this.upload.open = true;
		},
		/** 下载模板操作 */
		importTemplate() {
			this.download('mes/sdlnVtank/export', {
			}, `侧线虚拟罐_${new Date().getTime()}.xlsx`)
		},
		// 文件上传中处理
		handleFileUploadProgress(event, file, fileList) {
			this.upload.isUploading = true;
		},
		// 文件上传成功处理
		handleFileSuccess(response, file, fileList) {
			this.upload.open = false;
			this.upload.isUploading = false;
			this.$refs.upload.clearFiles();
			this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
			this.getList();
		},
		// 提交上传文件
		submitFileForm() {
			this.$refs.upload.submit();
		}
	}
};
</script>
