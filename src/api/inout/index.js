import request from "@/utils/request";
export const inoutApi = {
  /**
   * @料仓计量
   */
  // /binMetering/add 新增
  i_binMeteringAdd(param) {
    return request({
      url: "/mes/binMetering/add",
      method: "POST",
      data: param,
    });
  },

  //   /binMetering/delete 删除
  i_binMeteringDelete(param) {
    return request({
      url: "/mes/binMetering/delete",
      method: "POST",
      data: param,
    });
  },

  //   /binMetering/selece 查询
  i_binMeteringSelect(param) {
    return request({
      url: "/mes/binMetering/select",
      method: "POST",
      data: param,
    });
  },
};
