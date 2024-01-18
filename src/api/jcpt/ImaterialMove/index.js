import request from "@/utils/request";
export const ImaterialMoveApi = {
  /**
   * 进出厂班量
   */
  //   /factoryInOut/selece 查询
  i_factoryInOutSelece(data) {
    return request({
      url: "/move/factoryInOut/selece",
      method: "POST",
      data: data,
    });
  },

  /**
   * 罐TIS
   */
  // /tankTis/selece 查询
  i_tankTisSelece(data) {
    return request({
      url: "/move/tankTis/selece",
      method: "POST",
      data: data,
    });
  },
  /**
   * 船运出厂计量单
   */
  // /shipOut/add 新增
  i_shipOutAdd(data) {
    return request({
      url: "/move/shipOut/add",
      method: "POST",
      data: data,
    });
  },
  // /shipOut/close 关闭
  i_shipOutClose(data) {
    return request({
      url: "/move/shipOut/close",
      method: "POST",
      data: data,
    });
  },
  // /shipOut/delete 删除
  i_shipOutDelete(data) {
    return request({
      url: "/move/shipOut/delete",
      method: "POST",
      data: data,
    });
  },
  // /shipOut/selece 查询
  i_shipOutSelece(data) {
    return request({
      url: "/move/shipOut/selece",
      method: "POST",
      data: data,
    });
  },
  /**
   * 船运进厂计量单
   */
  // /shipInt/add 新增
  i_shipIntAdd(data) {
    return request({
      url: "/move/shipInt/add",
      method: "POST",
      data: data,
    });
  },
  // /shipInt/close 关闭
  i_shipIntClose(data) {
    return request({
      url: "/move/shipInt/close",
      method: "POST",
      data: data,
    });
  },
  // /shipInt/delete 删除
  i_shipIntDelete(data) {
    return request({
      url: "/move/shipInt/delete",
      method: "POST",
      data: data,
    });
  },
  // /shipInt/selece 查询
  i_shipIntSelece(data) {
    return request({
      url: "/move/shipInt/selece",
      method: "POST",
      data: data,
    });
  },
  /**
   * @化工装置投入产出
   */
  // /intOut/delete 删除
  i_intOutDelete(data) {
    return request({
      url: "/move/intOut/delete",
      method: "POST",
      data: data,
    });
  },
  // /intOut/selece 查询
  i_intOutSelece(data) {
    return request({
      url: "/move/intOut/selece",
      method: "POST",
      data: data,
    });
  },
  /**
   * 装置指标管理
   */
  // /indexManagement/delete 删除
  i_indexManagementDelete(data) {
    return request({
      url: "/move/indexManagement/delete",
      method: "POST",
      data: data,
    });
  },
  // /indexManagement/getById 查询
  i_indexManagementGetById(data) {
    return request({
      url: "/move/indexManagement/getById",
      method: "POST",
      data: data,
    });
  },
  // /indexManagement/saveOrUpdate 保存
  i_indexManagementSaveOrUpdate(data) {
    return request({
      url: "/move/indexManagement/saveOrUpdate",
      method: "POST",
      data: data,
    });
  },
  // /indexManagement/selece 查询
  i_indexManagementSelece(data) {
    return request({
      url: "/move/indexManagement/selece",
      method: "POST",
      data: data,
    });
  },
  /**
   * 罐收付
   */
  // /tankPayment/add 新增新增
  i_tankPaymentAdd(data) {
    return request({
      url: "/move/tankPayment/add",
      method: "POST",
      data: data,
    });
  },
  // /tankPayment/delete 删除
  i_tankPaymentDelete(data) {
    return request({
      url: "/move/tankPayment/delete",
      method: "POST",
      data: data,
    });
  },
  // /tankPayment/selece 查询
  i_tankPaymentSelece(data) {
    return request({
      url: "/move/tankPayment/selece",
      method: "POST",
      data: data,
    });
  },
  /**
   * 罐检尺
   */
  // /tankScaleMeasure/add 新增
  i_tankScaleMeasureAdd(data) {
    return request({
      url: "/move/tankScaleMeasure/add",
      method: "POST",
      data: data,
    });
  },
  // /tankScaleMeasure/delete 删除
  i_tankScaleMeasureDelete(data) {
    return request({
      url: "/move/tankScaleMeasure/delete",
      method: "POST",
      data: data,
    });
  },
  // /tankScaleMeasure/selece 查询
  i_tankScaleMeasureSelece(data) {
    return request({
      url: "/move/tankScaleMeasure/selece",
      method: "POST",
      data: data,
    });
  },
  /**
   * @汽运出厂计量表
   */
  // /automobileFactoryMeasurementSheet/add 新增
  i_automobileFactoryMeasurementSheetAdd(data) {
    return request({
      url: "/move/automobileFactoryMeasurementSheet/add",
      method: "POST",
      data: data,
    });
  },
  // /automobileFactoryMeasurementSheet/close  关闭
  i_automobileFactoryMeasurementSheetClose(data) {
    return request({
      url: "/move/automobileFactoryMeasurementSheet/close",
      method: "POST",
      data: data,
    });
  },
  // /automobileFactoryMeasurementSheet/delete 删除
  i_automobileFactoryMeasurementSheetDelete(data) {
    return request({
      url: "/move/automobileFactoryMeasurementSheet/delete",
      method: "POST",
      data: data,
    });
  },
  // /automobileFactoryMeasurementSheet/selece 查询
  i_automobileFactoryMeasurementSheetSelece(data) {
    return request({
      url: "/move/automobileFactoryMeasurementSheet/selece",
      method: "POST",
      data: data,
    });
  },
  /**
   * @汽运进厂计量表
   */
  // /automobileIncomingMeasurementSheet/add 新增
  i_automobileIncomingMeasurementSheetAdd(data) {
    return request({
      url: "/move/automobileIncomingMeasurementSheet/add",
      method: "POST",
      data: data,
    });
  },
  // /automobileIncomingMeasurementSheet/close  关闭
  i_automobileIncomingMeasurementSheetClose(data) {
    return request({
      url: "/move/automobileIncomingMeasurementSheet/close",
      method: "POST",
      data: data,
    });
  },
  // /automobileIncomingMeasurementSheet/delete 删除
  i_automobileIncomingMeasurementSheetDelete(data) {
    return request({
      url: "/move/automobileIncomingMeasurementSheet/delete",
      method: "POST",
      data: data,
    });
  },
  // /automobileIncomingMeasurementSheet/selece  查询
  i_automobileIncomingMeasurementSheetSelece(data) {
    return request({
      url: "/move/automobileIncomingMeasurementSheet/selece",
      method: "POST",
      data: data,
    });
  },
  /**
   * 计量单查询
   */
  // /gaugeTicketQuery/selece 查询
  i_gaugeTicketQuerySelece(data) {
    return request({
      url: "/move/gaugeTicketQuery/selece",
      method: "POST",
      data: data,
    });
  },
  /**
   * 封账提交
   */
  // /seal/selece  查询
  i_sealSelece(data) {
    return request({
      url: "/move/seal/selece",
      method: "POST",
      data: data,
    });
  },
  /**
   * 管输进厂计量单
   */

  // /meteringPipe/selece 查询
  i_meteringPipeSelece(data) {
    return request({
      url: "/move/meteringPipe/selece",
      method: "POST",
      data: data,
    });
  },
  // /meteringPipe/delete 删除
  i_meteringPipeDelete(data) {
    return request({
      url: "/move/meteringPipe/delete",
      method: "POST",
      data: data,
    });
  },
  // /meteringPipe/close 关闭
  i_meteringPipeClose(data) {
    return request({
      url: "/move/meteringPipe/close",
      method: "POST",
      data: data,
    });
  },
  // /meteringPipe/add 新增
  i_meteringPipeAdd(data) {
    return request({
      url: "/move/meteringPipe/add",
      method: "POST",
      data: data,
    });
  },
  /**
   * 管输出厂计量单
   */
  // /tankOutputFactoryMeasurementSheet/add 新增
  i_tankOutputFactoryMeasurementSheetAdd(data) {
    return request({
      url: "/move/tankOutputFactoryMeasurementSheet/add",
      method: "POST",
      data: data,
    });
  },
  // /tankOutputFactoryMeasurementSheet/close 关闭
  i_tankOutputFactoryMeasurementSheetClose(data) {
    return request({
      url: "/move/tankOutputFactoryMeasurementSheet/close",
      method: "POST",
      data: data,
    });
  },
  // /tankOutputFactoryMeasurementSheet/delete 删除
  i_tankOutputFactoryMeasurementSheetDelete(data) {
    return request({
      url: "/move/tankOutputFactoryMeasurementSheet/delete",
      method: "POST",
      data: data,
    });
  },
  // /tankOutputFactoryMeasurementSheet/selece 查询
  i_tankOutputFactoryMeasurementSheetSelece(data) {
    return request({
      url: "/move/tankOutputFactoryMeasurementSheet/selece",
      method: "POST",
      data: data,
    });
  },

  /**
   * @重点罐监控
   */

  // /tank/areaTankList    区域罐列表
  i_tankareaTankList() {
    return request({
      url: "/mes/tank/areaTankList",
      method: "GET",
    });
  },

  // /keyTankMonitorng/selece 查询
  i_keyTankMonitorngSelece() {
    return request({
      url: "/move/keyTankMonitorng/selece",
      method: "GET",
    });
  },

  //弹窗新增
  // /keynoteTank/add 新增
  i_keynoteTankAdd(data) {
    return request({
      url: "/move/keynoteTank/add",
      method: "POST",
      data: data,
    });
  },
  // /keynoteTank/list 列表
  i_keynoteTankList() {
    return request({
      url: "/move/keynoteTank/list",
      method: "GET",
    });
  },
  // /keynoteTank/delete 删除
  i_keynoteTankDelete(data) {
    return request({
      url: "/move/keynoteTank/delete",
      method: "POST",
      data: data,
    });
  },
  //重点罐组
  // /keynoteTankGroup/add 新增
  i_keynoteTankGroupAdd(data) {
    return request({
      url: "/move/keynoteTankGroup/add",
      method: "POST",
      data: data,
    });
  },

  // /keynoteTankGroup/delete 删除
  i_keynoteTankGroupDelete(data) {
    return request({
      url: "/move/keynoteTankGroup/delete",
      method: "POST",
      data: data,
    });
  },
  /**
   * @化验分析
   */

  // /analysis/selece 查询
  i_analysisSelece(data) {
    return request({
      url: "/move/analysis/selece",
      method: "POST",
      data: data,
    });
  },

  /**
   * @罐存监控
   */

  // /tankStorageMonitoring/selece 查询
  i_tankStorageMonitoringSelece(data) {
    return request({
      url: "/move/tankStorageMonitoring/selece",
      method: "POST",
      data: data,
    });
  },
};
