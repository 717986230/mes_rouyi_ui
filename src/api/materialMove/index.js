import request from "@/utils/request";
import noInterceptorApi from "@/utils/noInterceptorApi";
import {
  businessOrderClassification,
  classes,
  Deses,
  GetDims,
  GetLocationsByUserId,
  GetOperateCategory,
  GetOpeTypeByUserAndCate,
  GetRanks,
  GetTransTypes,
  GetUnitsByUserId,
  GetVirtualNode,
  GetVirtualNode2,
  orderList,
  RecoveryOfRefineryList,
  ourNode,
  operationType,
  otherNodes,
  mainDatas,
  instrList,
  rankList,
  lineList,
  materielList,
  DocumentType,
  GetMakeStateMeasSheetList,
  GetMakeStateSheetRecordList,
  GetTmServerTime,
  GetShiftSmtMainSubData,
  QueryAreaBalnCol,
  QuerySheetCol,
  QueryMatBalnConfigData,
  GetTankChkLatelyList,
  unitTankMainData,
  ReCalc,
  QueryIndexDataByUnitId,
  InitSideName,
  GetTrees,
  GetCheckStockLists,
  GetMtrlsByLocation,
  GetOpeTypeByUser,
  GetMtrlTrees,
  GetStocksByUserId,
  GetLocationsByStockId,
  QueryInventorys,
  LoadTreeData,
  QueryBalanceSheetRow,
  getTankUnlockList,
  getDeviceUnlockList,
  getClassUnlockList,
  getMeteringUnlockList,
  getInterchangeUnlockList,
  getIndicatorsList,
  getIndicatorsDefineList,
  AssemblyErrorCheckDataSet
} from './mock'
const useFakeData = true;
export const materialMoveApi = {
  /**
   *  @ 业务单分类
   */
  businessOrderClassification(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(businessOrderClassification);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /**
   *  @ 班次
   */
  classes(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(classes);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /**
   *  @ 业务单列表
   */
  orderList(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(orderList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /**
   *  @ 按用户和类别获取操作类型
   */
  GetOpeTypeByUserAndCate(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetOpeTypeByUserAndCate);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /**
   *  @ 目标等级
   */
  GetRanks(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetRanks);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /**
   *  @ 重量单位
   */
  GetDims(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetDims);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /**
   *  @ 运输类型
   */
  GetTransTypes(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetTransTypes);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /**
   *  @ 公司列表
   */
  Deses(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(Deses);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /**
   *  @ 目标节点
   */
  GetLocationsByUserId(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetLocationsByUserId);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /**
   *  @ 目标物料
   */
  GetUnitsByUserId(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetUnitsByUserId);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /**
   *  @ 来源节点
   */
  GetVirtualNode(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetVirtualNode);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /**
   *  @ 来源节点2
   */
  GetVirtualNode2(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetVirtualNode2);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /**
   *  @ 获取业务单分类
   */
  GetOperateCategory(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetOperateCategory);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*炼油装置收付 列表*/
  RecoveryOfRefineryList(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(RecoveryOfRefineryList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*炼油装置收付 新增*/
  /*炼油装置收付 删除*/
  /*炼油装置收付 关闭*/
  /*炼油装置收付 保存*/
  /*炼油装置收付 操作类型*/
  operationType(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(operationType);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*炼油装置收付 我方节点*/
  ourNode(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(ourNode);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*炼油装置收付 对方节点*/
  otherNodes(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(otherNodes);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*仪表计量 主列表*/
  mainDatas(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(mainDatas);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*仪表计量 自动采集*/
  /*仪表计量 删除*/
  /*仪表计量 保存*/
  /*仪表计量 仪表下拉列表*/
  instrList(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(instrList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*仪表计量 质量等级下拉列表*/
  rankList(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(rankList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*仪表计量 侧线下拉列表*/
  lineList(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(lineList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*仪表计量 物料下拉列表*/
  materielList(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(materielList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*管输进厂计量单 制单状态列表*/
  DocumentType(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(DocumentType);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*管输进厂计量单 主数据*/
  GetMakeStateMeasSheetList(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetMakeStateMeasSheetList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*管输进厂计量单 子数据*/
  GetMakeStateSheetRecordList(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetMakeStateSheetRecordList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /**
   * @进出厂班量
   */
  //查询
  GetShiftSmtMainSubData(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetShiftSmtMainSubData);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //提取
  GetTmServerTime(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetTmServerTime);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*料仓计量 主数据*/
  //GetUnitTankMeasureRec
  unitTankMainData() {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(unitTankMainData);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*投入产出 主数据*/
  ReCalc() {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(ReCalc);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*装置指标管理*/
  QueryIndexDataByUnitId() {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(QueryIndexDataByUnitId);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*装置下的侧线*/
  InitSideName() {
    if (InitSideName) {
      return new Promise((resolve, reject) => {
        resolve(InitSideName);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*盘点管理 仓库列表 树结构*/
  GetTrees() {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetTrees);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*盘点管理 盘点列表*/
  GetCheckStockLists() {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetCheckStockLists);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*盘点管理 库位下的物料 */
  GetMtrlsByLocation() {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetMtrlsByLocation);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  // 罐收付
  GetTankChkLatelyList() {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetTankChkLatelyList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*仓储管理 移动记录拆查询   移动类型下拉数据 */
  GetOpeTypeByUser() {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetOpeTypeByUser);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*仓储管理 移动记录拆查询  物料树结构*/
  GetMtrlTrees() {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetMtrlTrees);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*仓储管理 移动记录查询  源仓库*/
  GetStocksByUserId() {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetStocksByUserId);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*仓储管理 移动记录查询  源仓库 下的源库位 */
  GetLocationsByStockId() {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetLocationsByStockId);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*生产统计 物料平衡表 物料树 */
  LoadTreeData() {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(LoadTreeData);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*仓储管理   库存查询*/
  QueryInventorys(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(QueryInventorys);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*区域平衡表列组态*/
  QueryAreaBalnCol() {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(QueryAreaBalnCol);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*物料平衡表列组态*/
  QuerySheetCol() {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(QuerySheetCol);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //物料平衡表组态
  QueryMatBalnConfigData() {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(QueryMatBalnConfigData);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //物料平衡表组态  主树表
  QueryBalanceSheetRow() {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(QueryBalanceSheetRow);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //生产平衡 通用解锁 罐解锁列表
  getTankUnlockList(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(getTankUnlockList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //生产平衡 通用解锁 装置解锁列表
  getDeviceUnlockList(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(getDeviceUnlockList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //生产平衡 通用解锁 进出厂班量解锁列表
  getClassUnlockList(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(getClassUnlockList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //生产平衡 通用解锁 进出厂计量但解锁列表
  getMeteringUnlockList(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(getMeteringUnlockList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //生产平衡 通用解锁 互供解锁列表
  getInterchangeUnlockList(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(getInterchangeUnlockList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //生产平衡 装置指标配置
  getIndicatorsList(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(getIndicatorsList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //生产平衡 指标定义配置
  getIndicatorsDefineList(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(getIndicatorsDefineList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //生产平衡 移动盈亏检擦
  AssemblyErrorCheckDataSet(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(AssemblyErrorCheckDataSet);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
}
