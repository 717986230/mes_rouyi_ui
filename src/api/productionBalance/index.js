import request from "@/utils/request";
import noInterceptorApi from "@/utils/noInterceptorApi";
const useFakeData = true;
import { RuleData, LoadResult, GetQueryData, GetTankArea, GetInoutArea, LoadMesFactorys, GetIoType } from './mock'
import { businessOrderClassification } from '../materialMove/mock'
export const productionBalanceApi = {
  /**
   *  @ 平衡规则
   */
  RuleData(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(RuleData);
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
   *  @ 平衡参数
   */
  LoadResult(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(LoadResult);
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
   *  @ 解析器列表
   */
  GetQueryData(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetQueryData);
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
   *  @ 通用解锁  罐区下拉数据
   */
  GetTankArea(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetTankArea);
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
   *  @ 通用解锁  装卸台下拉数据
   */
  GetInoutArea(param) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetInoutArea);
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
   *  @ 生产平和 装置指标配置 MES下拉列表
   */
  LoadMesFactorys() {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(LoadMesFactorys);
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
   *  @ 生产平和 装置指标配置 进出类型下拉列表
   */
  GetIoType() {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(GetIoType);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
};
