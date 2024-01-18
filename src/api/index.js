import { workCApi } from "./jcpt/workC/index";
import { cTankVoApi } from "./jcpt/cTankVo/index";
import { FactoryModelApi } from "./jcpt/FactoryModel/index";
import { EnergyManagementApi } from "./jcpt/EnergyManagement/index";
import { equipApi } from "./equipment/index";
import { componApi } from "./compon/index";
import { materialMoveApi } from "./materialMove/index";
import { productionBalanceApi } from "./productionBalance/index";
import { productionBalanceDetailApi } from "./jcpt/deviceIntegrationPlatform/index";
import { ImaterialMoveApi } from "./jcpt/ImaterialMove/index";
import { ProductionStatisticsApi } from "./jcpt/ProductionStatistics/index";
import { energyApi } from "./energy/index";
import { inoutApi } from "./inout/index";
import { equip2Api } from "./equipment/index2";
import { fileApi } from "./equipment/file";
import { qualityApi } from "./quality/index";
export const $api = {
  ...equipApi,
  ...workCApi,
  ...componApi,
  ...cTankVoApi,
  ...FactoryModelApi,
  ...materialMoveApi,
  ...EnergyManagementApi,
  ...productionBalanceApi,
  ...productionBalanceDetailApi,
  ...ImaterialMoveApi,
  ...ProductionStatisticsApi,
  ...energyApi,
  ...inoutApi,
  ...equip2Api,
  ...fileApi,
  ...qualityApi,
};
export const API = {
  install(Vue) {
    Vue.prototype.$api = $api;
  },
};
