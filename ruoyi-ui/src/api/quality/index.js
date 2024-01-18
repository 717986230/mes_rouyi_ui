import request from "@/utils/request";
import noInterceptorApi from "@/utils/noInterceptorApi";
import { Default, checkList, inspectionPlan } from './mock'
const useFakeData = true;
export const qualityApi = {
  //来料抽检列表
  checkList(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(checkList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  //质检方案 列表
  inspectionPlan(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(inspectionPlan);
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