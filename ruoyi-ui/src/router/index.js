import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login"),
    hidden: true,
  },
  {
    path: "/register",
    component: () => import("@/views/register"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/error/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error/401"),
    hidden: true,
  },
  {
    path: "",
    component: Layout,
    redirect: "index",
    children: [
      {
        path: "index",
        component: () => import("@/views/index"),
        name: "Index",
        meta: { title: "首页", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/user",
    component: Layout,
    hidden: true,
    redirect: "noredirect",
    children: [
      {
        path: "profile",
        component: () => import("@/views/system/user/profile/index"),
        name: "Profile",
        meta: { title: "个人中心", icon: "user" },
      },
    ],
  },
  {
    name: "Board/index-1",
    path: "/Board/index-1",
    component: () => import("@/views/board/index-1"),
    hidden: true,
  },
  {
    name: "Board/index-2",
    path: "/Board/index-2",
    component: () => import("@/views/board/index-2"),
    hidden: true,
  },
  //设备管理模块路由
  {
    path: "/equipment",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "edit",
        component: (resolve) =>
          require(["../views/equipment/maintenance/editTable.vue"], resolve),
        name: "equipmentEdit",
        meta: { title: "故障信息" },
      },
      {
        path: "addinfo",
        component: (resolve) =>
          require(["../views/equipment/maintenance/addInfo.vue"], resolve),
        name: "equipmentAdd",
        meta: { title: "新增报修" },
      },
      {
        path: "inspectionTasksHandle",
        component: (resolve) =>
          require([
            "@/views/equipment/inspection/ition_rw/editTition_rw",
          ], resolve),
        name: "inspectionTasksHandle",
        meta: { title: "巡检任务操作", noCache: true },
      },
      {
        path: "InspectionPlanList",
        component: (resolve) =>
          require(["@/views/equipment/inspection/ition_jh/ition_jh"], resolve),
        name: "InspectionPlanList",
        meta: { title: "巡检计划" },
      },
      {
        path: "InspectionPlanAdd",
        component: (resolve) =>
          require(["@/views/equipment/inspection/ition_jh/addOrEdit"], resolve),
        name: "InspectionPlanAdd",
        meta: { title: "新增巡检计划" },
      },
      {
        path: "InspectionPlanEdit",
        component: (resolve) =>
          require(["@/views/equipment/inspection/ition_jh/addOrEdit"], resolve),
        name: "InspectionPlanEdit",
        meta: { title: "修改巡检计划" },
      },
      {
        path: "InspectionPlanDetail",
        component: (resolve) =>
          require(["@/views/equipment/inspection/ition_jh/detail"], resolve),
        name: "InspectionPlanDetail",
        meta: { title: "巡检计划详情" },
      },
      {
        path: "ten_jh_detail",
        name: "ten_jh_detail",
        component: (resolve) =>
          require(["@/views/equipment/tenance/ten_jh/detail"], resolve),
        meta: { title: "保养计划详情" },
      },
      {
        path: "ten_rw_process",
        name: "ten_rw_process",
        component: (resolve) =>
          require(["@/views/equipment/tenance/ten_rw/process"], resolve),
        meta: { title: "保养任务流程" },
      },
      {
        path: "submitAdd",
        component: (resolve) =>
          require(["../views/equipment/procure/submit/submitadd.vue"], resolve),
        name: "submitAdd",
        meta: { title: "需求提报新增/修改" },
      },
      {
        path: "submitdetail",
        component: (resolve) =>
          require([
            "../views/equipment/procure/submit/submitdetail.vue",
          ], resolve),
        name: "submitdetail",
        meta: { title: "需求提报详情" },
      },

      {
        path: "trackdetail",
        component: (resolve) =>
          require([
            "../views/equipment/procure/track/trackdetail.vue",
          ], resolve),
        name: "trackdetail",
        meta: { title: "采购跟踪详情" },
      },
      {
        path: "inventoryAdd",
        component: (resolve) =>
          require([
            "../views/equipment/standby/inventory/inventoryadd.vue",
          ], resolve),
        name: "inventoryAdd",
        meta: { title: "盘点管理新增/修改" },
      },
      {
        path: "inventorydetail",
        component: (resolve) =>
          require([
            "../views/equipment/standby/inventory/inventorydetail.vue",
          ], resolve),
        name: "inventorydetail",
        meta: { title: "盘点管理详情" },
      },
      {
        path: "configerdetail",
        component: (resolve) =>
          require([
            "../views/equipment/run/configer/configerdetail.vue",
          ], resolve),
        name: "configerdetail",
        meta: { title: "设备测量点详情" },
      },
      {
        path: "spareGetadd",
        component: (resolve) =>
          require(["../views/equipment/run/spareGet/spareGetadd.vue"], resolve),
        name: "spareGetadd",
        meta: { title: "备品备件申领新增/修改" },
      },
      {
        path: "spareGetdetail",
        component: (resolve) =>
          require([
            "../views/equipment/run/spareGet/spareGetdetail.vue",
          ], resolve),
        name: "spareGetdetail",
        meta: { title: "备品备件申领详情" },
      },
    ],
  },
  {
    path: "/plan",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "productionPlandetail",
        component: (resolve) =>
          require([
            "../views/plan/productionPlan/productionPlandetail.vue",
          ], resolve),
        name: "productionPlandetail",
        meta: { title: "修改生产计划" },
      },
      {
        path: "procurePlandetail",
        component: (resolve) =>
          require(["../views/plan/procurePlan/procurePlandetail.vue"], resolve),
        name: "procurePlandetail",
        meta: { title: "采购计划明细" },
      },
    ],
  },
];

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {
    path: "/system/user-auth",
    component: Layout,
    hidden: true,
    permissions: ["system:user:edit"],
    children: [
      {
        path: "role/:userId(\\d+)",
        component: () => import("@/views/system/user/authRole"),
        name: "AuthRole",
        meta: { title: "分配角色", activeMenu: "/system/user" },
      },
    ],
  },
  {
    path: "/system/role-auth",
    component: Layout,
    hidden: true,
    permissions: ["system:role:edit"],
    children: [
      {
        path: "user/:roleId(\\d+)",
        component: () => import("@/views/system/role/authUser"),
        name: "AuthUser",
        meta: { title: "分配用户", activeMenu: "/system/role" },
      },
    ],
  },
  {
    path: "/system/dict-data",
    component: Layout,
    hidden: true,
    permissions: ["system:dict:list"],
    children: [
      {
        path: "index/:dictId(\\d+)",
        component: () => import("@/views/system/dict/data"),
        name: "Data",
        meta: { title: "字典数据", activeMenu: "/system/dict" },
      },
    ],
  },
  {
    path: "/monitor/job-log",
    component: Layout,
    hidden: true,
    permissions: ["monitor:job:list"],
    children: [
      {
        path: "index/:jobId(\\d+)",
        component: () => import("@/views/monitor/job/log"),
        name: "JobLog",
        meta: { title: "调度日志", activeMenu: "/monitor/job" },
      },
    ],
  },
  {
    path: "/tool/gen-edit",
    component: Layout,
    hidden: true,
    permissions: ["tool:gen:edit"],
    children: [
      {
        path: "index/:tableId(\\d+)",
        component: () => import("@/views/tool/gen/editTable"),
        name: "GenEdit",
        meta: { title: "修改生成配置", activeMenu: "/tool/gen" },
      },
    ],
  },
];

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
let routerReplace = Router.prototype.replace;
// push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((err) => err);
};
// replace
Router.prototype.replace = function push(location) {
  return routerReplace.call(this, location).catch((err) => err);
};

export default new Router({
  mode: "hash", // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});
