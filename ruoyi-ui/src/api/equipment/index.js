import request from "@/utils/request";
import noInterceptorApi from "@/utils/noInterceptorApi";
import {
  Work_Status,
  WXAll,
  Fault_Status,
  treeData,
  ten_jhList,
  ten_rwList,
  XJlist,
  ition_rwList,
  titleData,
  WXselCheckById,
  WXselStopById,
  WXselOperatedPeopleById,
  WXselMalfunctionByIdDTO,
  WXRecordAllVO,
  WXRecordAllVO1,
  WXselRecordByID,
  queryPersonList,
  tenanceDetail,
  TasksDetail,
  getOperateList,
  XJgetById,
  inspection_plan_status,
  inspection_type,
  getInspectionTasksDetail,
  inspection_result,
} from "./mock";
import { eqTree } from "./eqTree";

const useFakeData = true;
export const equipApi = {
  //物理温度 vcf维护列表
  WXAll(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(WXAll);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  Work_Status(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(Work_Status);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  Fault_Status(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(Fault_Status);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  eqTree(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(eqTree);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  treeData(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(treeData);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  ten_jhList(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(ten_jhList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  ten_rwList(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(ten_rwList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  XJlist(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(XJlist);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  ition_rwList(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(ition_rwList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  titleData(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(titleData);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  WXselCheckById(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(WXselCheckById);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  WXselStopById(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(WXselStopById);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  WXselOperatedPeopleById(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(WXselOperatedPeopleById);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  WXselMalfunctionByIdDTO(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(WXselMalfunctionByIdDTO);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  WXRecordAllVO(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(WXRecordAllVO);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  WXRecordAllVO1(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(WXRecordAllVO1);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  WXselRecordByID(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(WXselRecordByID);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  queryPersonList(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(queryPersonList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  tenanceDetail(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(tenanceDetail);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  TasksDetail(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(TasksDetail);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  getOperateList(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(getOperateList);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  XJgetById(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(XJgetById);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  inspection_plan_status(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(inspection_plan_status);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  inspection_type(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(inspection_type);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  getInspectionTasksDetail(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(getInspectionTasksDetail);
      });
    } else {
      return request({
        url: "",
        method: "POST",
        data: param,
      });
    }
  },
  inspection_result(param, page) {
    if (useFakeData) {
      return new Promise((resolve, reject) => {
        resolve(inspection_result);
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
