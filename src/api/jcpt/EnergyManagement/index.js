import request from "@/utils/request";
export const EnergyManagementApi = {
  /**
   * @param {能源管理} param
   * @param {*} page
   * @returns
   */
  /**
   * 能源介质 EnergyMedium
   */
  ///enMedium/delete 删除
  i_enMediumDel(param) {
    return request({
      url: "/energy/enMedium/delete",
      method: "POST",
      data: param,
    });
  },

  // /enMedium/getById 详情
  i_enMediumById(param) {
    return request({
      url: "/energy/enMedium/getById",
      method: "POST",
      data: param,
    });
  },
  // /enMedium/list 列表
  i_enMediumList(param) {
    return request({
      url: "/energy/enMedium/list",
      method: "POST",
      data: param,
    });
  },
  //enMedium/saveOrUpdata 新增
  i_enMediumSU(param) {
    return request({
      url: "/energy/enMedium/saveOrUpdata",
      method: "POST",
      data: param,
    });
  },
  ///algorithmType/list 算法类别
  i_algorithmTypeList(param) {
    return request({
      url: "/energy/algorithmType/list",
      method: "GET",
      data: param,
    });
  },
  //上级物料类型-能源介质
  // /enMedium/allList
  i_enMediumallList(param) {
    return request({
      url: "/energy/enMedium/allList",
      method: "GET",
      data: param,
    });
  },
  /**
   * 测量点
   */
  ///instrument/delete 测量点删除
  e_instrumentDel(param) {
    return request({
      url: "/energy/instrument/delete",
      method: "POST",
      data: param,
    });
  },
  ///instrument/getById 详情
  e_instrumentById(param) {
    return request({
      url: "/energy/instrument/getById",
      method: "POST",
      data: param,
    });
  },
  ///instrument/list 列表
  e_instrumentList(param) {
    return request({
      url: "/energy/instrument/list",
      method: "POST",
      data: param,
    });
  },
  //instrument/saveOrUpdate 新增
  e_instrumentSU(param) {
    return request({
      url: "/energy/instrument/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  ///numberPositionType/list  测量点-位号类型
  e_numberPositionTypeList() {
    return request({
      url: "/energy/numberPositionType/list",
      method: "GET",
    });
  },

  /**
   * 能源管网
   */
  // /pipeNetwork/delete 删除
  e_pipeNetworkDel(param) {
    return request({
      url: "/energy/pipeNetwork/delete",
      method: "POST",
      data: param,
    });
  },
  // /pipeNetwork/getById 详情
  e_pipeNetworkByid(param) {
    return request({
      url: "/energy/pipeNetwork/getById",
      method: "POST",
      data: param,
    });
  },

  // /pipeNetwork/list 列表
  e_pipeNetworkList(param) {
    return request({
      url: "/energy/pipeNetwork/list",
      method: "POST",
      data: param,
    });
  },

  // /pipeNetwork/saveOrUpdata 新增
  e_pipeNetworkSU(param) {
    return request({
      url: "/energy/pipeNetwork/saveOrUpdata",
      method: "POST",
      data: param,
    });
  },
  // /pipeNetwork/allLst 上级管网
  e_pipeNetworkallLst() {
    return request({
      url: "/energy/pipeNetwork/allLst",
      method: "GET",
    });
  },
  //上级管网-全部介质
  // /enMedium/allList 全部介质
  e_enMediumallList() {
    return request({
      url: "/energy/enMedium/allList",
      method: "GET",
    });
  },
  /**
   * 能源节点
   */
  // /energyNode/delete 删除
  e_energyNodeDel(param) {
    return request({
      url: "/energy/energyNode/delete",
      method: "POST",
      data: param,
    });
  },
  //energyNode/getById 详情
  e_energyNodeById(param) {
    return request({
      url: "/energy/energyNode/getById",
      method: "POST",
      data: param,
    });
  },
  //energyNode/list 列表
  e_energyNodeList(param) {
    return request({
      url: "/energy/energyNode/list",
      method: "POST",
      data: param,
    });
  },
  // /energyNode/saveOrUpdate 新增
  e_energyNodeSU(param) {
    return request({
      url: "/energy/energyNode/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  ///direction/list  能源节点方向进出类型
  e_directionList() {
    return request({
      url: "/energy/direction/list",
      method: "GET",
    });
  },
  /**
   * 介质折标系数
   */
  // /discountsCoefficientType/list  折标系数类型
  e_discountsCoefficientTypeList() {
    return request({
      url: "/energy/discountsCoefficientType/list",
      method: "GET",
    });
  },
  // /mediumDiscountsCoefficient/delete 删除
  e_mediumDiscountsCoefficientDel(param) {
    return request({
      url: "/energy/mediumDiscountsCoefficient/delete",
      method: "POST",
      data: param,
    });
  },
  // /mediumDiscountsCoefficient/getById 详情
  e_mediumDiscountsCoefficientByid(param) {
    return request({
      url: "/energy/mediumDiscountsCoefficient/getById",
      method: "POST",
      data: param,
    });
  },
  // /mediumDiscountsCoefficient/list 列表
  e_mediumDiscountsCoefficientList(param) {
    return request({
      url: "/energy/mediumDiscountsCoefficient/list",
      method: "POST",
      data: param,
    });
  },
  // /mediumDiscountsCoefficient/saveOrUpdate新增
  e_mediumDiscountsCoefficientSU(param) {
    return request({
      url: "/energy/mediumDiscountsCoefficient/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  /**
   * 基本能源核算单元
   */
  // /basicCalculateUnit/delete 删除
  e_basicCalculateUnitDel(param) {
    return request({
      url: "/energy/basicCalculateUnit/delete",
      method: "POST",
      data: param,
    });
  },
  // /basicCalculateUnit/getById 详情
  e_basicCalculateUnitByid(param) {
    return request({
      url: "/energy/basicCalculateUnit/getById",
      method: "POST",
      data: param,
    });
  },
  // /basicCalculateUnit/list 列表
  e_basicCalculateUnitList(param) {
    return request({
      url: "/energy/basicCalculateUnit/list",
      method: "POST",
      data: param,
    });
  },
  // /basicCalculateUnit/saveOrUpdate 新增
  e_basicCalculateUnitSU(param) {
    return request({
      url: "/energy/basicCalculateUnit/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  /**
   * 复合能源核算单元
   */
  // /compositeCalculateUnit/delete 删除
  e_compositeCalculateUnitDel(param) {
    return request({
      url: "/energy/compositeCalculateUnit/delete",
      method: "POST",
      data: param,
    });
  },
  // /compositeCalculateUnit/getById 详情
  e_compositeCalculateUnitByid(param) {
    return request({
      url: "/energy/compositeCalculateUnit/getById",
      method: "POST",
      data: param,
    });
  },
  // /compositeCalculateUnit/list 列表
  e_compositeCalculateUnitList(param) {
    return request({
      url: "/energy/compositeCalculateUnit/list",
      method: "POST",
      data: param,
    });
  },
  // /compositeCalculateUnit/saveOrUpdate 新增
  e_compositeCalculateUnitSU(param) {
    return request({
      url: "/energy/compositeCalculateUnit/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  // /compositeCalculateUnitarea/list 复合核算单元区域
  e_compositeCalculateUnitareaList(param) {
    return request({
      url: "/energy/compositeCalculateUnitarea/list",
      method: "POST",
      data: param,
    });
  },
  //compositeCalculateUnitType/list 复合能源核算单元类型
  e_compositeCalculateUnitTypeList() {
    return request({
      url: "/energy/compositeCalculateUnitType/list",
      method: "GET",
    });
  },
  /**
   * 能源核算单元关联
   */
  // /compositeBasic/delete 删除
  e_compositeBasicDel(param) {
    return request({
      url: "/energy/compositeBasic/delete",
      method: "POST",
      data: param,
    });
  },
  // /compositeBasic/getById 详情
  e_compositeBasicByid(param) {
    return request({
      url: "/energy/compositeBasic/getById",
      method: "POST",
      data: param,
    });
  },
  // /compositeBasic/list 列表
  e_compositeBasicList(param) {
    return request({
      url: "/energy/compositeBasic/list",
      method: "POST",
      data: param,
    });
  },
  // /compositeBasic/saveOrUpdate   新增
  e_compositeBasicSU(param) {
    return request({
      url: "/energy/compositeBasic/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  ///basicCalculateUnit/allList  复合核算单元 -  上级核算单元
  e_basicCalculateUnitALLList() {
    return request({
      url: "/energy/basicCalculateUnit/allList",
      method: "GET",
    });
  },
  /**
   * 能源节点管网节点配置
   */
  // /pipeNetworkEnergyNode/delete 删除
  e_pipeNetworkEnergyNodeDel(param) {
    return request({
      url: "/energy/pipeNetworkEnergyNode/delete",
      method: "POST",
      data: param,
    });
  },
  // /pipeNetworkEnergyNode/list 列表
  e_pipeNetworkEnergyNodeList(param) {
    return request({
      url: "/energy/pipeNetworkEnergyNode/list",
      method: "POST",
      data: param,
    });
  },
  // /pipeNetworkEnergyNode/saveOrUpdata 新增
  e_pipeNetworkEnergyNodeSU(param) {
    return request({
      url: "/energy/pipeNetworkEnergyNode/saveOrUpdata",
      method: "POST",
      data: param,
    });
  },
  /**
   * 基本能源核算单元节点配置
   */

  // /basicEnergynode/delete 删除
  e_basicEnergynodeDel(param) {
    return request({
      url: "/energy/basicEnergynode/delete",
      method: "POST",
      data: param,
    });
  },
  // /basicEnergynode/getById 详情
  e_basicEnergynodeByid(param) {
    return request({
      url: "/energy/basicEnergynode/getById",
      method: "POST",
      data: param,
    });
  },
  // /basicEnergynode/list 列表
  e_basicEnergynodeList(param) {
    return request({
      url: "/energy/basicEnergynode/list",
      method: "POST",
      data: param,
    });
  },
  // /basicEnergynode/saveOrUpdate 新增
  e_basicEnergynodeSU(param) {
    return request({
      url: "/energy/basicEnergynode/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  /**
   * @能源节点计量模型配置
   */
  // /energyNode/allList 能源节点 -  能源节点
  e_energyNodeALLList() {
    return request({
      url: "/energy/energyNode/allList",
      method: "GET",
    });
  },
  // /energyNodeMeasure/delete 删除
  e_energyNodeMeasureDel(param) {
    return request({
      url: "/energy/energyNodeMeasure/delete",
      method: "POST",
      data: param,
    });
  },
  // /energyNodeMeasure/getById 详情
  e_energyNodeMeasureByid(param) {
    return request({
      url: "/energy/energyNodeMeasure/getById",
      method: "POST",
      data: param,
    });
  },
  // /energyNodeMeasure/list 列表
  e_energyNodeMeasureList(param) {
    return request({
      url: "/energy/energyNodeMeasure/list",
      method: "POST",
      data: param,
    });
  },
  // /energyNodeMeasure/saveOrUpdate 新增
  e_energyNodeMeasureSU(param) {
    return request({
      url: "/energy/energyNodeMeasure/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
};
