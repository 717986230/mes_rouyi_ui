import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";
import { isRelogin } from "@/utils/request";
import { fullScreen, exitFullScreen } from "@/utils/fullScreen";
import { drawAnimatedStars } from "@/utils/drawAnimatedStars.js";

NProgress.configure({ showSpinner: false });

const whiteList = ["/login", "/register"];
const fullScreenPage = ["Board/index-1", "Board/index-2"]; //全屏页面

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    to.meta.title && store.dispatch("settings/setTitle", to.meta.title);
    console.log(to, from);
    /* has token*/
    var rainCanvas = document.getElementsByClassName("rainCanvas");
    rainCanvas[0]?.parentNode?.removeChild(rainCanvas[0]);
    if (to.path === "/login") {
      next({ path: "/" });
      exitFullScreen();
      NProgress.done();
    } else {
      //全屏页面 不走layout路由
      if (from.path == "/login" && to.name == "Index") {
        router.push("/Board/index-1");
        fullScreen();
        NProgress.done();
      } else {
        if (fullScreenPage.indexOf(to.name) !== -1) {
          next();
          fullScreen();

          NProgress.done();
        } else {
          exitFullScreen();
          if (store.getters.roles.length === 0) {
            isRelogin.show = true;
            // 判断当前用户是否已拉取完user_info信息
            store
              .dispatch("GetInfo")
              .then(() => {
                isRelogin.show = false;
                store.dispatch("GenerateRoutes").then((accessRoutes) => {
                  // 根据roles权限生成可访问的路由表
                  router.addRoutes(accessRoutes); // 动态添加可访问路由表
                  next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
                });
              })
              .catch((err) => {
                store.dispatch("LogOut").then(() => {
                  Message.error(err);
                  next({ path: "/" });
                });
              });
          } else {
            next();
          }
        }
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});
router.afterEach((to, from) => {
  if (fullScreenPage.indexOf(to.name) !== -1) {
    drawAnimatedStars("#app"); //初始化流星效果
    // fullScreen();
  } else {
    // exitFullScreen();
  }
  NProgress.done();
});
