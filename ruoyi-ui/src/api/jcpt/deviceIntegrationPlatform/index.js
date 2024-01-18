import request from "@/utils/request";

export const productionBalanceDetailApi = {
  /**
   *  @执行规则
   */
  // /ruleType/list 规则类型
  e_ruleTypeList() {
    return request({
      url: "/device/ruleType/list",
      method: "GET",
    });
  },
  //   /executeRule/delete 删除
  e_executeRuleDel(param) {
    return request({
      url: "/device/executeRule/delete",
      method: "POST",
      data: param,
    });
  },
  //   /executeRule/getById 详情
  e_executeRuleByid(param) {
    return request({
      url: "/device/executeRule/getById",
      method: "POST",
      data: param,
    });
  },

  // /executeRule/list 列表列表
  e_executeRuleList(param) {
    return request({
      url: "/device/executeRule/list",
      method: "POST",
      data: param,
    });
  },
  //   /executeRule/saveOrUpdate 新增/修改
  e_executeRuleSaveOrUpdate(param) {
    return request({
      url: "/device/executeRule/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  // /timeType/list 执行规则类型列表
  e_timeTypeList() {
    return request({
      url: "/device/timeType/list",
      method: "GET",
    });
  },
  /**
   * @设备
   */
  // /device/accessoryList 配件列表
  e_accessoryListDel(param) {
    return request({
      url: "/device/device/accessoryList/delete",
      method: "POST",
      data: param,
    });
  },
  // /device/delete 删除
  e_deviceDel(param) {
    return request({
      url: "/device//device/delete",
      method: "POST",
      data: param,
    });
  },
  // /device/deviceList 设备列表
  e_deviceList(param) {
    return request({
      url: "/device/device/deviceList",
      method: "POST",
      data: param,
    });
  },
  // /device/getById 详情
  e_deviceByid(param) {
    return request({
      url: "/device/device/getById",
      method: "POST",
      data: param,
    });
  },
  // /device/list 列表列表
  e_deviceListList(param) {
    return request({
      url: "/device/device/list",
      method: "POST",
      data: param,
    });
  },

  // /device/saveOrUpdate 新增/修改
  e_deviceSaveOrUpdate(param) {
    return request({
      url: "/device/device/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },

  /**
   * @设备类型
   */
  // /deviceType/delete 删除
  e_deviceTypeDel(param) {
    return request({
      url: "/device/deviceType/delete",
      method: "POST",
      data: param,
    });
  },
  // /deviceType/getById 详情
  e_deviceTypeByid(param) {
    return request({
      url: "/device/deviceType/getById",
      method: "POST",
      data: param,
    });
  },
  // /deviceType/list 列表列表
  e_deviceTypeList(param) {
    return request({
      url: "/device/deviceType/list",
      method: "POST",
      data: param,
    });
  },
  // /deviceType/saveOrUpdate 新增/修改
  e_deviceTypeSaveOrUpdate(param) {
    return request({
      url: "/device/deviceType/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },

  // /deviceType/upperList 上级设备类型
  e_deviceTypeUpperList() {
    return request({
      url: "/device/deviceType/upperList",
      method: "GET",
    });
  },

  /**
   * @设备配件配置
   */
  // /deviceAccessory/delete 删除
  e_deviceAccessoryDel(param) {
    return request({
      url: "/device/deviceAccessory/delete",
      method: "POST",
      data: param,
    });
  },
  // /deviceAccessory/getById 详情
  e_deviceAccessoryByid(param) {
    return request({
      url: "/device/deviceAccessory/getById",
      method: "POST",
      data: param,
    });
  },
  // /deviceAccessory/list 列表
  e_deviceAccessoryList(param) {
    return request({
      url: "/device/deviceAccessory/list",
      method: "POST",
      data: param,
    });
  },
  // /deviceAccessory/saveOrUpdate 新增/修改
  e_deviceAccessorySaveOrUpdate(param) {
    return request({
      url: "/device/deviceAccessory/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  // /deviceType/allList    设备类型列表
  e_deviceTypeAllList() {
    return request({
      url: "/device/deviceType/allList",
      method: "GET",
    });
  },
};
