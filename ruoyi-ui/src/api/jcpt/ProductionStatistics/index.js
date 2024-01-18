import request from "@/utils/request";
export const ProductionStatisticsApi = {
  /**
   * @mes工厂数据锁定机制
   */
  // /MESLock/delete 删除
  P_MESLockDelete(params) {
    return request({
      url: "count/MESLock/delete",
      method: "POST",
      data: params,
    });
  },
  // /MESLock/select 查询
  P_MESLockSelect(params) {
    return request({
      url: "count/MESLock/select",
      method: "POST",
      data: params,
    });
  },
  /**
   * @区域平衡表列组态
   */

  //   /configuration/delete 删除
  P_configurationDelete(params) {
    return request({
      url: "count/configuration/delete",
      method: "POST",
      data: params,
    });
  },

  //   /configuration/getById 查询
  P_configurationGetById(params) {
    return request({
      url: "count/configuration/getById",
      method: "POST",
      data: params,
    });
  },
  //   /configuration/list 列表
  P_configurationList(params) {
    return request({
      url: "count/configuration/list",
      method: "POST",
      data: params,
    });
  },

  //   /configuration/saveOrUpdata 保存新增
  P_configurationSaveOrUpdata(params) {
    return request({
      url: "count/configuration/saveOrUpdata",
      method: "POST",
      data: params,
    });
  },

  /**
   * @区域收拨存
   */
  //   /areaAAD/accessoriesDelete 删除
  P_areaAADAccessoriesDelete(params) {
    return request({
      url: "count/areaAAD/accessoriesDelete",
      method: "POST",
      data: params,
    });
  },
  //   /areaAAD/accessoriesList 辅料-列表
  P_areaAADAccessoriesList(params) {
    return request({
      url: "count/areaAAD/accessoriesList",
      method: "POST",
      data: params,
    });
  },

  //   /areaAAD/accessoriesSaveOrUpdate 保存新增
  P_areaAADAccessoriesSaveOrUpdate(params) {
    return request({
      url: "count/areaAAD/accessoriesSaveOrUpdate",
      method: "POST",
      data: params,
    });
  },

  //   /areaAAD/accumulateSelect 物料收拨存累计-查询
  P_areaAADAccumulateSelect(params) {
    return request({
      url: "count/areaAAD/accumulateSelect",
      method: "POST",
      data: params,
    });
  },

  //   /areaAAD/areaSelect 区域实物转换-查询
  P_areaAADAreaSelect(params) {
    return request({
      url: "count/areaAAD/areaSelect",
      method: "POST",
      data: params,
    });
  },

  //   /areaAAD/mtrlSelect 查询物料收拨存
  P_areaAADMtrlSelect(params) {
    return request({
      url: "count/areaAAD/mtrlSelect",
      method: "POST",
      data: params,
    });
  },

  /**
   * @实物转换
   */
  //   /physicalConversion/select 查询
  P_physicalConversionSelect(params) {
    return request({
      url: "count/physicalConversion/select",
      method: "POST",
      data: params,
    });
  },

  /**
   * @平衡项
   */

  //   /balance/list 列表
  P_balanceList() {
    return request({
      url: "count/balance/list",
      method: "GET",
    });
  },

  /**
   * @汇总及扣减
   */

  // /summaryAndDeductions/add 新增
  P_summaryAndDeductionsAdd(params) {
    return request({
      url: "count/summaryAndDeductions/add",
      method: "POST",
      data: params,
    });
  },

  // /summaryAndDeductions/delete 删除
  P_summaryAndDeductionsDelete(params) {
    return request({
      url: "count/summaryAndDeductions/delete",
      method: "POST",
      data: params,
    });
  },

  //   /summaryAndDeductions/selectL 查询左
  P_summaryAndDeductionsSelectL(params) {
    return request({
      url: "count/summaryAndDeductions/selectL",
      method: "POST",
      data: params,
    });
  },

  //   /summaryAndDeductions/selectR 查询右
  P_summaryAndDeductionsSelectR(params) {
    return request({
      url: "count/summaryAndDeductions/selectR",
      method: "POST",
      data: params,
    });
  },

  /**
   * @物料平衡表列组态
   */

  //   /mtrlCloumuConfiguration/delete 删除
  P_mtrlCloumuConfigurationDelete(params) {
    return request({
      url: "count/mtrlCloumuConfiguration/delete",
      method: "POST",
      data: params,
    });
  },

  //   /mtrlCloumuConfiguration/getById 详情
  P_mtrlCloumuConfigurationGetById(params) {
    return request({
      url: "count/mtrlCloumuConfiguration/getById",
      method: "POST",
      data: params,
    });
  },

  //   /mtrlCloumuConfiguration/list 列表
  P_mtrlCloumuConfigurationList(params) {
    return request({
      url: "count/mtrlCloumuConfiguration/list",
      method: "POST",
      data: params,
    });
  },

  // /mtrlCloumuConfiguration/saveOrUpdata 保存新增
  P_mtrlCloumuConfigurationSaveOrUpdata(params) {
    return request({
      url: "count/mtrlCloumuConfiguration/saveOrUpdata",
      method: "POST",
      data: params,
    });
  },

  /**
   * @物料平衡表组态
   */

  //   /mtrlConfiguration/delete 删除
  P_mtrlConfigurationDelete(params) {
    return request({
      url: "count/mtrlConfiguration/delete",
      method: "POST",
      data: params,
    });
  },

  //   /mtrlConfiguration/getById 详情
  P_mtrlConfigurationGetById(params) {
    return request({
      url: "count/mtrlConfiguration/getById",
      method: "POST",
      data: params,
    });
  },

  // /mtrlConfiguration/list 列表
  P_mtrlConfigurationList(params) {
    return request({
      url: "count/mtrlConfiguration/list",
      method: "POST",
      data: params,
    });
  },

  // /mtrlConfiguration/saveOrUpdata 保存新增
  P_mtrlConfigurationSaveOrUpdata(params) {
    return request({
      url: "count/mtrlConfiguration/saveOrUpdata",
      method: "POST",
      data: params,
    });
  },

  /**
   * @物料平衡表行组态
   */

  //   /mtrlRowConfiguration/delete 删除
  P_mtrlRowConfigurationDelete(params) {
    return request({
      url: "count/mtrlRowConfiguration/delete",
      method: "POST",
      data: params,
    });
  },

  //   /mtrlRowConfiguration/saveOrUpdata 保存新增
  P_mtrlRowConfigurationSaveOrUpdata(params) {
    return request({
      url: "count/mtrlRowConfiguration/saveOrUpdata",
      method: "POST",
      data: params,
    });
  },

  //   /mtrlRowConfiguration/treeList 树列表
  P_mtrlRowConfigurationTreeList(params) {
    return request({
      url: "count/mtrlRowConfiguration/treeList",
      method: "POST",
      data: params,
    });
  },

  /**
   * @统计指标同步配置
   */

  //   /indexSyn/delete 删除
  P_indexSynDelete(params) {
    return request({
      url: "count/indexSyn/delete",
      method: "POST",
      data: params,
    });
  },

  //   /indexSyn/list 列表
  P_indexSynList(params) {
    return request({
      url: "count/indexSyn/list",
      method: "POST",
      data: params,
    });
  },

  //   /indexSyn/saveOrUpdata 保存新增
  P_indexSynSaveOrUpdata(params) {
    return request({
      url: "count/indexSyn/saveOrUpdata",
      method: "POST",
      data: params,
    });
  },

  /**
   * @统计指标同步配置-报表
   */

  //   /reportForm/dateTypeList    数据类型列表
  P_reportFormDateTypeList(params) {
    return request({
      url: "count/reportForm/dateTypeList",
      method: "POST",
      data: params,
    });
  },

  //   /reportForm/indexList 指标-列表
  P_reportFormIndexList(params) {
    return request({
      url: "count/reportForm/indexList",
      method: "POST",
      data: params,
    });
  },

  // /reportForm/indexTypeList 指标分类-列表
  P_reportFormIndexTypeList(params) {
    return request({
      url: "count/reportForm/indexTypeList",
      method: "POST",
      data: params,
    });
  },

  //   /reportForm/periodList 期间类型-列表
  P_reportFormPeriodList(params) {
    return request({
      url: "count/reportForm/periodList",
      method: "POST",
      data: params,
    });
  },

  //   /reportForm/select 报表-列表
  P_reportFormSelect() {
    return request({
      url: "count/reportForm/select",
      method: "GET",
    });
  },

  /**
   * @统计模型
   */

  //   /countModel/addFctr    添加工厂模型
  P_countModelAddFctr(params) {
    return request({
      url: "count/countModel/addFctr",
      method: "POST",
      data: params,
    });
  },

  //   /countModel/addItme   添加平衡项
  P_countModelAddItme(params) {
    return request({
      url: "count/countModel/addItme",
      method: "POST",
      data: params,
    });
  },

  //   /countModel/delete 删除
  P_countModelDelete(params) {
    return request({
      url: "count/countModel/delete",
      method: "POST",
      data: params,
    });
  },

  //   /countModel/select 列表
  P_countModelSelect(params) {
    return request({
      url: "count/countModel/select",
      method: "POST",
      data: params,
    });
  },

  /**
   * @装置投入产出
   */

  //   /unitInputOtput/indicatorConfiguration/delete 删除指标组态-删除
  P_unitInputOtputIndicatorConfigurationDelete(parameter) {
    return request({
      url: "count/unitInputOtput/indicatorConfiguration/delete",
      method: "POST",
      data: parameter,
    });
  },

  // /unitInputOtput/indicatorConfiguration/list 指标组态-列表
  P_unitInputOtputIndicatorConfigurationList() {
    return request({
      url: "count/unitInputOtput/indicatorConfiguration/list",
      method: "GET",
    });
  },

  //   /unitInputOtput/indicatorConfiguration/saveOrUpdate 指标组态-新增
  P_unitInputOtputIndicatorConfigurationSaveOrUpdate(params) {
    return request({
      url: "count/unitInputOtput/indicatorConfiguration/saveOrUpdate",
      method: "POST",
      data: params,
    });
  },

  //   /unitInputOtput/indicatorFind 指标-列表d
  P_unitInputOtputIndicatorFind() {
    return request({
      url: "count/unitInputOtput/indicatorFind",
      method: "GET",
    });
  },

  //   /unitInputOtput/sideinputOtputFind 侧线投入产出查询
  P_unitInputOtputSideinputOtputFind(params) {
    return request({
      url: "count/unitInputOtput/sideinputOtputFind",
      method: "POST",
      data: params,
    });
  },
};
