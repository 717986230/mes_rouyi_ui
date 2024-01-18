import request from "@/utils/request";
export const componApi = {
  /**
   * 公式弹窗接口
   * @公式
   */
  // /formula/instrumentList  测量点列表
  i_formulaInstrumentList(param) {
    return request({
      url: "/mes/formula/instrumentList",
      method: "POST",
      data: param,
    });
  },
  //验证/formula/verify
  i_verify(param, page) {
    return request({
      url: "/mes/formula/verify",
      method: "POST",
      data: {
        ...param,
        ...page,
      },
    });
  },
  //公式列表/formula/list
  i_formulaList(param) {
    return request({
      url: "/mes/formula/list",
      method: "GET",
    });
  },
};
