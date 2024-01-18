import request from "@/utils/request";
export const FactoryModelApi = {
  //进出类型 /inoutType/list
  i_inoutTypeList() {
    return request({
      url: "/mes/inoutType/list",
      method: "GET",
    });
  },

  /**
   * @测线料仓配置
   */
  ///sideLine/allList  根据工厂和装置查询侧线列表   测线料仓配置
  i_sideLineALLList(param) {
    return request({
      url: "/mes/sideLine/allList",
      method: "POST",
      data: param,
    });
  },
  ///tank/getByDTOList  料仓
  i_tankgetByDTOList(param) {
    return request({
      url: "/mes/tank/getByDTOList",
      method: "POST",
      data: param,
    });
  },

  /**
   * @根据进出厂点id查询物料
   */
  ///inoutMtrl/listMtrlById   根据进出厂点id查询物料
  i_inoutMtrlListMtrlById(param) {
    return request({
      url: "/mes/inoutMtrl/listMtrlById",
      method: "POST",
      data: {
        ...param,
      },
    });
  },

  //inoutMtrl/delete 删除
  i_inoutMtrlDel(param, page) {
    return request({
      url: "/mes/inoutMtrl/delete",
      method: "POST",
      data: {
        ...param,
        ...page,
      },
    });
  },
  //inoutMtrl/saveOrUpdate 新增
  i_inoutMtrlSU(param, page) {
    return request({
      url: "/mes/inoutMtrl/saveOrUpdate",
      method: "POST",
      data: {
        ...param,
        ...page,
      },
    });
  },

  /**
   * @进出厂组分配置
   */
  // /inoutComponent/listMtrlById 根据进出厂点id查询物料
  i_inoutComponentList(param, page) {
    return request({
      url: "/mes/inoutComponent/listMtrlById",
      method: "POST",
      data: {
        ...param,
        ...page,
      },
    });
  },

  /**
   * @计量类型 /gaugeType/list
   */
  i_gaugeTypeList() {
    return request({
      url: "/mes/gaugeType/list",
      method: "GET",
    });
  },
  /**
   * @侧线料仓配置
   */
  // /sideTank/list  根据侧线id查询料仓
  i_sideTankList(param, page) {
    return request({
      url: "/mes/sideTank/list",
      method: "POST",
      data: {
        ...param,
        ...page,
      },
    });
  },

  // /sideTank/saveOrUpdate 侧线料仓新增或修改
  i_sideTankSU(param, page) {
    return request({
      url: "/mes/sideTank/saveOrUpdate",
      method: "POST",
      data: {
        ...param,
        ...page,
      },
    });
  },
  // /sideTank/delete 删除
  i_sideTankDel(param, page) {
    return request({
      url: "/mes/sideTank/delete",
      method: "POST",
      data: {
        ...param,
        ...page,
      },
    });
  },
  /**
   * @仓库物料配置
   */

  // 全部仓库 /stock/allList
  i_stockallList(param) {
    return request({
      url: "/mes/stock/allList",
      method: "POST",
      data: param,
    });
  },
  // /stockMtrl/delete 删除
  i_stockMtrlDel(param) {
    return request({
      url: "/mes/stockMtrl/delete",
      method: "POST",
      data: param,
    });
  },
  // /stockMtrl/list 根据仓库查看已分配物料
  i_stockMtrlList(param) {
    return request({
      url: "/mes/stockMtrl/list",
      method: "POST",
      data: param,
    });
  },
  // /stockMtrl/saveOrUpdate 新增修改
  i_stockMtrlSU(param) {
    return request({
      url: "/mes/stockMtrl/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  /**
   * @进出厂组分配置
   */
  // /inoutComponent/delete 删除进出厂点
  i_inoutComponentDel(param) {
    return request({
      url: "/mes/inoutComponent/delete",
      method: "POST",
      data: param,
    });
  },
  // /inoutComponent/listMtrlById 根据进出厂点id查询物料
  i_inoutComponentByid(param) {
    return request({
      url: "/mes/inoutComponent/listMtrlById",
      method: "POST",
      data: param,
    });
  },
  // /inoutComponent/saveOrUpdate
  i_inoutComponentSU(param) {
    return request({
      url: "/mes/inoutComponent/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  /**
   * @运输计量配置
   */
  // /transportGauge/delete  删除
  i_transportGaugeDel(param) {
    return request({
      url: "/mes/transportGauge/delete",
      method: "POST",
      data: param,
    });
  },
  // /transportGauge/list  根据运输类型查看计量方式
  i_transportGaugeList(param) {
    return request({
      url: "/mes/transportGauge/list",
      method: "POST",
      data: param,
    });
  },
  // /transportGauge/saveOrUpdate 新增修改
  i_transportGaugeSU(param) {
    return request({
      url: "/mes/transportGauge/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  /**
   * @罐物料配置
   */

  //根据工厂id  罐类型查询罐信息/tank/getByDTOList
  i_GtankgetByDTOList(param) {
    return request({
      url: "/mes/tank/getByDTOList",
      method: "POST",
      data: param,
    });
  },
  // /tankMtrl/delete  删除
  i_tankMtrlDel(param) {
    return request({
      url: "/mes/tankMtrl/delete",
      method: "POST",
      data: param,
    });
  },
  // /tankMtrl/list   根据罐id查看物料
  i_tankMtrlList(param) {
    return request({
      url: "/mes/tankMtrl/list",
      method: "POST",
      data: param,
    });
  },
  // /tankMtrl/saveOrUpdate 新增修改
  i_tankMtrlSU(param) {
    return request({
      url: "/mes/tankMtrl/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  // /factMtrlGroup/list  工厂物料类型列表
  i_factMtrlGroupList() {
    return request({
      url: "/mes/factMtrlGroup/list",
      method: "GET",
    });
  },

  /**
   * @工厂物料配置
   */

  // /factMtrl/delete 工厂物料删除
  i_factMtrlDel(param) {
    return request({
      url: "/mes/factMtrl/delete",
      method: "POST",
      data: param,
    });
  },
  // /factMtrl/list 列表
  i_factMtrlList(param) {
    return request({
      url: "/mes/factMtrl/list",
      method: "POST",
      data: param,
    });
  },
  // /factMtrl/saveOrUpdate 新增修改
  i_factMtrlSU(param) {
    return request({
      url: "/mes/factMtrl/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  // /factMtrl/treeList 树状列表
  i_factMtrlTree(param) {
    return request({
      url: "/mes/factMtrl/treeList",
      method: "POST",
      data: param,
    });
  },

  /**
   * @物料树状列表
   */
  // /mtrl/treeList 物料树状列表
  i_mtrlTree(param) {
    return request({
      url: "/mes/mtrl/treeList",
      method: "POST",
      data: param,
    });
  },

  /**
   *@界区新增或修改 /phyMoveMod/saveOrUpdata
   */
  i_phyMoveModSU(param) {
    return request({
      url: "/mes/phyMoveMod/saveOrUpdata",
      method: "POST",
      data: param,
    });
  },
  /**
   * @物理移动模型
   */
  // /phyMoveMod/delete 删除
  i_phyMoveModDel(param) {
    return request({
      url: "/mes/phyMoveMod/delete",
      method: "POST",
      data: param,
    });
  },
  // /phyMoveMod/getById 详情
  i_phyMoveModByid(param) {
    return request({
      url: "/mes/phyMoveMod/getById",
      method: "POST",
      data: param,
    });
  },
  //  / /phyMoveMod/list  目标节点列表
  i_phyMoveModList(param) {
    return request({
      url: "/mes/phyMoveMod/list",
      method: "POST",
      data: param,
    });
  },

  // /nodeType/list  节点类型
  i_nodeTypeList() {
    return request({
      url: "/mes/nodeType/list",
      method: "GET",
    });
  },
  // /moveType/list 移动类型
  i_moveTypeList() {
    return request({
      url: "/mes/moveType/list",
      method: "GET",
    });
  },
  // /node/nodeList 节点
  i_nodeNodeList(param) {
    return request({
      url: "/mes/node/nodeList",
      method: "POST",
      data: param,
    });
  },
};
