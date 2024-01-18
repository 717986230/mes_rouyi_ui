import request from "@/utils/request";
import noInterceptorApi from "@/utils/noInterceptorApi";
import {
  equList,
  inList,
  spareList,
  workOrderList,
  MaintenanceTasksList,
  experienceList,
  tenanceTasksList
} from './mock2'
const useFakeData = true;
export const equip2Api = {
  //设备档案列表
  equList(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(equList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //库存列表
  spareList(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(spareList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //入库列表
  inList(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(inList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //报修工单列表
  workOrderList(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(workOrderList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //维修任务列表
  MaintenanceTasksList(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(MaintenanceTasksList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //经验库列表
  experienceList(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(experienceList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //维护任务列表
  tenanceTasksList(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(tenanceTasksList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  }
}