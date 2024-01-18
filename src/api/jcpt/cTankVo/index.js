import request from "@/utils/request";
import mock from "./mock";
const useFakeData = true;
export const cTankVoApi = {
  //物理温度 vcf维护列表
  i_vcfwhList(param) {
    console.log("物理温度 vcf维护列表", useFakeData);
    if (useFakeData) {
      return new Promise((resolve) => {
        resolve({
          code: 200,
          data: mock.vcfwhList,
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

  /**
   * @立罐区间维护
   */
  // /stdSec/delete 删除
  i_stdSecDel(param) {
    return request({
      url: "/mes/stdSec/delete",
      method: "POST",
      data: param,
    });
  },
  //stdSec/deleteByTankId 批量删除
  i_stdSecdeleteByTankId(param) {
    return request({
      url: "/mes/stdSec/deleteByTankId",
      method: "POST",
      data: param,
    });
  },
  // /stdSec/getById 详情
  i_stdSecById(param) {
    return request({
      url: "/mes/stdSec/getById",
      method: "POST",
      data: param,
    });
  },
  //stdSec/list 列表
  i_stdSecList(param) {
    return request({
      url: "/mes/stdSec/list",
      method: "POST",
      data: param,
    });
  },

  // /stdSec/saveOrUpdate 新增
  i_stdSecSU(param) {
    return request({
      url: "/mes/stdSec/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  // /stdSec/tankList 批量删除罐
  i_stdSectankList() {
    return request({
      url: "/mes/stdSec/tankList",
      method: "GET",
    });
  },
  /**
   * @立罐分米 (厘米)维护
   */

  // /stdDmCuab/deleteByTankId 批量删除
  i_stdDmCuabdeleteByTankId(param) {
    return request({
      url: "/mes/stdDmCuab/deleteByTankId",
      method: "POST",
      data: param,
    });
  },
  // /stdDmCuab/delete 删除
  i_stdDmCuabDel(param) {
    return request({
      url: "/mes/stdDmCuab/delete",
      method: "POST",
      data: param,
    });
  },
  // /stdDmCuab/getById 详情
  i_stdDmCuabByid(param) {
    return request({
      url: "/mes/stdDmCuab/getById",
      method: "POST",
      data: param,
    });
  },
  // /stdDmCuab/list 列表
  i_stdDmCuabList(param) {
    return request({
      url: "/mes/stdDmCuab/list",
      method: "POST",
      data: param,
    });
  },
  // /stdDmCuab/saveOrUpdate 新增
  i_stdDmCuabSU(param) {
    return request({
      url: "/mes/stdDmCuab/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  //stdDmCuab/tankList 批量删除罐列表
  i_stdDmCuabtankList() {
    return request({
      url: "/mes/stdDmCuab/tankList",
      method: "GET",
    });
  },
  /**
   * @立罐浮前罐容表
   */
  // /fltPerCuab/tankList  批量删除罐列表
  i_fltPerCuabtankList() {
    return request({
      url: "/mes/fltPerCuab/tankList",
      method: "GET",
    });
  },

  // /fltPerCuab/deleteByTankId 批量删除
  i_fltPerCuabdeleteByTankId(param) {
    return request({
      url: "/mes/fltPerCuab/deleteByTankId",
      method: "POST",
      data: param,
    });
  },

  // /fltPerCuab/delete 删除
  i_fltPerCuabDel(param) {
    return request({
      url: "/mes/fltPerCuab/delete",
      method: "POST",
      data: param,
    });
  },
  // /fltPerCuab/getById 详情
  i_fltPerCuabByid(param) {
    return request({
      url: "/mes/fltPerCuab/getById",
      method: "POST",
      data: param,
    });
  },
  // /fltPerCuab/list 列表
  i_fltPerCuabList(param) {
    return request({
      url: "/mes/fltPerCuab/list",
      method: "POST",
      data: param,
    });
  },

  // /fltPerCuab/saveOrUpdata 新增
  i_fltPerCuabSU(param) {
    return request({
      url: "/mes/fltPerCuab/saveOrUpdata",
      method: "POST",
      data: param,
    });
  },
  /**
   * @汇流点
   */
  // /conflux/delete 删除
  i_confluxDel(param) {
    return request({
      url: "/mes/conflux/delete",
      method: "POST",
      data: param,
    });
  },

  // /conflux/getById 详情
  i_confluxByid(param) {
    return request({
      url: "/mes/conflux/getById",
      method: "POST",
      data: param,
    });
  },
  // /conflux/list 列表
  i_confluxList(param) {
    return request({
      url: "/mes/conflux/list",
      method: "POST",
      data: param,
    });
  },
  // /conflux/saveOrUpdate 新增
  i_confluxSU(param) {
    return request({
      url: "/mes/conflux/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  /**
   * @液化产品系数 (体积温度)表
   */
  //cubaTempCoef/delete 删除
  i_cubaTempCoefDel(param) {
    return request({
      url: "/mes/cubaTempCoef/delete",
      method: "POST",
      data: param,
    });
  },
  // /cubaTempCoef/getById  详情
  i_cubaTempCoefByid(param) {
    return request({
      url: "/mes/cubaTempCoef/getById",
      method: "POST",
      data: param,
    });
  },
  // /cubaTempCoef/list 列表
  i_cubaTempCoefList(param) {
    return request({
      url: "/mes/cubaTempCoef/list",
      method: "POST",
      data: param,
    });
  },
  //cubaTempCoef/saveOrUpdata 新增
  i_cubaTempCoefSU(param) {
    return request({
      url: "/mes/cubaTempCoef/saveOrUpdata",
      method: "POST",
      data: param,
    });
  },
  /**
   * @物料温度VCF维护
   */
  // /mtrlTemVcf/delete 删除
  i_mtrlTemVcfDel(param) {
    return request({
      url: "/mes/mtrlTemVcf/delete",
      method: "POST",
      data: param,
    });
  },
  // /mtrlTemVcf/getById 详情
  i_mtrlTemVcfByid(param) {
    return request({
      url: "/mes/mtrlTemVcf/getById",
      method: "POST",
      data: param,
    });
  },
  // /mtrlTemVcf/list 列表
  i_mtrlTemVcfList(param) {
    return request({
      url: "/mes/mtrlTemVcf/list",
      method: "POST",
      data: param,
    });
  },
  // /mtrlTemVcf/saveOrUpdata 新增
  i_mtrlTemVcfSU(param) {
    return request({
      url: "/mes/mtrlTemVcf/saveOrUpdata",
      method: "POST",
      data: param,
    });
  },
  /**
   * @液化产品系数表
   */
  // /liquefying/getById  详情
  i_liquefyingByid(param) {
    return request({
      url: "/mes/liquefying/getById",
      method: "POST",
      data: param,
    });
  },
  // /liquefying/delete 删除
  i_liquefyingDel(param) {
    return request({
      url: "/mes/liquefying/delete",
      method: "POST",
      data: param,
    });
  },
  // /liquefying/list  列表
  i_liquefyingList(param) {
    return request({
      url: "/mes/liquefying/list",
      method: "POST",
      data: param,
    });
  },
  // /liquefying/saveOrUpdate 新增
  i_liquefyingSU(param) {
    return request({
      url: "/mes/liquefying/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  /*
   *立罐静压修正 列表
   * */
  // /stdPresCoef/getById  详情
  i_stdPresCoefByid(data) {
    return request({
      url: "/mes/stdPresCoef/getById",
      method: "POST",
      data: data,
    });
  },
  i_stdPresCoefList(data) {
    return request({
      url: "/mes/stdPresCoef/list",
      method: "POST",
      data: data,
    });
  },
  /*
   *立罐静压修正 新增修改
   * */
  i_stdPresCoefAddOrUpdate(data) {
    return request({
      url: "/mes/stdPresCoef/saveOrUpdate",
      method: "POST",
      data: data,
    });
  },
  /*
   *立罐静压修正 删除
   * */
  i_stdPresCoefDel(data) {
    return request({
      url: "/mes/stdPresCoef/delete",
      method: "POST",
      data: data,
    });
  },
  /*
   *立罐静压修正 根据罐id删除
   * */
  i_stdPresCoefDelByTankId(data) {
    return request({
      url: "/mes/stdPresCoef/deleteByTankId",
      method: "POST",
      data: data,
    });
  },
  /**
   * @立罐厘米毫米维护
   */
  // /stdCmmmCuab/list 列表
  i_stdCmmmCuabList(param) {
    return request({
      url: "/mes/stdCmmmCuab/list",
      method: "POST",
      data: param,
    });
  },
  // /stdCmmmCuab/saveOrUpdate 新增
  i_stdCmmmCuabSU(param) {
    return request({
      url: "/mes/stdCmmmCuab/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  // /stdCmmmCuab/getById 详情
  i_stdCmmmCuabByid(param) {
    return request({
      url: "/mes/stdCmmmCuab/getById",
      method: "POST",
      data: param,
    });
  },
  // /stdCmmmCuab/tankList 批量删除罐列表
  i_stdCmmmCuabtankList() {
    return request({
      url: "/mes/stdCmmmCuab/tankList",
      method: "GET",
    });
  },
  // /stdCmmmCuab/deleteByTankId 批量删除
  i_stdCmmmCuabdeleteByTankId(param) {
    return request({
      url: "/mes/stdCmmmCuab/deleteByTankId",
      method: "POST",
      data: param,
    });
  },
  // /stdCmmmCuab/delete 删除
  i_stdCmmmCuabDel(param) {
    return request({
      url: "/mes/stdCmmmCuab/delete",
      method: "POST",
      data: param,
    });
  },
  // 温度浓度标准密度表 列表
  i_temConcentrationList(param) {
    return request({
      url: "/mes/temConcentration/list",
      method: "POST",
      data: param,
    });
  },
  // 温度浓度标准密度表 新增或修改
  i_temConcentrationSU(param) {
    return request({
      url: "/mes/temConcentration/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },
  // 温度浓度标准密度表 删除
  i_temConcentrationDel(param) {
    return request({
      url: "/mes/temConcentration/delete",
      method: "POST",
      data: param,
    });
  },
  // /temperatureStandard/delete 删除
  i_temperatureStandardDel(param) {
    return request({
      url: "/mes/temperatureStandard/delete",
      method: "POST",
      data: param,
    });
  },
  // 温度标准密度表 /temperatureStandard/list 列表
  i_temperatureStandardList(param) {
    return request({
      url: "/mes/temperatureStandard/list",
      method: "POST",
      data: param,
    });
  },
  // 温度标准密度表 /temperatureStandard/saveOrUpdate 新增或修改
  i_temperatureStandardSU(param) {
    return request({
      url: "/mes/temperatureStandard/saveOrUpdate",
      method: "POST",
      data: param,
    });
  },

  /**
   * @单罐配置
   */
  // /tankCnfg/getById 详情
  i_tankCnfgByid(param) {
    return request({
      url: "/mes/tankCnfg/getById",
      method: "POST",
      data: param,
    });
  },

  // 单罐配置 /tankCnfg/list 列表
  i_tankCnfgList(param) {
    return request({
      url: "/mes/tankCnfg/list",
      method: "POST",
      data: param,
    });
  },
  // /tankCnfg/saveOrUpdata 新增或修改
  i_tankCnfgSU(param) {
    return request({
      url: "/mes/tankCnfg/saveOrUpdata",
      method: "POST",
      data: param,
    });
  },

  // 单罐配置 /tankCnfg/delete 删除
  i_tankCnfgDel(param) {
    return request({
      url: "/mes/tankCnfg/delete",
      method: "POST",
      data: param,
    });
  },
};
