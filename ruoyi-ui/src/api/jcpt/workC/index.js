import request from "@/utils/request";

export const workCApi = {
  /**
   * @互供点
   */
  // /energyNode/allList 全部节点列表
  i_QueyrEnergyNodeAllList() {
    return request({
      url: "/energy/energyNode/allList",
      method: "GET",
    });
  },
  //互供点列表/pminnsmtnode/List
  i_QueyrPminnsmtnodeList(param) {
    return request({
      url: "/mes/pminnsmtnode/List",
      method: "POST",
      data: param,
    });
  },
  // /pminnsmtnode/getById 详情
  i_pminnsmtnodeByid(param) {
    return request({
      url: "/mes/pminnsmtnode/getById",
      method: "POST",
      data: param,
    });
  },
  //互拱点新增 /pminnsmtnode/save
  i_PminnsmtNodeSave(param) {
    return request({
      url: "/mes/pminnsmtnode/save",
      method: "POST",
      data: param,
    });
  },
  //互拱点修改 /pminnsmtnode/update
  i_PminnsmtNodeUpdate(param) {
    return request({
      url: "/mes/pminnsmtnode/update",
      method: "POST",
      data: param,
    });
  },
  //互拱点删除 /pminnsmtnode/delete
  i_PminnsmtNodeDel(param) {
    return request({
      url: "/mes/pminnsmtnode/delete",
      method: "POST",
      data: param,
    });
  },

  //工厂下拉框列表  /mesFactoryType/list
  i_MESFactoryall() {
    return request({
      url: "/mes/mesFactoryType/list",
      method: "GET",
    });
  },

  // /mesWorkshopType/list 车间类型
  i_mesWorkshopType() {
    return request({
      url: "/mes/mesWorkshopType/list",
      method: "GET",
    });
  },
  //mes车间
  //删除 /mesWorkshop/delete
  i_mesWorkshopdelete(param) {
    return request({
      url: "/mes/mesWorkshop/delete",
      method: "POST",
      data: param,
    });
  },

  //查询车间详细信息  /mesWorkshop/getById
  i_mesWorkshopgetById(param) {
    return request({
      url: "/mes/mesWorkshop/getById",
      method: "POST",
      data: param,
    });
  },
  //车间新增或修改   /mesWorkshop/saveOrUpdata
  i_saveOrUpdata(param) {
    return request({
      url: "/mes/mesWorkshop/saveOrUpdata",
      method: "POST",
      data: param,
    });
  },
  // mes车间列表, /mesWorkshop/list
  i_mesWorkshop(param) {
    return request({
      url: "/mes/mesWorkshop/list",
      method: "POST",
      data: param,
    });
  },
  //mes工厂
  //删除 /MESFactory/delete
  i_MESFactorydelete(param) {
    return request({
      url: "/mes/MESFactory/delete",
      method: "POST",
      data: param,
    });
  },
  //查询详细信息 /MESFactory/getById
  i_MESFactorygetById(param) {
    return request({
      url: "/mes/MESFactory/getById",
      method: "POST",
      data: param,
    });
  },
  //工厂列表 /MESFactory/list
  i_MESFactory(param) {
    return request({
      url: "/mes/MESFactory/list",
      method: "POST",
      data: param,
    });
  },
  // 工厂新增 /MESFactory/saveOrUpdata
  i_MESFactorysaveOrUpdata(param) {
    return request({
      url: "/mes/MESFactory/saveOrUpdata",
      method: "POST",
      data: param,
    });
  },

  //装置界区
  // 列表 /unitArea/list
  i_unitAreaList(param) {
    return request({
      url: "/mes/unitArea/list",
      method: "POST",
      data: param,
    });
  },
  // 根据界区id删除 /unitArea/delete
  i_nodeAreaDel(param) {
    return request({
      url: "/mes/unitArea/delete",
      method: "POST",
      data: param,
    });
  },
  // 根据界区id查询详情  /unitArea/getById
  i_nodeAreaById(param) {
    return request({
      url: "/mes/unitArea/getById",
      method: "POST",
      data: param,
    });
  },
  // 装置界区新增或修改 /unitArea/saveOrUpdate
  i_nodeAreaSu(param) {
    return request({
      url: "/mes/unitArea/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  //罐 /tank/list   列表
  i_tankList(param) {
    return request({
      url: "/mes/tank/list",
      method: "POST",
      data: param,
    });
  },

  // tank/delete 删除
  i_tankDel(param) {
    return request({
      url: "/mes/tank/delete",
      method: "POST",
      data: param,
    });
  },

  //tank/getById  根据id查询详情
  i_tankByid(param) {
    return request({
      url: "/mes/tank/getById",
      method: "POST",
      data: param,
    });
  },

  // tank/saveOrUpdata  罐新增或修改
  i_tankOrUpdata(param) {
    return request({
      url: "/mes/tank/saveOrUpdata",
      method: "POST",
      data: param,
    });
  },

  /**
   * @ 物料
   */
  //删除 /mtrl/delete
  i_mtrlDel(param) {
    return request({
      url: "/mes/mtrl/delete",
      method: "POST",
      data: param,
    });
  },
  //修改数据回显    mtrl/getById
  i_mtrlById(param) {
    return request({
      url: "/mes/mtrl/getById",
      method: "POST",
      data: param,
    });
  },

  //列表  /mtrl/list
  i_mtrlList(param) {
    return request({
      url: "/mes/mtrl/list",
      method: "POST",
      data: param,
    });
  },
  //物料新增  /mtrl/saveOrUpdata
  i_mtrlSu(param) {
    return request({
      url: "/mes/mtrl/saveOrUpdata",
      method: "POST",
      data: param,
    });
  },
  //量纲 /dimension/list
  i_dimension() {
    return request({
      url: "/mes/dimension/list",
      method: "GET",
    });
  },

  /**
   * @VCF表
   */
  //vcf类型  列表 /vcf/list
  i_vcfListtype() {
    return request({
      url: "/mes/vcf/list",
      method: "GET",
    });
  },
  i_vcfList(params) {
    return request({
      url: "/mes/vcf/list",
      method: "POST",
      data: params,
    });
  },
  // /查看详情 /vcf/getById
  i_vcfById(param) {
    return request({
      url: "/mes/vcf/getById",
      method: "POST",
      data: param,
    });
  },
  // /删除 /vcf/delete
  i_vcfDel(param) {
    return request({
      url: "/mes/vcf/delete",
      method: "POST",
      data: param,
    });
  },
  // vcf新增或修改   /vcf/saveOrUpdata
  i_vcfSU(param) {
    return request({
      url: "/mes/vcf/saveOrUpdata",
      method: "POST",
      data: param,
    });
  },
  /**
   * @param加工方案 param
   * @returns
   */
  // /scheme/delete 删除
  i_schemeDel(param) {
    return request({
      url: "/mes/scheme/delete",
      method: "POST",
      data: param,
    });
  },
  // /scheme/list 列表
  i_schemeList(param) {
    return request({
      url: "/mes/scheme/list",
      method: "POST",
      data: param,
    });
  },
  // scheme/saveOrUpdate  新增修改
  i_schemeSU(param) {
    return request({
      url: "/mes/scheme/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },

  //id详情 /scheme/getById
  i_schemeBYid(param) {
    return request({
      url: "/mes/scheme/getById",
      method: "POST",
      data: param,
    });
  },

  /**
   * @罐计量
   */

  // /tankMeasType/allList  全部类型
  i_tankMeasAllList() {
    return request({
      url: "/mes/tankMeasType/allList",
      method: "GET",
    });
  },
  // /tankMeas/delete 删除
  i_tankMeasDel(param) {
    return request({
      url: "/mes/tankMeas/delete",
      method: "POST",
      data: param,
    });
  },
  // /tankMeas/getById  根据id查询详情
  i_tankMeasById(param) {
    return request({
      url: "/mes/tankMeas/getById",
      method: "POST",
      data: param,
    });
  },
  // /tankMeas/list  列表
  i_tankMeasList(param) {
    return request({
      url: "/mes/tankMeas/list",
      method: "POST",
      data: param,
    });
  },
  // /tankMeas/saveOrUpdate  新增修改
  i_tankMeasSU(param) {
    return request({
      url: "/mes/tankMeas/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  /**
   * @测量点
   */
  // /instrument/allList 全部测量点
  i_instrumentAllList() {
    return request({
      url: "/mes/instrument/allList",
      method: "GET",
    });
  },
  // /insertType/list  测量点-类型
  i_insertTypeList(param) {
    return request({
      url: "/mes/insertType/list",
      method: "GET",
      data: param,
    });
  },
  // /instrument/delete  删除
  i_instrumentDel(param) {
    return request({
      url: "/mes/instrument/delete",
      method: "POST",
      data: param,
    });
  },
  // /instrument/getById  id查询
  i_instrumentBYid(param) {
    return request({
      url: "/mes/instrument/getById ",
      method: "POST",
      data: param,
    });
  },

  //  instrument/list   列表
  i_instrumentList(param) {
    return request({
      url: "/mes/instrument/list",
      method: "POST",
      data: param,
    });
  },
  // /instrument/saveOrUpdate   新增修改
  i_instrumentSU(param) {
    return request({
      url: "/mes/instrument/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },

  // 装置
  // /unit/delete  删除
  i_unitDel(param) {
    return request({
      url: "/mes/unit/delete",
      method: "POST",
      data: param,
    });
  },

  // /unit/getById  详情
  i_unitById(param) {
    return request({
      url: "/mes/unit/getById",
      method: "POST",
      data: param,
    });
  },
  // /unit/list 列表
  i_unitList(param) {
    return request({
      url: "/mes/unit/list",
      method: "POST",
      data: param,
    });
  },

  // /unit/saveOrUpdata  新增修改
  i_unitSU(param) {
    return request({
      url: "/mes/unit/saveOrUpdata",
      method: "POST",
      data: param,
    });
  },

  //  装置-> 界区类型  /nodeAreaType/list
  i_nodeAreaType(param) {
    return request({
      url: "/mes/nodeAreaType/list",
      method: "GET",
      data: param,
    });
  },
  //罐列表全部 /tank/list   列表
  i_tankAllList(param) {
    return request({
      url: "/mes/tank/allList",
      method: "POST",
      data: param,
    });
  },

  //物料全部 /mtrl/allList
  i_mtrAllList() {
    return request({
      url: "/mes/mtrl/allList",
      method: "GET",
    });
  },

  //g罐区
  // /tankArea/allList  罐区全部
  i_tankAreaAll() {
    return request({
      url: "/mes/tankArea/allList",
      method: "GET",
    });
  },

  // /tankArea/delete  删除
  i_tankAreaDel(param) {
    return request({
      url: "/mes/tankArea/delete ",
      method: "POST",
      data: param,
    });
  },

  // /tankArea/getById  查询
  i_tankAreaByid(param) {
    return request({
      url: "/mes/tankArea/getById",
      method: "POST",
      data: param,
    });
  },

  // /tankArea/list  列表
  i_tankAreaList(param) {
    return request({
      url: "/mes/tankArea/list",
      method: "POST",
      data: param,
    });
  },

  // /tankArea/saveOrUpdata  新增修改
  i_tankAreaSU(param) {
    return request({
      url: "/mes/tankArea/saveOrUpdata",
      method: "POST",
      data: param,
    });
  },

  // 侧线物料字典
  ///slineMtrlType/list
  i_slineMtrlType() {
    return request({
      url: "/mes/slineMtrlType/list",
      method: "GET",
    });
  },
  // /sideLine/saveOrUpdate  侧线新增
  i_sideLineSU(param) {
    return request({
      url: "/mes/sideLine/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },

  // 界区 /nodeArea/allList
  i_nodeAreaAllList() {
    return request({
      url: "/mes/nodeArea/allList",
      method: "GET",
    });
  },
  // /nodeArea/list  根据界区类型查询界区
  i_nodeAreaList(param) {
    return request({
      url: "/mes/nodeArea/list",
      method: "POST",
      data: param,
    });
  },
  // 根据工厂id获取车间,装置,侧线，加工方案,界区 /common/getByFctrId
  i_commonGetFc(param) {
    return request({
      url: "/mes/common/getByFctrId",
      method: "POST",
      data: param,
    });
  },
  // /MESFactory/allList  工厂下拉框列表
  i_MESFactoryAllList() {
    return request({
      url: "/mes/MESFactory/allList",
      method: "GET",
    });
  },

  //侧线
  // /sideLine/list 侧线列表
  i_sideLineList(param) {
    return request({
      url: "/mes/sideLine/list",
      method: "POST",
      data: param,
    });
  },
  // /sideLine/getById  侧线详情
  i_sideLineByID(param) {
    return request({
      url: "/mes/sideLine/getById",
      method: "POST",
      data: param,
    });
  },
  //删除 /sideLine/delete
  i_sideLineDel(param) {
    return request({
      url: "/mes/sideLine/delete",
      method: "POST",
      data: param,
    });
  },

  ///slineIOType/list  侧线进出类型
  i_slineIOTypeList() {
    return request({
      url: "/mes/slineIOType/list",
      method: "GET",
    });
  },

  //运输类型
  // /transportType/list
  i_transportTypeList() {
    return request({
      url: "/mes/transportType/list",
      method: "GET",
    });
  },

  // /unitType/list  装置类型
  i_unitTypeList() {
    return request({
      url: "/mes/unitType/list",
      method: "GET",
    });
  },

  // 全部装置 /unit/allList
  i_unitListall(param) {
    return request({
      url: "/mes/unit/allList",
      method: "POST",
      data: param,
    });
  },

  // /mesWorkshop/allLis   车间/mesWorkshop/allList
  i_mesWorkshopAllLis(param) {
    return request({
      url: "/mes/mesWorkshop/allList",
      method: "POST",
      data: param,
    });
  },

  /**
   *
   * @param装卸台 param
   * @returns
   */

  //装卸台类型 /loadrackType/list
  i_loadrackLTY() {
    return request({
      url: "/mes/loadrackType/list",
      method: "GET",
    });
  },
  // 列表   /loadrack/list
  i_loadrackList(param) {
    return request({
      url: "/mes/loadrack/list",
      method: "POST",
      data: param,
    });
  },
  // 删除  /loadrack/delete
  i_loadrackDel(param) {
    return request({
      url: "/mes/loadrack/delete",
      method: "POST",
      data: param,
    });
  },
  // 详情 /loadrack/getById
  i_loadrackByid(param) {
    return request({
      url: "/mes/loadrack/getById",
      method: "POST",
      data: param,
    });
  },
  // 新增 /loadrack/saveOrUpdate
  i_loadrackSU(param) {
    return request({
      url: "/mes/loadrack/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },

  /**
   * @物料模块接口   物料类型列表
   */
  i_mtrlType() {
    return request({
      url: "/mes/mtrlType/list",
      method: "GET",
    });
  },

  /**
   * @进出厂
   */
  //根据进出类型和工厂选择进出厂点 /shipment/allList
  i_shipmentAllList(param) {
    return request({
      url: "/mes/shipment/allList",
      method: "POST",
      data: param,
    });
  },

  //删除
  i_shipmentDel(param) {
    return request({
      url: "/mes/shipment/delete",
      method: "POST",
      data: param,
    });
  },
  //详情 /shipment/getById
  i_shipmentByid(param) {
    return request({
      url: "/mes/shipment/getById",
      method: "POST",
      data: param,
    });
  },

  //列表 /shipment/list
  i_shipmentList(param) {
    return request({
      url: "/mes/shipment/list",
      method: "POST",
      data: param,
    });
  },
  //新增或者修改 /shipment/saveOrUpdate
  i_shipmentSU(param) {
    return request({
      url: "/mes/shipment/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  /**
   * @仓库
   */
  // /stock/list  仓库列表
  i_stockList(param) {
    return request({
      url: "/mes/stock/list",
      method: "POST",
      data: param,
    });
  },
  // /stock/delete 删除
  i_stockDel(param) {
    return request({
      url: "/mes/stock/delete",
      method: "POST",
      data: param,
    });
  },
  // /stock/getById  详情
  i_stockByid(param) {
    return request({
      url: "/mes/stock/getById",
      method: "POST",
      data: param,
    });
  },
  // /stock/saveOrUpdate 新增
  i_stockSU(param) {
    return request({
      url: "/mes/stock/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  // /stockType/list 仓库类型
  i_stockType() {
    return request({
      url: "/mes/stockType/list",
      method: "GET",
    });
  },

  //获取罐类型列表
  i_tankType() {
    return request({
      url: "/mes/tankType/list",
      method: "GET",
    });
  },
  //罐  板块下拉数据
  i_sectorOption() {
    return request({
      url: "/mes/sector/list",
      method: "GET",
    });
  },

  /**
   * @平衡项
   */
  // /mtrlBalnItem/delete
  i_mtrlBalnItemDel(param) {
    return request({
      url: "/mes/mtrlBalnItem/delete",
      method: "POST",
      data: param,
    });
  },
  // /mtrlBalnItem/getById 详情
  i_mtrlBalnItemByID(param) {
    return request({
      url: "/mes/mtrlBalnItem/getById",
      method: "POST",
      data: param,
    });
  },

  // /mtrlBalnItem/list 列表
  i_mtrlBalnItemList(param) {
    return request({
      url: "/mes/mtrlBalnItem/list",
      method: "POST",
      data: param,
    });
  },
  // /mtrlBalnItem/saveOrUpdata 新增
  i_mtrlBalnItemSU(param) {
    return request({
      url: "/mes/mtrlBalnItem/saveOrUpdata",
      method: "POST",
      data: param,
    });
  },
  /**
   * @库位
   */
  // 库位删除 /location/delete
  i_locationDel(param) {
    return request({
      url: "/mes/location/delete",
      method: "POST",
      data: param,
    });
  },
  // /location/getById  库位详情
  i_locationByid(param) {
    return request({
      url: "/mes/location/getById",
      method: "POST",
      data: param,
    });
  },

  // /location/list  列表
  i_locationList(param) {
    return request({
      url: "/mes/location/list",
      method: "POST",
      data: param,
    });
  },
  // /location/saveOrUpdate 新增
  i_locationSU(param) {
    return request({
      url: "/mes/location/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },

  /**
   * @投入产出模型配置
   */
  // /inOutput/delete  删除
  i_inOutputDel(param) {
    return request({
      url: "/mes/inOutput/delete",
      method: "POST",
      data: param,
    });
  },
  // /inOutput/getById  详情
  i_inOutputByid(param) {
    return request({
      url: "/mes/inOutput/getById",
      method: "POST",
      data: param,
    });
  },
  // /inOutput/list 列表
  i_inOutputList(param) {
    return request({
      url: "/mes/inOutput/list",
      method: "POST",
      data: param,
    });
  },
  //inOutput/saveOrUpdate  新增修改
  i_inOutputSU(param) {
    return request({
      url: "/mes/inOutput/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },

  /**
   * @卧罐罐容表
   */
  //删除 /cieCuba/delete
  i_cieCubaDel(param) {
    return request({
      url: "/mes/cieCuba/delete",
      method: "POST",
      data: param,
    });
  },
  //  根据id批量删除 /cieCuba/deleteByTankId
  i_cieCubaDelByTank(param) {
    return request({
      url: "/mes/cieCuba/delete",
      method: "POST",
      data: param,
    });
  },
  // /cieCuba/getById   详情
  i_cieCubaByid(param) {
    return request({
      url: "/mes/cieCuba/getById",
      method: "POST",
      data: param,
    });
  },
  // /cieCuba/list  列表
  i_cieCubaList(param) {
    return request({
      url: "/mes/cieCuba/list",
      method: "POST",
      data: param,
    });
  },
  // /cieCuba/saveOrUpdate 新增
  i_cieCubaSU(param) {
    return request({
      url: "/mes/cieCuba/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  //  卧罐列表 /cieCuba/tankList
  i_cieCubatankList() {
    return request({
      url: "/mes/cieCuba/tankList",
      method: "GET",
    });
  },
  /**
   * @球罐罐容表
   */

  // /glbCuba/delete 删除
  i_glbCubaDel(param) {
    return request({
      url: "/mes/glbCuba/delete",
      method: "POST",
      data: param,
    });
  },
  // 批量删除 /glbCuba/deleteByTankId
  i_glbCubaDelByTankId(param) {
    return request({
      url: "/mes/glbCuba/deleteByTankId",
      method: "POST",
      data: param,
    });
  },
  // /glbCuba/geyById 详情
  i_glbCubaByid(param) {
    return request({
      url: "/mes/glbCuba/geyById",
      method: "POST",
      data: param,
    });
  },
  // /glbCuba/list 列表
  i_glbCubaList(param) {
    return request({
      url: "/mes/glbCuba/list",
      method: "POST",
      data: param,
    });
  },
  // /glbCuba/saveOrUpdata 新增
  i_glbCubaSU(param) {
    return request({
      url: "/mes/glbCuba/saveOrUpdata",
      method: "POST",
      data: param,
    });
  },
  // /glbCuba/tankList 球罐列表
  i_glbCubatankList() {
    return request({
      url: "/mes/glbCuba/tankList",
      method: "GET",
    });
  },

  /**
   * @侧线虚拟罐
   */
  // /sdlnVtank/delete    删除
  i_sdlnVtankDel(param) {
    return request({
      url: "/mes/sdlnVtank/delete",
      method: "POST",
      data: param,
    });
  },

  // /sdlnVtank/getById详情
  i_sdlnVtankByid(param) {
    return request({
      url: "/mes/sdlnVtank/getById",
      method: "POST",
      data: param,
    });
  },
  // /sdlnVtank/list 列表
  i_sdlnVtankList(param) {
    return request({
      url: "/mes/sdlnVtank/list",
      method: "POST",
      data: param,
    });
  },
  // /sdlnVtank/saveOrUpdate 新增
  i_sdlnVtankSU(param) {
    return request({
      url: "/mes/sdlnVtank/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  /**
   * @计量节点
   */
  // /measureNode/delete   删除
  i_measureNodeDel(param) {
    return request({
      url: "/mes/measureNode/delete",
      method: "POST",
      data: param,
    });
  },
  // /measureNode/getById 详情
  i_measureNodeByid(param) {
    return request({
      url: "/mes/measureNode/getById",
      method: "POST",
      data: param,
    });
  },

  // /measureNode/list 列表
  i_measureNodeList(param) {
    return request({
      url: "/mes/measureNode/list",
      method: "POST",
      data: param,
    });
  },

  // /measureNode/saveOrUpdate 新增
  i_measureNodeSU(param) {
    return request({
      url: "/mes/measureNode/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },

  /**
   *  @立罐厘米  (毫米)维护
   */
  // /stdCmmmCuab/delete 删除
  i_stdCmmmCuabDel(param) {
    return request({
      url: "/mes/stdCmmmCuab/delete",
      method: "POST",
      data: param,
    });
  },
  // /stdCmmmCuab/deleteByTankId 批量删除
  i_stdCmmmCuabdeleteByTankId(param) {
    return request({
      url: "/mes/stdCmmmCuab/deleteByTankId",
      method: "POST",
      data: param,
    });
  },
  ///stdCmmmCuab/getById 查看详情
  i_stdCmmmCuabByid(param) {
    return request({
      url: "/mes/stdCmmmCuab/getById",
      method: "POST",
      data: param,
    });
  },
  //stdCmmmCuab/list 列表
  i_stdCmmmCuabList(param) {
    return request({
      url: "/mes/stdCmmmCuab/list",
      method: "POST",
      data: param,
    });
  },
  // /stdCmmmCuab/saveOrUpdate 新增
  i_stdCmmmCuabSU(param) {
    return request({
      url: "/mes/stdCmmmCuab/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  // /stdCmmmCuab/tankList 批量删除罐列表
  i_stdCmmmCuabtankList() {
    return request({
      url: "/mes/stdCmmmCuab/tankList",
      method: "GET",
    });
  },
  /**
   * @装置界区节点
   */
  // /unitAreaNode/delete 删除
  i_unitAreaNodeDel(param) {
    return request({
      url: "/mes/unitAreaNode/delete",
      method: "POST",
      data: param,
    });
  },
  // /unitAreaNode/getById 详情
  i_unitAreaNodeByid(param) {
    return request({
      url: "/mes/unitAreaNode/getById",
      method: "POST",
      data: param,
    });
  },
  // /unitAreaNode/list 列表
  i_unitAreaNodeList(param) {
    return request({
      url: "/mes/unitAreaNode/list",
      method: "POST",
      data: param,
    });
  },
  // /unitAreaNode/saveOrUpdate 新增
  i_unitAreaNodeSU(param) {
    return request({
      url: "/mes/unitAreaNode/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  /**
   * @物料罐
   */
  //mtrlTank/list 列表
  i_mtrlTankList(param) {
    return request({
      url: "/mes/mtrlTank/list",
      method: "POST",
      data: param,
    });
  },
  //mtrlTank/save 保存
  i_mtrlTanksave(param) {
    return request({
      url: "/mes/mtrlTank/save",
      method: "POST",
      data: param,
    });
  },
  /**
   * @罐默认配置
   */
  // /tankDefault/list 列表/
  i_tankDefaultList(param) {
    return request({
      url: "/mes/tankDefault/list",
      method: "POST",
      data: param,
    });
  },
  // /tankDefault/getById 详情
  i_tankDefaultByid(param) {
    return request({
      url: "/mes/tankDefault/getById",
      method: "POST",
      data: param,
    });
  },
  // /tankDefault/delete 删除
  i_tankDefaultDel(param) {
    return request({
      url: "/mes/tankDefault/delete",
      method: "POST",
      data: param,
    });
  },
  // /tankDefault/saveOrUpdate 新增
  i_tankDefaultSU(param) {
    return request({
      url: "/mes/tankDefault/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
};
