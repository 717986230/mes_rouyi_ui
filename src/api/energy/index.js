import request from "@/utils/request";
import {
  pointsTotalList,
  nodeConfirmList,
  energyExchangeList,
  energyNetworkBalanceList,
  energyStatisticsBalanceList,
  energyPerformanceIndicatorRuleList, warningRuleSetting
} from './mock'
const useFakeData = true;
export const energyApi = {
  /*能源统计平衡 begin*/
  //测量点合计 列表 接口
  i_pointsTotalList(param) {
    if (useFakeData) {
      return new Promise((resolve) => {
        resolve({
          code: 200,
          data: pointsTotalList,
        });
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //节点量确认 列表 接口
  i_nodeConfirmList(param) {
    if (useFakeData) {
      return new Promise((resolve) => {
        resolve({
          code: 200,
          data: nodeConfirmList,
        });
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //能源互供量仲裁确认 列表 接口
  i_energyExchangeList(param) {
    if (useFakeData) {
      return new Promise((resolve) => {
        resolve({
          code: 200,
          data: energyExchangeList,
        });
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //能源管网平衡 列表 接口
  i_energyNetworkBalanceList(param) {
    if (useFakeData) {
      return new Promise((resolve) => {
        resolve({
          code: 200,
          data: energyNetworkBalanceList,
        });
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  // 能源统计平衡 列表 接口
  i_energyStatisticsBalanceList(param) {
    if (useFakeData) {
      return new Promise((resolve) => {
        resolve({
          code: 200,
          data: energyStatisticsBalanceList,
        });
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //能源绩效指标规则
  i_energyPerformanceIndicatorRuleList(param) {
    if (useFakeData) {
      return new Promise((resolve) => {
        resolve({
          code: 200,
          data: energyPerformanceIndicatorRuleList,
        });
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //预警报警规则设置 warningRuleSetting
  i_warningRuleSetting(param) {
    if (useFakeData) {
      return new Promise((resolve) => {
        resolve({
          code: 200,
          data: warningRuleSetting,
        });
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  /*能源统计平衡 end*/
}
